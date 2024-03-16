import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../src/users/users.repository';
import { HelpersShared } from 'src/shared/helpers.service';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UserAuthDto } from '../../src/auth/dto/auth.dto';
import { PayloadDto } from '../../src/auth/dto/payload.auth.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  const usersRepository = {
    findOneNome: jest.fn((x) => x),
    create: jest.fn((x) => x),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn((x) => x),
          },
        },
        {
          provide: UsersRepository,
          useValue: usersRepository,
        },
        {
          provide: HelpersShared,
          useValue: {
            gerarHashSenha: jest.fn((x) => x),
            numeroAleatorio: 1,
            tentarDnvSeDerErro: <T>(cb): T => cb(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    it('o retorno da função sai certo', () => {
      const payload = {
        id: 1,
        nomeDeUsuario: 'as',
      };

      expect(service.login(payload)).toMatchObject({ token: payload });
    });
  });

  describe('cadastrarConta', () => {
    it('o retorno da função sai certo', async () => {
      const user: CreateUserDto = { nomeDeUsuario: 'paia', senhaHash: '123' };
      const userAuth: UserAuthDto = { nomeDeUsuario: 'paia', senha: '123' };

      expect(await service.cadastrarConta(userAuth)).toMatchObject(user);
    });
  });

  describe('cadastrarGuest', () => {
    it('gera um Guest como esperado', async () => {
      const guest = await service.cadastrarGuest();

      expect(guest).toBeDefined();
      expect(guest.nomeDeUsuario).toBe('aleatorioPaia' + 1);
      expect(guest.senhaHash).toBe('1');
    });
  });

  describe('validateUser', () => {
    const spyBcrypt = jest.spyOn(bcrypt, 'compareSync');
    const userAuth: UserAuthDto = { nomeDeUsuario: 'paia', senha: '123' };
    const user = {
      id: 1,
      nomeDeUsuario: 'paia',
      senhaHash: bcrypt.hashSync(userAuth.senha, 10),
    };
    const { senhaHash, ...payload } = user;

    it('os valores do compare estão corretos', async () => {
      usersRepository.findOneNome.mockReturnValueOnce(user);
      await service.validateUser(userAuth);

      expect(spyBcrypt.mock.lastCall).toEqual([userAuth.senha, senhaHash]);
    });

    it('se n existir um usuario com esse nome', async () => {
      usersRepository.findOneNome.mockReturnValueOnce(undefined);

      expect(await service.validateUser(userAuth)).toBeNull();
    });

    it('se a senha estiver errada', async () => {
      usersRepository.findOneNome.mockReturnValueOnce(user);
      const userTest = await service.validateUser({
        senha: 'senha errada',
        nomeDeUsuario: userAuth.nomeDeUsuario,
      });

      console.log(userTest);

      expect(userTest).toBeNull();
    });

    it('se a senha estiver certa', () => {
      usersRepository.findOneNome.mockReturnValueOnce(user);

      expect(service.validateUser(userAuth)).resolves.toEqual(
        <PayloadDto>payload,
      );
    });
  });
});
