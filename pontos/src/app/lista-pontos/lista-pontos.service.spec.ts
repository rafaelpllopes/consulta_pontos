import { TestBed, inject } from '@angular/core/testing';

import { ListaPontosService } from './lista-pontos.service';

describe('ListaPontosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListaPontosService]
    });
  });

  it('should be created', inject([ListaPontosService], (service: ListaPontosService) => {
    expect(service).toBeTruthy();
  }));
});
