import {createSelector} from '@ngrx/store';
import {
  IAuthorizationCodeObj,
  IFamiliesSalesConfig,
  ISalesConfigurationDetailsModel,
  IVMarcaFamiliaIndustriaObj,
} from '@appModels/store/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.models';
import {CotPartidaCotizacionInvestigacionSeguimiento, ResumeGroupQueryInfo} from 'api-logistica';
import {filter, find, forEach, isEmpty, isEqual, map, omit} from 'lodash-es';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {
  CatProductoInvestigacionSeguimiento,
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  ConfiguracionProveedoresCalculosService,
  MarcaFamiliaCatIndustria,
} from 'api-catalogos';
import {selectNewProductExistingSupplier} from '@appSelectors/pendings/pendings.selectors';
import {NewProductExistingSupplierState} from '@appModels/store/pendings/new-product-existing-supplier/new-product-existing-supplier.models';
import {DEFAULT_DATE} from '@appUtil/common.protocols';
import {selectCatProductInvestigationFollowList} from '@appSelectors/catalogs/catalogs.selectors';
import ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams = ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams;

export const selectSalesConfigurationDetails = createSelector(
  selectNewProductExistingSupplier,
  (state: NewProductExistingSupplierState): ISalesConfigurationDetailsModel =>
    state.salesConfiguration,
);

export const selectTitleHeader = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): string => state.title,
);

export const selectFilterList = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): Array<FilterOptionPqf> => state.filters,
);
export const selectSearchTerm = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): string => state.searchTerm,
);
export const selectFamiliesList = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): Array<IFamiliesSalesConfig> => state.familiesList,
);
export const selectListItemApiStatus = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): number => state.listItemsApiStatus,
);
export const selectDetailsFamilyStatus = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): number => state.detailsFamilyStatus,
);
export const selectedFilter = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): FilterOptionPqf =>
    find(state.filters, (o: FilterOptionPqf) => o?.isActive),
);
export const selectFamiliesListQueryInfo = createSelector(
  selectedFilter,
  selectSearchTerm,
  (filter: FilterOptionPqf, searchTerm: string): ResumeGroupQueryInfo => {
    const queryInfo: ResumeGroupQueryInfo = {
      Filters: [],
      CountElements: [],
      SumFields: [],
      Fields: [
        {
          Campo: 'IdCotPartidaCotizacionInvestigacion',
        },
        {
          Campo: 'IdMarca',
        },
        {
          Campo: 'NombreMarca',
        },
        {
          Campo: 'IdFamilia',
        },
        {
          Campo: 'IdProveedor',
        },
        {
          Campo: 'NombreProveedor',
        },
        {
          Campo: 'NombreImagen',
        },
        {
          Campo: 'Mexicano',
        },
        {
          Campo: 'IdMarcaFamiliaProveedor',
        },
        {
          Campo: 'CatTipoProductoNombre',
        },
        {
          Campo: 'CatSubTipoProductoNombre',
        },
        {
          Campo: 'CatControlNombre',
        },
        {
          Campo: 'IdActual',
        },
        {
          Campo: 'IdAnterior',
        },
        {
          Campo: 'NombreImagenMarca',
        },
      ],
      GroupColumn: 'IdCotPartidaCotizacionInvestigacion',
      SortField: 'FechaCreacionPendiente',
      SortDirection: filter.id === '1' ? 'DESC' : 'ASC',
    };
    if (searchTerm !== '') {
      queryInfo.Filters.push({
        NombreFiltro: 'NombreProveedor',
        ValorFiltro: searchTerm,
      });
    }
    return queryInfo;
  },
);
export const selectedFamily = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): IFamiliesSalesConfig => state.selectedFamily,
);
export const selectProviderIsMexican = createSelector(
  selectedFamily,
  (state: IFamiliesSalesConfig) => state.Mexicano,
);
export const selectedFamilyIndustries = createSelector(
  selectedFamily,
  (state: IFamiliesSalesConfig): Array<IVMarcaFamiliaIndustriaObj> => state.configuration,
);
export const selectIsActivePop = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): boolean => state.isActivePop,
);
export const selectIsActiveSecureCodePop = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): boolean => state.IsActiveSecureCodePop,
);
export const selectIsActiveMessageSecureCodePop = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): boolean => state.IsActiveMessageSecureCodePop,
);
export const selectIsActiveDiscardMessageSecureCodePop = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): boolean => state.IsActiveDiscardMessageSecureCodePop,
);
export const selectPreSelectedFamily = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): IFamiliesSalesConfig => state.preSelectedFamily,
);
export const selectAuthorizationData = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): IAuthorizationCodeObj => state.authorizationObj,
);
export const selectSecureCode = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): Array<string> => state.secureCode,
);
export const buildMeesagePop = createSelector(
  selectSalesConfigurationDetails,
  (state: ISalesConfigurationDetailsModel): string =>
    `La familia que deseas habilitar, no alcanza el 30% de utilidad requerido, por lo que se enviará un mail al gerente de finanzas para aprobar la habilitación de la familia, mediante un código.`,
);
export const queryFamilyDetailsConfiguration = createSelector(
  selectedFamily,
  (
    family: IFamiliesSalesConfig,
  ): ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams => ({
    IdCotPartidaCotizacionInvestigacion: family?.IdCotPartidaCotizacionInvestigacion,
    IdMarcaFamiliaProveedor: family?.IdMarcaFamiliaProveedor,
  }),
);
export const selectedFamilyIndustriesActive = createSelector(
  selectedFamilyIndustries,
  (state: Array<IVMarcaFamiliaIndustriaObj>): Array<IVMarcaFamiliaIndustriaObj> =>
    filter(state, (o: IVMarcaFamiliaIndustriaObj) => o?.habilitado),
);

export const selectProviderConfigurationPerformanceToSave = createSelector(
  selectedFamilyIndustries,
  (state: Array<IVMarcaFamiliaIndustriaObj>): IVMarcaFamiliaIndustriaObj =>
    find(state, (o: IVMarcaFamiliaIndustriaObj) => o?.needsToSave),
);

export const selectProviderConfigurationPerformanceInRevision = createSelector(
  selectedFamilyIndustries,
  (state: Array<IVMarcaFamiliaIndustriaObj>): Array<IVMarcaFamiliaIndustriaObj> =>
    filter(state, (o: IVMarcaFamiliaIndustriaObj) => o?.inRevision),
);
export const selectBrandFamilyCatIndustryQuery = createSelector(
  selectProviderConfigurationPerformanceToSave,
  (state: IVMarcaFamiliaIndustriaObj): MarcaFamiliaCatIndustria => ({
    IdMarcaFamiliaCatIndustria: state?.IdMarcaFamiliaCatIndustria,
    Activo: state?.Activo,
    IdCatIndustria: state?.IdCatIndustria,
    idCatSector: state?.idCatSector,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdMarcaFamilia: state?.IdMarcaFamilia,
  }),
);

// DOCS: Indica si  todas la configuracion del nivel de ingreso son validas
const selectUtilitiesAreValid = createSelector(
  [selectedFamilyIndustriesActive, selectProviderIsMexican],
  (state: Array<IVMarcaFamiliaIndustriaObj>, providerIsMexican): boolean => {
    let valid = true;
    forEach(state, (o: IVMarcaFamiliaIndustriaObj) => {
      forEach(
        filter(
          o?.ConfiguracionPrecioUtilidadCategoriaProveedor,
          (i: ConfiguracionPrecioUtilidadCategoriaProveedorObj) =>
            i?.catNivelIngreso?.NivelIngreso !== 'AAplus' &&
            i?.catNivelIngreso?.NivelIngreso !== 'Nuevo' &&
            i?.catNivelIngreso?.NivelIngreso !== 'Distribuidor',
        ),
        (utility: ConfiguracionPrecioUtilidadCategoriaProveedorObj) => {
          if (!utility?.UtilidadNivelIngreso || utility?.UtilidadNivelIngreso < 0) {
            valid = false;
          }
        },
      );
      if (!providerIsMexican) {
        if (
          o?.ConfiguracionComisionProveedor?.ComisionFrenteComercial === null ||
          o?.ConfiguracionComisionProveedor?.ComisionFrenteComercial < 0 ||
          o?.ConfiguracionComisionProveedor?.ComisionPharma === null ||
          o?.ConfiguracionComisionProveedor?.ComisionPharma < 0
        ) {
          valid = false;
        }
      } else if (
        o?.ConfiguracionComisionProveedor?.FactorDeCostoFijo === null ||
        o?.ConfiguracionComisionProveedor?.FactorDeCostoFijo <= 0
      ) {
        valid = false;
      }
    });
    return valid;
  },
);
export const selectHasChangesConfiguration = createSelector(
  selectedFamily,
  (state: IFamiliesSalesConfig): boolean =>
    !isEqual(
      JSON.stringify(map(state.configuration, (i) => omit(i, 'needsToSave', 'inRevision'))),
      JSON.stringify(map(state.configurationBackUp, (i) => omit(i, 'needsToSave', 'inRevision'))),
    ),
);

export const selectValidationToSaveConfiguration = createSelector(
  [selectHasChangesConfiguration, selectUtilitiesAreValid],
  (hasChanges: boolean, areValidUtilities): boolean => !!(hasChanges && areValidUtilities),
);
export const selectValidationToFinishConfiguration = createSelector(
  [selectHasChangesConfiguration, selectUtilitiesAreValid, selectedFamilyIndustries],
  (hasChanges: boolean, areValidUtilities, listFamilyIndustries): boolean =>
    !!(areValidUtilities && !isEmpty(listFamilyIndustries)),
);
export const selectProductInvestigationFollow = createSelector(
  selectCatProductInvestigationFollowList,
  (state: Array<CatProductoInvestigacionSeguimiento>): CatProductoInvestigacionSeguimiento =>
    find(state, (o: CatProductoInvestigacionSeguimiento) => o.Clave === 'ConfiguracionVentas'),
);
export const selectQueryFinishPurchasingConfiguration = createSelector(
  [selectProductInvestigationFollow, selectedFamily],
  (
    productInvestigationFollow: CatProductoInvestigacionSeguimiento,
    selectedFamily: IFamiliesSalesConfig,
  ): CotPartidaCotizacionInvestigacionSeguimiento => ({
    IdCotPartidaCotizacionInvestigacion: selectedFamily?.IdCotPartidaCotizacionInvestigacion,
    IdCatProductoInvestigacionSeguimiento:
      productInvestigationFollow?.IdCatProductoInvestigacionSeguimiento,
  }),
);
