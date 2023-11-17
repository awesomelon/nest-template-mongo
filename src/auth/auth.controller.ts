import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard';
import { RequestLoginDTO } from './dto/request.dto';
import { ResponseLoginDTO } from './dto/response.dto';

@ApiTags('AUTH')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: RequestLoginDTO })
  @ApiCreatedResponse({ type: ResponseLoginDTO })
  async login(@Body() body: RequestLoginDTO) {
    return this.service.login(body);
  }
}
