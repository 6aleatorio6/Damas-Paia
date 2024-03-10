import { Module } from '@nestjs/common';
import { PairingService } from './pairing.service';
import { PairingController } from './pairing.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaService } from 'src/prisma.service';
import { PairingRepository } from './pairing.repository';
import { CriarPtsService } from './criarPts.service';

@Module({
  imports: [SharedModule],
  controllers: [PairingController],
  providers: [
    PairingService,
    PrismaService,
    PairingRepository,
    CriarPtsService,
  ],
  exports: [PairingService],
})
export class PairingModule {}
