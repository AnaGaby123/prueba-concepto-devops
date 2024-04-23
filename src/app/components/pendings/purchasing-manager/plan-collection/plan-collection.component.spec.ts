import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanCollectionComponent} from './plan-collection.component';

describe('PlanCollectionComponent', () => {
  let component: PlanCollectionComponent;
  let fixture: ComponentFixture<PlanCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanCollectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
