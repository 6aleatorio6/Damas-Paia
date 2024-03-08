import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelpersShared {
  get numeroAleatorio(): number {
    return Math.floor(Math.random() * 10000);
  }

  async gerarHashSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 13);
  }

  async tentarDnvSeDerErro<T>(cb: () => T, tentarQntsVezes = 5): Promise<T> {
    for (let i = 0; i < tentarQntsVezes; i++) {
      try {
        return await cb();
      } catch (error) {
        console.error(error);
      }
    }
  }

  respostaPadrao(message: string) {
    return {
      message,
    };
  }
}
