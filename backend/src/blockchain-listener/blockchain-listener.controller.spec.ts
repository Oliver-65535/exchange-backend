import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainListenerController } from './blockchain-listener.controller';

describe('BlockchainListenerController', () => {
  let controller: BlockchainListenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockchainListenerController],
    }).compile();

    controller = module.get<BlockchainListenerController>(BlockchainListenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
