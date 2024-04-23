import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfRadioButtonComponent} from './pqf-radio-button.component';

describe('PqfRadioButtonComponent', () => {
  let component: PqfRadioButtonComponent;
  let fixture: ComponentFixture<PqfRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfRadioButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
