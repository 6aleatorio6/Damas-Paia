import { PickType } from '@nestjs/mapped-types';
import { IsString, MinLength } from 'class-validator';
import UserDto from 'src/users/dto/user.dto';

export class UserAuthDto extends PickType(UserDto, ['nomeDeUsuario']) {
  @IsString()
  @MinLength(4)
  senha: string;
}
