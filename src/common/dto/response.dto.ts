import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommon {
  @ApiProperty()
  created?: Date;

  @ApiProperty()
  updated?: Date;
}
