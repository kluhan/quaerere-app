import { calculateNeoFfi } from "./neo_ffi";
import { calculateMpZm } from "./mp_zm";

import { LikertScale, LikertFiveLevel, LikertThreeLevel } from '../../src/app/share/enumerations/likert.enum';
import { NeoFfi, NeoFfiResult } from "../../src/app/share/models/neo-ffi.model";
import { MpZm, MpZmResult } from "../../src/app/share/models/mp-zm.model";

const functions = require('firebase-functions');
const uidgenerator = require('uid-generator');
const admin = require ('firebase-admin');
const cors = require('cors')({
    origin: true,
  });

const uidgen = new uidgenerator(); // Default is a 128-bit UID encoded in base58
 
admin.initializeApp({
    serviceAccountId: 'quaerere-app@appspot.gserviceaccount.com',
});

// TODO: Create Token-Model
exports.getToken = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
        
        const requestToken = req.body.token;

        admin.firestore().collection('token').doc(requestToken).get().then((tokenDocument) => {
            if (tokenDocument.exists) {
                const response = tokenDocument.data();
                uidgen.generate()
                    .then((uid: string) => {
                        admin.auth().createCustomToken(uid)
                            .then(
                                response.layout.forEach(test => {
                                    admin.firestore().collection(test).doc(uid).set({token: requestToken, finished: false});
                                }),
                                admin.firestore().collection('demographic').doc(uid).set({token: requestToken, finished: false}),
                                response.uid = uid,
                                response.token = requestToken,
                                res.status(200).send(response)
                            )
                    })
            } else {
                res.send(404);
            }
            
        })
    })
});

// TODO: Write custom Error
exports.finishSurvey = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
         
         const requestToken = req.body.token;
         const requestUid = req.body.uid;
 
         admin.firestore().collection('token').doc(requestToken).get().then((tokenDocument) => {
            if (tokenDocument.exists) {
                const token = tokenDocument.data();

                 admin.firestore().collection('result').doc(requestUid).set({token: requestToken});
                 admin.firestore().collection('demographic').doc(requestUid).update({finished: true});

                 token.layout.forEach(test => {
                     admin.firestore().collection(test).doc(requestUid).update({finished: true});
                     switch (test) {
                         case 'neo_ffi':
                            admin.firestore().collection('neo_ffi').doc(requestUid).get().then((neoFfiDocument) => {
                                const neo_ffi: NeoFfi = neoFfiDocument.data();
                                const neo_ffi_result: NeoFfiResult = calculateNeoFfi(neo_ffi);
                                admin.firestore().collection('result').doc(requestUid).update({neo_ffi: neo_ffi_result});
                            });
                            break;
                     
                         case 'mp_zm':
                            admin.firestore().collection('mp_zm').doc(requestUid).get().then((mpZmDocument) => {
                                const mp_zm: MpZm = mpZmDocument.data();
                                const mp_zm_result: MpZmResult = calculateMpZm(mp_zm);
                                admin.firestore().collection('result').doc(requestUid).update({mp_zm: mp_zm_result});
                            });
                            break;
 
                         default:
                            throw Error("Test isn't known");
                            
                     }
                 })
                 res.send(200);
             } else {
                 res.send(404);
             }
             
         })
     })
 });
 