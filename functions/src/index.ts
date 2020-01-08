const functions = require('firebase-functions');
const  uidgenerator = require('uid-generator');

const admin = require ('firebase-admin');

const uidgen = new uidgenerator(); // Default is a 128-bit UID encoded in base58
 
admin.initializeApp({
    serviceAccountId: 'quaerere-app@appspot.gserviceaccount.com',
    ...functions.config().firebase,
});

exports.getToken = functions.https.onRequest((request, response) => {
    const token = request.query.token;
    const tokenDoc = admin.firestore().collection('token').doc(token);
    tokenDoc.get().then((doc) => {
        if (doc.exists) {
            uidgen.generate()
            .then((uid: string) => {
                admin.auth().createCustomToken(uid)
                    .then(
                        response.send({uid, doc})
                    )
            })
        } else {
            response.send(404);
        }
        
    })
});

    

