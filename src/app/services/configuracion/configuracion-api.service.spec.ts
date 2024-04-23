import {TestBed} from '@angular/core/testing';

import {ConfiguracionApiService} from './configuracion-api.service';

describe('ConfiguracionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguracionApiService = TestBed.get(ConfiguracionApiService);
    expect(service).toBeTruthy();
  });
});
