import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertItemComponent } from './likert-item.component';

describe('LikertItemComponent', () => {
  let component: LikertItemComponent;
  let fixture: ComponentFixture<LikertItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikertItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikertItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
