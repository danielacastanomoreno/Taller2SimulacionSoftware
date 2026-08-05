import { ax } from "@/utils/axiosConfig";

type CalculatorNumbersRequest = {
  number1: number;
  number2: number;
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
  return result;
};

export const subtract = async (number1: number, number2: number) => {
  const res = await ax.post(`/calculator/subtract`, {
    number1,
    number2,
  } satisfies CalculatorNumbersRequest);

  const result = res.data;
  return result;
};

export const multiply = async (number1: number, number2: number) => {
  const res = await ax.post(`/calculator/multiply`, {
    number1,
    number2,
  } satisfies CalculatorNumbersRequest);

  const result = res.data;
  return result;
};
