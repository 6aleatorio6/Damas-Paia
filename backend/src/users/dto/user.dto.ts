import { IsDate, IsInt, IsOptional, IsString, Length } from 'class-validator';

export default class UserDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(3, 45)
  nomeDeUsuario: string;

  @IsString()
  @Length(64)
  senhaHash: string;

  @IsDate()
  @IsOptional()
  inicioDoPareamento: Date;

  @IsDate()
  ultimaVezOnline: Date;
}
