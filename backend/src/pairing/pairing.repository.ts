import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaHelper } from 'src/shared/prisma.helper';

export interface Peca {
  co_X: number;
  co_Y: number;
}

@Injectable()
export class PairingRepository {
  constructor(
    private prisma: PrismaService,
    private prismaHelper: PrismaHelper,
  ) {}

  async findAllPairing() {
    const dataPrisma = this.prisma.usuario.findMany({
      select: { id: true },
      where: { inicioDoPareamento: { not: null } },
      orderBy: { inicioDoPareamento: 'asc' },
    });

    return await this.prismaHelper.tratarErros(dataPrisma);
  }

  async userPairing(id: number) {
    const dataPrisma = this.prisma.usuario.findFirstOrThrow({
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

    return await this.prismaHelper.tratarErros(dataPrisma);
  }

  async pareamentoDoUser(id: number, iniciar: boolean) {
    const dataPrisma = this.prisma.usuario.update({
      select: { inicioDoPareamento: true },
      where: { id },
      data: {
        inicioDoPareamento: iniciar ? new Date() : null,
      },
    });

    return await this.prismaHelper.tratarErros(dataPrisma);
  }

  async createJogador(usuario_id: number, pecas: Peca[]) {
    const dataPrisma = this.prisma.jogador.create({
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

    return await this.prismaHelper.tratarErros(dataPrisma);
  }

  async createPartida(userId1: number, userId2: number) {
    const dataPrisma = this.prisma.partida.create({
      data: {
        vez: userId1,
        jogador_jogador_partida_idTopartida: {
          connect: [{ id: userId1 }, { id: userId2 }],
        },
      },
    });

    return await this.prismaHelper.tratarErros(dataPrisma);
  }
}
