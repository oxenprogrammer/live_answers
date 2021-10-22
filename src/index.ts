import "reflect-metadata";

import express, {Application, Request, Response} from 'express';

import Router from './routes'
import cors from 'cors';
import { createConnection } from "typeorm";
import dbConfig from "./config/database";
import morgan from 'morgan';

const PORT = process.env.PORT || 4001;

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app: Application = express();

app.get('/', (_req: Request, res: Response) => {
  return res.json({message: 'Welcome to live answers'});
})

app.use(cors(options));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });