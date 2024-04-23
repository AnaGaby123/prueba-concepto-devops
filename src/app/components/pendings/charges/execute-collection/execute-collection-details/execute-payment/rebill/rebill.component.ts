import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  ICancelInvoice,
  ICreditNote,
  IRebillRadio,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {ILimitLine} from '@appModels/progress-bar/limit-line';
import {Store} from '@ngrx/store';
import {executeCollectionDetailsSelectors} from '@appSelectors/pendings/charges/execute-collection';
import {executeCollectionDetailsActions} from '@appActions/pendings/charges/execute-collection';

@Component({
  selector: 'app-rebill',
  templateUrl: './rebill.component.html',
  styleUrls: ['./rebill.component.scss'],
})
export class RebillComponent {
  popUpIsOpenConditions = false;
  codePop = false;
  mailPop = false;
  generatedCode = false;
  itemsMoneda: Observable<any[]>;
  idCliente: Observable<any>;
  reasonOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectReasonOptions,
  );
  cancelInvoiceState$: Observable<ICancelInvoice> = this.store.select(
    executeCollectionDetailsSelectors.selectCancelInvoiceState,
  );
  radioButtons$: Observable<Array<IRadioButton>> = this.store.select(
    executeCollectionDetailsSelectors.selectRadioButtons,
  );
  rebillState$: Observable<IRebillRadio> = this.store.select(
    executeCollectionDetailsSelectors.selectRebillState,
  );
  creditNoteState$: Observable<ICreditNote> = this.store.select(
    executeCollectionDetailsSelectors.selectCreditNoteState,
  );
  cancelInvoiceButtonValidator$: Observable<boolean> = this.store.select(
    executeCollectionDetailsSelectors.validatorForConfirmCancellation,
  );
  rebillCheck$: Observable<boolean> = this.store.select(
    executeCollectionDetailsSelectors.selectRebillCheckBox,
  );

  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  limits: Array<ILimitLine> = [
    {
      percentagePosition: '10',
      color: '#CC4757FF',
    },
  ];
  mailList = [];

  constructor(private store: Store) {}

  setActiveRadioButton(value: boolean, name: string): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_RADIO_BUTTON_SELECTED({
        radioButton: {value, label: name},
      }),
    );
  }

  closePopUp(event, refPopUp: string): void {
    if (refPopUp === 'conditions') {
      this.popUpIsOpenConditions = false;
    } else if (refPopUp === 'codePop' && event === true) {
      this.generatedCode = true;
    } else if (refPopUp === 'codePop' && event === false) {
      this.codePop = false;
    } else if (refPopUp === 'mailPop') {
      this.mailPop = false;
    }
  }

  setReason(reason, name: string): void {
    if (name === 'cancelInvoice') {
      this.store.dispatch(executeCollectionDetailsActions.SET_REASON_CANCEL_INVOICE({reason}));
    } else if (name === 'rebill') {
      this.store.dispatch(executeCollectionDetailsActions.SET_REASON_REBILL({reason}));
    }
  }

  setCheckBox(): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_CHECK_BOX());
  }

  setIsInItemsView(value: boolean): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_IS_IN_ITEMS_VIEW({value}));
  }

  setCFDI(item: DropListOption): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_CFDI({item}));
  }

  setFile(file): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_FILE_INVOICE({file}));
  }
}
