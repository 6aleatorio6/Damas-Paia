import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'nome', passwordField: 'senha' });
  }

  async validate(nomeLogin: string, senhaLogin: string) {
    const user = this.authService.validateUser(nomeLogin, senhaLogin);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
