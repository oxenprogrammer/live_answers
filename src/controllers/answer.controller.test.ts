import * as AnswerRepository from '../repositories/answer.repository';

import { generateAnswerData, generateAnswerPayload, generateAnswersData } from "../../test/utils/generate";

import AnswerController from "./answer.controller";

afterEach(() => {
  jest.resetAllMocks();
})

describe('AnswerController', () => {
  describe('getAnswers', () => {
    it('should return empty answer array', async () => {
      const spy = jest
        .spyOn(AnswerRepository, 'getAnswers')
        .mockResolvedValueOnce([]);
      const controller = new AnswerController();
      const answers = await controller.getAnswers();
      
      expect(answers).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return answer list', async () => {
      const answerList = generateAnswersData(2);

      const spy = jest
        .spyOn(AnswerRepository, 'getAnswers')
        .mockResolvedValueOnce(answerList);
      const controller = new AnswerController();
      const answers = await controller.getAnswers();
      expect(answers).toEqual(answerList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    })
  })
  
  describe('addAnswer', () => {
    it('should add answer to the database', async () => {
      const payload = generateAnswerPayload();
      const answerData = generateAnswerData(payload);
      const spy = jest
        .spyOn(AnswerRepository, "createAnswer")
        .mockResolvedValueOnce(answerData);
      const controller = new AnswerController();
      const answer = await controller.createAnswer(payload);
      expect(answer).toMatchObject(payload);
      expect(answer).toEqual(answerData);
      expect(spy).toHaveBeenLastCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});