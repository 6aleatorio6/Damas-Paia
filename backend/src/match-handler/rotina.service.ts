import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { MatchHandlerRepository } from './match-handler.repository';
import { MatchHandlerService } from './match-handler.service';

@Injectable()
export class MatchHandlerRotina {
  constructor(
    private readonly repository: MatchHandlerRepository,
    private readonly service: MatchHandlerService,
  ) {}

  @Interval(4000)
  async parearUsersEIniciarPartida() {
    await this.repository.pararPareamentoDeUsersOffline();

    const users = await this.repository.todosQueEstaoPareando();
    const tamanhoDaFila = users.length;

    if (tamanhoDaFila <= 1) return 'sem player suficiente para uma partida';

    const qntdDePares = Math.floor(tamanhoDaFila / 2); // o floor é para lidar com numeros impar
    for (let i = 1; i <= qntdDePares; i++) {
      const user1Id = users[i - 1].id;
      const user2Id = users[i].id;

      await this.service.criarUmaPartida(user1Id, user2Id);

      this.repository.estadoDePareamento(user1Id, false);
      this.repository.estadoDePareamento(user2Id, false);
    }
  }
}
