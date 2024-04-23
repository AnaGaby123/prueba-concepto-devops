import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddRealizationDatesPopUpComponent} from './add-realization-dates-pop-up.component';

describe('AddRealizationDatesPopUpComponent', () => {
  let component: AddRealizationDatesPopUpComponent;
  let fixture: ComponentFixture<AddRealizationDatesPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRealizationDatesPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRealizationDatesPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
