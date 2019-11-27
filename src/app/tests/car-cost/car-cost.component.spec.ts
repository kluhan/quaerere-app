import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCostComponent } from './car-cost.component';

describe('CarCostComponent', () => {
  let component: CarCostComponent;
  let fixture: ComponentFixture<CarCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
