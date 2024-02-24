import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nomeDeUsuario, senhaHash }: CreateUserDto) {
    return await this.prisma.usuario.create({
      data: { nomeDeUsuario, senhaHash },
    });
  }

  //   async findAll() {
  //     return await this.prisma.usuario.findMany();
  //   }

  async findOneId(id: number) {
    return await this.prisma.usuario.findUnique({ where: { id } });
  }

  async findOneNome(nomeDeUsuario: string) {
    return await this.prisma.usuario.findUnique({ where: { nomeDeUsuario } });
  }

  //   async update(id: number, updateUserDto: UpdateUserDto) {
  //     return await this.prisma.usuario.create();
  //   }

  //   async remove(id: number) {
  //     return await this.prisma.usuario.create();
  //   }
}
