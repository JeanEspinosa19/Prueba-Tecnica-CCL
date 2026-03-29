import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarErrores } from './mostrar-errores';

describe('MostrarErrores', () => {
  let component: MostrarErrores;
  let fixture: ComponentFixture<MostrarErrores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarErrores],
    }).compileComponents();

    fixture = TestBed.createComponent(MostrarErrores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
