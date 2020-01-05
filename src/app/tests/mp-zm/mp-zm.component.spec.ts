import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpZmComponent } from './mp-zm.component';

describe('ZmSmComponent', () => {
  let component: MpZmComponent;
  let fixture: ComponentFixture<MpZmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpZmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpZmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});