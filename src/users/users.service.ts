import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../utils/auth.utils';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const usernameUser = await this.findByUsername(createUserDto.username);
    if (usernameUser) {
      throw new UnauthorizedException('User already exists with this username');
    }
    if (createUserDto.email) {
      const emailUser = await this.findByEmail(createUserDto.email);
      console.log(emailUser);
      if (emailUser) {
        throw new UnauthorizedException('User already exists with this email');
      }
    }
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.phone = createUserDto.phone;
    user.password = await hashPassword(createUserDto.password);
    return await this.userRepository.save(user);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: [
        'id',
        'username',
        'email',
        'phone',
        'firstName',
        'lastName',
        'createdAt',
        'updatedAt',
      ],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: [
        'username',
        'email',
        'phone',
        'firstName',
        'lastName',
      ],
      select: [
        'id',
        'username',
        'email',
        'phone',
        'firstName',
        'lastName',
        'createdAt',
        'updatedAt',
      ],
      ignoreSelectInQueryParam: true,
    });
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async seed() {
    const users = [];
    for (let i = 0; i < 100; i++) {
      const user = new User();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = faker.internet.email();
      user.username = faker.internet.userName();
      user.phone = faker.phone.number();
      user.password = faker.internet.password();
      users.push(user);
    }
    await this.userRepository.save(users);
  }
}
