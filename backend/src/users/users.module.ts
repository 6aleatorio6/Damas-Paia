import { Module, ModuleMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersRepository } from './users.repository';
import { PairingModule } from 'src/pairing/pairing.module';

export const config: ModuleMetadata = {
  imports: [PairingModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersRepository],
};

@Module(config)
export class UsersModule {}
