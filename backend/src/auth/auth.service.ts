import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { UserAuthDto } from './dto/auth.dto';
import { PayloadDto } from './dto/payload.auth.dto';
import { HelpersShared } from 'src/shared/helpers.service';
import UserDto from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly helpers: HelpersShared,
  ) {}

  async validateUser(userAuth: UserAuthDto): Promise<PayloadDto> {
    const user = await this.usersRepository.findOneNome(userAuth.nomeDeUsuario);

    const isPassed = () => bcrypt.compareSync(userAuth.senha, user.senhaHash);

    if (user && isPassed()) {
      const { nomeDeUsuario, id } = user;

      return <PayloadDto>{ nomeDeUsuario, id };
    }

    return null;
  }

  login(payload: PayloadDto) {
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async cadastrarConta({ nomeDeUsuario, senha }: UserAuthDto) {
    return await this.usersRepository.create({
      nomeDeUsuario,
      senhaHash: await this.helpers.gerarHashSenha(senha),
    });
  }

  async cadastrarGuest(): Promise<UserDto> {
    const gerarGuest = async () => {
      return await this.usersRepository.create({
        nomeDeUsuario: 'aleatorioPaia' + this.helpers.numeroAleatorio,
        senhaHash: await this.helpers.gerarHashSenha(
          this.helpers.numeroAleatorio.toString(),
        ),
      });
    };

    return await this.helpers.tentarDnvSeDerErro(gerarGuest);
  }
}
