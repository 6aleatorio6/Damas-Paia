import { Test, TestingModule } from '@nestjs/testing';
import { HelpersShared } from '../helpers.service';
import * as bcrypt from 'bcrypt';
import { sharedConfig } from '../shared.module';

describe('SharedService', () => {
  let service: HelpersShared;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(sharedConfig).compile();

    service = module.get<HelpersShared>(HelpersShared);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('numero aleatorio', () => {
    it('verificar se ele gera um numero aleatorio menor que 10000', () => {
      expect(service.numeroAleatorio).toBeLessThanOrEqual(10000);
    });
  });

  describe('Gerar Hash', () => {
    it('gera um hash com bcrypt', () => {
      const senha = 'paia123';

      const hashDaSenha = bcrypt.hashSync(senha, 10);

      expect(bcrypt.compareSync(senha, hashDaSenha)).toBeTruthy();
      expect(bcrypt.compareSync('senha errada', hashDaSenha)).toBeFalsy();
    });
  });

  describe('tentarDnvSeDerErro', () => {
    it('deu erro na primeira vez, mas na segunda vez deu certo e retornou o valor', async () => {
      const fn = jest.fn();

      fn.mockRejectedValueOnce(null).mockResolvedValue('ok');

      expect(await service.tentarDnvSeDerErro(fn, 5)).toBe('ok');
      expect(fn.mock.calls.length).toBe(2);
    });

    it('tentarDnvSeDerErro: deu erro todas as vezes e parou no limite', async () => {
      const fn = jest.fn();

      fn.mockRejectedValue(null);
      await service.tentarDnvSeDerErro(fn, 5);

      expect(fn.mock.calls.length).toBe(5);
    });

    it('tentarDnvSeDerErro: deu certo na primeira', async () => {
      const fn = jest.fn();

      fn.mockReturnValue('ok');
      await service.tentarDnvSeDerErro(fn, 5);

      expect(fn.mock.calls.length).toBe(1);
    });
  });
});
