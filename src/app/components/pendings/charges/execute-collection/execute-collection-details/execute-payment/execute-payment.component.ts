/* Core Imports */
import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Common Imports */
/* Models Imports */
import {IChipFile} from '@appModels/chip-file/chip-file';
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';
import {CalendarDay} from '@appModels/calendario/calendar';
import {
  ICreditNotesTotals,
  IFccNotaCredito,
  IFccPagoCliente,
  IInvoice,
  IPaymentTransaction,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {VFacturaClienteCalendarioTotales} from 'api-finanzas';
import {ContactoDetalleObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IUploadFileCustom} from '@appModels/files/files.models';

/* Selectors Imports */
import {
  executeCollectionDetailsSelectors,
  executeCollectionSelectors,
} from '@appSelectors/pendings/charges/execute-collection';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {
  selectCatBancoForDropList,
  selectCatBrokerClienteForDropList,
  selectCatMedioDePagoForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';

/* Actions Imports */
import {
  executeCollectionActions,
  executeCollectionDetailsActions,
} from '@appActions/pendings/charges/execute-collection';
import {
  GET_CAT_BANK_LOAD,
  GET_CAT_BROKER_CLIENTE_LOAD,
} from '@appActions/catalogs/catalogos.actions';

/* Tools Imports */
import {isEmpty} from 'lodash-es';

import {Router} from '@angular/router';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-execute-payment',
  templateUrl: './execute-payment.component.html',
  styleUrls: ['./execute-payment.component.scss'],
})
export class ExecutePaymentComponent implements OnInit {
  @ViewChild('amountToPayInput') public amountToPayInput: ElementRef;
  @ViewChild('amountToPayInputDispatch')
  popUpIsOpenConditions = false;
  readonly inputValidators = InputValidators;
  public amountToPayInputDispatch: ElementRef;
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  currencyOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectCurrencyOptions,
  );
  clientBrokerOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatBrokerClienteForDropList,
  );
  banksOptions$: Observable<Array<DropListOption>> = this.store.select(selectCatBancoForDropList);
  creditNotes$: Observable<Array<IFccNotaCredito>> = this.store.select(
    executeCollectionDetailsSelectors.selectCreditNotes,
  );
  creditNotesTotals$: Observable<ICreditNotesTotals> = this.store.select(
    executeCollectionDetailsSelectors.selectCreditNotesTotals,
  );
  selectedClient$: Observable<VFacturaClienteCalendarioTotales> = this.store.select(
    executeCollectionDetailsSelectors.selectedClient,
  );
  contact$: Observable<ContactoDetalleObj> = this.store.select(
    executeCollectionDetailsSelectors.selectContactClient,
  );
  paymentMethodsOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatMedioDePagoForDropDown,
  );
  bankDataOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectBankDataOptions,
  );
  paymentTransaction$: Observable<IPaymentTransaction> = this.store.select(
    executeCollectionDetailsSelectors.selectPaymentTransaction,
  );
  clientPayment$: Observable<IFccPagoCliente> = this.store.select(
    executeCollectionDetailsSelectors.selectFccPagoCliente,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  rebillView$: Observable<boolean> = this.store.select(
    executeCollectionSelectors.selectIsInRebillView,
  );
  readonly MAIL_POP = 'mail';
  popUps: {
    mail: IPopUpConfig;
  };
  lodashIsEmpty = isEmpty;
  date = new Date();
  selectedEntry: IInvoice;
  tempAmountToPay = 0;

  @HostListener('document:click', ['$event'])
  clickOut(e?) {
    // TODO: Agregar validación correcta cuando se implementen los servicios
    if (
      this.selectedEntry &&
      this.selectedEntry.openInput &&
      this.tempAmountToPay >= this.selectedEntry.MontoPagado
    ) {
      if (
        this.amountToPayInput &&
        this.amountToPayInputDispatch &&
        e.target !== this.amountToPayInputDispatch.nativeElement &&
        e.target !== this.amountToPayInput.nativeElement
      ) {
        this.setAmountToPay(this.selectedEntry, this.tempAmountToPay);
      }
    }
  }

  constructor(private store: Store<AppState>, private router: Router) {
    this.popUps = {
      [this.MAIL_POP]: {isOpen: false, target: null},
    };
  }

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_BROKER_CLIENTE_LOAD());
    this.store.dispatch(GET_CAT_BANK_LOAD());
    this.store.dispatch(executeCollectionDetailsActions.SET_INITIAL_PAYMENT_TRANSACTION_DATA());
    this.store.dispatch(executeCollectionActions.SET_IS_IN_REBILL_VIEW({isInRebillView: false}));
  }

  setAmountToPay(bill: IInvoice, tempAmountToPay = this.tempAmountToPay): void {
    this.store.dispatch(
      executeCollectionDetailsActions.UPDATE_AMOUNT_TO_PAY_ITEM({
        bill: {...bill, MontoPagado: tempAmountToPay},
      }),
    );
  }

  deleteFile(data: {chipFile: IChipFile; index: number}): void {
    this.store.dispatch(executeCollectionDetailsActions.DELETE_FILE({name: data.chipFile.name}));
  }

  setFieldValue(field: string, value: string | Date): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_FIELD_VALUE_PAYMENT_DATA({
        field,
        value,
      }),
    );
    if (field === 'Monto' || field === 'TipoDeCambio') {
      this.store.dispatch(executeCollectionDetailsActions.CALCULATE_PAYMENT_CURRENCIES());
    }
  }

  setDropListOption(field: string, value: DropListOption): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_DROP_LIST_OPTION_PAYMENT_DATA({
        field,
        value,
      }),
    );
    if (field === 'selectedCurrency') {
      this.store.dispatch(executeCollectionDetailsActions.CALCULATE_PAYMENT_CURRENCIES());
    }
  }

  setCheckBoxValue(field: string, value: boolean): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_CHECK_BOX_VALUE_PAYMENT_DATA({
        field,
        value,
      }),
    );
  }

  handleCheckCreditNote(creditNodeId: string): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_CREDIT_NOTE_CHECK_BOX_VALUE({
        creditNodeId,
      }),
    );
  }

  handlePopUps(pop: string, isOpen): void {
    this.popUps = {
      ...this.popUps,
      [pop]: {
        isOpen,
      },
    };
  }

  addFile(file: File): void {
    const customFile: IUploadFileCustom = {file, name: file.name};
    this.store.dispatch(executeCollectionDetailsActions.ADD_FILE({file: customFile}));
  }

  handleDate(value) {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.setFieldValue('FechaPagoDate', date);
    this.setFieldValue('FechaPago', stringDate);
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }

  trackByCreditNote(index: number, creditNote: IFccNotaCredito): string {
    return creditNote.IdFCCNotaCredito;
  }

  closePopUp(event, refPopUp: string): void {
    if (refPopUp === 'conditions') {
      this.popUpIsOpenConditions = false;
    }
  }
}
