const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_de_dechets'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie');
});

app.post('/api/createcompte', (req, res) => {
  const { nom, prenom, telephone, email, mdp, confirm_mdp } = req.body;

  if (mdp !== confirm_mdp) {
    return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' });
  }

  bcrypt.hash(mdp, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur lors du hash du mot de passe :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    const sql = 'INSERT INTO utilisateur (nom, prenom, numero, email, mdp) VALUES (?, ?, ?, ?, ?)';
    const values = [nom, prenom, telephone, email, hashedPassword];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erreur lors de l’insertion des données :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      console.log('Utilisateur créé avec succès, ID :', result.insertId);
      return res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
