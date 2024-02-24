import { Module } from '@nestjs/common';
import { HelpersShared } from './helpers.service';

@Module({
  providers: [HelpersShared],
  exports: [HelpersShared],
})
export class SharedModule {}
