import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {
  clientDeliveryBillingSelectors,
  clientsDetailsSelectors,
  clientsSelectors,
} from '@appSelectors/forms/clients-form';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {deliveryBillingActions} from '@appActions/forms/client-form';
import {Direccion, VCliente} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {tiposDireccionForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {IDireccionClienteDetalle} from '@appModels/store/forms/clients-form/clients-details-form/delivery-billing/delivery-billing-client-form.models';
import {Loader} from '@googlemaps/js-api-loader';
import {debounce} from 'lodash-es';

import {take} from 'rxjs/operators';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {selectApiKeyMaps} from '@appSelectors/settings/settings.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss'],
})
export class AddressDialogComponent implements OnInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.apiKey = this.store
      .select(selectApiKeyMaps)
      .subscribe((value: string) => (this.apiKeyValue = value));
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    if (this.data?.isEdit) {
      this.store.dispatch(deliveryBillingActions.EDIT_ADDRESS_COMPONENT_EFFECT());
      this.store.dispatch(deliveryBillingActions.SET_ALLOWED_EDIT_FORM({value: true}));
    } else {
      this.store.dispatch(deliveryBillingActions.ADD_NEW_ADDRESS_COMPONENT_EFFECT());
    }
  }

  addressModalTitle$: Observable<string> = this.store.select(
    clientDeliveryBillingSelectors.selectAddressModalTitle,
  );
  addressValidation$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.enableAddEditAddress,
  );
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);
  addressType$: Observable<Array<DropListOption>> = this.store.select(tiposDireccionForDropDown);
  selectClientDirectionCopy$: Observable<IDireccionClienteDetalle> = this.store.select(
    clientDeliveryBillingSelectors.selectClientAddressPop,
  );
  addressCountrySelected$: Observable<DropListOption> = this.store.select(
    clientDeliveryBillingSelectors.selectClientAddressCountrySelected,
  );
  listCountry$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPaisForDropDownList,
  );
  isMexicanAddress$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.selectedFormCountryIsMexican,
  );
  selectClientAddress$: Observable<Direccion> = this.store.select(
    clientDeliveryBillingSelectors.selectClientAddressPopData,
  );
  zipCodeValid$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.selectZioCodeValidation,
  );
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  allowedForm$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.selectAllowedForm,
  );
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  errorImageNativeElement = false;
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  imageNativeElement;
  predictionsList: DropListOption[] = [];
  // DOCS: Implementación de buscador de google
  handleKeySearchDirection = debounce(
    (value) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  apiKey: Subscription;
  apiKeyValue = null;
  searchTermGoogleMaps = '';

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

  setDirectionDataDrop(node, payload, nodeSelected): void {
    this.store.dispatch(
      deliveryBillingActions.SET_DIRECTION_DATA_DROP({
        payload,
        node,
        nodeSelected,
      }),
    );
  }

  setDirectionDataInput(node: string, payload: string): void {
    this.store.dispatch(
      deliveryBillingActions.SET_DIRECTION_DATA_COMPONENT_EFFECT({
        payload,
        node,
      }),
    );
  }

  handleItemSelected(option: DropListOption): void {
    this.store.dispatch(deliveryBillingActions.SET_ALLOWED_EDIT_FORM({value: true}));
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
                      this.setDirectionDataDrop('IdCatPais', countryOption, 'catCountrySelected'),
                    );
                    break;
                  }
                  case 'route': {
                    this.setDirectionDataInput('Calle', detail.long_name);
                    break;
                  }
                  case 'street_number': {
                    this.setDirectionDataInput('NumeroExterior', detail.long_name);
                    break;
                  }
                  case 'postal_code': {
                    this.setDirectionDataInput('CodigoPostal', detail.long_name);
                    break;
                  }
                  case 'administrative_area_level_1': {
                    this.setDirectionDataInput('Estado', detail.long_name);
                    break;
                  }
                  case 'locality': {
                    this.setDirectionDataInput('Ciudad', detail.long_name);
                    this.setDirectionDataInput('Municipio', detail.long_name);
                    break;
                  }
                  case 'sublocality_level_1': {
                    this.setDirectionDataInput('Colonia', detail.long_name);
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
    this.store.dispatch(deliveryBillingActions.SET_RESET_FORM());
  }

  onClose(value): void {
    this.dialog.close(value);
  }
}
