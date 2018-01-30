import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPontosComponent } from './lista-pontos.component';

describe('ListaPontosComponent', () => {
  let component: ListaPontosComponent;
  let fixture: ComponentFixture<ListaPontosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPontosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
