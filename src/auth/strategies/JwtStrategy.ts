import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your environment
    });
  }
  async validate(payload: any) {
    // Payload is the JWT claims. Return the user object or claims you want to be available in request.user
    return { userId: payload.id, email: payload.username };
  }
}
