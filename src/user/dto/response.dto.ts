import { ApiProperty, PickType } from '@nestjs/swagger';
import { ResponseCommon } from 'src/common/dto';

export class ResponseUserItemDTO extends ResponseCommon {
  @ApiProperty({ required: true, description: 'User Mongo ID' })
  id: string;

  @ApiProperty({ required: true, description: 'User Email' })
  email: string;

  @ApiProperty({ required: false, description: 'User Name' })
  username: string;
}

export class ResponseUserDTO {
  items: ResponseUserItemDTO[];
  totalCount: number;
}

export class ResponseUserCreateDTO extends PickType(ResponseUserItemDTO, ['id', 'email']) {}

export class ResponseUserUpdateDTO extends PickType(ResponseUserItemDTO, ['id']) {}
