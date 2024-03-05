import { Module, ModuleMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { HelpersShared } from 'src/shared/helpers.service';

export const authConfig: ModuleMetadata = {
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env['SECRET_JWT'],
      signOptions: { expiresIn: '1 year' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, HelpersShared],
};

@Module(authConfig)
export class AuthModule {}
