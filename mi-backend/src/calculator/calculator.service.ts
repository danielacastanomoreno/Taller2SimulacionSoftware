import { Injectable } from '@nestjs/common';
import { OperationDto } from './dto/operation.dto';

@Injectable()
export class CalculatorService {

    constructor() {}


    // OPERATIONS //

    // Add
    async add(operation: OperationDto): Promise<Number> {

        const {number1, number2} = operation; // Object destructuring
        
        const result = number1 + number2;

        return result;

    }




}
