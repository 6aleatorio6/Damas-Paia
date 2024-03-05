import { Module } from '@nestjs/common';
import { HelpersShared } from './helpers.service';

export const sharedConfig = {
  providers: [HelpersShared],
  exports: [HelpersShared],
};

@Module(sharedConfig)
export class SharedModule {}
