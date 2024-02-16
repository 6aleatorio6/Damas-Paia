import { Test, TestingModule } from '@nestjs/testing';
import { TabuService } from './tabu.service';

describe('TabuService', () => {
  let service: TabuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TabuService],
    }).compile();

    service = module.get<TabuService>(TabuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
