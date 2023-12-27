import { Request, Response } from 'express'

const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to backend')
})

app.listen(8000, () => {
    console.log(`App listening at http://localhost:${port}`);
})