import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogisticConfigurationRoutesTimesComponent} from './logistic-configuration-routes-times.component';

describe('LogisticConfigurationRoutesDetailsComponent', () => {
  let component: LogisticConfigurationRoutesTimesComponent;
  let fixture: ComponentFixture<LogisticConfigurationRoutesTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticConfigurationRoutesTimesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticConfigurationRoutesTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
