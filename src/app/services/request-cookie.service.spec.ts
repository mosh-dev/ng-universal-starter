import {TestBed} from '@angular/core/testing';

import {RequestCookieService} from './request-cookie.service';

describe('RequestCookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestCookieService = TestBed.inject(RequestCookieService);
    expect(service).toBeTruthy();
  });
});
