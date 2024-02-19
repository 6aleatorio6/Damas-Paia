import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TabuModule } from './tabu/tabu.module';

@Module({
  imports: [TabuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
