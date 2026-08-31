import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class OperationDto {

  @IsNumber()
  @IsNotEmpty()
  readonly number1: number;

  @IsNumber()
  @IsNotEmpty()
  readonly number2: number;

  @IsString()
  @IsNotEmpty()
  readonly operator: string;

}