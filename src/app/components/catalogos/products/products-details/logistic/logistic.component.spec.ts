import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LogisticComponent} from './logistic.component';

describe('LogisticComponent', () => {
  let component: LogisticComponent;
  let fixture: ComponentFixture<LogisticComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LogisticComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
