import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobacionComponent } from './comprobacion.component';

describe('ComprobacionComponent', () => {
  let component: ComprobacionComponent;
  let fixture: ComponentFixture<ComprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
