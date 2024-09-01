const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');

const app = express();
const port = 3001;

const url = 'mongodb://localhost:27017'; // Cambia se usi un'URL diversa
const dbName = 'Projects';

// Configura le credenziali AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Usa variabili d'ambiente per maggiore sicurezza
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1' // Regione del tuo bucket S3
});

const s3 = new AWS.S3();
const bucketName = 'pesca-games-images'; // Nome del tuo bucket S3


app.use(express.static(path.join(__dirname, '../')));

// Rotta per la root per servire 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Endpoint creato automaticamente
app.get('/api/projects', async (req, res) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('projects');
        const projects = await collection.find().toArray();

        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
