import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { comparePassword } from '../utils/auth.utils';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  /**
   *
   * validate user by email and password and return user if it's valid or null if it's not
   */
  async validate(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   *
   * Login user and return access token
   */
  async login(loginDto: LoginDto) {
    const user = await this.validate(loginDto.username, loginDto.password);
    return {
      access_token: this.jwtService.sign(
        {
          sub: user.id,
        },
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      user: user,
    };
  }
  /**
   * Register user
   */
  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
