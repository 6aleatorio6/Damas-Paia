import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TabuService } from './tabu.service';
import { CreateTabuDto } from './dto/create-tabu.dto';
import { UpdateTabuDto } from './dto/update-tabu.dto';

@Controller('tabu')
export class TabuController {
  constructor(private readonly tabuService: TabuService) {}

  @Post()
  create(@Body() createTabuDto: CreateTabuDto) {
    return this.tabuService.create(createTabuDto);
  }

  @Get()
  findAll() {
    return this.tabuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tabuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTabuDto: UpdateTabuDto) {
    return this.tabuService.update(+id, updateTabuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tabuService.remove(+id);
  }
}
