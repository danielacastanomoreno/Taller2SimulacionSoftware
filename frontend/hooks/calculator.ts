import { ax } from "@/utils/axiosConfig";

type OperationRequest = {
  number1: number;
  number2: number;
  operator: string;
};

export const add = async (
  number1: number,
  number2: number,
  operator: string,
) => {
  const res = await ax.post(`/calculator`, {
    number1: number1,
    number2: number2,
    operator: operator,
  });

  const result = res.data;
  console.log("RESULT: ", result)
  return result;
};

export const subtract = async (number1: number, number2: number, operator: string) => {
  const res = await ax.post(`/calculator`, {
    number1,
    number2,
    operator: operator,
  } satisfies OperationRequest);

  const result = res.data;
  return result;
};

export const multiply = async (number1: number, number2: number, operator: string) => {
  const res = await ax.post(`/calculator`, {
    number1,
    number2,
    operator
  });

  const result = res.data;
  return result;
};

export const divide = async (number1: number, number2: number, operator: string) => {
  const res = await ax.post(`/calculator`, {
    number1,
    number2,
    operator
  });

  const result = res.data;
  return result;
};


export const appStatus = async() => {
  const res = await ax.get('/calculator/health');
  
  const result = res.data;
  return result;

}

export type HistoryRecord = {
  operator: string;
  number1: number;
  number2: number;
  result: number;
  date: string;
};

export const getHistory = async (): Promise<HistoryRecord[]> => {
  console.log("base: ", ax.arguments);
  const res = await ax.get(`/history`);
  const result = res.data;
  return result;
};
