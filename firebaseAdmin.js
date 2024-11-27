   // firebaseAdmin.js
   const admin = require('firebase-admin');
   const serviceAccount = require('./chemin/vers/votre/serviceAccountKey.json');

   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: 'https://blog-632d4.firebaseio.com'
   });

   const db = admin.firestore();
   module.exports = db;