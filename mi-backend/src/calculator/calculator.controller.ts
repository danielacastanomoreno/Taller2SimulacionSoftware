import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { OperationDto } from './dto/operation.dto';
import { HealthCheckDto } from './dto/health-check.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  public addNumbers(@Body() operatioDto: OperationDto): Promise<number> {
    return this.calculatorService.operate(operatioDto);
  }

  @Get('health')
  public getSystemStatus(): Promise<HealthCheckDto> {
    return this.calculatorService.getSystemStatus();
  }
}
