import { Controller, Patch, Request } from '@nestjs/common';
import { MatchHandlerRepository } from './match-handler.repository';

@Controller('match')
export class MatchHandlerController {
  constructor(private readonly repository: MatchHandlerRepository) {}

  @Patch('start')
  async iniciarPareamento(@Request() { user }) {
    await this.repository.estadoDePareamento(user.id, true);

    return { message: `pareamento iniciado` };
  }

  @Patch('stop')
  async cancelarPareamento(@Request() { user }) {
    await this.repository.estadoDePareamento(user.id, false);

    return { message: `pareamento cancelado` };
  }

  @Patch('surrender')
  async seRenderEFinalizarAPartida(@Request() { user }) {
    await this.repository.encerrarPartidaComoPerdedor(user.id);

    return { message: `Você perdeu... E nem tentou, decepcionante` };
  }
}
