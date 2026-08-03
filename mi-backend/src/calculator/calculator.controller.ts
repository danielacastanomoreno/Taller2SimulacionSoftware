import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { OperationDto } from './dto/operation.dto';

@Controller('calculator')
export class CalculatorController {

    constructor(private readonly calculatorService: CalculatorService) {}

    // Add
    @Post()
    public addNumbers(
    @Body() operatioDto: OperationDto,
    ): Promise<Number> {
        return this.calculatorService.add(operatioDto);
    }


}
