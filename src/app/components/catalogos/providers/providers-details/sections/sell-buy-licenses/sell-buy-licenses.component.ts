/* Core Imports */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
import {selectvCatMonedaForDropDownList} from '@appSelectors/catalogs/catalogs.selectors';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

/* Actions Imports */
/* Models Imports */
import * as providerSelectors from '@appSelectors/forms/providers';
import * as providerActions from '@appActions/forms/providers';
import {Proveedor, ProveedorRegalias} from 'api-catalogos';
import {ProviderCompanyList} from '@appModels/store/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AppViewTypes} from '@appModels/store/utils/utils.model';

/* Dev Tools */
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-sell-buy-licenses',
  templateUrl: './sell-buy-licenses.component.html',
  styleUrls: ['./sell-buy-licenses.component.scss'],
})
export class SellBuyLicensesComponent implements OnInit, OnDestroy {
  addLicense$: Observable<boolean> = this.store.select(
    providerSelectors.buySaleProviderSelectors.enableAddLicense,
  );
  customizeCheck$: Observable<boolean> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectCustomizedCheck,
  );
  enableEdit$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectEnableEdit,
  );
  factorConversion$: Observable<number | null> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectFactorConversion,
  );
  itemMonths$: Observable<Array<DropListOption>> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectMonthsOptions,
  );
  itemBuyCurrency$: Observable<any> = this.store.select(selectvCatMonedaForDropDownList);
  itemSaleCurrency$: Observable<any> = this.store.select(selectvCatMonedaForDropDownList);
  listProviderCompanies$: Observable<Array<ProviderCompanyList>> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectProviderCompanies,
  );
  licenseForm$: Observable<ProveedorRegalias> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectLicenseForm,
  );
  modeEdit$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectModeEdit,
  );
  mothSelected$: Observable<DropListOption> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectedMonth,
  );
  providerData$: Observable<Proveedor> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectProviderNode,
  );
  providerLicenses$: Observable<Array<ProveedorRegalias>> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectProviderLicenses,
  );
  selectedCatMoneyBuy$: Observable<DropListOption> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectedCatMoneyBuy,
  );
  selectedCatMoneySale$: Observable<DropListOption> = this.store.select(
    providerSelectors.buySaleProviderSelectors.selectedCatMoneySale,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(providerActions.buySaleProviderActions.GET_INITIAL_STATE());
  }

  ngOnDestroy() {
    this.store.dispatch(providerActions.buySaleProviderActions.CLEAN_STATE());
  }

  setProviderData(input: string, value: any): void {
    if (input === 'FactorConversion') {
      value = value === '' ? null : Number(value);
    }
    this.store.dispatch(providerActions.buySaleProviderActions.SET_PROVIDER_DATA({input, value}));
  }

  licenseData(input: string, value: any): void {
    if (input === 'Porcentaje') {
      value = Number(value);
    }
    this.store.dispatch(
      providerActions.buySaleProviderActions.SET_NEW_LICENSE_DATA({
        input,
        value,
      }),
    );
  }

  setLicenseForm(): void {
    this.store.dispatch(providerActions.buySaleProviderActions.SET_LICENSE_FORM());
  }

  editItemChecked(item: ProveedorRegalias, value: boolean): void {
    this.store.dispatch(providerActions.buySaleProviderActions.EDIT_ITEM_CHECKED({item, value}));
  }

  setMoth(month: DropListOption, check?: boolean): void {
    this.store.dispatch(providerActions.buySaleProviderActions.SET_MONTH({month}));
  }

  setCustomizedCheck(value): void {
    this.store.dispatch(
      providerActions.buySaleProviderActions.SET_CUSTOMIZED_CHECK({
        value,
      }),
    );
  }

  setCompany(company, value: boolean): void {
    this.store.dispatch(
      providerActions.buySaleProviderActions.UPDATE_COMPANY_INFO({
        company: company.IdEmpresa,
        value,
      }),
    );
  }

  setClientNumber(IdEmpresa, value: string): void {
    this.store.dispatch(
      providerActions.buySaleProviderActions.SET_CLIENT_NUMBER({
        IdEmpresa,
        value,
      }),
    );
  }

  handleTrackBy(index: number, complexItem: ProviderCompanyList): string {
    return complexItem.IdEmpresa;
  }
}
