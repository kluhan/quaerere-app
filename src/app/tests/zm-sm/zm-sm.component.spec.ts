import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmSmComponent } from './zm-sm.component';

describe('ZmSmComponent', () => {
  let component: ZmSmComponent;
  let fixture: ComponentFixture<ZmSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
