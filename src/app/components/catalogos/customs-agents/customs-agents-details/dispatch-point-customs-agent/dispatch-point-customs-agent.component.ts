/*CORE*/
import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {debounce, isEmpty} from 'lodash-es';
/*MODELS*/
import {OptionBar} from '@appModels/options-bar/options-bar';
import {AduanaDetalle, ConceptoAgenteAduanal, Direccion} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
/*ACTIONS*/
import {customAgentDetailsActions} from '@appActions/forms/custom-agent-form';
import {GET_CAT_LUGAR_DESPACHO_LOAD} from '@appActions/catalogs/catalogos.actions';
/*SELECTORS*/
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectCatPaisForDropDownList} from '@appSelectors/catalogs/catalogs.selectors';

import {DEFAULT_TIME_DEBOUNCE_SEARCH, DEFAULT_UUID} from '@appUtil/common.protocols';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Loader} from '@googlemaps/js-api-loader';
import {selectApiKeyMaps} from '@appSelectors/settings/settings.selectors';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-dispatch-point-customs-agent',
  templateUrl: './dispatch-point-customs-agent.component.html',
  styleUrls: ['./dispatch-point-customs-agent.component.scss'],
})
export class DispatchPointCustomsAgentComponent implements OnInit {
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  dispatchPointOptions$: Observable<Array<OptionBar>> = this.store.select(
    customAgentsDetailsSelectors.selectDispatchPointOptions,
  );
  editMode$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEnableEdit);
  selectedDispatchPoint$: Observable<AduanaDetalle> = this.store.select(
    customAgentsDetailsSelectors.selectedDispatchPoint,
  );
  catCountry$: Observable<Array<DropListOption>> = this.store.select(selectCatPaisForDropDownList);
  selectCatPais$: Observable<DropListOption> = this.store.select(
    customAgentsDetailsSelectors.selectedCountriDP,
  );
  isMexicanAddress$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.selectedFormCountryIsMexican,
  );

  selectAddress$: Observable<Direccion> = this.store.select(
    customAgentsDetailsSelectors.selectAddress,
  );
  selectFees$: Observable<Array<ConceptoAgenteAduanal>> = this.store.select(
    customAgentsDetailsSelectors.selectFees,
  );
  canAddNewDispatchPoint: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.validateNewDispathPoint,
  );
  apiStatus$: Observable<number> = this.store.select(customAgentsDetailsSelectors.selectApiStatus);
  addRate$: Observable<ConceptoAgenteAduanal> = this.store.select(
    customAgentsDetailsSelectors.selectAddRate,
  );
  addFeeButton$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.addRateButton,
  );
  dispatchPlaces$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectDispatchPlaceForDropDown,
  );
  selectedDispatchPlace$: Observable<DropListOption> = this.store.select(
    customAgentsDetailsSelectors.selectedDispatchPlace,
  );
  selectInitialDispatchPoint$: Observable<AduanaDetalle> = this.store.select(
    customAgentsDetailsSelectors.selectInitialDispatchPoint,
  );
  enableZipCodeInput$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.enableDispatchPointZipCodeInput,
  );
  allowEditForm$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.selectAllowEditForm,
  );
  viewTypes = AppViewTypes;
  lodashIsEmpty = isEmpty;
  validators = InputValidators;
  defaultUid = DEFAULT_UUID;
  predictionsList: DropListOption[] = [];
  searchTermGoogleMaps = '';
  apiKeyValue = null;
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  readonly inputValidators = InputValidators;
  constructor(private store: Store<AppState>) {}

  async ngOnInit(): Promise<void> {
    this.store.dispatch(GET_CAT_LUGAR_DESPACHO_LOAD());
    this.store.dispatch(customAgentDetailsActions.FETCH_DISPATCH_POINTS_LOAD());
    this.apiKeyValue = await this.getApiKey();
  }

  selectOption(option: OptionBar): void {
    this.store.dispatch(customAgentDetailsActions.CHANGE_DISPATCH_POINT_COMPONENT_EFFECT({option}));
  }

  setRateInfo(input: string, value: any): void {
    if (
      input === 'LimiteMaximo' ||
      input === 'Porcentaje' ||
      input === 'MontoExportacion' ||
      input === 'MontoImportacion'
    ) {
      // DOCS: Se cambia a 0 porque el back no acepta null
      value = value === '' ? 0 : Number(value);
    }
    this.store.dispatch(customAgentDetailsActions.SET_RATE_INFO({input, value}));
  }

  setAddressData(input: string, value): void {
    this.store.dispatch(customAgentDetailsActions.SET_ADDRESS_DATA({input, value}));
  }

  setGeneralData(input: string, value): void {
    this.store.dispatch(customAgentDetailsActions.SET_DATA({value, input}));
  }

  deleteRate(rate): void {
    this.store.dispatch(customAgentDetailsActions.DELETE_RATE({rate}));
  }

  addNewRate(): void {
    this.store.dispatch(customAgentDetailsActions.ADD_NEW_RATE_COMPONENT_EFFECT());
  }

  setNameDispatchName(name: string): void {
    this.store.dispatch(customAgentDetailsActions.SET_NAME_NEW_DISPATCH_POINT({name}));
  }

  setNewDP(): void {
    this.store.dispatch(customAgentDetailsActions.ADD_NEW_DISPATCH_POINT_EFFECT());
  }

  async getApiKey(): Promise<string> {
    return await lastValueFrom(this.store.pipe(select(selectApiKeyMaps), take(1)));
  }
  async changeSearchTerm(input: string): Promise<void> {
    this.predictionsList = [];
    if (!input) {
      return;
    }

    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: 'weekly',
      libraries: ['places'],
    });
    loader.load().then(() => {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {input: input},
        (
          predictions: google.maps.places.QueryAutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus,
        ) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            return;
          }
          this.predictionsList = predictions.map(
            (prediction: google.maps.places.QueryAutocompletePrediction) => {
              const obj: DropListOption = {
                label: prediction.description,
                value: prediction.place_id,
              };
              return obj;
            },
          );
        },
      );
    });
  }
  handleItemSelected(option: DropListOption): void {
    this.store.dispatch(customAgentDetailsActions.SET_ALLOWED_EDIT_FORM({value: true}));

    this.searchTermGoogleMaps = option.label;
    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: 'weekly',
      libraries: ['places'],
    });
    loader.load().then(() => {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        {placeId: option.value},
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const addressDetails: google.maps.GeocoderAddressComponent[] =
              results[0].address_components;
            addressDetails.forEach((detail: google.maps.GeocoderAddressComponent) => {
              // Se hace un barrido de todos los types porque pueden venir desordenados
              detail.types.forEach((type: string): void => {
                switch (type) {
                  case 'country': {
                    this.getDropOptionCountry(
                      detail.short_name,
                    ).then((countryOption: DropListOption) =>
                      this.setAddressData('IdCatPais', countryOption),
                    );
                    break;
                  }
                  case 'route': {
                    this.setAddressData('Calle', detail.long_name);
                    break;
                  }
                  case 'street_number': {
                    this.setAddressData('NumeroExterior', detail.long_name);
                    break;
                  }
                  case 'postal_code': {
                    this.setAddressData('CodigoPostal', detail.long_name);
                    break;
                  }
                  case 'administrative_area_level_1': {
                    this.setAddressData('Estado', detail.long_name);
                    break;
                  }
                  case 'locality': {
                    this.setAddressData('Ciudad', detail.long_name);
                    this.setAddressData('Municipio', detail.long_name);
                    break;
                  }
                  case 'sublocality_level_1': {
                    this.setAddressData('Colonia', detail.long_name);
                    break;
                  }
                  default:
                    break;
                }
              });
            });
          }
        },
      );
    });
  }
  async getDropOptionCountry(nameCountry: string): Promise<DropListOption> {
    const listCountry: DropListOption[] = await lastValueFrom(
      this.store.pipe(select(catalogsSelectors.selectCatPaisForDropDownListWithLabelKey), take(1)),
    );
    return listCountry.find((item: DropListOption): boolean => item.labelKey === nameCountry);
  }
  handleClearSearchTerm(): void {
    this.searchTermGoogleMaps = '';
    this.predictionsList = [];
  }
  setResetForm() {
    this.handleClearSearchTerm();
    this.store.dispatch(customAgentDetailsActions.SET_RESET_FORM());
  }
}
