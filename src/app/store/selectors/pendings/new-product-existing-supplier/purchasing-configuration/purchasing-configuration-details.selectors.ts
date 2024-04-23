import {createSelector} from '@ngrx/store';

import {
  IConfProveedorCompra,
  IFamily,
  IPurchasingConfigurationDetails,
  IVMarcaFamilia,
} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {CotPartidaCotizacionInvestigacionSeguimiento, ResumeGroupQueryInfo} from 'api-logistica';
import {selectNewProductExistingSupplier} from '@appSelectors/pendings/pendings.selectors';
import {NewProductExistingSupplierState} from '@appModels/store/pendings/new-product-existing-supplier/new-product-existing-supplier.models';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {capitalize, filter, find, isEmpty, isEqual, map as _map, omit, toLower} from 'lodash-es';

import {
  selectCatProductInvestigationFollowList,
  selectListAduana,
  selectListConceptoAgenteAduanal,
} from '@appSelectors/catalogs/catalogs.selectors';
import {
  Aduana,
  CatProductoInvestigacionSeguimiento,
  ConceptoAgenteAduanal,
  ConfiguracionPrecioProveedor,
  ConfiguracionPrecioProveedorFamilia,
} from 'api-catalogos';
import {getArrayForDropListOptionsPqf} from '@appUtil/util';
import {
  DropListOptionPqf,
  DropListOptionsPqf,
} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {IVTrademarkFamily} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

export const selectPurchasingConfigurationDetails = createSelector(
  selectNewProductExistingSupplier,
  (state: NewProductExistingSupplierState): IPurchasingConfigurationDetails =>
    state.purchasingConfiguration,
);
export const selectTitleHeader = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): string => state.title,
);
export const selectFilterList = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): Array<FilterOptionPqf> => state.filters,
);
export const selectIsActivePop = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): boolean => state.isActivePop,
);
export const selectedFilter = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails) =>
    find(state.filters, (o: FilterOptionPqf) => o?.isActive),
);
export const selectSearchTerm = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): string => state?.searchTerm,
);
export const selectFamiliesList = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): Array<IFamily> => state?.listFamilies,
);
export const selectListFamiliesStatus = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): number => state?.listFamiliesStatus,
);
export const selectDetailsFamilyStatus = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): number => state?.detailsFamilyStatus,
);
export const selectFamilySelected = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): IFamily => state.selectedFamily,
);
export const selectPreSelectedFamily = createSelector(
  selectPurchasingConfigurationDetails,
  (state: IPurchasingConfigurationDetails): IFamily => state.preSelectedFamily,
);
export const selectConfigurationFamilySelected = createSelector(
  selectFamilySelected,
  (state: IFamily): IConfProveedorCompra => state.configuration,
);

// DOCS Querys para consultas a servicios
export const familyListGroupQueryInfo = createSelector(
  selectPurchasingConfigurationDetails,
  selectedFilter,
  selectSearchTerm,
  (
    state: IPurchasingConfigurationDetails,
    selectedFilter: FilterOptionPqf,
    searchTerm: string,
  ): ResumeGroupQueryInfo => {
    const queryInfo: ResumeGroupQueryInfo = {
      CountElements: [],
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
          Campo: 'Mexicano',
        },
        {
          Campo: 'NombreImagen',
        },
        {
          Campo: 'NombreImagenMarca',
        },
      ],
      GroupColumn: 'IdCotPartidaCotizacionInvestigacion',
      SortField: 'FechaCreacionPendiente',
      SortDirection: selectedFilter?.id === '1' ? 'ASC' : 'DESC',
      Filters: [],
    };
    if (searchTerm !== '') {
      queryInfo?.Filters.push({
        NombreFiltro: 'NombreProveedor',
        ValorFiltro: searchTerm,
      });
    }

    return queryInfo;
  },
);

export const selectedCustomsAgent = createSelector(
  selectConfigurationFamilySelected,
  (state: IConfProveedorCompra) => state?.selectedCustomsAgent,
);
export const selectedCustoms = createSelector(
  selectConfigurationFamilySelected,
  (state: IConfProveedorCompra) => state?.selectedCustoms,
);

export const selectTrademarkFamiliesListForDropDown = createSelector(
  selectConfigurationFamilySelected,
  (state: IConfProveedorCompra): DropListOptionsPqf =>
    _map(
      state?.trademarkFamiliesList,
      (item: IVTrademarkFamily): DropListOptionPqf => ({
        label: `${capitalize(item.Tipo)} ${
          toLower(item.Subtipo) !== 'n/a' ? capitalize(item.Subtipo) : ''
        } ${toLower(item.Control) !== 'n/a' ? capitalize(item.Control) : ''}`,
        id: item.IdMarcaFamilia,
        isSelected: item.isSelected,
      }),
    ),
);
export const selectCustomsAgentConcept = createSelector(
  selectConfigurationFamilySelected,
  (state: IConfProveedorCompra) => state?.selectedCustomsAgentConcept,
);
export const selectProviderIsMexican = createSelector(
  selectFamilySelected,
  (state: IFamily) => state?.Mexicano,
);
export const selectProductInvestigationFollow = createSelector(
  selectCatProductInvestigationFollowList,
  (state: Array<CatProductoInvestigacionSeguimiento>): CatProductoInvestigacionSeguimiento =>
    find(state, (o: CatProductoInvestigacionSeguimiento) => o.Clave === 'ConfiguracionCompras'),
);
export const selectCustomsListForDrop = createSelector(
  selectListAduana,
  selectedCustomsAgent,
  (state: Array<Aduana>, customsAgent: DropListOptionPqf): DropListOptionsPqf =>
    getArrayForDropListOptionsPqf(
      filter(state, (o: Aduana) => o.Activo && o.IdAgenteAduanal === customsAgent?.id?.toString()),
      'IdAduana',
      'NombreLugar',
    ),
);
export const selectCustomsAgentsConceptListForDrop = createSelector(
  selectListConceptoAgenteAduanal,
  selectedCustoms,
  (state: Array<ConceptoAgenteAduanal>, customs: DropListOptionPqf): DropListOptionsPqf =>
    getArrayForDropListOptionsPqf(
      filter(
        state,
        (o: ConceptoAgenteAduanal) => o.Activo && o.IdAduana === customs?.id?.toString(),
      ),
      'IdConceptoAgenteAduanal',
      'Concepto',
    ),
);

export const selectTrademarkFamilyProviderConsolidation = createSelector(
  selectConfigurationFamilySelected,
  (state: IConfProveedorCompra): Array<IVMarcaFamilia> =>
    filter(state?.trademarkFamiliesList, (o: IVMarcaFamilia) => o?.isSelected),
);

export const selectHasChangesFamilySelected = createSelector(
  selectFamilySelected,
  (state: IFamily): boolean => {
    const consolidatedFamiliesHasChanges = !isEqual(
      omit(state.configuration?.trademarkFamilyProviderConsolidation, ['isOriginal', 'isChecked']),
      omit(state.configurationBackUp?.trademarkFamilyProviderConsolidation, [
        'isOriginal',
        'isChecked',
      ]),
    );

    const consolidatedFamiliesToDeleteHasChanges = !isEqual(
      JSON.stringify(
        omit(state.configuration?.trademarkFamilyProviderConsolidationToDelete, [
          'isOriginal',
          'isChecked',
        ]),
      ),
      JSON.stringify(
        omit(state.configurationBackUp?.trademarkFamilyProviderConsolidationToDelete, [
          'isOriginal',
          'isChecked',
        ]),
      ),
    );

    const hasChanges = !isEqual(
      JSON.stringify(
        omit(state.configuration, [
          'trademarkFamilyProviderConsolidation',
          'trademarkFamilyProviderConsolidationToDelete',
          'trademarkFamiliesList',
        ]),
      ),
      JSON.stringify(
        omit(state.configurationBackUp, [
          'trademarkFamilyProviderConsolidation',
          'trademarkFamilyProviderConsolidationToDelete',
          'trademarkFamiliesList',
        ]),
      ),
    );

    return hasChanges || consolidatedFamiliesHasChanges || consolidatedFamiliesToDeleteHasChanges;
  },
);
// DOCS: Indica si los valores del agente aduanal NO son validos
const selectCustomsAgentsInfoIsNotValid = createSelector(
  [selectedCustomsAgent, selectedCustoms, selectCustomsAgentConcept, selectProviderIsMexican],
  (
    customsAgent: DropListOptionPqf,
    customs: DropListOptionPqf,
    customsAgentConcept: DropListOptionPqf,
    providerIsMexican: boolean,
  ): boolean => {
    return !!(
      !providerIsMexican &&
      (isEmpty(customsAgent) || isEmpty(customs) || isEmpty(customsAgentConcept))
    );
  },
);
export const selectProviderPriceConfiguration = createSelector(
  selectConfigurationFamilySelected,
  (state: IConfProveedorCompra): ConfiguracionPrecioProveedor =>
    state?.ConfiguracionPrecioProveedor,
);
export const selectProviderPriceConfigurationFamily = createSelector(
  selectConfigurationFamilySelected,
  (state: IConfProveedorCompra): ConfiguracionPrecioProveedorFamilia =>
    state?.ConfiguracionPrecioProveedorFamilia,
);

// DOCS: Indica si la configuracion Internacional del provedor NO es valida
const selectConfigForInternationalProviderIsNotValid = createSelector(
  [selectProviderPriceConfiguration, selectProviderPriceConfigurationFamily],
  (
    providerPriceConfig: ConfiguracionPrecioProveedor,
    familyPriceConfig: ConfiguracionPrecioProveedorFamilia,
  ): boolean =>
    !!(
      familyPriceConfig?.VUCEM === null ||
      familyPriceConfig?.VUCEM < 0 ||
      familyPriceConfig?.ServicioLogistica === null ||
      familyPriceConfig?.ServicioLogistica < 0 ||
      familyPriceConfig?.TM === null ||
      familyPriceConfig?.TM < 0 ||
      familyPriceConfig?.Validacion === null ||
      familyPriceConfig?.Validacion < 0 ||
      familyPriceConfig?.Previo === null ||
      familyPriceConfig?.Previo < 0 ||
      familyPriceConfig?.Desconsolidacion === null ||
      familyPriceConfig?.Desconsolidacion < 0 ||
      familyPriceConfig?.Maniobras === null ||
      familyPriceConfig?.Maniobras < 0 ||
      familyPriceConfig?.Transito === null ||
      familyPriceConfig?.Transito < 0 ||
      familyPriceConfig?.ClasificacionProceso === null ||
      familyPriceConfig?.ClasificacionProceso < 0 ||
      familyPriceConfig?.InBond === null ||
      familyPriceConfig?.InBond < 0 ||
      providerPriceConfig?.PrecioConsularizacion === null ||
      providerPriceConfig?.PrecioConsularizacion < 0 ||
      providerPriceConfig?.PrecioEnvioDeDocumentos === null ||
      providerPriceConfig?.PrecioEnvioDeDocumentos < 0 ||
      providerPriceConfig?.PrecioPermiso === null ||
      providerPriceConfig?.PrecioPermiso < 0 ||
      providerPriceConfig?.PrecioFletePC === null ||
      providerPriceConfig?.PrecioFletePC < 0 ||
      providerPriceConfig?.IGI === null ||
      providerPriceConfig?.IGI < 0 ||
      providerPriceConfig?.DTA === null ||
      providerPriceConfig?.DTA < 0 ||
      providerPriceConfig?.PRV === null ||
      providerPriceConfig?.PRV < 0
    ),
);

// DOCS: Indica si la configuracion del provedor sin importar su origen NO es valida
const selectConfigForAllProvidersIsNotValid = createSelector(
  [selectProviderPriceConfiguration, selectProviderPriceConfigurationFamily],
  (
    providerPriceConfig: ConfiguracionPrecioProveedor,
    familyPriceConfig: ConfiguracionPrecioProveedorFamilia,
  ): boolean =>
    !!(
      familyPriceConfig?.AplicaPorPieza === null ||
      (familyPriceConfig?.AplicaPorPieza === false &&
        (familyPriceConfig?.MontoMinimoOC === null || familyPriceConfig?.MontoMinimoOC < 0)) ||
      (familyPriceConfig?.AplicaPorPieza === true &&
        (familyPriceConfig?.NumPiezas === null || familyPriceConfig?.NumPiezas < 0)) ||
      providerPriceConfig?.PorcentajeDescuento === null ||
      providerPriceConfig?.PorcentajeDescuento < 0 ||
      providerPriceConfig?.PrecioFleteAD === null ||
      providerPriceConfig?.PrecioFleteAD < 0
    ),
);
// DOCS: Indica si la configuracion del provedor NO es valida
const selectConfigForProviderIsNotValid = createSelector(
  [
    selectConfigForInternationalProviderIsNotValid,
    selectConfigForAllProvidersIsNotValid,
    selectProviderIsMexican,
  ],
  (
    configForInternationalProviderIsNotValid,
    configForAllProvidersIsNotValid,
    providerIsMexican,
  ): boolean =>
    !!(
      configForAllProvidersIsNotValid ||
      (!providerIsMexican && configForInternationalProviderIsNotValid)
    ),
);
export const saveValidation = createSelector(
  [
    selectConfigurationFamilySelected,
    selectHasChangesFamilySelected,
    selectCustomsAgentsInfoIsNotValid,
    selectConfigForProviderIsNotValid,
  ],
  (
    configuration: IConfProveedorCompra,
    hasChanges: boolean,
    customsAgentsInfoIsNotValid: boolean,
    providerConfigIsNotValid: boolean,
  ) =>
    !!(
      hasChanges &&
      !providerConfigIsNotValid &&
      !customsAgentsInfoIsNotValid &&
      (!configuration.MarcaFamiliaProveedor?.AplicaConsolidacion ||
        (configuration.MarcaFamiliaProveedor?.AplicaConsolidacion &&
          !isEmpty(configuration.trademarkFamilyProviderConsolidation)))
    ),
);

export const selectQueryFinishPurchasingConfiguration = createSelector(
  [selectProductInvestigationFollow, selectFamilySelected],
  (
    productInvestigationFollow: CatProductoInvestigacionSeguimiento,
    selectedFamily: IFamily,
  ): CotPartidaCotizacionInvestigacionSeguimiento => ({
    IdCotPartidaCotizacionInvestigacion: selectedFamily?.IdCotPartidaCotizacionInvestigacion,
    IdCatProductoInvestigacionSeguimiento:
      productInvestigationFollow?.IdCatProductoInvestigacionSeguimiento,
  }),
);

export const finishValidation = createSelector(
  [
    selectConfigurationFamilySelected,
    selectCustomsAgentsInfoIsNotValid,
    selectConfigForProviderIsNotValid,
  ],
  (
    configuration: IConfProveedorCompra,
    customsAgentsInfoIsNotValid: boolean,
    providerConfigIsNotValid: boolean,
  ) =>
    !!(
      !providerConfigIsNotValid &&
      !customsAgentsInfoIsNotValid &&
      (!configuration.MarcaFamiliaProveedor?.AplicaConsolidacion ||
        (configuration.MarcaFamiliaProveedor?.AplicaConsolidacion &&
          !isEmpty(configuration.trademarkFamilyProviderConsolidation)))
    ),
);
