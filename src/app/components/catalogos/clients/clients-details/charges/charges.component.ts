// CORE
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
// MODELS
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  Billing,
  ClientDataSTP,
  Credit,
} from '@appModels/store/forms/clients-form/clients-details-form/charges/charges-clients-form.models';
import {Cliente} from 'api-catalogos';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// ACTIONS
import {chargesActions} from '@appActions/forms/client-form';
import {GET_DATADROPLIST_PAGO_LOAD} from '@appActions/forms/client-form/clients-details-form/charges-clients-form/charges-clients-form.actions';
// SELECTORS
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {clientChargesSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {ENUM_PAYMENT_CONDITIONS} from '@appUtil/common.protocols';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss'],
})
export class ChargesComponent implements OnInit, OnDestroy {
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);
  billing$: Observable<Billing> = this.store.select(clientChargesSelectors.selectBilling);
  credit$: Observable<Credit> = this.store.select(clientChargesSelectors.selectCredit);
  clientSTP$: Observable<ClientDataSTP> = this.store.select(clientChargesSelectors.selectClientSTP);
  clientSelected: Observable<Cliente> = this.store.select(
    clientChargesSelectors.selectClientSelected,
  );
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  selectedPaymentCondition$: Observable<DropListOption> = this.store.select(
    clientChargesSelectors.selectPaymentConditionsSelected,
  );
  selectPaymentConditions$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPaymentConditionsForDropDown,
  );
  selectPaymentForm$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatMedioDePagoForDropDown,
  );

  selectCatUsoCFDISelected$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatUsoCFDISelectedForDropDown,
  );

  selectCatMetodoDePagoCFDISelected$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatMetodoDePagoCFDISelectedForDropDown,
  );
  selectEnterprise$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectvEmpresasForDropDown,
  );

  selectCatRevisionSelected$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatRevisionSelectedForDropDown,
  );

  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  readonly enumpaymentconditions = ENUM_PAYMENT_CONDITIONS;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(GET_DATADROPLIST_PAGO_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(chargesActions.CLEAN_CHARGES_CLIENT_STATE());
  }

  setPaymentConditions(paymentCondition: DropListOption): void {
    this.store.dispatch(chargesActions.SET_PAYMENT_CONDITIONS({paymentCondition}));
  }

  setPaymentForm(paymentForm: DropListOption): void {
    this.store.dispatch(chargesActions.SET_PAYMENT_FORM({paymentForm}));
  }

  setAccountNumber(accountNumber): void {
    this.store.dispatch(chargesActions.SET_ACCOUNT_NUMBER({accountNumber}));
  }

  setCreditLine(creditLine: string): void {
    this.store.dispatch(
      chargesActions.SET_CREDIT_LINE({
        creditLine,
      }),
    );
  }

  setOverdraft(overdraft): void {
    this.store.dispatch(chargesActions.SET_OVERDRAFT({overdraft}));
  }

  setProcessPurchaseOrder(value: boolean): void {
    this.store.dispatch(chargesActions.SET_PROCESS_PURCHASE_ORDER({value}));
  }

  setProcessWithoutPurchaseOrder(value: boolean): void {
    this.store.dispatch(chargesActions.SET_PROCESS_WITHOUT_PURCHASE_ORDER({value}));
  }

  setAccountNumberSTP(accountNumber: string): void {
    this.store.dispatch(chargesActions.SET_ACCOUNT_NUMBER_STP({accountNumber}));
  }

  setPublicationsAccountNumberSTP(accountNumber: string): void {
    this.store.dispatch(
      chargesActions.SET_PUBLICATIONS_ACCOUNT_NUMBER_STP({
        accountNumber,
      }),
    );
  }

  setAlias(alias: string): void {
    this.store.dispatch(chargesActions.SET_ALIAS({alias}));
  }

  setPublicationAlias(publicationAlias: string): void {
    this.store.dispatch(chargesActions.SET_PUBLICATIONS_ALIAS({publicationAlias}));
  }

  setReviewType(reviewType: DropListOption): void {
    this.store.dispatch(chargesActions.SET_REVIEW_TYPE({reviewType}));
  }

  setUseCfdi(useCfdi: DropListOption): void {
    this.store.dispatch(chargesActions.SET_USE_CFDI({useCfdi}));
  }

  setPaymentMethod(paymentMethod: DropListOption): void {
    this.store.dispatch(chargesActions.SET_PAYMENT_METHOD({paymentMethod}));
  }
}
