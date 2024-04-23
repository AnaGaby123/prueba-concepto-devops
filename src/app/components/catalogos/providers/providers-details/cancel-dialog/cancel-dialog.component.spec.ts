import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CancelDialogComponent} from './cancel-dialog.component';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericComponent} from '@appComponents/shared/pop-up-generic/pop-up-generic.component';

describe('CancelDialogComponent', () => {
  let component: CancelDialogComponent;
  let fixture: ComponentFixture<CancelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelDialogComponent, PopUpGenericComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => {},
          },
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
