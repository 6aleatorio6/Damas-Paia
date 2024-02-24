import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { usuario } from '@prisma/client';
import { UserAuthDto } from './dto/auth.dto';
import { PayloadDto } from './dto/payload.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userAuth: UserAuthDto): Promise<PayloadDto> {
    const user = await this.usersRepository.findOneNome(userAuth.nomeDeUsuario);

    if (user && bcrypt.compare(userAuth.senha, user.senhaHash)) {
      const { nomeDeUsuario, id } = user;

      return <PayloadDto>{ nomeDeUsuario, id };
    }

    return null;
  }

  async login(payload: PayloadDto) {
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async cadastrarConta({ nomeDeUsuario, senha }: UserAuthDto) {
    return await this.usersRepository.create({
      nomeDeUsuario,
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
