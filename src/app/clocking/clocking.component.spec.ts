import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockingComponent } from './clocking.component';

describe('ClockingComponent', () => {
  let component: ClockingComponent;
  let fixture: ComponentFixture<ClockingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
