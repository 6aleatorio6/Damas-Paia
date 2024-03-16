import { Controller, Get, Patch, Request } from '@nestjs/common';
import { UsersService } from '../../src/users/users.service';
import { PairingService } from 'src/pairing/pairing.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private pairingService: PairingService,
  ) {}

  @Get('profile')
  async perfil(@Request() { user }) {
    return await this.usersService.profile(user.id);
  }

  @Patch('update-status')
  async sicronizarInfoDaConta(@Request() { user }) {
    this.usersService.attUltimaVezOnlineDoUser(user.id);

    return await this.pairingService.verificarEstadoDoPareamento(user.id);
  }
}
