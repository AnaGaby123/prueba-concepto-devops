/* Core Container */
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {ICard} from '@appModels/card/card';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';

/* Selectors Imports */
import {
  adjustmentDetailsDetailsListOfferAdjustmentSelectors,
  adjustmentDetailsDetailsSelectors,
} from '@appSelectors/pendings/offer-adjustment';

/* Tools Imports */
import {isEmpty} from 'lodash-es';
import {
  offerAdjustmentDetailsActions,
  offerAdjustmentDetailsListOfferActions,
} from '@appActions/pendings/offer-adjustment';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectCatReasonRejectionForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {
  IAuthorization,
  offerAdjustCarrousel,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {GET_CAT_TIPOS_AUTORIZACION_LOAD} from '@appActions/catalogs/catalogos.actions';

@Component({
  selector: 'app-list-offer-adjustment',
  templateUrl: './list-offer-adjustment.component.html',
  styleUrls: ['./list-offer-adjustment.component.scss'],
})
export class ListOfferAdjustmentComponent
  implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
  cardOptions$: Observable<Array<ICard>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectCarrouselOptions,
  );
  isLoadingQuotations$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectCarrouselApiStatus,
  );
  selectedQuotation$: Observable<offerAdjustCarrousel> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedCarrouselCard,
  );
  deliveryTimeValidator$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsSelectors.deliveryTimeNextStepEnableValidator,
  );
  paymentConditionsValidator$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsSelectors.paymentConditionsNextStepEnableValidator,
  );
  priceValidator$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsSelectors.priceNextStepEnableValidator,
  );
  code$: Observable<Array<string>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectCode,
  );
  authorization$: Observable<IAuthorization> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectAuthorization,
  );
  codePopInfoMessage$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectCodePopInfoMessage,
  );
  rejectReason: DropListOption = null;
  viewType$: Observable<string> = this.store.select(selectViewType);
  clientName$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectNameClientSelected,
  );
  indexClientSelected$: Observable<string | number> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectIndexClientSelected,
  );
  strategyClientSelected$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectStrategyClientSelected,
  );
  totalInAdjustment$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectTotalInAdjustment,
  );
  valuesPercentageBar$: Observable<Array<IPercentageBarItems>> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectDataPercentageBar,
  );
  totalInClosingBarData$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectTotalInClosing,
  );
  valuesPercentageBarPopUpFirst$: Observable<Array<IPercentageBarItems>> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectDataPercentageBarPopUpFirst,
  );
  valuesPercentageBarPopUpSecond$: Observable<Array<IPercentageBarItems>> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectDataPercentageBarPopUpSecond,
  );
  optionsBarActivities$: Observable<Array<BarActivityOption>> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectOptionsBarActivities,
  );
  optionBarActivitySelected$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectOptionBarActivitySelected,
  );
  rejectReason$: Observable<Array<DropListOption>> = this.store.select(
    selectCatReasonRejectionForDropDown,
  );
  folioQuotationSelected$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectFolioQuotationsSelected,
  );
  idRequestAuthorizationChange$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectIdRequestAuthorizationChange,
  );
  isOpenPopUpCode$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectIsOpenPopUpCode,
  );
  isOpenPopUpReject$: Observable<any> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectIsOpenPopUpReject,
  );
  popUpPercentageBars = false;
  popUpPercentageBarsTarget: HTMLElement;
  lodashIsEmpty = isEmpty;
  readonly viewTypes = AppViewTypes;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_TIPOS_AUTORIZACION_LOAD());
    this.fetchTotalInClosingDataBar();
    this.addPasosBarActivity(0);
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(offerAdjustmentDetailsActions.CLEAN_ALL_OFFER_ADJUSTMENT_DETAILS());
    this.store.dispatch(offerAdjustmentDetailsListOfferActions.CLEAN_CONTENT_DETAILS_GENERAL());
    this.store.dispatch(offerAdjustmentDetailsActions.CLEAN_CLIENT_SELECTED());
  }

  fetchTotalInClosingDataBar(): void {
    this.store.dispatch(
      offerAdjustmentDetailsListOfferActions.FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING(),
    );
  }

  handleOptionSelected(option: ICard) {
    this.store.dispatch(offerAdjustmentDetailsActions.SET_SELECTED_QUOTATION({quotation: option}));
    this.store.dispatch(
      offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE({popUpCode: false}),
    );
    this.store.dispatch(
      offerAdjustmentDetailsListOfferActions.SET_OPTION_BAR_ACTIVITY({
        barActivitySelected: 0,
      }),
    );
  }

  handlePopUp(pop: string, value: boolean, target: any): void {
    const popsSwitch = {
      percentageBars: () => {
        (this.popUpPercentageBars = value),
          (this.popUpPercentageBarsTarget = target as HTMLElement);
      },
    };
    const result = popsSwitch[pop]();
  }

  handlePopUpReject(status: boolean, event?: string): void {
    this.store.dispatch(
      offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_REJECT({
        popUpReject: status,
      }),
    );
    if (event === 'reject' && status) {
      this.store.dispatch(
        offerAdjustmentDetailsListOfferActions.REJECT_ADJUSTMENT_LOAD({
          IdAjOfRazonRechazo: this.rejectReason.value,
        }),
      );
    }
    this.rejectReason = null;
  }

  handleSetCodeValue(code) {
    this.store.dispatch(offerAdjustmentDetailsActions.SET_CODE_VALUE({code}));
  }

  handleValidateCode(code) {
    this.store.dispatch(offerAdjustmentDetailsActions.VERIFICATION_CODE_REVIEW_LOAD({code}));
  }
  addPasosBarActivity(barActivitySelected: number): void {
    this.store.dispatch(
      offerAdjustmentDetailsListOfferActions.SET_OPTION_BAR_ACTIVITY({
        barActivitySelected,
      }),
    );
  }
  handleValidateAdjustment() {
    this.store.dispatch(offerAdjustmentDetailsListOfferActions.SEND_ADJUSTMENT_OFFER_LOAD());
  }

  handlePopEvent(event) {
    if (event.type === 'secondary') {
      this.store.dispatch(offerAdjustmentDetailsActions.CANCEL_AUTHORIZATION_CODE_LOAD());
    }
  }
}
