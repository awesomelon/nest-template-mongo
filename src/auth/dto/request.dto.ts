// core
import { ApiProperty } from '@nestjs/swagger';

// lib
import { IsNotEmpty } from 'class-validator';

export class RequestLoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
