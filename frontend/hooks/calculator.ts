import { ax } from "@/utils/axiosConfig";

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

export const appStatus = async (
) => {
  const res = await ax.get(`calculator/health`);
  console.log(res);

  const result = res.data;
  return result;
};