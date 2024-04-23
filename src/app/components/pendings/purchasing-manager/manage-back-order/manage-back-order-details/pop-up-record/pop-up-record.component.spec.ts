import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpRecordComponent} from './pop-up-record.component';

describe('PopUpRecordComponent', () => {
  let component: PopUpRecordComponent;
  let fixture: ComponentFixture<PopUpRecordComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpRecordComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
