import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateTaskDto {
  @Optional()
  @IsString()
  name: string;

  @Optional()
  @IsString()
  description: string;
}
