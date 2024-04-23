// CORE
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {find, isEmpty} from 'lodash-es';
// MODELS
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  ProductoCapacitacion,
  ProductoDispositivoMedico,
  VMarcaFamilia,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {
  ISupplements,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {CalendarDay} from '@appModels/calendario/calendar';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// ACTIONS
// SELECTORS
import {lastValueFrom, Observable} from 'rxjs';

import * as selectUtils from '@appSelectors/utils/utils.selectors';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectCatPublicationsFormatForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {attendInvestigationAddProductActions} from '@appActions/pendings/attend-investigation';
import {
  currentDateWithHoursInZeroUTCFormatDate,
  currentDateWithoutHoursUTCFormatDate,
} from '@appUtil/dates';
import {take} from 'rxjs/operators';
import * as catalogActions from '@appActions/catalogs/catalogos.actions';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {getOnlyFileName, showDocument} from '@appUtil/files';
import {productDetailsActions} from '@appActions/forms/product-form';
import {IProviderResponse} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-technical-commercial-investigation',
  templateUrl: './tech-commercial-invest.component.html',
  styleUrls: ['./tech-commercial-invest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechCommercialInvestigationComponent implements OnInit, AfterViewInit, OnDestroy {
  rangeStart = currentDateWithoutHoursUTCFormatDate();
  productDetail$: Observable<ProductsDetails> = this.store.select(
    attendInvestigationDetailsSelectors.selectDetailsProductState,
  );
  listTrademark$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectCatTrademarkDropDownList,
  );
  selectedTrademark$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedTrademark,
  );
  selectedTypeProductFamily$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedTypeProductsFamily,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  productDetails$: Observable<VProductoDetalle> = this.store.select(
    attendInvestigationDetailsSelectors.selectProduct,
  );
  supplementProduct$: Observable<ISupplements> = this.store.select(
    attendInvestigationDetailsSelectors.selectSupplementsProducts,
  );
  selectDateValidityCuratorships: Observable<Date> = this.store.select(
    attendInvestigationDetailsSelectors.selectDateValidityCuratorship,
  );
  selectDateExpirationHealthRegister$: Observable<Date> = this.store.select(
    attendInvestigationDetailsSelectors.selectDateExpirationHelathRegister,
  );
  selectTypeProductsFamily$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selecteTypesProductsFamily,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectValidationStandarAndReactiveBiologic$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidationConfigurationStandardAndReactiveBiologic,
  );
  selectValidationStandarAndReactiveChemist$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidationConfigurationStandardAndReactiveChemist,
  );
  selectValidationPublications$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidationConfigurationPublications,
  );
  selectValidationLabware$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidationConfigurationLabware,
  );
  selectValidationTraining$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidationConfigurationTraining,
  );
  selectValidationMedicalDevices$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidationConfigurationMedicalDevices,
  );
  selectValidationSuplemmentaryProduct$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidationSuplemmentaryProduct,
  );
  selectCatPublicationsFormat$: Observable<any> = this.store.select(
    selectCatPublicationsFormatForDropDown,
  );
  selectCharacterisitcGrouper$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectCharacteristicGrouper,
  );
  selectCharacterisitcGrouperSelected$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectCharacteristicGrouperSelected,
  );
  selectCatBillingRestriction$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatBillingRestrictionForDropDown,
  );
  selectedCatBillingRestriction$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedBillingRestrictionSelected,
  );
  selectCatPhysicalState$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPhysicalStateForDropDown,
  );

  selectCatClassifications$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatClassificationsForDropDown,
  );
  selectPhysicalStateSelected$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectPhysicalStateSelected,
  );
  selectCatClassificationsSelected$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectCatClassificationsSelected,
  );
  selectCatUnit$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatUnitForDropDown,
  );
  selectedUnit$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedUnit,
  );
  ListAvailability$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectListAvailabilityForDropDown,
  );
  availabilityIsBackOrder$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectAvailabilityIsBackOrder,
  );
  selectedAvailability$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedAvailability,
  );
  selectUses$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatUseForDropDown,
  );
  selectedUse$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectUseSelected,
  );
  selectTypesPresentation$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPresentationTypeForDropDown,
  );
  selectedtypePresentation$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectTypePresentationSelected,
  );
  selectTypesApplication$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatApplicationForDropDown,
  );
  selectedtypeAplication$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectTypeApplicationSelected,
  );
  selectTransportationsWay$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatTransportationWayForDropDown,
  );
  selectTransportationWay$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectTransportationWaySelected,
  );
  selectTransportationManagment$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatTransportationManagmentForDropDown,
  );
  selectTransportationManagmentSelected$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectTransportationManagementSelected,
  );
  selectStorageSelected$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectStorageSelected,
  );
  selectePublicationsFormatSelected$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectePublicationsFormatSelected,
  );
  selectInternationalDepositary$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatInternationalDepositaryForDropDown,
  );
  selectInternationalDepositarySelected$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectInternationalDepositarySelected,
  );
  selectPurity$: Observable<any> = this.store.select(
    attendInvestigationDetailsSelectors.selectPurity,
  );
  selectSynonyms$: Observable<any> = this.store.select(
    attendInvestigationDetailsSelectors.selectSynonyms,
  );
  selectMolecularForm$: Observable<any> = this.store.select(
    attendInvestigationDetailsSelectors.selectMolecularForm,
  );
  selectValidateCas$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectValidateCas,
  );
  selectStructureMolecular$: Observable<File> = this.store.select(
    attendInvestigationDetailsSelectors.selectStructureMolecular,
  );
  selectsSupplementaryProducts$: Observable<Array<VProductoSuplementario>> = this.store.select(
    attendInvestigationDetailsSelectors.selectsSupplementaryProducts,
  );
  selectProductTraining$: Observable<ProductoCapacitacion> = this.store.select(
    attendInvestigationDetailsSelectors.selectTraining,
  );
  selectProductMedicalDevices$: Observable<ProductoDispositivoMedico> = this.store.select(
    attendInvestigationDetailsSelectors.selectMedicalDevices,
  );
  broadcastMediaRadios$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectBroadCastMediaRadios,
  );
  gmProviderResponse$: Observable<IProviderResponse> = this.store.select(
    attendInvestigationDetailsSelectors.selectGMProviderResponse,
  );
  selectIsPhysicalProduct$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectIsPhysicalProduct,
  );
  selectedDiffusionModel$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectedDiffusionModel,
  );
  selectedAvailabilityBackOrder$: Observable<Date> = this.store.select(
    attendInvestigationDetailsSelectors.selectedAvailabilityBackOrder,
  );
  providerCurrency$: Observable<string> = this.store.select(
    attendInvestigationDetailsSelectors.selectProviderCurrency,
  );
  selectCAS$: Observable<string> = this.store.select(attendInvestigationDetailsSelectors.selectCAS);
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  lodashIsEmpty = isEmpty;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_IS_ADD_PRODUCT({
        value: true,
      }),
    );
    this.store.dispatch(catalogsActions.GET_CAT_MODELO_DIFUSION_LOAD());
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_IS_ADD_PRODUCT({
        value: false,
      }),
    );
  }

  async setValueDropDownList(
    value: DropListOption,
    node: string,
    nodeSelected: string,
  ): Promise<void> {
    if (node === 'IdMarca') {
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_VALUE_DROP_TRADEMARK({
          value,
          node,
          nodeSelected,
        }),
      );
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_LOAD_TYPE_PRODUCT_FAMILY({
          selectedTradeMarkdId: value.value,
        }),
      );
    } else {
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_VALUE_DROP({
          value,
          node,
          nodeSelected,
        }),
      );
    }
    if (node === 'IdMarcaFamilia') {
      // DOCS: Se obtiene el tipo de producto que se selecciono ej. ProductoLabware
      const nodeRoot: string = await lastValueFrom(
        this.store.pipe(
          select(attendInvestigationDetailsSelectors.selectNameValidationConfiguration),
          take(1),
        ),
      );
      const familySelected: VMarcaFamilia = find(
        await lastValueFrom(
          this.store.pipe(
            select(attendInvestigationDetailsSelectors.selectProductTypeFamily),
            take(1),
          ),
        ),
        (o: VMarcaFamilia) => o.IdMarcaFamilia === value.value,
      );
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_INITIAL_DATA_CONFIGURATION({
          nodeRoot,
          familySelected,
        }),
      );
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_LOAD_CHARASTERISTIC_GROUPER({
          payload: value.value,
        }),
      );
      this.store.dispatch(
        catalogActions.GET_CAT_CLASSIFICATIONS_LOAD({
          IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
        }),
      );
    }
    // LIMPIA EL CAMPO DE FECHA DE DISPONIBILIDAD DE BACKORDER
    if (node === 'IdCatDisponibilidad') {
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_BACKORDER_AVAILABILITY_DATE({
          finalDate: null,
          dateType: null,
        }),
      );
    }
  }

  setBackOrderAvailabilityDate(event): void {
    const dates = currentDateWithHoursInZeroUTCFormatDate(event);
    const finalDate: string = dates.stringDate;
    const dateType: Date = dates.date;

    this.store.dispatch(
      attendInvestigationAddProductActions.SET_BACKORDER_AVAILABILITY_DATE({
        finalDate,
        dateType,
      }),
    );
  }

  async setValueDropDownListConfiguration(value, node: string, nodeSelected: string) {
    const nodeRoot: string = await lastValueFrom(
      this.store.pipe(
        select(attendInvestigationDetailsSelectors.selectNameValidationConfiguration),
        take(1),
      ),
    );
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_VALUE_DROP_WITH_CONFIGURATION({
        value,
        nodeRoot,
        node,
        nodeSelected,
      }),
    );
    if (node === 'IdMarca') {
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_LOAD_TYPE_PRODUCT_FAMILY({
          selectedTradeMarkdId: value.value,
        }),
      );
    }
  }

  setValuePublications(value, node) {
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_VALUE_INPUT_PUBLICATIONS({
        value,
        node,
      }),
    );
  }

  setValueSupplementProduct(value, node) {
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_VALUE_INPUT_SUPPLEMENT_PRODUCT({
        value,
        node,
      }),
    );
  }

  setValueInput(value, node) {
    if (node === 'PrecioListaMonedaProveedor') {
      value = value === '' ? null : Number(value);
    }
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_VALUE_INPUT({
        value,
        node,
      }),
    );
  }

  async setValueInputWithConfiguration(value, node: string) {
    const nodeRoot: string = await lastValueFrom(
      this.store.pipe(
        select(attendInvestigationDetailsSelectors.selectNameValidationConfiguration),
        take(1),
      ),
    );
    if (nodeRoot === 'ProductoCapacitacion') {
      if (node === 'NumeroDePersonasPorGrupo' || node === 'DuracionEvento') {
        value = value === '' ? null : Number(value);
      }
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_VALUE_INPUT_WITH_CONFIGURATION({
          value: value || null,
          node,
          nodeRoot,
        }),
      );
    } else {
      value = value === '' ? null : value;
      if (node === 'CAS' && value !== null) {
        this.store.dispatch(
          attendInvestigationAddProductActions.SET_VALIDATE_CAS({
            value,
          }),
        );
      }
      this.store.dispatch(
        attendInvestigationAddProductActions.SET_VALUE_INPUT_WITH_CONFIGURATION({
          value,
          node,
          nodeRoot,
        }),
      );
    }
  }

  getFileName(file) {
    return getOnlyFileName(file);
  }

  getExternalFile(node: string): void {}

  setNewFile(newFile: File, node: string): void {
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_NEW_PRODUCT_FILE({
        newFile,
        node,
      }),
    );
  }

  setIdFileToDelete(idFile: string, node: string): void {
    this.store.dispatch(
      productDetailsActions.SET_ID_FILE_TO_DELETE({
        idFile,
        tabId: 1,
        node,
      }),
    );
  }

  saveData() {
    this.store.dispatch(attendInvestigationAddProductActions.SET_NEW_SUPPLEMENTS_PRODUCTS());
  }

  deleteSupplement(supplement) {
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_DELETE_SUPPLEMENT({
        payload: supplement,
      }),
    );
  }

  setDataValidityCuratorships(event) {
    const dates = currentDateWithHoursInZeroUTCFormatDate(event);
    const finalDate: string = dates.stringDate;
    const dateType: Date = dates.date;
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_DATE_VALIDITY_CURATORSHIP({
        finalDate,
        dateType,
      }),
    );
  }

  setDataExpirationHealthRegister(event) {
    const dates = currentDateWithHoursInZeroUTCFormatDate(event);
    const finalDate: string = dates.stringDate;
    const dateType: Date = dates.date;
    this.store.dispatch(
      attendInvestigationAddProductActions.SET_DATE_EXPIRATION_HEALTH_REGISTER({
        finalDate,
        dateType,
      }),
    );
  }

  buildSupplementData(supplement: VProductoSuplementario): string {
    return `${supplement.ISBN ? ` · ISBN ${supplement.ISBN}` : ''}${
      supplement.Editorial ? ` · ${supplement.Editorial}` : ''
    }${supplement.Edicion ? ` · ${supplement.Edicion}` : ''}`;
  }

  handleSeeFile(file) {
    showDocument(file);
  }
}
