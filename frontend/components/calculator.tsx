"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { add } from "@/hooks/calculator";

export default function Calculator() {

  const [number1, setNumber1] = useState<string>("");
  const [number2, setNumber2] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // Handle inputs

  const handleChangesNumber1 = (e: ChangeEvent<HTMLInputElement>): void => {
    setNumber1(e.target.value);
  };

  const handleChangesNumber2 = (e: ChangeEvent<HTMLInputElement>): void => {
    setNumber2(e.target.value);
  };

  // OPERATIONS //

  // Add
  const addNumbers = async () => {
    try {
      const res = await add(parseFloat(number1), parseFloat(number2), "add");
      setResult("" + res);
    } catch (error) {
      setResult("An error ocurred.");
      //setResult("" + error);
    }
  };

  // Subtract
  const subtractNumbers = (): void => {};

  // Multiply
  const multiplyNumbers = (): void => {};

  // Divide
  const divideNumbers = (): void => {};

  // Function to clear the inputs and result
  const clear = (): void => {
    setNumber1("");
    setNumber2("");
    setResult("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Bombastic Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num1">Number 1</Label>
              <Input
                id="num1"
                type="number"
                value={number1}
                onChange={handleChangesNumber1}
                placeholder="Enter a number"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num2">Number 2</Label>
              <Input
                id="num2"
                type="number"
                value={number2}
                onChange={handleChangesNumber2}
                placeholder="Enter a number"
              />
            </div>
          </div>
          {/* Buttons for arithmetic operations */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={addNumbers}
            >
              +
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={subtractNumbers}
            >
              -
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={multiplyNumbers}
            >
              *
            </Button>
            <Button
              variant="outline"
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
              onClick={divideNumbers}
            >
              /
            </Button>
          </div>
          {/* Shows the result */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="result">Result</Label>
            <Input
              id="result"
              type="text"
              value={result}
              placeholder="Result"
              readOnly
            />
          </div>
          {/* Clear button to reset inputs and result */}
          <Button variant="outline" className="w-full" onClick={clear}>
            Clear
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
