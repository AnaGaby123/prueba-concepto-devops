import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AvailabilityLettersDialogComponent} from './availability-letters-dialog.component';

describe('AvailabilityLettersDialogComponent', () => {
  let component: AvailabilityLettersDialogComponent;
  let fixture: ComponentFixture<AvailabilityLettersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailabilityLettersDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityLettersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
