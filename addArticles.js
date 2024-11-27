const db = require('./firebaseAdmin');
const fs = require('fs');

const addArticles = async () => {
  const articles = JSON.parse(fs.readFileSync('path/to/your/articles.json', 'utf8'));

  const batch = db.batch(); // Utiliser un batch pour des écritures groupées
  articles.forEach((article) => {
    const docRef = db.collection('articles').doc(article.code); // Utiliser le code comme ID
    batch.set(docRef, article);
  });

  await batch.commit();
  console.log('Articles ajoutés avec succès !');
};

addArticles().catch(console.error);