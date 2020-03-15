import { TestBed } from '@angular/core/testing';

import { ModelesService } from './modeles.service';

describe('ModelesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelesService = TestBed.get(ModelesService);
    expect(service).toBeTruthy();
  });
});
