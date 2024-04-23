import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogisticConfigurationComponent} from './logistic-configuration.component';

describe('LogisticConfigurationComponent', () => {
  let component: LogisticConfigurationComponent;
  let fixture: ComponentFixture<LogisticConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticConfigurationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
