import { ax } from "@/utils/axiosConfig";

export const addNumbers = async (
  number1: number,
  number2: number,
) => {

  const res = await ax.post(`/calculator/add`, {
    number1: number1,
    number2: number2,
  });

  const result = res.data;
  return result;

};