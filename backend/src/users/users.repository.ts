import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { usuario } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nomeDeUsuario, senhaHash }: CreateUserDto): Promise<usuario> {
    return await this.prisma.usuario.create({
      data: { nomeDeUsuario, senhaHash },
    });
  }

  //   async findAll() {
  //     return await this.prisma.usuario.findMany();
  //   }

  async findOneId(id: number): Promise<usuario> {
    return await this.prisma.usuario.findUnique({ where: { id } });
  }

  async findOneNome(nomeDeUsuario: string): Promise<usuario> {
    return await this.prisma.usuario.findUnique({ where: { nomeDeUsuario } });
  }

  //   async update(id: number, updateUserDto: UpdateUserDto) {
  //     return await this.prisma.usuario.create();
  //   }

  //   async remove(id: number) {
  //     return await this.prisma.usuario.create();
  //   }
}
