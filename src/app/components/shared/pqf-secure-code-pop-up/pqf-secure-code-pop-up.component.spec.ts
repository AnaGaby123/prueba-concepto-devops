import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfSecureCodePopUpComponent} from './pqf-secure-code-pop-up.component';

describe('PqfSecureCodePopUpComponent', () => {
  let component: PqfSecureCodePopUpComponent;
  let fixture: ComponentFixture<PqfSecureCodePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfSecureCodePopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfSecureCodePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
