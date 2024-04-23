import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BarActivitiesComponent} from '@appComponents/shared/bar-activities/bar-activities.component';

describe('BarActivitiesComponent', () => {
  let component: BarActivitiesComponent;
  let fixture: ComponentFixture<BarActivitiesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BarActivitiesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BarActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
