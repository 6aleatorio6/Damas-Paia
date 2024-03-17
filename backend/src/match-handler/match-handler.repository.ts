import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaHelper } from 'src/shared/prisma.helper';

export interface Peca {
  co_X: number;
  co_Y: number;
}

@Injectable()
export class MatchHandlerRepository {
  constructor(
    private prisma: PrismaService,
    private prismaHelper: PrismaHelper,
  ) {}

  async estadoDePareamento(id: number, ligado: boolean) {
    const dataPrisma = this.prisma.usuario.update({
      select: { inicioDoPareamento: true },
      where: { id },
      data: {
        inicioDoPareamento: ligado ? new Date() : null,
      },
    });

    return await this.prismaHelper.tratarErros(dataPrisma);
  }

  async jogadorEmPartidaPeloUserId(id: number) {
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

  async criarPartida(userId1: number, userId2: number) {
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

  async criarJogadorESuasPecas(usuario_id: number, pecas: Peca[]) {
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

  async pararPareamentoDeUsersOffline() {
    const dataPrisma = this.prisma.usuario.updateMany({
      where: {
        inicioDoPareamento: { not: null },
        ultimaVezOnline: { lte: new Date(Date.now() - 1000 * 60 * 5) },
      },
      data: { inicioDoPareamento: null },
    });

    return await this.prismaHelper.tratarErros(dataPrisma);
  }

  async todosQueEstaoPareando() {
    const dataPrisma = this.prisma.usuario.findMany({
      select: { id: true },
      where: { inicioDoPareamento: { not: null } },
      orderBy: { inicioDoPareamento: 'asc' },
    });

    return await this.prismaHelper.tratarErros(dataPrisma);
  }

  async encerrarPartidaComoPerdedor(userId: number) {
    // const dataPrisma = this.prisma.$queryRaw`
    //     update partida p
    //         join jogador j on j.partida_id = p.id
    //             join usuario u on j.usuario_id = u.id
    //     set p.endDate = now(), p.vencedor = (
    //                                           select id
    //                                           from jogador j2
    //                                           where j2.id != j.id and j2.partida_id = p.id
    //                                         )
    //     where endDate is null  and u.id = ${300}
    // `;

    const adversario = await this.prismaHelper.tratarErros(
      this.prisma.jogador.findFirstOrThrow({
        select: { id: true, partida_id: true },
        where: {
          usuario_id: { not: userId },
          partida_jogador_partida_idTopartida: {
            endDate: null,
          },
        },
      }),
      ['findOrThrow', 'Vocẽ não está em partida'],
    );

    console.log(adversario);

    const dataPrisma = await this.prisma.partida.update({
      where: { id: adversario.partida_id },
      data: {
        vencedor: adversario.id,
        endDate: new Date(),
      },
    });

    return await this.prismaHelper.tratarErros(dataPrisma);
  }
}
