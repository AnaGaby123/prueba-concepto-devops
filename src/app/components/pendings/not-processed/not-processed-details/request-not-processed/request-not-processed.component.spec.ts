import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RequestNotProcessedComponent} from './request-not-processed.component';

describe('RequestNotProcessedComponent', () => {
  let component: RequestNotProcessedComponent;
  let fixture: ComponentFixture<RequestNotProcessedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RequestNotProcessedComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNotProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
