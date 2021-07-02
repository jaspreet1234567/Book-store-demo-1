import { TestBed } from '@angular/core/testing';

import { RequestHeadersService } from './request-headers.service';

describe('RequestHeadersService', () => {
  let service: RequestHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
