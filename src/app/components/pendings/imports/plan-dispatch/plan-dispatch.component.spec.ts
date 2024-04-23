import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PlanDispatchComponent} from './plan-dispatch.component';

describe('PlanDispatchComponent', () => {
  let component: PlanDispatchComponent;
  let fixture: ComponentFixture<PlanDispatchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PlanDispatchComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
