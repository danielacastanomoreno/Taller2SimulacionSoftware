"use client";

import { useEffect, useState } from "react";
import { appStatus } from "@/hooks/calculator";
import { CardHeader, CardTitle } from "../ui/card";

const Status = () => {
  const [result, setResult] = useState<string>("Loading...");

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const status = await appStatus();
        setResult(JSON.stringify(status));
      } catch (error) {
        setResult("An error ocurred.");
      }
    };

    loadStatus();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Health Checks</CardTitle>
      </CardHeader>
      {result}
    </div>
  );
};

export default Status;
