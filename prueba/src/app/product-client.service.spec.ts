import { TestBed } from '@angular/core/testing';

import { ProductClientService } from './product-client.service';

describe('ProductClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductClientService = TestBed.get(ProductClientService);
    expect(service).toBeTruthy();
  });
});
