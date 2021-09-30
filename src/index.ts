import express, {Application, Request, Response} from 'express';

const app: Application = express();

const PORT = process.env.PORT || 4001;

app.get('/', (_req: Request, res: Response) => {
  return res.json({message: 'welcome to live answers'});
});

app.listen(PORT, () => console.log(`Server running on: localhost:${PORT}`));