import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

interface ErroInfo {
  code: keyof typeof ErrosPrisma;
  msg?: string;
}

enum ErrosPrisma {
  unique = 'P2002',
  findOrThrow = 'P2025',
}

const errosPadrao: ErroInfo[] = [
  { code: 'unique', msg: 'O valor desse campo unico já existe' },
  { code: 'findOrThrow', msg: 'Nâo encontrado' },
];

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async tratarErros<T>(
    chamada: Promise<T>,
    addErros = errosPadrao,
  ): Promise<T> {
    try {
      return await chamada;
    } catch (e: unknown) {
      const oErroEDoPrisma = e instanceof Prisma.PrismaClientKnownRequestError;

      for (const erroInfo of addErros) {
        if (oErroEDoPrisma && e.code === ErrosPrisma[erroInfo.code]) {
          throw new BadRequestException(erroInfo.msg);
        }
      }

      console.error(e);

      throw e;
    }
  }
}
