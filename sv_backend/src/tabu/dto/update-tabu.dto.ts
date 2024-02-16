import { PartialType } from '@nestjs/mapped-types';
import { CreateTabuDto } from './create-tabu.dto';

export class UpdateTabuDto extends PartialType(CreateTabuDto) {}
