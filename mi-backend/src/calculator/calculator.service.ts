import { Injectable } from '@nestjs/common';
import { OperationDto } from './dto/operation.dto';
import { NumbersDto } from './dto/numbers.dto';

@Injectable()
export class CalculatorService {
  constructor() {}

  // OPERATIONS //

  async operate(operation: OperationDto): Promise<number> {

    const { operator } = operation; // Object destructuring
    let result = 0;

    
    // Add
    if (operator === 'add') {
      result = await this.add(operation);
    }

    // Subtract
    if (operator === 'subtract'){
      result = await this.subtract(operation);
    }

    // Multiply
    if (operator === 'multiply' || operator === 'multiplication'){
      result = await this.multiply(operation);
    }

    return result;

  }

  async add(numbers: NumbersDto): Promise<number> {
    const { number1, number2 } = numbers;
    return number1 + number2;
  }

  async subtract(numbers: NumbersDto): Promise<number> {
    const { number1, number2 } = numbers;
    return number1 - number2;
  }

  async multiply(numbers: NumbersDto): Promise<number> {
    const { number1, number2 } = numbers;
    return number1 * number2;
  }

}
