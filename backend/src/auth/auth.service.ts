import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(nomeLogin: string, senhaLogin: string): Promise<Payload> {
    const { senhaHash, nomeDeUsuario, id } =
      await this.usersRepository.findOneNome(nomeLogin);

    if (senhaHash && bcrypt.compare(senhaLogin, senhaHash)) {
      return <Payload>{ nomeDeUsuario, id };
    }

    return null;
  }

  async login(payload: Payload) {
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async cadastrarConta(nome: string, senha: string) {
    return await this.usersRepository.create({
      nomeDeUsuario: nome,
      senhaHash: await this.gerarHashSenha(senha),
    });
  }

  async cadastrarGuest() {
    let guest: usuario;

    //se o nome acabar sendo igual ele vai tentar dnv com outro
    for (let i = 0; i < 5; i++) {
      guest = await this.usersRepository.create({
        nomeDeUsuario: 'aleatorioPaia' + this.numeroAleatorio,
        senhaHash: await this.gerarHashSenha(this.numeroAleatorio.toString()),
      });

      if (guest) break;
    }

    return guest;
  }

  private async gerarHashSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 13);
  }

  private get numeroAleatorio(): number {
    return Math.floor(Math.random() * 10000);
  }
}
