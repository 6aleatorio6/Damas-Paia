import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersShared {
  private get numeroAleatorio(): number {
    return Math.floor(Math.random() * 10000);
  }
}
