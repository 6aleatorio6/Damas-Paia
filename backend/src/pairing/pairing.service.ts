import { Injectable } from '@nestjs/common';
import { PairingRepository } from './pairing.repository';

@Injectable()
export class PairingService {
  constructor(private pairingRepository: PairingRepository) {}

  async userPareamento(id: number, iniciar: boolean) {
    await this.pairingRepository.pareamentoDoUser(id, iniciar);

    return { message: `pareamento ${iniciar ? 'iniciado' : 'cancelado'}` };
  }

  async verificarEstadoDoPareamento(id: number) {
    const { inicioDoPareamento, jogador } =
      await this.pairingRepository.userPairing(id);

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
}
