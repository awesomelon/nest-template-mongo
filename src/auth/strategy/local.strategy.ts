// core
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// auth
import { AuthService } from '../auth.service';

// user
import { User } from 'src/user/schema/user.schema';

// lib
import { Strategy } from 'passport-local';

// utils
import { errorException } from 'src/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      return errorException(401);
    }

    return user;
  }
}
