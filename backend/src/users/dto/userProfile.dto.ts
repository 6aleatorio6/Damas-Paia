import { OmitType } from '@nestjs/mapped-types';
import UserDto from './user.dto';

export class userProfileDto extends OmitType(UserDto, ['senhaHash']) {}
