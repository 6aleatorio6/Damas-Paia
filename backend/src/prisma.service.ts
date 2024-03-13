import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

enum ErrosCode {
  unique = 'P2002',
  findOrThrow = 'P2025',
}

const errosComuns = {
  [ErrosCode.unique]: 'O valor desse campo unico já existe',
  [ErrosCode.findOrThrow]: 'Não encontrado',
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async tratarErros<T>(
    chamada: Promise<T>,
    erroAlterado?: [keyof typeof ErrosCode, string],
  ): Promise<T> {
    try {
      return await chamada;
    } catch (e) {
      const isErrorPrisma = e instanceof Prisma.PrismaClientKnownRequestError;
      const existeMsgDoErro =
        errosComuns[e.code] || ErrosCode[erroAlterado[0]] === e.code;

      if (isErrorPrisma && existeMsgDoErro) {
        // se o erro é o  erro alterado e se n, usar msg dos erro comuns
        const msg =
          erroAlterado && ErrosCode[erroAlterado[0]] === e.code
            ? erroAlterado[1]
            : errosComuns[e.code];

        throw new BadRequestException(msg);
      }

      console.error(e);

      throw e;
    }
  }
}
