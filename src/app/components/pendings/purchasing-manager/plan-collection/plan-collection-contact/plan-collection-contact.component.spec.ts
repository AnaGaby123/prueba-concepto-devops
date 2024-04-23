import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanCollectionContactComponent} from './plan-collection-contact.component';

describe('PlanCollectionContactComponent', () => {
  let component: PlanCollectionContactComponent;
  let fixture: ComponentFixture<PlanCollectionContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanCollectionContactComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCollectionContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
