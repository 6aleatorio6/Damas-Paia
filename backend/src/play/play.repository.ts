import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayRepository {
  constructor(private prisma: PrismaService) {}
}
