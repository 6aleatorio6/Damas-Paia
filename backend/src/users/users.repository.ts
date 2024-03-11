import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { usuario } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<usuario> {
    const dataPrisma = this.prisma.usuario.create({ data });

    return this.prisma.tratarErros(dataPrisma, [
      { code: 'unique', msg: 'esse nome já está sendo usado' },
    ]);
  }

  async findOneId(id: number): Promise<usuario> {
    const dataPrisma = this.prisma.usuario.findUniqueOrThrow({ where: { id } });

    return await this.prisma.tratarErros(dataPrisma);
  }

  async findOneNome(nomeDeUsuario: string): Promise<usuario> {
    const dataPrisma = this.prisma.usuario.findUnique({
      where: { nomeDeUsuario },
    });

    return await this.prisma.tratarErros(dataPrisma);
  }

  async updateId(id: number, alteracaoUser: UpdateUserDto): Promise<usuario> {
    const dataPrisma = this.prisma.usuario.update({
      where: { id },
      data: alteracaoUser,
    });

    return await this.prisma.tratarErros(dataPrisma);
  }
}
