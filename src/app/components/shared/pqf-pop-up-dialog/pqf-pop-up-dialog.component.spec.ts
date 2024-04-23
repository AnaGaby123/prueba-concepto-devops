import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfPopUpDialogComponent} from './pqf-pop-up-dialog.component';

describe('PqfPopUpDialogComponent', () => {
  let component: PqfPopUpDialogComponent;
  let fixture: ComponentFixture<PqfPopUpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfPopUpDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfPopUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
