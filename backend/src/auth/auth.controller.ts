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
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('signUp')
  async cadastrarConta(@Body() userAuth: UserAuthDto) {
    return await this.authService.cadastrarConta(userAuth);
  }
  @Public()
  @Post('guest')
  async EntrarComoGuest() {
    const { id, nomeDeUsuario } = await this.authService.cadastrarGuest();

    return this.authService.login(<PayloadDto>{ id, nomeDeUsuario });
  }
}
