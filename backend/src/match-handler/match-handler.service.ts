import { Injectable } from '@nestjs/common';
import { MatchHandlerRepository, Peca } from './match-handler.repository';
import { HelpersShared } from 'src/shared/helpers.service';

@Injectable()
export class MatchHandlerService {
  constructor(
    private readonly repository: MatchHandlerRepository,
    private readonly helpers: HelpersShared,
  ) {}

  async verificarEstadoDoPareamento(id: number) {
    const { inicioDoPareamento, jogador } =
      await this.repository.jogadorEmPartidaPeloUserId(id);

    let resposta: { status: number; message: string };

    if (jogador[0]) {
      resposta = { status: 2, message: 'em partida' };
    } else if (inicioDoPareamento) {
      resposta = { status: 1, message: 'pareando' };
    } else {
      resposta = { status: 0, message: 'não pareando' };
    }

    return resposta;
  }

  criarPecasDoJogador(isComecoDoTabuleiro: boolean) {
    const pecas: Peca[] = [];

    this.helpers.forDeMatriz([3, 4], (xDaMatriz, yDaMatriz) => {
      const co_Y = isComecoDoTabuleiro ? yDaMatriz : 8 - yDaMatriz;
      const co_X = isComecoDoTabuleiro ? xDaMatriz * 2 + 1 : 8 - xDaMatriz * 2;

      pecas.push({ co_X, co_Y });
    });

    return pecas;
  }

  async criarUmaPartida(userId1: number, userId2: number) {
    const player1 = await this.repository.criarJogadorESuasPecas(
      userId1,
      this.criarPecasDoJogador(true),
    );
    const player2 = await this.repository.criarJogadorESuasPecas(
      userId2,
      this.criarPecasDoJogador(false),
    );

    return await this.repository.criarPartida(player1.id, player2.id);
  }
}
