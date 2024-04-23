import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NotProcessedComponent} from './not-processed.component';

describe('NotProcessedComponent', () => {
  let component: NotProcessedComponent;
  let fixture: ComponentFixture<NotProcessedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NotProcessedComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
