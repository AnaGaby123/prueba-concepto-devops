import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpAddEventComponent} from './pop-up-add-event.component';

describe('PopUpAddEventComponent', () => {
  let component: PopUpAddEventComponent;
  let fixture: ComponentFixture<PopUpAddEventComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpAddEventComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
