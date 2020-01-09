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

        const tokenDoc = admin.firestore().collection('token').doc(token);
        tokenDoc.get().then((doc) => {
            if (doc.exists) {
                layout = doc.data().layout
                uidgen.generate()
                .then((uid: string) => {
                    admin.auth().createCustomToken(uid)
                        .then(
                            res.status(200).send({token, uid, layout})
                        )
                })
            } else {
                res.send(404);
            }
            
        })
    })
});

    

