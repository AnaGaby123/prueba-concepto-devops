import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanCollectionDetailsComponent} from './plan-collection-details.component';

describe('PlanCollectionOrderDetailsComponent', () => {
  let component: PlanCollectionDetailsComponent;
  let fixture: ComponentFixture<PlanCollectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanCollectionDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
