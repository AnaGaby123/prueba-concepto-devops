import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {
  productDetailsSelectors,
  productSelectors,
  productTechnicalCommercialInvestigationSelectors,
} from '@appSelectors/forms/product-form';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  productDetailsActions,
  technicalCommercialInvestigationActions,
} from '@appActions/forms/product-form';
import {
  ProductoCapacitacion,
  ProductoDispositivoMedico,
  VMarcaFamilia,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectCatPublicationsFormatForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {take} from 'rxjs/operators';
import {
  ISupplements,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {find, isEmpty} from 'lodash-es';
import * as catalogActions from '@appActions/catalogs/catalogos.actions';
import {CalendarDay} from '@appModels/calendario/calendar';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  currentDateWithHoursInZeroUTCFormatDate,
  currentDateWithoutHoursUTCFormatDate,
} from '@appUtil/dates';
import {getOnlyFileName} from '@appUtil/files';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-technical-commercial-investigation',
  templateUrl: './technical-commercial-investigation.component.html',
  styleUrls: ['./technical-commercial-investigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicalCommercialInvestigationComponent implements AfterViewInit {
  editMode$: Observable<boolean> = this.store.select(productSelectors.selectEditMode);
  rangeStart = currentDateWithoutHoursUTCFormatDate();
  enableEdit$: Observable<boolean> = this.store.select(productSelectors.selectEnableEdit);
  productDetail$: Observable<ProductsDetails> = this.store.select(
    productSelectors.selectDetailsProductState,
  );
  listTrademark$: Observable<Array<DropListOption>> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectCatTrademarkDropDownList,
  );
  selectedTrademark$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectedTrademark,
  );
  selectedTypeProductFamily$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectedTypeProductsFamily,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  productDetails$: Observable<VProductoDetalle> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectProduct,
  );
  supplementProduct$: Observable<ISupplements> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectSupplementsProducts,
  );
  selectDateValidityCuratorships: Observable<Date> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectDateValidityCuratorship,
  );
  backOrderAvailabilityDate$: Observable<Date> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectBackOrderAvailabilityDate,
  );
  selectDateExpirationHealthRegister$: Observable<Date | null> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectDateExpirationHelathRegister,
  );
  selectTypeProductsFamily$: Observable<Array<DropListOption>> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selecteTypesProductsFamily,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectValidationStandarAndReactiveBiologic$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationStandardAndReactiveBiologic,
  );
  selectValidationStandarAndReactiveChemist$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationStandardAndReactiveChemist,
  );
  selectValidationPublications$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationPublications,
  );
  selectValidationLabware$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationLabware,
  );
  selectValidationTraining$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationTraining,
  );
  selectValidationMedicalDevices$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationMedicalDevices,
  );
  selectValidationSuplemmentaryProduct$: Observable<boolean> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectValidationSuplemmentaryProduct,
  );
  selectCatPublicationsFormat$: Observable<any> = this.store.select(
    selectCatPublicationsFormatForDropDown,
  );
  selectCharacterisitcGrouper$: Observable<Array<DropListOption>> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectCharacteristicGrouper,
  );
  selectCharacterisitcGrouperSelected$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectCharacteristicGrouperSelected,
  );
  selectCatBillingRestriction$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatBillingRestrictionForDropDown,
  );
  selectedCatBillingRestriction$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectedBillingRestrictionSelected,
  );
  selectCatPhysicalState$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPhysicalStateForDropDown,
  );

  selectCatClassifications$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatClassificationsForDropDown,
  );
  selectPhysicalStateSelected$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectPhysicalStateSelected,
  );
  selectCatClassificationsSelected$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectCatClassificationsSelected,
  );
  selectCatUnit$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatUnitForDropDown,
  );
  selectedUnit$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectedUnit,
  );
  selectAvailabilitys$: Observable<Array<DropListOption>> = this.store.select(
    productDetailsSelectors.selectListAvailabilityForDropDown,
  );
  selectedAvailability$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectedAvailability,
  );
  selectedAvailabilityIsBackOrder$: Observable<boolean> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectAvailabilityIsBackOrder,
  );
  selectUses$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatUseForDropDown,
  );
  selectedUse$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectUseSelected,
  );
  selectTypesPresentation$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPresentationTypeForDropDown,
  );
  selectedtypePresentation$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectTypePresentationSelected,
  );
  selectTypesApplication$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatApplicationForDropDown,
  );
  selectedtypeAplication$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectTypeApplicationSelected,
  );
  selectTransportationsWay$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatTransportationWayForDropDown,
  );
  selectTransportationWay$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectTransportationWaySelected,
  );
  selectTransportationManagment$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatTransportationManagmentForDropDown,
  );
  selectTransportationManagmentSelected$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectTransportationManagementSelected,
  );
  selectStorageSelected$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectStorageSelected,
  );
  selectePublicationsFormatSelected$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectePublicationsFormatSelected,
  );
  selectInternationalDepositary$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatInternationalDepositaryForDropDown,
  );
  selectInternationalDepositarySelected$: Observable<DropListOption> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectInternationalDepositarySelected,
  );
  selectPurity$: Observable<number> = this.store.select(productDetailsSelectors.selectPurity);
  selectSynonyms$: Observable<string> = this.store.select(productDetailsSelectors.selectSynonyms);
  selectMolecularForm$: Observable<string> = this.store.select(
    productDetailsSelectors.selectMolecularForm,
  );
  selectValidateCas$: Observable<boolean> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectValidateCas,
  );
  selectStructureMolecular$: Observable<File> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectStructureMolecular,
  );
  selectsSupplementaryProducts$: Observable<Array<VProductoSuplementario>> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectsSupplementaryProducts,
  );
  selectProductTraining$: Observable<ProductoCapacitacion> = this.store.select(
    productDetailsSelectors.selectTraining,
  );
  selectProductMedicalDevices$: Observable<ProductoDispositivoMedico> = this.store.select(
    productDetailsSelectors.selectMedicalDevices,
  );
  broadcastMediaRadios$: Observable<Array<any>> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectBroadCastMediaRadios,
  );
  selecttedDiffusionModel$: Observable<DropListOption> = this.store.select(
    productDetailsSelectors.selecttedDiffusionModel,
  );
  selectIsPhysicalProduct$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectIsPhysicalProduct,
  );
  providerBuyCurrency$: Observable<string> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectProviderBuyCurrency,
  );

  popAlert = false;

  selectCAS$: Observable<string> = this.store.select(productDetailsSelectors.selectCAS);
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  lodashIsEmpty = isEmpty;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  async setValueDropDownList(value: any, node: string, nodeSelected: string): Promise<void> {
    if (node === 'IdMarca') {
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_VALUE_DROP_TRADEMARK({
          value,
          node,
          nodeSelected,
        }),
      );
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_LOAD_TYPE_PRODUCT_FAMILY({
          selectedTradeMarkdId: value.value,
        }),
      );
    } else {
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_VALUE_DROP({
          value,
          node,
          nodeSelected,
        }),
      );
    }
    if (node === 'IdMarcaFamilia') {
      const nodeRoot: string = await lastValueFrom(
        this.store.pipe(select(productDetailsSelectors.selectNameValidationConfiguration), take(1)),
      );

      const familySelected: VMarcaFamilia = find(
        await lastValueFrom(
          this.store.pipe(
            select(productTechnicalCommercialInvestigationSelectors.selectProductTypeFamily),
            take(1),
          ),
        ),
        (o: VMarcaFamilia) => o.IdMarcaFamilia === value.value,
      );
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_INITIAL_DATA_CONFIGURATION({
          nodeRoot,
          familySelected,
        }),
      );
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_LOAD_CHARASTERISTIC_GROUPER({
          payload: value.value,
        }),
      );
      this.store.dispatch(
        catalogActions.GET_CAT_CLASSIFICATIONS_LOAD({
          IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
        }),
      );
    }
    if (node === 'IdCatDisponibilidad') {
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_BACKORDER_AVAILABILITY_DATE({
          finalDate: null,
          dateType: null,
        }),
      );
    }
  }

  async setValueDropDownListConfiguration(
    value: any,
    node: string,
    nodeSelected: string,
  ): Promise<void> {
    const nodeRoot: string = await lastValueFrom(
      this.store.pipe(select(productDetailsSelectors.selectNameValidationConfiguration), take(1)),
    );
    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_VALUE_DROP_WITH_CONFIGURATION({
        value,
        nodeRoot,
        node,
        nodeSelected,
      }),
    );
    if (node === 'IdMarca') {
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_LOAD_TYPE_PRODUCT_FAMILY({
          selectedTradeMarkdId: value.value,
        }),
      );
    }
  }

  setValuePublications(value: string, node: string): void {
    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_VALUE_INPUT_PUBLICATIONS({
        value,
        node,
      }),
    );
  }

  setValueSupplementProduct(value: string, node: string): void {
    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_VALUE_INPUT_SUPPLEMENT_PRODUCT({
        value: value !== '' ? value : null,
        node,
      }),
    );
  }

  setValueInput(value, node: string): void {
    if (node === 'PrecioListaMonedaProveedor') {
      value = value === '' ? null : Number(value);
    }
    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_VALUE_INPUT({
        value,
        node,
      }),
    );
  }

  async setValueInputWithConfiguration(value, node: string): Promise<void> {
    const nodeRoot: string = await lastValueFrom(
      this.store.pipe(select(productDetailsSelectors.selectNameValidationConfiguration), take(1)),
    );

    if (nodeRoot === 'ProductoCapacitacion') {
      if (node === 'NumeroDePersonasPorGrupo' || node === 'DuracionEvento') {
        value = value === '' ? null : Number(value);
      }
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_VALUE_INPUT_WITH_CONFIGURATION({
          value: value || null,
          node,
          nodeRoot,
        }),
      );
    } else {
      value = value === '' ? null : value;
      if (node === 'CAS' && value) {
        this.store.dispatch(
          technicalCommercialInvestigationActions.SET_VALIDATE_CAS({
            value,
          }),
        );
      }
      this.store.dispatch(
        technicalCommercialInvestigationActions.SET_VALUE_INPUT_WITH_CONFIGURATION({
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

  getExternalFile(node: string): void {
    this.store.dispatch(productDetailsActions.FETCH_EXTERNAL_FILE_LOAD({node}));
  }

  setNewFile(newFile: File, node: string): void {
    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_NEW_PRODUCT_FILE({
        newFile,
        node,
      }),
    );
  }

  setIdFileToDelete(idFile: string, node: string): void {
    this.store.dispatch(productDetailsActions.SET_ID_FILE_TO_DELETE({idFile, tabId: 1, node}));
  }

  saveData(): void {
    this.store.dispatch(technicalCommercialInvestigationActions.SET_NEW_SUPPLEMENTS_PRODUCTS());
  }

  deleteSupplement(supplement: VProductoSuplementario): void {
    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_DELETE_SUPPLEMENT({
        payload: supplement,
      }),
    );
  }

  setDataValidityCuratorships(event): void {
    const dates = currentDateWithHoursInZeroUTCFormatDate(event);
    const finalDate: string = dates.stringDate;
    const dateType: Date = dates.date;

    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_DATE_VALIDITY_CURATORSHIP({
        finalDate,
        dateType,
      }),
    );
  }

  setBackOrderAvailabilityDate(event): void {
    const dates = currentDateWithHoursInZeroUTCFormatDate(event);
    const finalDate: string = dates.stringDate;
    const dateType: Date = dates.date;

    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_BACKORDER_AVAILABILITY_DATE({
        finalDate,
        dateType,
      }),
    );
  }

  setDataExpirationHealthRegister(event): void {
    const dates = currentDateWithHoursInZeroUTCFormatDate(event);
    const finalDate: string = dates.stringDate;
    const dateType: Date = dates.date;

    this.store.dispatch(
      technicalCommercialInvestigationActions.SET_DATE_EXPIRATION_HEALTH_REGISTER({
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

  routerBrands(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.catalogs.catalogs,
      appRoutes.catalogs.brands.brands,
      appRoutes.catalogs.brands.details,
    ]);
  }

  async redirectToBrands(): Promise<void> {
    const haveChanges = await lastValueFrom(
      this.store.pipe(select(productDetailsSelectors.handleChangesValidator), take(1)),
    );

    const haveChangesAdd = await lastValueFrom(
      this.store.pipe(select(productDetailsSelectors.handleChangesValidatorAdd), take(1)),
    );

    if (haveChanges || haveChangesAdd) {
      const confirmDialog = this.dialog.open(
        ConfirmDialogComponent,
        buildDialogConfig({
          message: this.translateService.instant('formProduct.general.titleModal'),
        }),
      );

      confirmDialog.afterClosed().subscribe((data: boolean) => {
        if (data) {
          this.routerBrands();
        }
      });
    } else {
      this.routerBrands();
    }
  }
}
