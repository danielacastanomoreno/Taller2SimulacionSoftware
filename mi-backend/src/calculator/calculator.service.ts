import { Injectable } from '@nestjs/common';
import { OperationDto } from './dto/operation.dto';
import { NumbersDto } from './dto/numbers.dto';
import { HistoryService } from '../history/history.service';

@Injectable()
export class CalculatorService {
  constructor(private readonly historyService: HistoryService) {}

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
    const result = number1 + number2;
    await this.historyService.saveOperation({
      operator: 'add', number1, number2, result, date: new Date().toISOString(),
    });
    return result;
  }

  async subtract(numbers: NumbersDto): Promise<number> {
    const { number1, number2 } = numbers;
    const result = number1 - number2;
    await this.historyService.saveOperation({
      operator: 'subtract', number1, number2, result, date: new Date().toISOString(),
    });
    return result;
  }

  async multiply(numbers: NumbersDto): Promise<number> {
    const { number1, number2 } = numbers;
    const result = number1 * number2;
    await this.historyService.saveOperation({
      operator: 'multiply', number1, number2, result, date: new Date().toISOString(),
    });
    return result;
  }

}