import { Test, TestingModule } from '@nestjs/testing';
import { PairingController } from 'src/pairing/pairing.controller';
import { PairingService } from 'src/pairing/pairing.service';

describe('PairingController', () => {
  let controller: PairingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PairingController],
      providers: [PairingService],
    }).compile();

    controller = module.get<PairingController>(PairingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
