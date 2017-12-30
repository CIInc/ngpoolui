import { TestBed, inject } from '@angular/core/testing';

import { PoolApiService } from './pool-api.service';

describe('PoolApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoolApiService]
    });
  });

  it('should be created', inject([PoolApiService], (service: PoolApiService) => {
    expect(service).toBeTruthy();
  }));
});
