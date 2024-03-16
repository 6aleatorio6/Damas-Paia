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
      const AlterValido = erroAlterado && ErrosCode[erroAlterado[0]] === e.code;
      const existeMsgDoErro = this.errosComuns[e.code] || AlterValido;

      if (isErrorPrisma && existeMsgDoErro) {
        // se o erro é o  erro alterado e se n, usar msg dos erro comuns
        const msg = AlterValido ? erroAlterado[1] : this.errosComuns[e.code];

        throw new BadRequestException(msg);
      }

      console.error(e);

      throw e;
    }
  }
}
