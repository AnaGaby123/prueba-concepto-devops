import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpAlertComponent} from '@appComponents/shared/pop-up-alert/pop-up-alert.component';

describe('PopUpAlertComponent', () => {
  let component: PopUpAlertComponent;
  let fixture: ComponentFixture<PopUpAlertComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpAlertComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
