import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NotProcessedDetailsComponent} from './not-processed-details.component';

describe('NotProcessedDetailsComponent', () => {
  let component: NotProcessedDetailsComponent;
  let fixture: ComponentFixture<NotProcessedDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NotProcessedDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotProcessedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
