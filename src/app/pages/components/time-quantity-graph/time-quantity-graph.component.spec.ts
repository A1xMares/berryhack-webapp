import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeQuantityGraphComponent } from './time-quantity-graph.component';

describe('TimeQuantityGraphComponent', () => {
  let component: TimeQuantityGraphComponent;
  let fixture: ComponentFixture<TimeQuantityGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeQuantityGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeQuantityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
