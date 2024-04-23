import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {clientsAddressSelectors, clientsDetailsSelectors} from '@appSelectors/forms/clients-form';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import * as clientsAddressActions from '@appActions/forms/client-form/clients-details-form/address-clients-form/address-clients-form.actions';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DireccionCliente, VCliente} from 'api-catalogos';
import {
  InputValidators,
  RutaEntregaHelpers,
  TipoDireccion,
} from '@appHelpers/shared/shared.helpers';
import {addressesActions} from '@appActions/forms/client-form';
import {Loader} from '@googlemaps/js-api-loader';
import {
  selectApiKeyMaps,
  selectProquifaCdmxCords,
  selectProquifaGuadalajaraCords,
} from '@appSelectors/settings/settings.selectors';
import {take} from 'rxjs/operators';
import {debounce, isEmpty} from 'lodash-es';

import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {IDireccion} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {Cords} from '@appModels/store/settings/settings.model';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-delivery-addresses-dialog',
  templateUrl: './delivery-addresses-dialog.component.html',
  styleUrls: ['./delivery-addresses-dialog.component.scss'],
})
export class DeliveryAddressesDialogComponent implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageClient: ElementRef;
  addNewAddress$: Observable<boolean> = this.store.select(clientsAddressSelectors.enableAddAddress);
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);

  addressType$: Observable<Array<DropListOption>> = this.store.select(
    clientsAddressSelectors.addressTypesWithValidation,
  );
  selectedAddressType$: Observable<DropListOption> = this.store.select(
    clientsAddressSelectors.selectedAddressType,
  );
  routesList$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectvCatRutasEntregaForDropDownList,
  );
  selectedRoute$: Observable<DropListOption> = this.store.select(
    clientsAddressSelectors.selectedFormRoute,
  );
  zoneList$: Observable<Array<DropListOption>> = this.store.select(
    clientsAddressSelectors.selectCatZonaForDropDownList,
  );
  zoneSelected$: Observable<DropListOption> = this.store.select(
    clientsAddressSelectors.selectedFormZone,
  );
  enableShippingGuide$: Observable<boolean> = this.store.select(
    clientsAddressSelectors.enableShippingGuide,
  );
  selectedCountry$: Observable<DropListOption> = this.store.select(
    clientsAddressSelectors.selectedFormCountry,
  );
  listCountry$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPaisForDropDownList,
  );
  zipCodeValid$: Observable<boolean> = this.store.select(
    clientsAddressSelectors.selectZipCodeIsValid,
  );
  showMapConfig$: Observable<boolean> = this.store.select(clientsAddressSelectors.showMapConfig);
  direccionliente$: Observable<DireccionCliente> = this.store.select(
    clientsAddressSelectors.selectDireccionCliente,
  );

  isMexicanAddress$: Observable<boolean> = this.store.select(
    clientsAddressSelectors.selectedFormCountryIsMexican,
  );

  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  predictionsList: DropListOption[] = [];
  searchTermGoogleMaps = '';
  errorImageNativeElement = false;
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  imageNativeElement;
  apiKey: Subscription;
  apiKeyValue = null;
  ladDestino = 0;
  lngDestino = 0;
  proquifaCDMXCoords: Subscription;
  proquifaCDMXCoordsValue = {};
  proquifaGuadalajaraCoords: Subscription;
  proquifaGuadalajaraCoordsValue = {};
  // docs implementacion de buscador de google
  handleKeySearchDirection = debounce(
    (value) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  handleKeySearchCP = debounce((data) => this.handleChangeCP(data), DEFAULT_TIME_DEBOUNCE_SEARCH);
  recalculateDistance = false; // DOCS: Indica si se debe recalcular la distancia, es true cuando se modifica el CP manualmente

  addressForm$: Observable<IDireccion> = this.store.select(
    clientsAddressSelectors.selectAddressForm,
  );

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<DeliveryAddressesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.apiKey = this.store
      .select(selectApiKeyMaps)
      .subscribe((value: string) => (this.apiKeyValue = value));
    this.proquifaCDMXCoords = this.store
      .select(selectProquifaCdmxCords)
      .subscribe((value: Cords) => (this.proquifaCDMXCoordsValue = value));
    this.proquifaGuadalajaraCoords = this.store
      .select(selectProquifaGuadalajaraCords)
      .subscribe((value: Cords) => (this.proquifaGuadalajaraCoordsValue = value));
  }

  ngOnInit(): void {
    this.setImageClient();
  }

  ngOnDestroy(): void {
    this.apiKey.unsubscribe();
    this.proquifaCDMXCoords.unsubscribe();
    this.proquifaGuadalajaraCoords.unsubscribe();
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setDropDataAddress(input: string, value: DropListOption): void {
    if (input === 'IdCatTipoDireccion' && value.labelKey !== TipoDireccion.Entrega) {
      this.setInputAddressForm('PagaGuiaEnvio', false);
    }
    if (
      input === 'IdCatRutaEntrega' &&
      (value.labelKey === RutaEntregaHelpers.local ||
        value.labelKey === RutaEntregaHelpers.guadalajara)
    ) {
      this.setInputAddressForm('PagaGuiaEnvio', false);
    }
    if (input === 'IdCatRutaEntrega') {
      this.store.dispatch(addressesActions.CLEAN_DISTANCE_MAPS());
      if (
        value.labelKey === RutaEntregaHelpers.local ||
        value.labelKey === RutaEntregaHelpers.guadalajara
      ) {
        this.getDistance();
      }
    }
    this.store.dispatch(addressesActions.SET_DROP_FORM_DATA({value, input}));
  }

  setInputAddressForm(input: string, value): void {
    this.store.dispatch(
      addressesActions.SET_INPUT_FORM_DATA({
        input,
        value: !isEmpty(value) || typeof value === 'boolean' ? value : null,
      }),
    );
  }

  getDistance(): void {
    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const distanceMatrixService = new google.maps.DistanceMatrixService();

      this.getLatLngOrigin().then((latLng: google.maps.LatLngLiteral) => {
        if (!latLng || this.ladDestino === 0 || this.lngDestino === 0) {
          return;
        }
        const destination: google.maps.LatLngLiteral = {lat: this.ladDestino, lng: this.lngDestino};
        const request: google.maps.DistanceMatrixRequest = {
          origins: [latLng],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        };
        distanceMatrixService.getDistanceMatrix(
          request,
          (
            response: google.maps.DistanceMatrixResponse,
            status: google.maps.DistanceMatrixStatus,
          ): void => {
            if (status === google.maps.DistanceMatrixStatus.OK) {
              const distanceMtr: number = response.rows[0].elements[0].distance?.value;
              this.store.dispatch(
                addressesActions.FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT({
                  lat: this.ladDestino,
                  lng: this.lngDestino,
                }),
              );

              this.store.dispatch(
                addressesActions.FETCH_DISTANCE_SUCCESS({
                  DistanciaCartaPorte: distanceMtr / 1000,
                }),
              );
            }
          },
        );
      });
    });
  }

  async getLatLngOrigin(): Promise<google.maps.LatLngLiteral> {
    const selected: DropListOption = await lastValueFrom(
      this.store.pipe(select(clientsAddressSelectors.selectedFormRoute), take(1)),
    );
    if (!selected) {
      return null;
    }
    if (selected.label.toLowerCase() === RutaEntregaHelpers.local) {
      return this.proquifaCDMXCoordsValue as google.maps.LatLngLiteral;
    }
    if (selected.label.toLowerCase() === RutaEntregaHelpers.guadalajara) {
      return this.proquifaGuadalajaraCoordsValue as google.maps.LatLngLiteral;
    }
    return null;
  }

  handleChangeCP(value: string): void {
    this.getLatLngOrigin().then((latLng: google.maps.LatLngLiteral | null) => {
      this.setInputAddressForm('CodigoPostal', value);
      if (!latLng) {
        // Se regresa null cuando no está seleccionada la ruta o es diferente a local o guadalajara
        return;
      }
      if (!this.recalculateDistance) {
        this.recalculateDistance = true;
        return;
      }
      this.store.dispatch(addressesActions.CLEAN_DISTANCE_MAPS());
      this.changePostalCode(value);
    });
  }

  changePostalCode(input: string): void {
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
        {input: input, componentRestrictions: {country: 'mx'}, types: ['postal_code']},
        (
          predictions: google.maps.places.QueryAutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus,
        ) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions ||
            predictions.length === 0
          ) {
            return;
          }
          const placeId = predictions[0].place_id;
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            {placeId: placeId},
            (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
              if (status === google.maps.GeocoderStatus.OK) {
                this.ladDestino = results[0].geometry?.location?.lat();
                this.lngDestino = results[0].geometry?.location?.lng();
                this.getDistance();
              }
            },
          );
        },
      );
    });
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
    this.store.dispatch(addressesActions.SET_RESET_FORM());
    this.store.dispatch(addressesActions.SET_ALLOWED_EDIT_FORM({value: true}));
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
            this.ladDestino = results[0].geometry?.location?.lat();
            this.lngDestino = results[0].geometry?.location?.lng();
            const addressDetails: google.maps.GeocoderAddressComponent[] =
              results[0].address_components;
            const hasPostalCode: boolean = addressDetails.some(
              (detail: google.maps.GeocoderAddressComponent): boolean =>
                detail.types.includes('postal_code'),
            );
            if (!hasPostalCode) {
              // Si addressDetails no trae código postal se coloca recalculateDistance en true para que al editar el CP haga lógica de handleChangeCP
              this.recalculateDistance = true;
            }
            addressDetails.forEach((detail: google.maps.GeocoderAddressComponent) => {
              // Se hace un barrido de todos los types porque pueden venir desordenados
              detail.types.forEach((type: string): void => {
                switch (type) {
                  case 'country': {
                    this.getDropOptionCountry(
                      detail.short_name,
                    ).then((countryOption: DropListOption) =>
                      this.setDropDataAddress('IdCatPais', countryOption),
                    );
                    break;
                  }
                  case 'route': {
                    this.setInputAddressForm('Calle', detail.long_name);
                    break;
                  }
                  case 'street_number': {
                    this.setInputAddressForm('NumeroExterior', detail.long_name);
                    break;
                  }
                  case 'postal_code': {
                    this.recalculateDistance = false;
                    this.setInputAddressForm('CodigoPostal', detail.long_name);
                    break;
                  }
                  case 'administrative_area_level_1': {
                    this.setInputAddressForm('Estado', detail.long_name);
                    break;
                  }
                  case 'locality': {
                    this.setInputAddressForm('Ciudad', detail.long_name);
                    this.setInputAddressForm('Municipio', detail.long_name);
                    break;
                  }
                  case 'sublocality_level_1': {
                    this.setInputAddressForm('Colonia', detail.long_name);
                    break;
                  }
                  default:
                    break;
                }
              });
            });
            this.getDistance();
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
    this.store.dispatch(clientsAddressActions.SET_RESET_FORM());
  }

  setImageClient(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageClient).nativeElement;
  }

  onClose(value: boolean): void {
    this.predictionsList = [];
    this.searchTermGoogleMaps = '';
    this.dialog.close(value);
  }
}
