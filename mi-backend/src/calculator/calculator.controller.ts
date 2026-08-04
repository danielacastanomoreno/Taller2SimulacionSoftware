import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { OperationDto } from './dto/operation.dto';

@Controller('calculator')
export class CalculatorController {

    constructor(private readonly calculatorService: CalculatorService) {}

    @Post()
    public operateNumbers(
    @Body() operatioDto: OperationDto,
    ): Promise<Number> {
        return this.calculatorService.operate(operatioDto);
    }

    @Get('health')
    public getSystemStatus(): Promise<string> {
        return this.calculatorService.getSystemStatus();
    }
    
}