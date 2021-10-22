import * as AnswerRepository from './answer.repository';

import { generateAnswerData, generateAnswerPayload, generateAnswersData } from '../../test/utils/generate';
import { getRepository } from 'typeorm';
import { mocked } from "ts-jest/utils";

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));

beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.save.mockClear();
});

describe('AnswerRepository', () => {
  describe('getAnswers', () => {
    it('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([]);
      const answers = await AnswerRepository.getAnswers();

      expect(answers).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledWith({
        order: {
            createdAt: "DESC",
        },
      });
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });

    it('should return answer array', async () => {
      const answersData = generateAnswersData(2);
      mockedGetRepo.find.mockResolvedValue(answersData);
      const answers = await AnswerRepository.getAnswers();

      expect(answers).toEqual(answersData);
      expect(mockedGetRepo.find).toHaveBeenCalledWith({
        order: {
            createdAt: "DESC",
        },
      });
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    })
  });

  describe('createAnswer', () => {
    it('should add answer to database', async () => {
      const payload = generateAnswerPayload();
      const answerData = generateAnswerData(payload);
      mockedGetRepo.save.mockResolvedValue(answerData);
      const answer = await AnswerRepository.createAnswer(payload);

      expect(answer).toMatchObject(payload);
      expect(answer).toEqual(answerData);
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
    })
  })
});