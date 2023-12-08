import express from 'express';
import conectarDB from './config/db.js';

const app = express();

conectarDB();

app.listen(4000, () => {
    console.log('Server runniing on port 4000');
});