"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('welcome to backend');
});
app.listen(8000, () => {
    console.log(`App listening at localhost:${port}`);
    console.log("bruh");
});
