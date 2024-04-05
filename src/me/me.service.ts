import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MeService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    return this.userRepository.update(id, updateProfileDto);
  }

  deleteAccount(id: string) {
    return this.userRepository.softDelete(id);
  }

  getProfile(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'username', 'phone'],
    });
  }
}
