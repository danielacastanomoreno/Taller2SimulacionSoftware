import { Injectable } from '@nestjs/common';
import { OperationDto } from './dto/operation.dto';

@Injectable()
export class CalculatorService {
  constructor() {}

  // OPERATIONS //

  async operate(operation: OperationDto): Promise<Number> {

    const { number1, number2, operator } = operation; // Object destructuring
    let result = 0;

    
    // Add
    if (operator === 'add') {
      result = number1 + number2;
    }

    // Substract

    return result;

  }

}