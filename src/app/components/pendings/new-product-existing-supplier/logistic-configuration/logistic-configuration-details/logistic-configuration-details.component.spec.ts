import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogisticConfigurationDetailsComponent} from './logistic-configuration-details.component';

describe('LogisticConfigurationDetailsComponent', () => {
  let component: LogisticConfigurationDetailsComponent;
  let fixture: ComponentFixture<LogisticConfigurationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticConfigurationDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticConfigurationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
