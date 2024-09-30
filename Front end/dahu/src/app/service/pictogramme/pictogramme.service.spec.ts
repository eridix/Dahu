import { TestBed } from '@angular/core/testing';

import { PictogrammeService } from './pictogramme.service';

describe('PictogrammeService', () => {
  let service: PictogrammeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictogrammeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
