import { IAnswerPayload, createAnswer, getAnswers } from "../repositories/answer.repository";

import { Answer } from "../models";

export default class AnswerController {
  public async getAnswers(): Promise<Array<Answer>> {
    return getAnswers();
  }

  public async createAnswer(body: IAnswerPayload): Promise<Answer> {
    return createAnswer(body);
  }
}
