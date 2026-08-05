import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { OperationDto } from './dto/operation.dto';
import { NumbersDto } from './dto/numbers.dto';
import { HealthCheckDto } from './dto/health-check.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  public operateNumbers(@Body() operatioDto: OperationDto): Promise<number> {
    return this.calculatorService.operate(operatioDto);
  }

  @Post('subtract')
  public subtractNumbers(@Body() numbersDto: NumbersDto): Promise<number> {
    return this.calculatorService.subtract(numbersDto);
  }

  @Post('multiply')
  public multiplyNumbers(@Body() numbersDto: NumbersDto): Promise<number> {
    return this.calculatorService.multiply(numbersDto);
  }

  @Post('divide')
  public divideNumbers(@Body() numbersDto: NumbersDto): Promise<number> {
    return this.calculatorService.divide(numbersDto);
  }

  @Get('health')
  public getSystemStatus(): Promise<HealthCheckDto> {
    return this.calculatorService.getSystemStatus();
  }
}
