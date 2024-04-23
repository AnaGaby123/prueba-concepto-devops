import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PlanCollectionListComponent} from './plan-collection-list.component';

describe('ManageBackOrderListComponent', () => {
  let component: PlanCollectionListComponent;
  let fixture: ComponentFixture<PlanCollectionListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PlanCollectionListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
