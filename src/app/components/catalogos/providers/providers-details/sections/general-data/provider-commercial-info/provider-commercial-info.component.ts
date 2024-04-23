import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {generalDataProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';
import {Proveedor} from 'api-logistica';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  selectvBuyerCatCustomerForDropDownList,
  selectvPayerCatCustomerForDropDownList,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {generalDataProviderActions} from '@appActions/forms/providers';
import {debounce} from 'lodash-es';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-provider-commercial-info',
  templateUrl: './provider-commercial-info.component.html',
  styleUrls: ['./provider-commercial-info.component.scss'],
})
export class ProviderCommercialInfoComponent {
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  itemCatBuyerCustomer$: Observable<Array<DropListOption>> = this.store.select(
    selectvBuyerCatCustomerForDropDownList,
  );
  itemCatPayerCustomer$: Observable<Array<DropListOption>> = this.store.select(
    selectvPayerCatCustomerForDropDownList,
  );

  modeEdit$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  providerData$: Observable<Proveedor> = this.store.select(
    generalDataProviderSelectors.selectGeneralDataProviderObject,
  );
  selectedCatCustomerBuy$: Observable<DropListOption> = this.store.select(
    generalDataProviderSelectors.selectedCatCustomerBuy,
  );
  selectedCatCustomerPay$: Observable<DropListOption> = this.store.select(
    generalDataProviderSelectors.selectedCatCustomerPay,
  );
  readonly FIELD_INPUT = 'input';
  readonly FIELD_DROP_LIST = 'dropList';
  readonly FIELD_CHECK_BOX = 'checkBox';
  readonly DATA_MODEL_TYPE_PROVIDER = 'provider';
  readonly FIELD_PLACE_IN_PHS = 'ColocarPhs';
  readonly FIELD_DESIRED_OBJECTIVE = 'ObjetivoCrecimientoDeseado';
  readonly FIELD_FUNDAMENTAL_OBJECTIVE = 'ObjetivoCrecimientoFundamental';
  readonly FIELD_BUYER = 'IdUsuarioComprador';
  readonly FIELD_PAYER = 'IdUsuarioPagador';
  readonly inputValidators = InputValidators;

  handlePercentageInput = debounce(this.generalDataHandler, DEFAULT_TIME_DEBOUNCE_SEARCH); // Before value of time was 100

  constructor(private store: Store<AppState>) {}

  generalDataHandler(
    fieldValueData,
    fieldName: string,
    typeField: string,
    dataModelType: string,
  ): void {
    if (
      fieldName === 'ObjetivoCrecimientoFundamental' ||
      fieldName === 'ObjetivoCrecimientoDeseado'
    ) {
      fieldValueData = Number(fieldValueData);
    }
    const fieldValue = typeField === this.FIELD_DROP_LIST ? fieldValueData.value : fieldValueData;
    this.store.dispatch(
      generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
        fieldName,
        fieldValue,
        dataModelType,
      }),
    );
  }
}
