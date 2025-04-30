import { Test, TestingModule } from '@nestjs/testing';
import { ProductosTiposService } from './productos-tipos.service';

describe('ProductosTiposService', () => {
  let service: ProductosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosTiposService],
    }).compile();

    service = module.get<ProductosTiposService>(ProductosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
