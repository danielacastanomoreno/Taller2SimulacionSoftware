import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OperationDto } from './dto/operation.dto';
import { HealthCheckDto } from './dto/health-check.dto';
import { response } from 'express';
import { HistoryService } from '../history/history.service';

@Injectable()
export class CalculatorService {
  private readonly logger = new Logger(CalculatorService.name);

  constructor(private readonly historyService: HistoryService) {}

  // OPERATIONS //

  async operate(operation: OperationDto): Promise<number> {
    const { number1, number2, operator } = operation; // Object destructuring
    let result = 0;

    // Add
    if (operator === 'add' || operator === 'sum' || operator ==='addition') {
      result = await this.add(number1, number2);
    }

    // Subtract
    if (operator === 'subtract' || operator === 'subtraction') {
      result = await this.subtract(number1, number2);
    }

    // Multiply
    if (operator === 'multiply' || operator === 'multiplication') {
      result = await this.multiply(number1, number2);
    }

    // Divide
    if (operator === 'divide' || operator === 'division') {
      result = await this.divide(number1, number2);
    }

    return result;
  }

  // Health check
  async getSystemStatus(): Promise<HealthCheckDto> {
    const process = require('process');
    // Import the filesystem module
    const fs = require('fs');
    let allowed = false;

    // Test both the read and write permissions
    fs.access(
      'history.json', // Cambiar cuando HU3 este lista y pasarle ruta de donde este el archivo .JSON para validar permisos de escritura. ¡OJO!
      fs.constants.W_OK,
      (err: any) => {
        if (err) {
          allowed = false;
        } else {
          allowed = true;
        }
      },
    );

    const result: HealthCheckDto = {
      status: response.statusCode,
      uptime: parseFloat(process.uptime()),
      permissions: allowed,
    };

    return result;
  }

  async add(number1: number, number2: number): Promise<number> {
    
    const result = number1 + number2;
    await this.historyService.saveOperation({
      operator: 'add',
      number1,
      number2,
      result,
      date: new Date().toISOString(),
    });
    return result;

  }

  async subtract(number1: number, number2: number): Promise<number> {
    
    const result = number1 - number2;
    await this.historyService.saveOperation({
      operator: 'subtract',
      number1,
      number2,
      result,
      date: new Date().toISOString(),
    });
    return result;

  }

  async multiply(number1: number, number2: number): Promise<number> {
    
    const result = number1 * number2;
    await this.historyService.saveOperation({
      operator: 'multiply',
      number1,
      number2,
      result,
      date: new Date().toISOString(),
    });
    return result;

  }

  async divide(number1: number, number2: number): Promise<number> {

    if (number2 === 0) {
      this.logger.error(
        `Division by zero rejected: number1=${number1}, number2=${number2}`,
      );
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'No es posible dividir entre cero.',
      });
    }

    const result = number1 / number2;
    await this.historyService.saveOperation({
      operator: 'divide',
      number1,
      number2,
      result,
      date: new Date().toISOString(),
    });
    return result;
  }
}
