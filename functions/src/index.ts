import { calculateNeoFfi } from "./neo_ffi";

const functions = require('firebase-functions');
const uidgenerator = require('uid-generator');
const admin = require ('firebase-admin');
const cors = require('cors')({
    origin: true,
  });
//const cors = require('cors');
//const corsHandler = cors({origin: true});

const uidgen = new uidgenerator(); // Default is a 128-bit UID encoded in base58
 
admin.initializeApp({
    serviceAccountId: 'quaerere-app@appspot.gserviceaccount.com',
});

exports.getToken = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
        
        const token = req.body.token;
        let layout = null;
        let demographic = null;

        const tokenDoc = admin.firestore().collection('token').doc(token);
        tokenDoc.get().then((doc) => {
            if (doc.exists) {
                layout = doc.data().layout
                demographic = doc.data().demographic
                uidgen.generate()
                .then((uid: string) => {
                    admin.auth().createCustomToken(uid)
                        .then(
                            layout.forEach(test => {
                                admin.firestore().collection(test).doc(uid).set({token: token, finished: false});
                            }),
                            admin.firestore().collection('demographic').doc(uid).set({token: token, finished: false}),
                            res.status(200).send({token, uid, layout, demographic})
                        )
                })
            } else {
                res.send(404);
            }
            
        })
    })
});

exports.finishSurvey = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
         
         const token = req.body.token;
         const uid = req.body.uid;
         let layout = null;
         let demographic = null;
 
         const tokenDoc = admin.firestore().collection('token').doc(token);
         tokenDoc.get().then((doc) => {
             if (doc.exists) {
                 layout = doc.data().layout;
                 demographic = doc.data().demographic;
                 admin.firestore().collection('result').doc(uid).set({token: token});
                 admin.firestore().collection('demographic').doc(uid).update({finished: true});
                 layout.forEach(test => {
                     admin.firestore().collection(test).doc(uid).update({finished: true});
                     switch (test) {
                         case 'neo_ffi':
                            admin.firestore().collection('neo_ffi').doc(uid).get().then((neoDocProto: any) => {
                                const neoDoc = neoDocProto.data();
                                console.log(neoDoc);
                                
                                const agreeableness = (likertToNumeric(neoDoc.agreeableness.question_0, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_1, neoDoc.scale), neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_2, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.agreeableness.question_3, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_4, neoDoc.scale), neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_5, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.agreeableness.question_6, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_7, neoDoc.scale), neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_8, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.agreeableness.question_9, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_10, neoDoc.scale), neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.agreeableness.question_11, neoDoc.scale), neoDoc.scale))/12
                                
                                const conscientiousness = (likertToNumeric(neoDoc.conscientiousness.question_0, neoDoc.scale)
                                                        + likertToNumeric(neoDoc.conscientiousness.question_1, neoDoc.scale)
                                                        + negate(likertToNumeric(neoDoc.conscientiousness.question_2, neoDoc.scale), neoDoc.scale)
                                                        + likertToNumeric(neoDoc.conscientiousness.question_3, neoDoc.scale)
                                                        + likertToNumeric(neoDoc.conscientiousness.question_4, neoDoc.scale)
                                                        + negate(likertToNumeric(neoDoc.conscientiousness.question_5, neoDoc.scale), neoDoc.scale)
                                                        + likertToNumeric(neoDoc.conscientiousness.question_6, neoDoc.scale)
                                                        + likertToNumeric(neoDoc.conscientiousness.question_7, neoDoc.scale)
                                                        + negate(likertToNumeric(neoDoc.conscientiousness.question_8, neoDoc.scale), neoDoc.scale)
                                                        + likertToNumeric(neoDoc.conscientiousness.question_9, neoDoc.scale)
                                                        + negate(likertToNumeric(neoDoc.conscientiousness.question_10, neoDoc.scale), neoDoc.scale)
                                                        + likertToNumeric(neoDoc.conscientiousness.question_11, neoDoc.scale))/12
                                    
                                const extraversion  = (likertToNumeric(neoDoc.extraversion.question_0, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.extraversion.question_1, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.extraversion.question_2, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.extraversion.question_3, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.extraversion.question_4, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.extraversion.question_5, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.extraversion.question_6, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.extraversion.question_7, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.extraversion.question_8, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.extraversion.question_9, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.extraversion.question_10, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.extraversion.question_11, neoDoc.scale), neoDoc.scale))/12
                                    
                                const neuroticism  = (negate(likertToNumeric(neoDoc.neuroticism.question_0, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_1, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_2, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.neuroticism.question_3, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_4, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_5, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.neuroticism.question_6, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_7, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_8, neoDoc.scale)
                                                    + negate(likertToNumeric(neoDoc.neuroticism.question_9, neoDoc.scale), neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_10, neoDoc.scale)
                                                    + likertToNumeric(neoDoc.neuroticism.question_11, neoDoc.scale))/12
                                    
                                const openness = (negate(likertToNumeric(neoDoc.openness.question_0, neoDoc.scale), neoDoc.scale)
                                                + negate(likertToNumeric(neoDoc.openness.question_1, neoDoc.scale), neoDoc.scale)
                                                + likertToNumeric(neoDoc.openness.question_2, neoDoc.scale)
                                                + negate(likertToNumeric(neoDoc.openness.question_3, neoDoc.scale), neoDoc.scale)
                                                + negate(likertToNumeric(neoDoc.openness.question_4, neoDoc.scale), neoDoc.scale)
                                                + likertToNumeric(neoDoc.openness.question_5, neoDoc.scale)
                                                + negate(likertToNumeric(neoDoc.openness.question_6, neoDoc.scale), neoDoc.scale)
                                                + negate(likertToNumeric(neoDoc.openness.question_7, neoDoc.scale), neoDoc.scale)
                                                + likertToNumeric(neoDoc.openness.question_8, neoDoc.scale)
                                                + negate(likertToNumeric(neoDoc.openness.question_9, neoDoc.scale), neoDoc.scale)
                                                + likertToNumeric(neoDoc.openness.question_10, neoDoc.scale)
                                                + likertToNumeric(neoDoc.openness.question_11, neoDoc.scale))/12
                                
                                admin.firestore().collection('result').doc(uid).update({neo_ffi: {agreeableness: agreeableness, conscientiousness: conscientiousness, extraversion: extraversion, neuroticism: neuroticism, openness: openness, scale: neoDoc.scale}});
                            });
                            break;
                     
                         case 'mp_zm':
                            admin.firestore().collection('mp_zm').doc(uid).get().then((mpDocProto: any) => {
                                const mpDoc = mpDocProto.data();
                                const accomplishment = (likertToNumeric(mpDoc.accomplishment.question_0, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.accomplishment.question_1, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.accomplishment.question_2, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.accomplishment.question_3, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.accomplishment.question_4, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.accomplishment.question_5, mpDoc.scale))/6

                                const initiative = (likertToNumeric(mpDoc.initiative.question_0, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.initiative.question_1, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.initiative.question_2, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.initiative.question_3, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.initiative.question_4, mpDoc.scale)
                                                    + likertToNumeric(mpDoc.initiative.question_5, mpDoc.scale))/6
    
                                const might = (likertToNumeric(mpDoc.might.question_0, mpDoc.scale)
                                            + likertToNumeric(mpDoc.might.question_1, mpDoc.scale)
                                            + likertToNumeric(mpDoc.might.question_2, mpDoc.scale)
                                            + likertToNumeric(mpDoc.might.question_3, mpDoc.scale)
                                            + likertToNumeric(mpDoc.might.question_4, mpDoc.scale)
                                            + likertToNumeric(mpDoc.might.question_5, mpDoc.scale))/6

                                const repute = (likertToNumeric(mpDoc.repute.question_0, mpDoc.scale)
                                            + likertToNumeric(mpDoc.repute.question_1, mpDoc.scale)
                                            + likertToNumeric(mpDoc.repute.question_2, mpDoc.scale)
                                            + likertToNumeric(mpDoc.repute.question_3, mpDoc.scale)
                                            + likertToNumeric(mpDoc.repute.question_4, mpDoc.scale)
                                            + likertToNumeric(mpDoc.repute.question_5, mpDoc.scale))/6

                                const safety = (likertToNumeric(mpDoc.safety.question_0, mpDoc.scale)
                                            + likertToNumeric(mpDoc.safety.question_1, mpDoc.scale)
                                            + likertToNumeric(mpDoc.safety.question_2, mpDoc.scale)
                                            + likertToNumeric(mpDoc.safety.question_3, mpDoc.scale)
                                            + likertToNumeric(mpDoc.safety.question_4, mpDoc.scale)
                                            + likertToNumeric(mpDoc.safety.question_5, mpDoc.scale))/6

                                admin.firestore().collection('result').doc(uid).update({mp_zm: {accomplishment: accomplishment, initiative: initiative, might: might, repute: repute, safety: safety, scale: mpDoc.scale}});
                            });
                            break;
 
                         default:
                             break;
                     }
                 })
                 res.send(200);
             } else {
                 res.send(404);
             }
             
         })
     })
 });



function likertToNumeric(value: LikertFiveLevel | LikertThreeLevel, scale: LikertScale ) {
    switch (scale) {
        case LikertScale.LIKERT_FIVE_LEVEL:
            switch (value) {
                case LikertFiveLevel.STRONG_AGREE:
                    return 0
            
                case LikertFiveLevel.AGREE:
                    return 1
        
                case LikertFiveLevel.NEUTRAL:
                    return 2
        
                case LikertFiveLevel.DISAGREE:
                    return 3
        
                case LikertFiveLevel.STRONG_DISAGREE:
                    return 4
                default:
                    console.error("Value isn't LikertFiveLevel");
                    return undefined;   
            }
    
        case LikertScale.LIKERT_THREE_LEVEL:
            switch (value) {
                case LikertFiveLevel.AGREE:
                    return 0
        
                case LikertFiveLevel.NEUTRAL:
                    return 1
        
                case LikertFiveLevel.DISAGREE:
                    return 2
                default:
                    console.error("Value isn't LikertThreeLevel");
                    return undefined;   
            }
    }
    
}

function negate(value: number, scale: LikertScale ) {
    switch (scale) {
        case LikertScale.LIKERT_THREE_LEVEL:
            return 2-value;
    
        case LikertScale.LIKERT_FIVE_LEVEL:
            return 4-value;
    }
}
 
 
 
 
 
     
 
