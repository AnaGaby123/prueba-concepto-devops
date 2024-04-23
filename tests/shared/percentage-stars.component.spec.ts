import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PercentageStarsComponent} from '@appComponents/shared/percentage-stars/percentage-stars.component';

describe('PercentageStarsComponent', () => {
  let component: PercentageStarsComponent;
  let fixture: ComponentFixture<PercentageStarsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PercentageStarsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
