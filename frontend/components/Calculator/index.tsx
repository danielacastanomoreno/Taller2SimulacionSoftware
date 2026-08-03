"use client"; 
import { useState, ChangeEvent } from "react";
//import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
//import { Label } from "@/components/ui/label";
//import { Input } from "@/components/ui/input";
//import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { addNumbers } from "@/hooks/calculator";


const router = useRouter();

// State changes
const [number1, setNumber1] = useState<number>(0);
const [number2, setNumber2] = useState<number>(0);
const [result, setResult] = useState<number>(0);


const handleNumber1Change = (e: number): void => {
  setNumber1(e);
};

// CALLS TO BACKEND //

// Add numbers
const add = async () => {

    try {
        const res = await addNumbers(number1, number2);
    }
    catch(error) {
        setResult(-100);
    }
};

