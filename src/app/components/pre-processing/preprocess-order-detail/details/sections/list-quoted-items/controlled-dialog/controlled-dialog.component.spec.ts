import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ControlledDialogComponent} from './controlled-dialog.component';

describe('ControlledDialogComponent', () => {
  let component: ControlledDialogComponent;
  let fixture: ComponentFixture<ControlledDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlledDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlledDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
