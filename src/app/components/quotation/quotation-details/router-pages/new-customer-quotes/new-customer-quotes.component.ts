/* Core Imports */
import {AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {debounce, isEmpty, toLower} from 'lodash-es';
import {AppState} from '@appCore/core.state';
import {select, Store} from '@ngrx/store';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

/* Models Imports */
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IContactItem} from '@appModels/shared-components/contact-item.models';

/* Actions Imports */
import {newClientFormActions, quotationActions} from '@appActions/quotation';

/* Selectors Imports */
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {newClientFormSelectors} from '@appSelectors/quotation';
import {selectViewType} from '@appSelectors/utils/utils.selectors';

/* Dev Tools */
import {VCliente} from 'api-catalogos';
import {appRoutes} from '@appHelpers/core/app-routes';
import {Location} from '@angular/common';
import {Direccion, GMContactoClienteCompleto} from 'api-logistica';
import {
  API_REQUEST_STATUS_LOADING,
  DEFAULT_DATE,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
} from '@appUtil/common.protocols';

/* Google Maps */
import {Loader} from '@googlemaps/js-api-loader';
import {
  selectApiKeyMaps,
  selectProquifaCdmxCords,
  selectProquifaGuadalajaraCords,
} from '@appSelectors/settings/settings.selectors';
import {Cords} from '@appModels/store/settings/settings.model';
import {
  getIncomeLevelImage,
  InputValidators,
  RutaEntregaHelpers,
} from '@appHelpers/shared/shared.helpers';
import {MatDialog} from '@angular/material/dialog';
import {AddContactDialogComponent} from '@appComponents/quotation/quotation-details/router-pages/new-customer-quotes/add-contact-dialog/add-contact-dialog.component';

@Component({
  selector: 'app-new-customer-quotes',
  templateUrl: './new-customer-quotes.component.html',
  styleUrls: ['./new-customer-quotes.component.scss'],
})
export class NewCustomerQuotesComponent implements OnInit, OnDestroy, AfterContentChecked {
  alertExit$: Observable<boolean> = this.store.select(newClientFormSelectors.selectAlertChanges);
  contactClient$: Observable<GMContactoClienteCompleto[]> = this.store.select(
    newClientFormSelectors.selectClientContacts,
  );
  clientDistance$: Observable<number> = this.store.select(
    newClientFormSelectors.selectDirectionClientDistance,
  );
  selectPayShippingGuide$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectPayShippingGuide,
  );
  clientCords$: Observable<object> = this.store.select(
    newClientFormSelectors.selectClientDirectionCoords,
  );
  itemCatIndustry$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selecCatIndustriaForDropDown,
  );
  itemCatSector$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatSectorForDropDown,
  );
  itemListCountry$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPaisForDropDownList,
  );
  itemRoles$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatRolClientsForDropDown,
  );
  itemRoutesList$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectvCatRutasEntregaForDropDownList,
  );
  isPickUp$: Observable<boolean> = this.store.select(newClientFormSelectors.selectRecogeEnProquifa);
  isShowMap$: Observable<boolean> = this.store.select(newClientFormSelectors.selectMap);
  isValidFormClient$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectIsValidForms,
  );
  route$: Observable<DropListOption> = this.store.select(newClientFormSelectors.selectFormRoute);
  selectedClientRole$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedClientRole,
  );
  selectedCatIndustry$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedCatIndustry,
  );
  selectedCatSector$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedCatSector,
  );
  selectedCountry$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectFormCountry,
  );
  selectedClient$: Observable<VCliente> = this.store.select(
    newClientFormSelectors.selectedNewClient,
  );
  selectDirection$: Observable<Direccion> = this.store.select(
    newClientFormSelectors.selectDirection,
  );
  selectedRoute$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectFormRoute,
  );
  deliveryAddresses$: Observable<Array<DropListOption>> = this.store.select(
    newClientFormSelectors.selectDeliveryAddresses,
  );
  deliveryAddressSelected$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectDeliveryAddressSelected,
  );
  selectedZone$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectFormZone,
  );
  showMapRoutes$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectValidateShowMap,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);
  itemZoneList$: Observable<Array<DropListOption>> = this.store.select(
    newClientFormSelectors.selectFilteredCatZonaForDropList,
  );
  zipCodeValid$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectZipCodeIsValid,
  );
  allowEditForm$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectAllowEditForm,
  );
  routeIsInternalMessaging: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectRouteIsInternalMessaging,
  );
  isMexicanAddress$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectedFormCountryIsMexican,
  );
  showMapConfig$: Observable<boolean> = this.store.select(newClientFormSelectors.showMapConfig);
  readonly inputValidators = InputValidators;
  readonly API_REQUEST_STATUS_LOADING = API_REQUEST_STATUS_LOADING;
  readonly Array = Array;
  incomeLevelHelper = getIncomeLevelImage;
  viewTypes = AppViewTypes;
  contactsListScroll: Array<GMContactoClienteCompleto> = [];
  errors = [];
  email: string;
  lodashToLower = toLower;
  lodashIsEmpty = isEmpty;
  currentDate = DEFAULT_DATE;
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  apiKey: Subscription;
  apiKeyValue = null;
  proquifaCDMXCoords: Subscription;
  proquifaCDMXCoordsValue = {};
  proquifaGuadalajaraCoords: Subscription;
  proquifaGuadalajaraCoordsValue = {};
  predictionsList: DropListOption[] = [];
  searchTermGoogleMaps = '';
  ladDestino = 0;
  lngDestino = 0;
  handleKeySearchCP = debounce((data) => this.handleChangeCP(data), DEFAULT_TIME_DEBOUNCE_SEARCH);
  recalculateDistance = false; // DOCS: Indica si se debe recalcular la distancia, es true cuando se modifica el CP manualmente

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private location: Location,
    private dialog: MatDialog,
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
    this.store.dispatch(newClientFormActions.INIT_LIST_COMPONENT_EFFECT());
  }

  ngOnDestroy(): void {
    this.setShowNavBarAndTitle();
    this.store.dispatch(newClientFormActions.CLEAN_GENERAL_DATA_STATE());
    this.apiKey.unsubscribe();
    this.proquifaCDMXCoords.unsubscribe();
    this.proquifaGuadalajaraCoords.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
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

  handleChangeCP(value: string): void {
    this.getLatLngOrigin().then((latLng: google.maps.LatLngLiteral | null) => {
      if (!latLng) {
        // Se regresa null cuando no está seleccionada la ruta o es diferente a local o guadalajara
        return;
      }
      if (!this.recalculateDistance) {
        this.recalculateDistance = true;
        return;
      }
      this.store.dispatch(newClientFormActions.CLEAN_DISTANCE_MAPS());
      this.setInputAddressForm('CodigoPostal', value);
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
        {input: input, types: ['postal_code']},
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

  async getDropOptionCountry(nameCountry: string): Promise<DropListOption> {
    const listCountry: DropListOption[] = await lastValueFrom(
      this.store.pipe(select(catalogsSelectors.selectCatPaisForDropDownList), take(1)),
    );
    return listCountry.find((item: DropListOption): boolean => item.labelKey === nameCountry);
  }

  async getLatLngOrigin(): Promise<google.maps.LatLngLiteral> {
    const selected: DropListOption = await lastValueFrom(
      this.store.pipe(select(newClientFormSelectors.selectFormRoute), take(1)),
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

  handleItemSelected(option: DropListOption): void {
    this.store.dispatch(newClientFormActions.SET_RESET_FORM());
    this.store.dispatch(newClientFormActions.SET_ALLOW_EDIT_FORM({allowed: true}));
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
                newClientFormActions.FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT({
                  lat: this.ladDestino,
                  lng: this.lngDestino,
                }),
              );

              this.store.dispatch(
                newClientFormActions.FETCH_DISTANCE_SUCCESS({
                  distanceCartaPorte: distanceMtr / 1000,
                }),
              );
            }
          },
        );
      });
    });
  }

  handleClearSearchTerm(): void {
    this.searchTermGoogleMaps = '';
  }

  setShowNavBarAndTitle(): void {
    this.store.dispatch(quotationActions.SHOW_NAV_BAR({isCustomerNew: true}));
    this.store.dispatch(
      quotationActions.SET_TITLE({
        title: 'COTIZAR',
      }),
    );
  }

  cancelAdd(): void {
    this.location.back();
    this.store.dispatch(newClientFormActions.CLEAN_GM_CLIENT_QUOTATION_DATA());
  }

  discardOrContinue(value: boolean): void {
    if (value) {
      this.navigateDetails();
    } else {
      this.store.dispatch(
        newClientFormActions.SET_ALERT_EXIT({
          value: false,
        }),
      );
    }
  }

  navigateDetails(): void {
    this.router
      .navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.quoter.quoter,
        appRoutes.quoter.details,
        appRoutes.quoter.main,
      ])
      .then(() => {
        this.setShowNavBarAndTitle();
      });
  }

  addNewContact(): void {
    this.dialog.open(AddContactDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        isNewContact: true,
      },
      panelClass: 'mat-dialog-style',
    });
  }

  closeMap(lat: number, lng: number): void {
    this.store.dispatch(
      newClientFormActions.CLOSE_MAP_COMPONENT_EFFECT({
        lat,
        lng,
      }),
    );
  }

  buildContact(contact: GMContactoClienteCompleto): IContactItem {
    if (contact) {
      return {
        active: true,
        contactId: contact.ContactoCliente.IdContacto,
        department: contact.DatosPersona.Departamento,
        job: contact.DatosPersona.Puesto,
        mail: contact.CorreoElectronico || null,
        mSurName: contact.DatosPersona.ApellidoMaterno,
        name: contact.DatosPersona.Nombres,
        phone: contact.NumerosTelefonicos[0] || null,
        surName: contact.DatosPersona.ApellidoPaterno,
      };
    } else {
      return null;
    }
  }

  handleEditContact(contact: GMContactoClienteCompleto, index: number): void {
    this.dialog.open(AddContactDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        contact,
        index,
        isNewContact: false,
      },
      panelClass: 'mat-dialog-style',
    });
  }

  removeContact(index: number): void {
    this.store.dispatch(newClientFormActions.REMOVE_CONTACT({index}));
  }

  setInputAddressForm(input: string, value: string): void {
    this.store.dispatch(
      newClientFormActions.SET_INPUT_FORM_ADDRESS_NEW_CLIENT({
        input,
        value,
      }),
    );
  }
  setResetForm() {
    this.searchTermGoogleMaps = '';
    this.predictionsList = [];
    this.store.dispatch(newClientFormActions.SET_RESET_FORM());
  }
  setDropDelveryAddress(deliveryAddressSelected: DropListOption): void {
    if (deliveryAddressSelected.value !== '3') {
      this.searchTermGoogleMaps = '';
      this.store.dispatch(newClientFormActions.CLEAN_DISTANCE_MAPS());
      this.store.dispatch(newClientFormActions.CLEAN_DATA_FORM_ADDRESS());
    }
    this.store.dispatch(newClientFormActions.CHECK_PICK_UP({deliveryAddressSelected}));
  }
  setDropDataAddress(input: string, value: DropListOption): void {
    this.store.dispatch(newClientFormActions.SET_DROP_FORM_NEW_ADDRESS_DATA({input, value}));
    if (input === 'IdCatRutaEntrega') {
      this.store.dispatch(newClientFormActions.CLEAN_DISTANCE_MAPS());
      if (
        value.labelKey === RutaEntregaHelpers.local ||
        value.labelKey === RutaEntregaHelpers.guadalajara
      ) {
        this.getDistance();
      }
    }
  }

  setInputDataClient(input: string, value: string): void {
    this.store.dispatch(newClientFormActions.SET_DATA_INPUT_FORM_NEW_CLIENT({input, value}));
  }

  setPayShipping(value: boolean): void {
    this.store.dispatch(newClientFormActions.SET_PAY_SHIPPING({value}));
  }

  saveForm(): void {
    this.store.dispatch(newClientFormActions.SAVE_NEW_CLIENT());
  }

  validate(value: any, field: string): void {
    if (value.errors) {
      this.errors.push({fieldName: field, error: value});
    } else {
      this.errors = this.errors.filter((item) => item.fieldName !== field);
    }
  }
}
