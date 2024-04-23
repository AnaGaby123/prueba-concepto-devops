import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SummaryDataComponent} from './summary-data.component';

describe('SummaryDataComponent', () => {
  let component: SummaryDataComponent;
  let fixture: ComponentFixture<SummaryDataComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SummaryDataComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
