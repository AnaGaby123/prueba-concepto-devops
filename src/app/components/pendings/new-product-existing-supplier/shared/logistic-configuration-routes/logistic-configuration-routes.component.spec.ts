import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogisticConfigurationRoutesComponent} from './logistic-configuration-routes.component';

describe('LogisticConfigurationRoutesComponent', () => {
  let component: LogisticConfigurationRoutesComponent;
  let fixture: ComponentFixture<LogisticConfigurationRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticConfigurationRoutesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticConfigurationRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
