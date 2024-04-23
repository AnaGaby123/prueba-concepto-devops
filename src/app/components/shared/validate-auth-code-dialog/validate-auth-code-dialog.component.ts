import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {lastValueFrom, Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {AutorizacionUsuarios} from 'api-logistica';
import {take} from 'rxjs/operators';
import {AuthCodeDialog} from '@appInterfaces/dialogs/AuthCode.dialog';
import {authDialogSelectors} from '@appSelectors/dialogs';
import {authDialogActions} from '@appActions/dialogs';
import {API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

@Component({
  selector: 'app-validate-auth-code-dialog',
  templateUrl: './validate-auth-code-dialog.component.html',
  styleUrls: ['./validate-auth-code-dialog.component.scss'],
})
export class ValidateAuthCodeDialogComponent implements OnInit {
  @ViewChildren('codes') codes: QueryList<ElementRef>;
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  authorizationUser$: Observable<AutorizacionUsuarios> = this.store.select(
    authDialogSelectors.selectFirstAuthorizationUser,
  );
  authorizationUserEmail$: Observable<string> = this.store.select(
    authDialogSelectors.selectAuthUserEmail,
  );
  isValidCode$: Observable<boolean> = this.store.select(authDialogSelectors.selectCodeIsValid);
  code$: Observable<number[]> = this.store.select(authDialogSelectors.selectCode);
  validateRequestStatus$: Observable<number> = this.store.select(
    authDialogSelectors.selectValidateRequestStatus,
  );

  readonly apiRequestSucceeded = API_REQUEST_STATUS_SUCCEEDED;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<ValidateAuthCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: AuthCodeDialog,
  ) {}

  ngOnInit(): void {
    this.inputFocus(0);
  }

  beforeInputCode(event: InputEvent) {
    const {data} = event;
    if (!(data >= '0' && data <= '9')) {
      event.preventDefault();
    }
  }

  async handleValidateNumber(event: KeyboardEvent, position: number): Promise<void> {
    const {value} = event.target as HTMLInputElement;

    // DOCS: Válida si el usuario borró un número de los inputs
    if (value === '') {
      this.store.dispatch(authDialogActions.SET_CODE({isEmpty: true, position}));
    } else {
      this.store.dispatch(authDialogActions.SET_CODE({number: Number(value), position}));

      this.inputFocus(position + 1);
      const codeIsFill = await this.codeIsFill();
      // DOCS: Válida si el código ha sido completado
      if (codeIsFill) {
        this.store.dispatch(authDialogActions.VALIDATE_CODE());
        setTimeout(() => {
          this.inputFocus(0);
        }, 1000);
      }
    }
  }

  inputFocus(position: number): void {
    this.codes?.toArray()[position]?.nativeElement.focus();
  }

  async codeIsFill(): Promise<boolean> {
    const code = await lastValueFrom(
      this.store.pipe(select(authDialogSelectors.selectCode), take(1)),
    );

    return code?.length === 4;
  }

  onClose(value: boolean): void {
    this.dialog.close(value);
  }
}
