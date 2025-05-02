import { Test, TestingModule } from '@nestjs/testing';
import { ProductosTiposController } from './productos-tipos.controller';
import { ProductosTiposService } from './productos-tipos.service';

describe('ProductosTiposController', () => {
  let controller: ProductosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosTiposController],
      providers: [ProductosTiposService],
    }).compile();

    controller = module.get<ProductosTiposController>(ProductosTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
