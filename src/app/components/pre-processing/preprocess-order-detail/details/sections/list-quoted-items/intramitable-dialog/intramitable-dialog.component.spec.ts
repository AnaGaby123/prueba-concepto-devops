import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IntramitableDialogComponent} from './intramitable-dialog.component';

describe('IntramitableDialogComponent', () => {
  let component: IntramitableDialogComponent;
  let fixture: ComponentFixture<IntramitableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntramitableDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntramitableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
