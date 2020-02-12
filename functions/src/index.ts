import { calculateNeoFfi } from "./neo_ffi";
import { calculateMpZm } from "./mp_zm";

import { NeoFfi, NeoFfiResult } from "../../src/app/share/models/neo-ffi.model";
import { MpZm, MpZmResult } from "../../src/app/share/models/mp-zm.model";
import { Survey } from "../../src/app/share/models/survey.model"
import { Token } from "../../src/app/share/models/token.model"
import { TokenType } from "../../src/app/share/enumerations/token-type.enum"
import { Tests } from "../../src/app/share/enumerations/tests.enum"

import * as admin from 'firebase-admin';

const functions = require('firebase-functions');
const uidgenerator = require('uid-generator');

const cors = require('cors')({
    origin: true,
  });

const uidgen = new uidgenerator(); // Default is a 128-bit UID encoded in base58
 
admin.initializeApp({
    serviceAccountId: 'quaerere-app@appspot.gserviceaccount.com',
});

// TODO: Create Token-Model
// TODO: Rework Tokenlayout
exports.getToken = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
        
        const requestToken = req.body.token;
        admin.firestore().collection('survey').where('token', 'array-contains', requestToken).get().then(async (surveyCollection) => {
            if (!surveyCollection.empty) {
                const survey = <Survey>surveyCollection.docs[0].data();
                const tokenSnapshot = await admin.firestore().collection('token').doc(requestToken).get();
                const token = <Token>tokenSnapshot.data();

                const increment = admin.firestore.FieldValue.increment(1);
                const tokenRef = tokenSnapshot.ref;
                switch (token.type) {
                    case TokenType.FREE:
                        tokenRef.update({ count: increment }).catch(err => Error(err));
                        break;

                    case TokenType.VOLUME:
                        if(token.limit > token.count){
                            tokenRef.update({ count: increment}).catch(err => Error(err));
                        } else {
                            res.status(423).send();
                        }
                }
                
                const response = {
                    'layout': survey.layout,
                    'demographic': survey.demographic,
                    'token': requestToken,
                    'name': survey.name,
                    'uid': undefined,
                };

                uidgen.generate()
                    .then((uid: string) => {
                        admin.auth().createCustomToken(uid).catch(() => { throw Error("Can not register CustomToken")});
                        response.layout.forEach((test: string) => {
                            admin.firestore().collection(test).doc(uid).set({token: requestToken, finished: false}).catch(() => { throw Error("Can not create TestDocument")});
                        });
                        admin.firestore().collection('demographic').doc(uid).set({token: requestToken, finished: false}).catch(() => { throw Error("Can not create DemographicDocument")});
                        response.uid = uid
                        response.token = requestToken
                        res.status(200).send(response)
                    })
            } else {
                console.log("nothing was done");
                res.send(404);
            }
            
        }).catch(() => { throw Error("Can not access SurveyDocument")});
    })
});

// TODO: Write custom Error
// TODO: Add Survey to Result
exports.finishSurvey = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
         
         const requestToken = req.body.token;
         const requestUid = req.body.uid;
 
         admin.firestore().collection('token').doc(requestToken).get().then(async (tokenDocument) => {
            if (tokenDocument.exists) {
                const token = <Token>tokenDocument.data();
                const demographic = await admin.firestore().collection('demographic').doc(requestUid).get();
                const survey = <Survey> await (await admin.firestore().collection('survey').doc(token.survey.toString()).get()).data();

                // TODO: Remove token-field from demographicData before copy
                await admin.firestore().collection('result').doc(requestUid).set({token: requestToken, demographic: demographic.data()}).catch(() => { throw Error("Can not create ResultDocument") });
                await admin.firestore().collection('demographic').doc(requestUid).update({finished: true}).catch(() => { throw Error("Can not access DemographicDocument")});

                survey.layout.forEach((test: Tests) => {
                    admin.firestore().collection(test).doc(requestUid).update({finished: true}).catch(() => { throw Error("Can not access TestDocument")});
                    switch (test) {
                        case Tests.NEO_FFI:
                            admin.firestore().collection('neo_ffi').doc(requestUid).get().then((neoFfiDocument) => {
                                const neo_ffi = neoFfiDocument.data() as NeoFfi;
                                const neo_ffi_result: NeoFfiResult = calculateNeoFfi(neo_ffi);
                                admin.firestore().collection('result').doc(requestUid).update({neo_ffi: neo_ffi_result}).catch(() => { throw Error("Can not access ResultDocument")});
                            }).catch(() => { throw Error("Can not access NeoFfiDocument")});
                            break;
                     
                        case Tests.MP_ZM:
                            admin.firestore().collection('mp_zm').doc(requestUid).get().then((mpZmDocument) => {
                                const mp_zm = mpZmDocument.data() as MpZm;
                                const mp_zm_result: MpZmResult = calculateMpZm(mp_zm);
                                admin.firestore().collection('result').doc(requestUid).update({mp_zm: mp_zm_result}).catch(() => { throw Error("Can not access ResultDocument")});
                            }).catch(() => { throw Error("Can not access MpZmFfiDocument")});
                            break;
 
                        default:
                            throw Error("Test isn't known");
                            
                    }
                })
                res.send(200);
            } else {
                res.send(404);
            }
             
        }).catch(() => { throw Error("Can not access TokenDocument") });
    })
 });
 