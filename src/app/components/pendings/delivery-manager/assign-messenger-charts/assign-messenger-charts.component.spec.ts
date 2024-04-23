import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AssignMessengerChartsComponent} from './assign-messenger-charts.component';

describe('AssignMessengerChartsComponent', () => {
  let component: AssignMessengerChartsComponent;
  let fixture: ComponentFixture<AssignMessengerChartsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AssignMessengerChartsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMessengerChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
