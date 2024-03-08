import { Module } from '@nestjs/common';
import { PairingService } from './pairing.service';
import { PairingController } from './pairing.controller';
import { UsersModule } from 'src/users/users.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [UsersModule, SharedModule],
  controllers: [PairingController],
  providers: [PairingService],
})
export class PairingModule {}
