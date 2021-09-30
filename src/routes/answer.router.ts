import express, {Request, Response} from 'express';

import { Answer } from '../models';
import AnswerController from "../controllers/answer.controller";

const router = express.Router();

const SSE_RESPONSE_HEADER = {
  'Content-Type': 'text/event-stream',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
};

let clients: any[] = [];

const sendEventsToAll = (newAnswer: Answer) => {
  clients.forEach(client => client.res.write(`data: ${JSON.stringify(newAnswer)}\n\n`))
}


router.get("/", async (req: Request, res: Response) => {
  try {

    let page = parseInt(req.query.page as string, 10);
    let limit = parseInt(req.query.limit as string, 10);

    if (!page) {
      page = 1;
    }

    if (!limit || limit > 100) {
      limit = 100;
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const controller = new AnswerController();
    let response = await controller.getAnswers();
    response = response.slice(startIndex, endIndex);
    res.writeHead(200, SSE_RESPONSE_HEADER);

    const data = `data: ${JSON.stringify(response)}\n\n`;
    
    res.write(data);

    const clientId = Date.now();

    const newclient = {
      id: clientId,
      res
    }

    clients.push(newclient);
    
    req.on("close", function() {
      clients = clients.filter(client => client.id !== clientId);
    });

  } catch (error) {
    res.status(500).send(`Server error: ${error}`);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const answer = content.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const notAllowed = [
      'yes',
      'idontknow',
      'idonotknow',
      'thatsfine',
      'thatisfine',
      'no',
    ];
    if (content == '' || notAllowed.includes(answer)) {
      return res.status(400).json({message: 'your response is invalid, please be more specific'});
    }
    
    const controller = new AnswerController();
    const response = await controller.createAnswer(req.body);
    res.json(response);
    return sendEventsToAll(req.body);
  } catch (error) {
    res.status(500).send(`Server error: ${error}`);
  }
});

export default router;