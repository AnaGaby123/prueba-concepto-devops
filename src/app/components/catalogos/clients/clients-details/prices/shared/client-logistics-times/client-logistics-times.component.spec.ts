import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientLogisticsTimesComponent} from './client-logistics-times.component';

describe('ClientLogisticsTimesComponent', () => {
  let component: ClientLogisticsTimesComponent;
  let fixture: ComponentFixture<ClientLogisticsTimesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientLogisticsTimesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLogisticsTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
