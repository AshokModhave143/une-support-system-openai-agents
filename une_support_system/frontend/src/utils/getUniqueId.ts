import { v4 as uuidv4 } from "uuid";

export const getUniqueMessageId = (): string => {
  return uuidv4();
};

export const getUniqueStudentId = (): string => {
  return uuidv4();
};

export const getUniqueSessionId = (): string => {
  return uuidv4();
};
