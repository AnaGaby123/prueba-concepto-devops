import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidateAuthCodeDialogComponent} from './validate-auth-code-dialog.component';

describe('ValidateAuthCodeDialogComponent', () => {
  let component: ValidateAuthCodeDialogComponent;
  let fixture: ComponentFixture<ValidateAuthCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateAuthCodeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAuthCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
