import { Module } from '@nestjs/common';
import { HelpersShared } from './helpers.service';
import { PrismaHelper } from './prisma.helper';

export const sharedConfig = {
  providers: [HelpersShared, PrismaHelper],
  exports: [HelpersShared, PrismaHelper],
};

@Module(sharedConfig)
export class SharedModule {}
