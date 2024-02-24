import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  //   async findAll() {
  //     return await this.prisma.usuario.findMany();
  //   }

  //   async update(id: number, updateUserDto: UpdateUserDto) {
  //     return await this.prisma.usuario.create();
  //   }

  //   async remove(id: number) {
  //     return await this.prisma.usuario.create();
  //   }
}
