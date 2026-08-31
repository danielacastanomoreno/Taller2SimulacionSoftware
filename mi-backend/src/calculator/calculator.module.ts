import { Module } from '@nestjs/common';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [HistoryModule],
  controllers: [CalculatorController],
  providers: [CalculatorService],
  exports: [CalculatorService],
})
export class CalculatorModule {}
