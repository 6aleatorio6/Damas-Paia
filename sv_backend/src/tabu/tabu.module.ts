import { Module } from '@nestjs/common';
import { TabuService } from './tabu.service';
import { TabuController } from './tabu.controller';

@Module({
  controllers: [TabuController],
  providers: [TabuService],
})
export class TabuModule {}
