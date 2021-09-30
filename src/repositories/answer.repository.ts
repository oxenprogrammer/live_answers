import { Answer } from "../models";
import { getRepository } from "typeorm";

export interface IAnswerPayload {
  content: string;
}

export const getAnswers = async (): Promise<Array<Answer>> => {
  const answerRepository = getRepository(Answer);
  return await answerRepository.find({
    order: {
        createdAt: "DESC",
    },
});
};

export const createAnswer = async (payload: IAnswerPayload): Promise<Answer> => {
  const answerRepository = getRepository(Answer);
  const answer = new Answer();
  return await answerRepository.save({
    ...answer,
    ...payload,
  });
};
