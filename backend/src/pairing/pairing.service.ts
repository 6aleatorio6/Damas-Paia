import { Injectable } from '@nestjs/common';
import { HelpersShared } from 'src/shared/helpers.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class PairingService {
  constructor(
    private usersRepository: UsersRepository,
    private helpers: HelpersShared,
  ) {}

  async abrirUserParaPareamento(id: number) {
    await this.usersRepository.updateId(id, {
      inicioDoPareamento: new Date(),
    });

    return this.helpers.respostaPadrao('pareamento iniciado');
  }
  async fecharUserParaPareamento(id: number) {
    await this.usersRepository.updateId(id, {
      inicioDoPareamento: null,
    });

    return this.helpers.respostaPadrao('pareamento cancelado');
  }
}
