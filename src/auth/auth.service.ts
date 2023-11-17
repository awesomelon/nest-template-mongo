import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { errorException } from 'src/utils';

import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema';
import { jwtConstants } from './consts';
import { RequestLoginDTO } from './dto/request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.validateUser(email);

    if (!user) {
      return errorException(404, '존재하지 않는 이메일입니다. 이메일을 확인해 주세요.');
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && !isMatch) {
      return errorException(403, '비밀번호를 확인해주세요.');
    }

    return user || null;
  }

  async login(data: RequestLoginDTO) {
    const { email } = data;
    const token = await this.checkJwtToken(email);
    return token;
  }

  async checkJwtToken(email: string): Promise<{ access_token: string }> {
    let token = {
      access_token: this.jwtService.sign(
        { email },
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expiresIn,
        }
      ),
    };

    return token;
  }
}
