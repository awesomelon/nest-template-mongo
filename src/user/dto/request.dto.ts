import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestUserCreateDTO {
  @ApiProperty({ required: true, description: 'PV User Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, description: 'PV User Password' })
  password: string;

  @ApiProperty({ required: false, description: 'PV User Name' })
  username?: string;
}

export class RequestExistsEmailDTO extends PickType(RequestUserCreateDTO, ['email']) {}

export class RequestUpdateUserDTO extends PickType(RequestUserCreateDTO, ['username']) {}

export class RequestChangePasswordUserDTO extends PickType(RequestUserCreateDTO, ['password']) {}
