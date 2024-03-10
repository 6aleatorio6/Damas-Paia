import { Injectable } from '@nestjs/common';
import { HelpersShared } from 'src/shared/helpers.service';
import { PairingRepository, Peca } from './pairing.repository';
import { Interval } from '@nestjs/schedule';
import { PairingService } from './pairing.service';

@Injectable()
export class CriarPtsService {
  constructor(
    private helpers: HelpersShared,
    private pairingRepository: PairingRepository,
    private pairing: PairingService,
  ) {}

  @Interval(4000)
  async rotinaDePareamento() {
    const usersPlayer = await this.pairingRepository.findAllPairing();
    const tamanhoDaFila = usersPlayer.length;

    if (tamanhoDaFila <= 1) return 'sem player suficiente para uma partida';

    const qntdDePares = Math.floor(tamanhoDaFila / 2); // o floor é para lidar com numeros impar
    for (let i = 1; i <= qntdDePares; i++) {
      const player1 = usersPlayer[i - 1].id;
      const player2 = usersPlayer[i].id;

      this.criarUmaPartida(player1, player2);

      this.pairing.userPareamento(player1, false);
      this.pairing.userPareamento(player2, false);
    }
  }

  private async criarUmaPartida(...usersId: [number, number]) {
    const player1 = await this.pairingRepository.createJogador(
      usersId[0],
      this.criarPecasDoUser(true),
    );
    const player2 = await this.pairingRepository.createJogador(
      usersId[1],
      this.criarPecasDoUser(false),
    );

    return await this.pairingRepository.createPartida(player1.id, player2.id);
  }

  private criarPecasDoUser(isComecoDoTabuleiro: boolean) {
    const pecas: Peca[] = [];

    this.helpers.forDeMatriz([3, 4], (xDaMatriz, yDaMatriz) => {
      const co_Y = isComecoDoTabuleiro ? yDaMatriz : 8 - yDaMatriz;
      const co_X = isComecoDoTabuleiro ? xDaMatriz * 2 + 1 : 8 - xDaMatriz * 2;

      pecas.push({ co_X, co_Y });
    });

    return pecas;
  }
}
