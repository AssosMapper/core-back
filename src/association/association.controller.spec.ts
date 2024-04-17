import { Test, TestingModule } from '@nestjs/testing';
import { AssociationController } from './association.controller';
import { AssociationService } from './association.service';

describe('AssociationController', () => {
  let controller: AssociationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationController],
      providers: [AssociationService],
    }).compile();

    controller = module.get<AssociationController>(AssociationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
