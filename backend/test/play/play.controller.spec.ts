import { Test, TestingModule } from '@nestjs/testing';
import { PlayController } from 'src/play/play.controller';
import { PlayService } from 'src/play/play.service';

describe('PlayController', () => {
  let controller: PlayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayController],
      providers: [PlayService],
    }).compile();

    controller = module.get<PlayController>(PlayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
