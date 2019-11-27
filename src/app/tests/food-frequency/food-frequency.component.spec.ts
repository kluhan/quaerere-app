import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFrequencyComponent } from './food-frequency.component';

describe('FoodFrequencyComponent', () => {
  let component: FoodFrequencyComponent;
  let fixture: ComponentFixture<FoodFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
