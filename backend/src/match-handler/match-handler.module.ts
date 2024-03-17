import { Module } from '@nestjs/common';
import { MatchHandlerRotina } from './rotina.service';
import { MatchHandlerController } from './match-handler.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaHelper } from 'src/shared/prisma.helper';
import { MatchHandlerService } from './match-handler.service';
import { MatchHandlerRepository } from './match-handler.repository';
import { HelpersShared } from 'src/shared/helpers.service';

@Module({
  controllers: [MatchHandlerController],
  providers: [
    MatchHandlerService,
    PrismaService,
    PrismaHelper,
    MatchHandlerRepository,
    HelpersShared,
    MatchHandlerRotina,
  ],
  exports: [MatchHandlerService],
})
export class MatchHandlerModule {}
