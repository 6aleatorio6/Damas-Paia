// mok do banco de dados

import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  nomeDeUsuario: string;
}

interface Jogador {
  id: number;
  user: User;
  partida: Partida;
  cronometro: number;
}

interface Peca {
  id: number;
  jogador: Jogador;
  posicaoX: number;
  posicaoY: number;
  rainha: boolean;
  capturada: boolean;
}

interface Partida {
  id: number;
  vencedor?: Jogador;
  vez?: Jogador;
  dataInicio: Date;
  dataFim?: Date;
}

@Injectable()
export class CrudTabuleiro {
  protected users: User[] = [
    { id: 0, nomeDeUsuario: 'Paia Cabral' },
    { id: 1, nomeDeUsuario: 'Painha Cabral 2' },
  ];
  protected jogadores: Jogador[] = [];
  protected pecas: Peca[] = [];
  protected partidas: Partida[] = [];

  // métodos privados

  protected criarPecas(jogador: Jogador, lado: boolean) {
    const pecasDoJogador: Peca[] = [];

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 4; x++) {
        const posicaoY = lado ? y : 8 - y;
        const posicaoX = lado ? x * 2 + 1 : 8 - x * 2;

        pecasDoJogador.push({
          id: this.pecas.length,
          capturada: false,
          rainha: false,
          posicaoY,
          posicaoX,
          jogador,
        });
      }
    }

    return pecasDoJogador;
  }

  protected criarJogador(user: User, partida: Partida): Jogador {
    const jogador: Jogador = {
      id: this.jogadores.length + 1,
      cronometro: 0,
      partida,
      user,
    };

    this.jogadores.push(jogador);

    return jogador;
  }

  //   metodos publicos
  public iniciarPartida(): Partida {
    const partida: Partida = {
      id: this.partidas.length + 1,
      dataInicio: new Date(),
    };

    // partida
    this.partidas.push(partida);

    // jogador 1
    const j1 = this.criarJogador(this.users[0], partida);
    this.criarPecas(j1, false);
    partida.vez = j1;

    // jogador 2
    const j2 = this.criarJogador(this.users[1], partida);
    this.criarPecas(j2, true);

    //
    return partida;
  }
}
