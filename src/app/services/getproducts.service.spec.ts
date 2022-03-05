import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GetproductsService } from './getproducts.service';

describe('GetproductsService', () => {
  let service: GetproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GetproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
