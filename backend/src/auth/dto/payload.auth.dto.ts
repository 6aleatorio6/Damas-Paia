import { PickType } from '@nestjs/mapped-types';
import UserDto from 'src/users/dto/user.dto';

export class PayloadDto extends PickType(UserDto, ['id', 'nomeDeUsuario']) {}
