// seed/user.seed.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class UserSeedService {
  constructor(private readonly userService: UsersService) {}

  async seed() {
    await this.userService.seed();
  }
}
