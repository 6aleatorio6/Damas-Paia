import { Module, ModuleMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersRepository } from './users.repository';
import { PairingModule } from 'src/pairing/pairing.module';
import { SharedModule } from 'src/shared/shared.module';
import { UsersController } from './users.controller';

export const config: ModuleMetadata = {
  imports: [PairingModule, SharedModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersRepository],
};

@Module(config)
export class UsersModule {}
