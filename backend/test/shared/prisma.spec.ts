import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaHelper } from 'src/shared/prisma.helper';

describe('metodo tratarErros', () => {
  const prismaHelper = new PrismaHelper();
  const objMock = jest.fn();
  const throwDoPrisma = (code: string) => {
    return new PrismaClientKnownRequestError(code, {
      code,
      clientVersion: '10.0.2',
    });
  };

  beforeEach(() => {
    objMock.mockClear();
    objMock.mockReset();
  });

  it('promise resolvida', async () => {
    objMock.mockResolvedValue('ok');

    const result = prismaHelper.tratarErros(objMock());
    expect(result).resolves.toBe('ok');
    expect(result).resolves.not.toBe('paia');

    const result2 = prismaHelper.tratarErros(objMock(), ['unique', 'alterado']);
    expect(result2).resolves.toBe('ok');
    expect(result2).resolves.not.toBe('paia');
  });

  it('promise rejeitada e desconhecida', async () => {
    objMock.mockRejectedValue(new Error('erro'));

    const result = prismaHelper.tratarErros(objMock());
    expect(result).rejects.toThrow(new Error('erro'));
    expect(result).rejects.not.toThrow(new Error('erro n igual'));

    const result2 = prismaHelper.tratarErros(objMock(), ['unique', 'alterado']);
    expect(result2).rejects.toThrow(new Error('erro'));
    expect(result2).rejects.not.toThrow(new Error('erro n igual'));
  });

  it('promise rejeitada do prisma com code desconhecido', async () => {
    objMock.mockRejectedValue(throwDoPrisma('desconhecido'));

    const result = prismaHelper.tratarErros(objMock());
    expect(result).rejects.toThrow(throwDoPrisma('desconhecido'));
    expect(result).rejects.not.toThrow(throwDoPrisma('diferente'));
  });

  it('promise rejeitada do prisma com code desconhecido e erroAlterado', async () => {
    objMock.mockRejectedValue(throwDoPrisma('desconhecido'));

    const result = prismaHelper.tratarErros(objMock(), ['unique', 'alterado']);
    expect(result).rejects.toThrow(throwDoPrisma('desconhecido'));
    expect(result).rejects.not.toThrow(throwDoPrisma('diferente'));
  });

  it('promise rejeitada do prisma com code Unique', async () => {
    const mockErro = throwDoPrisma('P2002');
    objMock.mockRejectedValue(mockErro);

    const result = prismaHelper.tratarErros(objMock());
    expect(result).rejects.toThrow(
      new BadRequestException('O valor desse campo unico já existe'),
    );
    expect(result).rejects.not.toThrow(new BadRequestException('diferente'));
  });

  it('promise rejeitada do prisma com code Unique e erroAlterado', async () => {
    const mockErro = throwDoPrisma('P2002');
    objMock.mockRejectedValue(mockErro);

    const result = prismaHelper.tratarErros(objMock(), ['unique', 'alterado']);
    expect(result).rejects.toThrow(new BadRequestException('alterado'));
    expect(result).rejects.not.toThrow(new BadRequestException('diferente'));
  });
});
