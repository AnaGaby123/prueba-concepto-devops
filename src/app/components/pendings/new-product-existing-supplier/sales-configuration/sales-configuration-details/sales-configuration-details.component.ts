import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, ENUM_SECURE_POP} from '@appUtil/common.protocols';
import {Observable} from 'rxjs';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {Store} from '@ngrx/store';
import {debounce, deburr, find, isEmpty, toLower} from 'lodash-es';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {salesConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/sales-configuration';
import {salesConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/sales-configuration';
import {
  IAuthorizationCodeObj,
  IFamiliesSalesConfig,
  IVMarcaFamiliaIndustriaObj,
} from '@appModels/store/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.models';
import {ConfiguracionPrecioUtilidadCategoriaProveedorObj} from 'api-catalogos';
import {SALES_CONFIGURATION_FIELDS} from '@appHelpers/pending/new-product-existing-supplier/sales-configuration/sales-configuration.helpers';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';

@Component({
  selector: 'app-sales-configuration-dashboard',
  templateUrl: './sales-configuration-details.component.html',
  styleUrls: ['./sales-configuration-details.component.scss'],
})
export class SalesConfigurationDetailsComponent implements OnInit, AfterContentChecked {
  @ViewChild('imageElement') imageElement: ElementRef;
  searchTerm$: Observable<string> = this.store.select(
    salesConfigurationDetailsSelectors.selectSearchTerm,
  );
  filterOptions$: Observable<Array<FilterOptionPqf>> = this.store.select(
    salesConfigurationDetailsSelectors.selectFilterList,
  );
  families$: Observable<Array<IFamiliesSalesConfig>> = this.store.select(
    salesConfigurationDetailsSelectors.selectFamiliesList,
  );
  listItemsApiStatus$: Observable<number> = this.store.select(
    salesConfigurationDetailsSelectors.selectListItemApiStatus,
  );
  detailsFamilyStatus$: Observable<number> = this.store.select(
    salesConfigurationDetailsSelectors.selectDetailsFamilyStatus,
  );
  selectedItem$: Observable<IFamiliesSalesConfig> = this.store.select(
    salesConfigurationDetailsSelectors.selectedFamily,
  );
  selectedFamilyIndustries$: Observable<Array<IVMarcaFamiliaIndustriaObj>> = this.store.select(
    salesConfigurationDetailsSelectors.selectedFamilyIndustries,
  );
  validationToSaveConfiguration$: Observable<boolean> = this.store.select(
    salesConfigurationDetailsSelectors.selectValidationToSaveConfiguration,
  );
  hasChanges: Observable<boolean> = this.store.select(
    salesConfigurationDetailsSelectors.selectHasChangesConfiguration,
  );
  finishValidation$: Observable<boolean> = this.store.select(
    salesConfigurationDetailsSelectors.selectValidationToFinishConfiguration,
  );
  isActivePop: Observable<boolean> = this.store.select(
    salesConfigurationDetailsSelectors.selectIsActivePop,
  );
  IsActiveSecureCodePop: Observable<boolean> = this.store.select(
    salesConfigurationDetailsSelectors.selectIsActiveSecureCodePop,
  );
  IsActiveMessageSecureCodePop: Observable<boolean> = this.store.select(
    salesConfigurationDetailsSelectors.selectIsActiveMessageSecureCodePop,
  );
  IsActiveDiscardMessageSecureCodePop$: Observable<boolean> = this.store.select(
    salesConfigurationDetailsSelectors.selectIsActiveDiscardMessageSecureCodePop,
  );
  messagePop$: Observable<string> = this.store.select(
    salesConfigurationDetailsSelectors.buildMeesagePop,
  );
  secureCode$: Observable<Array<string>> = this.store.select(
    salesConfigurationDetailsSelectors.selectSecureCode,
  );
  authorization$: Observable<IAuthorizationCodeObj> = this.store.select(
    salesConfigurationDetailsSelectors.selectAuthorizationData,
  );
  readonly inputTypes = InputValidators;
  readonly stateCodePop = ENUM_SECURE_POP;
  readonly fields = SALES_CONFIGURATION_FIELDS;
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  listItems: Array<IFamiliesSalesConfig> = [];
  lodashIsEmpty = isEmpty;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;

  constructor(private cdr: ChangeDetectorRef, private store: Store, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.store.dispatch(salesConfigurationDetailsActions.FETCH_FAMILIES_LOAD());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
    if (!!this.imageElement) {
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }
  }

  changeSearchTerm(searchTerm: string) {
    this.store.dispatch(salesConfigurationDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFilterSelected(filters: Array<FilterOptionPqf>) {
    this.store.dispatch(salesConfigurationDetailsActions.SET_FILTERS({filters}));
  }

  setSelectedItem(family: IFamiliesSalesConfig) {
    this.store.dispatch(salesConfigurationDetailsActions.SET_FAMILY_ITEM_METHODS({family}));
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElement = false;
    return this.defaultImageSource;
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  familyItemQuotation = (Index: number, family: IFamiliesSalesConfig) =>
    family.IdCotPartidaCotizacionInvestigacion;

  handleTrackBy(index: number, item: IVMarcaFamiliaIndustriaObj): string {
    return item.IdMarcaFamiliaCatIndustria;
  }

  handleInputChange(value: string, field: string, itemIndex: number): void {
    this.store.dispatch(
      salesConfigurationDetailsActions.SET_PROVIDER_PERFORMANCE_VALUE({
        field,
        value: value === '' ? null : Number(value),
        indexCatIndustryBrandFamily: itemIndex,
      }),
    );
  }

  getUtility(
    utilityName: string,
    utilities: Array<ConfiguracionPrecioUtilidadCategoriaProveedorObj>,
  ): number {
    const utility = find(
      utilities,
      (o: ConfiguracionPrecioUtilidadCategoriaProveedorObj) =>
        toLower(deburr(o?.catNivelIngreso?.NivelIngreso)) === toLower(utilityName),
    );
    return utility?.UtilidadNivelIngreso ?? null;
  }

  setUtility(value: string, field: string, itemIndex: number): void {
    this.store.dispatch(
      salesConfigurationDetailsActions.SET_PROVIDER_UTILITIES_CONFIGURATION_VALUE({
        value: Number(value),
        field,
        indexCatIndustryBrandFamily: itemIndex,
      }),
    );
  }

  handleCheck(itemIndex: number, value: boolean) {
    this.store.dispatch(
      salesConfigurationDetailsActions.SET_ACTIVE_CONFIGURATION({
        indexCatIndustryBrandFamily: itemIndex,
        value,
      }),
    );
  }

  cancelConfiguration() {
    this.store.dispatch(salesConfigurationDetailsActions.ACTIVE_POP_UP({value: true}));
  }

  eventEmitterPopUp(event: IPopUp) {
    this.store.dispatch(
      salesConfigurationDetailsActions.SET_EVENT_EMITTER_POP_UP_METHODS({popUp: event}),
    );
  }

  // DOCS Abre o cierra el pop de mensaje previo a mostrar el pop del codigo de seguridad
  eventEmitterMessageSecureCodePopUp(event: IPopUp) {
    if (event.value) {
      this.store.dispatch(salesConfigurationDetailsActions.SET_AUTHORIZATION_DATA());
    } else {
      this.store.dispatch(
        salesConfigurationDetailsActions.ACTIVE_SECURE_MESSAGE_CODE_POP_UP({value: false}),
      );
    }
  }

  // DOCS descarta los cambios sobre el pop de codigo de seguridad
  eventEmitterDiscardMessageSecureCodePopUp(event: IPopUp) {
    if (!event.value) {
      this.store.dispatch(salesConfigurationDetailsActions.RESET_SECURE_CODE_POP_UP());
    }
    this.store.dispatch(
      salesConfigurationDetailsActions.ACTIVE_DISCARD_SECURE_MESSAGE_CODE_POP_UP({value: false}),
    );
  }

  // DOCS Abre el pop de mensaje previo a mostrar el pop del codigo de seguridad
  eventEmitterPopUpSecureCode() {
    this.store.dispatch(
      salesConfigurationDetailsActions.ACTIVE_DISCARD_SECURE_MESSAGE_CODE_POP_UP({value: true}),
    );
  }

  // DOCS emite el array de string del codigo de seguridad
  eventEmitterArray(event: Array<string>) {
    this.store.dispatch(
      salesConfigurationDetailsActions.SET_EVENT_SECURE_CODE_ARRAY({secureCode: event}),
    );
  }

  // DOCS emite la cadena del codigo de seguridad
  setSecureCode(value: string): void {
    this.store.dispatch(salesConfigurationDetailsActions.SET_CODE_DIGIT({value}));
  }

  saveConfiguration(finishConfiguration: boolean = false) {
    this.store.dispatch(
      salesConfigurationDetailsActions.SAVE_CONFIGURATION_LOAD({finishConfiguration}),
    );
  }
}
