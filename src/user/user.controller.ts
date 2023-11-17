import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import {
  RequestChangePasswordUserDTO,
  RequestExistsEmailDTO,
  RequestUpdateUserDTO,
  RequestUserCreateDTO,
  ResponseUserItemDTO,
  ResponseUserUpdateDTO,
} from './dto';

@ApiTags('USER')
@Controller('api/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ResponseUserItemDTO })
  async getProfile(@Request() req) {
    return this.service.getProfile(req);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ type: String, name: 'id' })
  @ApiBody({ type: RequestUpdateUserDTO })
  @ApiCreatedResponse({ type: ResponseUserUpdateDTO })
  async updateOne(@Param('id') id, @Body() body: RequestUpdateUserDTO) {
    return this.service.updateOne(id, body);
  }

  @Patch('/change/password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: RequestChangePasswordUserDTO })
  @ApiCreatedResponse({ type: ResponseUserUpdateDTO })
  async updatePassword(@Request() req, @Body() body: RequestChangePasswordUserDTO) {
    return this.service.changePassword(req.user.email, body.password);
  }

  @Post('/signup')
  @ApiBody({ type: RequestUserCreateDTO })
  @ApiCreatedResponse({ type: RequestUserCreateDTO })
  async register(@Body() req: RequestUserCreateDTO) {
    return this.service.insert(req);
  }
}
