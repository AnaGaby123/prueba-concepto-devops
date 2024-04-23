import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CustomPositionPopUpComponent} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.component';

describe('CustomPositionPopUpComponent', () => {
  let component: CustomPositionPopUpComponent;
  let fixture: ComponentFixture<CustomPositionPopUpComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomPositionPopUpComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPositionPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
