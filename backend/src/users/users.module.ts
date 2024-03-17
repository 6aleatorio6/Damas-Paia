import { Module, ModuleMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { HelpersShared } from 'src/shared/helpers.service';
import { PrismaHelper } from 'src/shared/prisma.helper';
import { MatchHandlerModule } from 'src/match-handler/match-handler.module';

export const config: ModuleMetadata = {
  imports: [MatchHandlerModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
    HelpersShared,
    PrismaHelper,
  ],
  exports: [UsersRepository],
};

@Module(config)
export class UsersModule {}
