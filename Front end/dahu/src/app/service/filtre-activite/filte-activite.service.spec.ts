import { TestBed } from '@angular/core/testing';

import { FilteActiviteService } from './filte-activite.service';

describe('FilteActiviteService', () => {
  let service: FilteActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteActiviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
