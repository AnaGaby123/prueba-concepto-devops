import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {ILimitLine} from '@appModels/progress-bar/limit-line';
import {Store} from '@ngrx/store';
import {
  ICancelInvoice,
  ICreditNote,
  IRebillRadio,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
import {attendViewDetailsSelectors} from '@appSelectors/pendings/charges/attend-review';
import {attendReviewDetailsActions} from '@appActions/pendings/charges/attend-review';

@Component({
  selector: 'app-rebill',
  templateUrl: './rebill.component.html',
  styleUrls: ['./rebill.component.scss'],
})
export class RebillComponent implements OnDestroy {
  popUpIsOpenConditions = false;
  codePop = false;
  mailPop = false;
  generatedCode = false;
  itemsMoneda: Observable<any[]>;
  idCliente: Observable<any>;
  reasonOptions$: Observable<Array<DropListOption>> = this.store.select(
    attendViewDetailsSelectors.selectReasonOptions,
  );
  cancelInvoiceState$: Observable<ICancelInvoice> = this.store.select(
    attendViewDetailsSelectors.selectCancelInvoiceState,
  );
  radioButtons$: Observable<Array<IRadioButton>> = this.store.select(
    attendViewDetailsSelectors.selectRadioButtons,
  );
  rebillState$: Observable<IRebillRadio> = this.store.select(
    attendViewDetailsSelectors.selectRebillState,
  );
  creditNoteState$: Observable<ICreditNote> = this.store.select(
    attendViewDetailsSelectors.selectCreditNoteState,
  );
  cancelInvoiceButtonValidator$: Observable<boolean> = this.store.select(
    attendViewDetailsSelectors.validatorForConfirmCancellation,
  );
  rebillCheck$: Observable<boolean> = this.store.select(
    attendViewDetailsSelectors.selectRebillCheckBox,
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

  ngOnDestroy(): void {
    this.store.dispatch(attendReviewDetailsActions.CLEAN_ALL_REBILL_STATE());
  }

  setActiveRadioButton(value: boolean, name: string): void {
    this.store.dispatch(
      attendReviewDetailsActions.SET_RADIO_BUTTON_SELECTED({
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
      this.store.dispatch(attendReviewDetailsActions.SET_REASON_CANCEL_INVOICE({reason}));
    } else if (name === 'rebill') {
      this.store.dispatch(attendReviewDetailsActions.SET_REASON_REBILL({reason}));
    }
  }

  setCheckBox(): void {
    this.store.dispatch(attendReviewDetailsActions.SET_CHECK_BOX());
  }

  setIsInItemsView(value: boolean): void {
    this.store.dispatch(attendReviewDetailsActions.SET_IS_IN_ITEMS_VIEW({value}));
  }

  setCFDI(item): void {
    this.store.dispatch(attendReviewDetailsActions.SET_CFDI({item}));
  }

  setFile(file): void {
    this.store.dispatch(attendReviewDetailsActions.SET_FILE_INVOICE({file}));
  }
}
