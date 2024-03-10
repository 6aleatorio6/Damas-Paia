import { Controller, Patch, Request } from '@nestjs/common';
import { PairingService } from './pairing.service';

@Controller('pairing')
export class PairingController {
  constructor(private readonly pairingService: PairingService) {}

  @Patch('start')
  async iniciarPareamento(@Request() { user }) {
    return await this.pairingService.userPareamento(user.id, true);
  }

  @Patch('stop')
  async cancelarPareamento(@Request() { user }) {
    return await this.pairingService.userPareamento(user.id, false);
  }
}
