import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from './singleton';

describe('metodo tratarErros', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  it('a', async () => {
    const user = prismaMock.peca.count.mockResolvedValueOnce();

    console.log();
  });

  // describe('prisma', () => {
  //   let prisma: PrismaService;
  //   const mockarPromesa = jest.fn();
  //   const mockPromessa = async () => mockarPromesa;
  //   const erroDoPrisma = (code: string) =>
  //     new PrismaClientKnownRequestError('', {
  //       clientVersion: '5.10.0',
  //       code,
  //     });

  //   beforeEach(async () => {
  //     const module: TestingModule = await Test.createTestingModule({
  //       providers: [PrismaService],
  //     }).compile();

  //     prisma = module.get<PrismaService>(PrismaService);
  //   });

  //   describe('modulo funcionando', () => {
  //     it('should be defined', () => {
  //       expect(prisma).toBeDefined();
  //     });
  //   });

  //   describe('metodo tratarErros', () => {
  //     it('se o prisma n der erro', async () => {
  //       mockarPromesa.mockReturnValueOnce(' ok');

  //       expect(prisma.tratarErros(mockPromessa())).resolves.toBe('ok');
  //     });

  //     it('o erro n é do prisma', async () => {
  //       mockarPromesa.mockResolvedValue('n ok');

  //       try {
  //         await prisma.tratarErros(mockPromessa());
  //       } catch (error) {
  //         expect(erroDoPrisma).toBe('n ok');
  //       }
  //     });

  //     it('simulando um erro de campo unico', async () => {
  //       // mockFn.mockRejectedValueOnce(erroDoPrisma(ErrosCode.unique));
  //       // mockFn.mockRejectedValueOnce(erroDoPrisma(ErrosCode.unique));
  //       // expect(prisma.tratarErros(mockPromessa)).rejects.tot
  //     });
  //   });
});
