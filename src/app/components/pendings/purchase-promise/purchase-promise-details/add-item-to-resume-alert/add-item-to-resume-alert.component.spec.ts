import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddItemToResumeAlertComponent} from './add-item-to-resume-alert.component';

describe('AddItemToResumeAlertComponent', () => {
  let component: AddItemToResumeAlertComponent;
  let fixture: ComponentFixture<AddItemToResumeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemToResumeAlertComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemToResumeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
