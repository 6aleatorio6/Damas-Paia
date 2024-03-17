import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.strategy';
import { PlayModule } from './play/play.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MatchHandlerModule } from './match-handler/match-handler.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PlayModule,
    ScheduleModule.forRoot(),
    MatchHandlerModule,
  ],
  providers: [{ provide: 'APP_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}
