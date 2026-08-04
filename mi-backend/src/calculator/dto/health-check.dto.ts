import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class HealthCheckDto {

  @IsString()
  @IsNotEmpty()
  readonly status: number;

  @IsNumber()
  @IsNotEmpty()
  readonly uptime: number;

  @IsString()
  @IsNotEmpty()
  readonly permissions: boolean;

}