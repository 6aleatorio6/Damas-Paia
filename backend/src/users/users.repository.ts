import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { usuario } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<usuario> {
    try {
      return await this.prisma.usuario.create({ data });
    } catch (e) {
      if (this.prisma.isExceptionUnique(e)) {
        throw new BadRequestException('esse nome já está sendo usado');
      }

      throw e;
    }
  }

  async findOneId(id: number): Promise<usuario> {
    return await this.prisma.usuario.findUnique({ where: { id } });
  }

  async findOneNome(nomeDeUsuario: string): Promise<usuario> {
    return await this.prisma.usuario.findUnique({ where: { nomeDeUsuario } });
  }

  async updateId(id: number, alteracaoUser: UpdateUserDto): Promise<usuario> {
    return await this.prisma.usuario.update({
      where: { id },
      data: alteracaoUser,
    });
  }
}
