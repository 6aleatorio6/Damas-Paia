import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

enum ErrosCode {
  unique = 'P2002',
  findOrThrow = 'P2025',
}
@Injectable()
export class PrismaHelper {
  public readonly ErrosCode = ErrosCode;

  private errosComuns = {
    [ErrosCode.unique]: 'O valor desse campo unico já existe',
    [ErrosCode.findOrThrow]: 'Não encontrado',
  };

  public async tratarErros<T>(
    chamada: T,
    erroAlterado?: [keyof typeof ErrosCode, string],
  ): Promise<T> {
    try {
      return await chamada;
    } catch (e) {
      const isErrorPrisma = e instanceof Prisma.PrismaClientKnownRequestError;
      const existeMsgDoErro =
        this.errosComuns[e.code] || ErrosCode[erroAlterado[0]] === e.code;

      if (isErrorPrisma && existeMsgDoErro) {
        // se o erro é o  erro alterado e se n, usar msg dos erro comuns
        const msg =
          erroAlterado && ErrosCode[erroAlterado[0]] === e.code
            ? erroAlterado[1]
            : this.errosComuns[e.code];

        throw new BadRequestException(msg);
      }

      console.error(e);

      throw e;
    }
  }
}
