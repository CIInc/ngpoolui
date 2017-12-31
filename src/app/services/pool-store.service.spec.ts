import { TestBed, inject } from '@angular/core/testing';

import { PoolStoreService } from './pool-store.service';

describe('PoolStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoolStoreService]
    });
  });

  it('should be created', inject([PoolStoreService], (service: PoolStoreService) => {
    expect(service).toBeTruthy();
  }));
});
