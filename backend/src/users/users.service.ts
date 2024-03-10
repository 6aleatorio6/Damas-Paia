import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { userProfileDto } from './dto/userProfile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async profile(id: number): Promise<userProfileDto> {
    const { senhaHash, ...profile } = await this.usersRepository.findOneId(id);

    senhaHash; // inutil aq
    return profile;
  }

  async attUltimaVezOnlineDoUser(id: number) {
    return await this.usersRepository.updateId(id, {
      ultimaVezOnline: new Date(),
    });
  }
}
