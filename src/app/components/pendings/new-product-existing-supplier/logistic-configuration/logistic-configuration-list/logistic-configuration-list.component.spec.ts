import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogisticConfigurationListComponent} from './logistic-configuration-list.component';

describe('LogisticConfigurationDashboardComponent', () => {
  let component: LogisticConfigurationListComponent;
  let fixture: ComponentFixture<LogisticConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticConfigurationListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
