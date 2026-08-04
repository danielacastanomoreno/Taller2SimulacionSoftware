import { IsNotEmpty, IsNumber } from 'class-validator';

export class NumbersDto {
  @IsNumber()
  @IsNotEmpty()
  readonly number1: number;

  @IsNumber()
  @IsNotEmpty()
  readonly number2: number;
}
