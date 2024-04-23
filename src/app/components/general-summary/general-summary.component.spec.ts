import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GeneralSummaryComponent} from './general-summary.component';

describe('GeneralSummaryComponent', () => {
  let component: GeneralSummaryComponent;
  let fixture: ComponentFixture<GeneralSummaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GeneralSummaryComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
