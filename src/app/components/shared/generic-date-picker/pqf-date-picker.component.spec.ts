import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfDatePickerComponent} from './pqf-date-picker.component';

describe('PqfDatePickerComponent', () => {
  let component: PqfDatePickerComponent;
  let fixture: ComponentFixture<PqfDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfDatePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
