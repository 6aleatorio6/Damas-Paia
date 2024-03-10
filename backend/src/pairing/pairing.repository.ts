import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export interface Peca {
  co_X: number;
  co_Y: number;
}

@Injectable()
export class PairingRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPairing() {
    return await this.prisma.usuario.findMany({
      select: { id: true },
      where: { inicioDoPareamento: { not: null } },
      orderBy: { inicioDoPareamento: 'asc' },
    });
  }

  async userPairing(id: number) {
    return await this.prisma.usuario.findFirst({
      select: {
        id: true,
        inicioDoPareamento: true,
        jogador: {
          select: { partida_id: true },
          where: {
            partida_jogador_partida_idTopartida: {
              endDate: null,
            },
          },
        },
      },
      where: { id },
    });
  }

  async pareamentoDoUser(id: number, iniciar: boolean) {
    return await this.prisma.usuario.update({
      select: { inicioDoPareamento: true },
      where: { id },
      data: {
        inicioDoPareamento: iniciar ? new Date() : null,
      },
    });
  }

  async createJogador(usuario_id: number, pecas: Peca[]) {
    return await this.prisma.jogador.create({
      select: { id: true },
      data: {
        usuario_id,
        peca: {
          createMany: {
            data: pecas,
          },
        },
      },
    });
  }

  async createPartida(userId1: number, userId2: number) {
    return await this.prisma.partida.create({
      data: {
        vez: userId1,
        jogador_jogador_partida_idTopartida: {
          connect: [{ id: userId1 }, { id: userId2 }],
        },
      },
    });
  }
}
