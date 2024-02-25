import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { usuario } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<usuario> {
    return await this.prisma.usuario.create({ data });
  }

  async findOneId(id: number): Promise<usuario> {
    return await this.prisma.usuario.findUnique({ where: { id } });
  }

  async findOneNome(nomeDeUsuario: string): Promise<usuario> {
    return await this.prisma.usuario.findUnique({ where: { nomeDeUsuario } });
  }
}