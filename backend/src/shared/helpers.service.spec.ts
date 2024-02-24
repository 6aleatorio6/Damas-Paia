import { Test, TestingModule } from '@nestjs/testing';
import { HelpersShared } from './helpers.service';

describe('SharedService', () => {
  let service: HelpersShared;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpersShared],
    }).compile();

    service = module.get<HelpersShared>(HelpersShared);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
