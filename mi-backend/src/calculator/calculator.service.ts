import { Injectable } from '@nestjs/common';
import { OperationDto } from './dto/operation.dto';
import { HealthCheckDto } from './dto/health-check.dto';
import { response } from 'express';
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

  // Health check
  async getSystemStatus(): Promise<HealthCheckDto> {
    const process = require('process');
    // Import the filesystem module
    const fs = require('fs');
    let allowed = false;

    // Test both the read and write permissions
    fs.access(
      './src/persistency/persistent.json', // Cambiar cuando HU3 este lista y pasarle ruta de donde este el archivo .JSON para validar permisos de escritura. ¡OJO!
      fs.constants.W_OK,
      (err: any) => {
        if (err){
          allowed = false;
        }  
        else {
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