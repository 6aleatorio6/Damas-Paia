import { Injectable } from '@nestjs/common';
import { CreateTabuDto } from './dto/create-tabu.dto';
import { UpdateTabuDto } from './dto/update-tabu.dto';

@Injectable()
export class TabuService {
  create(createTabuDto: CreateTabuDto) {
    return 'This action adds a new tabu';
  }

  findAll() {
    return `This action returns all tabu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tabu`;
  }

  update(id: number, updateTabuDto: UpdateTabuDto) {
    return `This action updates a #${id} tabu`;
  }

  remove(id: number) {
    return `This action removes a #${id} tabu`;
  }
}
