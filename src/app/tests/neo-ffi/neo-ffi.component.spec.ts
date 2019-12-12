import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoFfiComponent } from './neo-ffi.component';

describe('NeoFfiComponent', () => {
  let component: NeoFfiComponent;
  let fixture: ComponentFixture<NeoFfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoFfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoFfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
