import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { MeService } from './me.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../decorators/current-user.decorator';
import { BearAuthToken } from '../decorators/BearerAuth.decorator';

@Controller({ path: 'me', version: '1' })
@ApiBearerAuth()
@BearAuthToken()
@ApiTags('Me/Profile')
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Get()
  profile(@CurrentUser('userId') userId: string) {
    return this.meService.getProfile(userId);
  }

  @Patch()
  updateProfile(
    @CurrentUser('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.meService.updateProfile(userId, updateProfileDto);
  }

  @Delete()
  deleteAccount(@CurrentUser('userId') userId: string) {
    return this.meService.deleteAccount(userId);
  }
}
