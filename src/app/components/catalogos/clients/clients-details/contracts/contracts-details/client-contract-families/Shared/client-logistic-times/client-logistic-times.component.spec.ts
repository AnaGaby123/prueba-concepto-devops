import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientLogisticTimesComponent} from './client-logistic-times.component';

describe('ClientLogisticTimesComponent', () => {
  let component: ClientLogisticTimesComponent;
  let fixture: ComponentFixture<ClientLogisticTimesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientLogisticTimesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLogisticTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
