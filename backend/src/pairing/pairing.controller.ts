import { Controller, Get, Request } from '@nestjs/common';
import { PairingService } from './pairing.service';

@Controller('pairing')
export class PairingController {
  constructor(private readonly pairingService: PairingService) {}

  @Get('start')
  async iniciarPareamento(@Request() { user }) {
    return await this.pairingService.abrirUserParaPareamento(user.id);
  }

  @Get('stop')
  async cancelarPareamento(@Request() { user }) {
    return await this.pairingService.fecharUserParaPareamento(user.id);
  }
}
