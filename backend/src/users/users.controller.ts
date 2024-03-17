import { Controller, Get, Patch, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { MatchHandlerService } from 'src/match-handler/match-handler.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private matchHandler: MatchHandlerService,
  ) {}

  @Get('profile')
  async perfil(@Request() { user }) {
    return await this.usersService.profile(user.id);
  }

  @Patch('update-status')
  async sicronizarInfoDaConta(@Request() { user }) {
    this.usersService.attUltimaVezOnlineDoUser(user.id);

    return await this.matchHandler.verificarEstadoDoPareamento(user.id);
  }
}
