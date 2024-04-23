import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PlanDispatchListComponent} from './plan-dispatch-list.component';

describe('PlanDispatchListComponent', () => {
  let component: PlanDispatchListComponent;
  let fixture: ComponentFixture<PlanDispatchListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PlanDispatchListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDispatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
