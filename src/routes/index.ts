import AnswerRouter from './answer.router';
import express from 'express';

const router = express.Router();

router.use("api/v1/answers", AnswerRouter);

export default router;