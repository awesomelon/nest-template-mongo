// core
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// constants
import { jwtConstants } from '../consts';

// lib
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
