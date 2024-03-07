import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.strategy';
import { Public } from './auth.decorator';
import { UserAuthDto } from './dto/auth.dto';
import { PayloadDto } from './dto/payload.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signUp')
  async cadastrarConta(@Body() userAuth: UserAuthDto) {
    const { id, nomeDeUsuario } =
      await this.authService.cadastrarConta(userAuth);

    return this.authService.login(<PayloadDto>{ id, nomeDeUsuario });
  }

  @Public()
  @Post('guest')
  async entrarComoGuest() {
    const { id, nomeDeUsuario } = await this.authService.cadastrarGuest();

    return this.authService.login(<PayloadDto>{ id, nomeDeUsuario });
  }
}
