import { Test, TestingModule } from '@nestjs/testing';
import { TabuController } from './tabu.controller';
import { TabuService } from './tabu.service';

describe('TabuController', () => {
  let controller: TabuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TabuController],
      providers: [TabuService],
    }).compile();

    controller = module.get<TabuController>(TabuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
