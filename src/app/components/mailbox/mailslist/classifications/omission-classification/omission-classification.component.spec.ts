import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OmissionClassificationComponent} from './omission-classification.component';

describe('OmissionClassificationComponent', () => {
  let component: OmissionClassificationComponent;
  let fixture: ComponentFixture<OmissionClassificationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OmissionClassificationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OmissionClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
