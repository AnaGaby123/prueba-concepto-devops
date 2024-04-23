import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfPopUpComponent} from './pqf-pop-up.component';

describe('PqfPopUpComponent', () => {
  let component: PqfPopUpComponent;
  let fixture: ComponentFixture<PqfPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
