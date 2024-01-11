import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { BasicAuth } from "./middleware/middleware";
import * as fs from 'fs/promises';
import * as path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('manage', BasicAuth);
app.use('/', express.static(__dirname + '/frontend'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/files', async (req, res, next) => {
    const files = (await fs.readdir('./uploads')).filter(fileName => !fileName.startsWith('.'));
    res.send({ files })
    next();
});

app.post('/upload', async (req, res, next) => {
    console.log(req);
    // todo
    next();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});