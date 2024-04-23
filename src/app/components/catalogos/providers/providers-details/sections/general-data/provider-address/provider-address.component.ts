import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {Direccion} from 'api-logistica';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {generalDataProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';

import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';

import {generalDataProviderActions} from '@appActions/forms/providers';

import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {CatPais} from 'api-catalogos';
import {debounce, find} from 'lodash-es';
import {take} from 'rxjs/operators';
import {Loader} from '@googlemaps/js-api-loader';
import {selectApiKeyMaps} from '@appSelectors/settings/settings.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-provider-address',
  templateUrl: './provider-address.component.html',
  styleUrls: ['./provider-address.component.scss'],
})
export class ProviderAddressComponent {
  addressData$: Observable<Direccion> = this.store.select(
    generalDataProviderSelectors.selectAddress,
  );
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  itemPais$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPaisForDropDownList,
  );
  itemsRutasEntrega$: Observable<Array<DropListOption>> = this.store.select(
    generalDataProviderSelectors.selectCATDeliveyRoutes,
  );
  itemsZonas$: Observable<Array<DropListOption>> = this.store.select(
    generalDataProviderSelectors.selectCatZonaForDropDownList,
  );
  modeEdit$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  selectedCatPais$: Observable<DropListOption> = this.store.select(
    generalDataProviderSelectors.selectedCatPais,
  );
  allowedFormAddress$: Observable<boolean> = this.store.select(
    generalDataProviderSelectors.selectAllowedFormAddress,
  );
  isMexicanAddress$: Observable<boolean> = this.store.select(
    generalDataProviderSelectors.selectedFormCountryIsMexican,
  );
  selectedRoutesDelivery$: Observable<DropListOption> = this.store.select(
    generalDataProviderSelectors.selectedRoutesDelivery,
  );
  selectedZone$: Observable<DropListOption> = this.store.select(
    generalDataProviderSelectors.selectedZone,
  );
  isMexican$: Observable<boolean> = this.store.select(
    generalDataProviderSelectors.selectProviderIsMexican,
  );
  countries$: Observable<CatPais[]> = this.store.select(catalogsSelectors.selectCatPaisList);

  readonly FIELD_INPUT = 'input';
  readonly FIELD_DROP_LIST = 'dropList';
  readonly DATA_MODEL_TYPE_ADDRESS = 'address';
  readonly FIELD_STREET = 'Calle';
  readonly FIELD_EXTERNAL_NUMBER = 'NumeroExterior';
  readonly FIELD_APARTMENT_NUMBER = 'NumeroInterior';
  readonly FIELD_SUBURB = 'Colonia';
  readonly FIELD_CITY = 'Ciudad';
  readonly FIELD_MUNICIPALITY = 'Municipio';
  readonly FIELD_STATE = 'Estado';
  readonly FIELD_COUNTRY = 'IdCatPais';
  readonly FIELD_ZIP_CODE = 'CodigoPostal';
  readonly FIELD_TYPE_OF_REGION = 'IdCatRutaEntrega';
  readonly FIELD_REGION = 'IdCatZona';
  readonly inputValidators = InputValidators;
  // docs implementacion de buscador de google
  handleKeySearchDirection = debounce(
    (value) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  apiKey: Subscription;
  apiKeyValue = null;
  predictionsList: DropListOption[] = [];
  searchTermGoogleMaps = '';
  constructor(private store: Store<AppState>) {
    this.apiKey = this.store
      .select(selectApiKeyMaps)
      .subscribe((value: string) => (this.apiKeyValue = value));
  }

  generalDataHandler(
    fieldValueData,
    fieldName: string,
    typeField: string,
    dataModelType: string,
  ): void {
    const fieldValue = typeField === this.FIELD_DROP_LIST ? fieldValueData.value : fieldValueData;
    // DOCS: CHANGE COUNTRY INFO
    if (fieldName === 'IdCatPais') {
      this.countries$
        .subscribe((countries: CatPais[]) => {
          // DOCS: FIND AND SET COUNTRY NAME BY ITS ID IN PROVIDER STATE
          const {NombreEspanol, Codigo} = find(countries, ['IdCatPais', fieldValue]);
          this.store.dispatch(
            generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
              fieldName: 'Pais',
              fieldValue: NombreEspanol,
              dataModelType: 'provider',
            }),
          );
          // DOCS: SET COUNTRY ID IN PROVIDER STATE
          this.store.dispatch(
            generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
              fieldName,
              fieldValue,
              dataModelType: 'provider',
            }),
          );
          // DOCS: SET IF IT'S MEXICAN
          this.store.dispatch(
            generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
              fieldName: 'Mexicano',
              fieldValue: Codigo === 'MX',
              dataModelType: 'provider',
            }),
          );
        })
        .unsubscribe();
    }
    this.store.dispatch(
      generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
        fieldName,
        fieldValue,
        dataModelType,
      }),
    );
  }
  changeSearchTerm(input: string): void {
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
    this.store.dispatch(generalDataProviderActions.SET_ALLOWED_EDIT_FORM({value: true}));
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
              // docs Se hace un barrido de todos los types porque pueden venir desordenados
              detail.types.forEach((type: string): void => {
                switch (type) {
                  case 'country': {
                    this.getDropOptionCountry(
                      detail.short_name,
                    ).then((countryOption: DropListOption) =>
                      this.generalDataHandler(
                        countryOption,
                        this.FIELD_COUNTRY,
                        this.FIELD_DROP_LIST,
                        this.DATA_MODEL_TYPE_ADDRESS,
                      ),
                    );
                    break;
                  }
                  case 'route': {
                    this.generalDataHandler(
                      detail.long_name,
                      this.FIELD_STREET,
                      this.FIELD_INPUT,
                      this.DATA_MODEL_TYPE_ADDRESS,
                    );
                    break;
                  }
                  case 'street_number': {
                    this.generalDataHandler(
                      detail.long_name,
                      this.FIELD_EXTERNAL_NUMBER,
                      this.FIELD_INPUT,
                      this.DATA_MODEL_TYPE_ADDRESS,
                    );
                    break;
                  }
                  case 'postal_code': {
                    this.generalDataHandler(
                      detail.long_name,
                      this.FIELD_ZIP_CODE,
                      this.FIELD_INPUT,
                      this.DATA_MODEL_TYPE_ADDRESS,
                    );
                    break;
                  }
                  case 'administrative_area_level_1': {
                    this.generalDataHandler(
                      detail.long_name,
                      this.FIELD_STATE,
                      this.FIELD_INPUT,
                      this.DATA_MODEL_TYPE_ADDRESS,
                    );
                    break;
                  }
                  case 'locality': {
                    this.generalDataHandler(
                      detail.long_name,
                      this.FIELD_CITY,
                      this.FIELD_INPUT,
                      this.DATA_MODEL_TYPE_ADDRESS,
                    );
                    this.generalDataHandler(
                      detail.long_name,
                      this.FIELD_MUNICIPALITY,
                      this.FIELD_INPUT,
                      this.DATA_MODEL_TYPE_ADDRESS,
                    );
                    break;
                  }
                  case 'sublocality_level_1': {
                    this.generalDataHandler(
                      detail.long_name,
                      this.FIELD_SUBURB,
                      this.FIELD_INPUT,
                      this.DATA_MODEL_TYPE_ADDRESS,
                    );
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
      this.store.pipe(select(catalogsSelectors.selectCatPaisForDropDownList), take(1)),
    );
    return listCountry.find((item: DropListOption): boolean => item.labelKey === nameCountry);
  }
  handleClearSearchTerm(): void {
    this.searchTermGoogleMaps = '';
    this.predictionsList = [];
  }
  setResetForm() {
    this.handleClearSearchTerm();
    this.store.dispatch(generalDataProviderActions.SET_RESET_FORM());
  }
}
