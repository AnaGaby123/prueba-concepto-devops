import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PlanDispatchDetailsComponent} from './plan-dispatch-details.component';

describe('PlanDispatchDetailsComponent', () => {
  let component: PlanDispatchDetailsComponent;
  let fixture: ComponentFixture<PlanDispatchDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PlanDispatchDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDispatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
