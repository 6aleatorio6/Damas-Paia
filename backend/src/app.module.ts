import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.strategy';
import { PairingModule } from './pairing/pairing.module';
import { PlayModule } from './play/play.module';

@Module({
  imports: [UsersModule, AuthModule, PairingModule, PlayModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}
