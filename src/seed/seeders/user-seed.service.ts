// seed/user.seed.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { OnDev } from '../../decorators/on-dev.decorator';

@Injectable()
export class UserSeedService {
  constructor(private readonly userService: UsersService) {}

  @OnDev()
  async seed() {
    await this.userService.seed();
  }
}
