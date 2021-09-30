import faker from "faker";

export const generateAnswerData = (overide = {}) => {
  return {
    id: faker.datatype.number(),
    content: faker.lorem.text(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide,
  };
}

export const generateAnswersData = (n: number = 1, overide = {}) => {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateAnswerData({ id: i, ...overide });
    }
  );
};

export const generateAnswerPayload = () => {
  return {
    content: faker.lorem.text(),
  };
}