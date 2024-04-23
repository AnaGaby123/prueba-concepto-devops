/* Core Imports */
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {take} from 'rxjs/operators';

/* Actions Imports */
import {registerArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Selectors Imports */
import {registerArrivalDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';

/* Tools Imports */
import {toNumber} from 'lodash-es';

@Component({
  selector: 'app-fingerprint-scan',
  templateUrl: './fingerprint-scan.component.html',
  styleUrls: ['./fingerprint-scan.component.scss'],
})
export class FingerprintScanComponent implements OnInit {
  codeSecurityGuard$: Observable<Array<number>> = this.store.select(
    registerArrivalDetailsSelectors.selectCodeSecurityGuard,
  );
  codeIsEmptySecurityGuard$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectCodeIsEmptySecurityGuard,
  );
  shakedSecurityGuard$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectShakedSecurityGuard,
  );
  isValidCodeSecurityGuard$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectCodeSecurityGuardIsValid,
  );
  codeBuyer$: Observable<Array<number>> = this.store.select(
    registerArrivalDetailsSelectors.selectCodeBuyer,
  );
  shakedBuyer$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectShakedBuyer,
  );
  isValidCodeBuyer$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectCodeBuyerIsValid,
  );
  @ViewChild('inputSC1', {static: false}) inputSecurityGuard1: ElementRef;
  @ViewChild('inputSC2', {static: false}) inputSecurityGuard2: ElementRef;
  @ViewChild('inputSC3', {static: false}) inputSecurityGuard3: ElementRef;
  @ViewChild('inputSC4', {static: false}) inputSecurityGuard4: ElementRef;
  @ViewChild('inputB1', {static: false}) inputBuyer1: ElementRef;
  @ViewChild('inputB2', {static: false}) inputBuyer2: ElementRef;
  @ViewChild('inputB3', {static: false}) inputBuyer3: ElementRef;
  @ViewChild('inputB4', {static: false}) inputBuyer4: ElementRef;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(registerArrivalDetailsActions.FETCH_IS_EXIST_VERIFICATION_CODES_LOAD());
  }

  handleValidateNumber(
    event: {which: number; preventDefault: () => void},
    name: 'securityGuard' | 'buyer',
    position: number,
  ): void {
    if (event.which === 8) {
      this.setTextData(null, position, name);
    } else {
      const key = String.fromCharCode(event.which);
      const regex = /^\d*$/;
      if (!regex.test(key)) {
        event.preventDefault();
      } else {
        this.setTextData(key, position, name);
      }
    }
  }

  async setTextData(
    value: string,
    position: number,
    name: 'securityGuard' | 'buyer',
  ): Promise<void> {
    const digit = value ? toNumber(value) : null;
    this.store.dispatch(
      registerArrivalDetailsActions.SET_CODE_VALUE_BY_POSITION({
        position,
        value: digit,
        name,
      }),
    );

    let codeIsFill;
    if (name === 'securityGuard') {
      codeIsFill = await lastValueFrom(
        this.store.pipe(
          select(registerArrivalDetailsSelectors.selectCodeIsFillSecurityGuard),
          take(1),
        ),
      );
    } else {
      codeIsFill = await lastValueFrom(
        this.store.pipe(select(registerArrivalDetailsSelectors.selectCodeIsFillBuyer), take(1)),
      );
    }

    if (codeIsFill) {
      this.validateCode(name);
    } else {
      if (name === 'securityGuard') {
        if (value) {
          switch (position) {
            case 0:
              this.inputSecurityGuard2.nativeElement.focus();
              break;
            case 1:
              this.inputSecurityGuard3.nativeElement.focus();
              break;
            case 2:
              this.inputSecurityGuard4.nativeElement.focus();
              break;
            case 3:
          }
        }
      } else if (name === 'buyer') {
        if (value) {
          switch (position) {
            case 0:
              this.inputBuyer2.nativeElement.focus();
              break;
            case 1:
              this.inputBuyer3.nativeElement.focus();
              break;
            case 2:
              this.inputBuyer4.nativeElement.focus();
              break;
            case 3:
          }
        }
      }
    }
  }

  validateCode(name: 'securityGuard' | 'buyer') {
    this.store.dispatch(registerArrivalDetailsActions.COMPARE_VERIFICATION_CODE_LOAD({name}));
    setTimeout(async () => {
      let codeIsEmpty: boolean = false;
      let isValid: boolean = false;
      if (name === 'securityGuard') {
        codeIsEmpty = await lastValueFrom(
          this.store.pipe(
            select(registerArrivalDetailsSelectors.selectCodeIsEmptySecurityGuard),
            take(1),
          ),
        );
        isValid = await lastValueFrom(
          this.store.pipe(
            select(registerArrivalDetailsSelectors.selectCodeSecurityGuardIsValid),
            take(1),
          ),
        );
      } else if (name === 'buyer') {
        codeIsEmpty = await lastValueFrom(
          this.store.pipe(select(registerArrivalDetailsSelectors.selectCodeIsEmptyBuyer), take(1)),
        );
        isValid = await lastValueFrom(
          this.store.pipe(select(registerArrivalDetailsSelectors.selectCodeBuyerIsValid), take(1)),
        );
      }

      if (codeIsEmpty) {
        name === 'securityGuard'
          ? this.inputSecurityGuard1.nativeElement.focus()
          : this.inputBuyer1.nativeElement.focus();
      } else if (isValid) {
        name === 'securityGuard'
          ? this.inputBuyer1.nativeElement.focus()
          : this.inputSecurityGuard1.nativeElement.focus();
      }
    }, 2000);
  }
}
