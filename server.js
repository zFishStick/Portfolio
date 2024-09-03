const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 3001;

const url = process.env.MONGODB_URI; // Assicurati di configurare questa variabile d'ambiente su Vercel
const dbName = 'Projects';

/* // Configura le credenziali AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1' // Regione del tuo bucket S3
});

const s3 = new AWS.S3();
const bucketName = 'pesca-games-images';  */

//app.use(express.static(path.join(__dirname, '/')));
app.use('/JavaScript', express.static(path.join(__dirname, '/JavaScript')));
app.use('/Css', express.static(path.join(__dirname, '/Css')));
app.use('/Html', express.static(path.join(__dirname, '/Html')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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
