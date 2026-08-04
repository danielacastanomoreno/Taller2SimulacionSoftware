"use client"; // Enables client-side rendering for this component

import { useState } from "react";
import { appStatus } from "@/hooks/calculator";
import { Label } from "@radix-ui/react-label";

const Status = async () => {
  
  const [result, setResult] = useState<string>("");

  // Application status
  const appStatusSystem = async (): Promise<void> => {
    try {
      const res = await appStatus();
      setResult("" + res);
    } catch (error) {
      setResult("An error ocurred.");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="result">Result</Label>
      <h1>{result}</h1>
    </div>
  );

}

export default Status;