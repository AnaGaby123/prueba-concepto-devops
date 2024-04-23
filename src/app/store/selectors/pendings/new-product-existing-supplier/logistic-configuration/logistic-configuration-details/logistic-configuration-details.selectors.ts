import {createSelector} from '@ngrx/store';
import {selectLogisticConfiguration} from '@appSelectors/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.selectors';
import {
  IFamilyLogisticConfiguration,
  ILogisticConfigurationDetailsState,
  IOfferDeliveryRoutes,
  totalsDaysTimeLogistic,
} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {ResumeGroupQueryInfo} from 'api-logistica';
import {SortOptionsFiltersPqf} from '@appModels/store/utils/utils.model';
import {filter, find, isEqual, map as _map, omit, sum} from 'lodash-es';
import {validNumberGreatZeroAndNotNull} from '@appHelpers/pending/new-product-existing-supplier/logistic-configuration/logistic-configuration.helpers';
import {selectCatProductInvestigationFollowList} from '@appSelectors/catalogs/catalogs.selectors';
import {CatProductoInvestigacionSeguimiento} from 'api-catalogos';

export const selectFilterList = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState): Array<FilterOptionPqf> => state.filters,
);
export const selectSearchTerm = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState) => state.searchTerm,
);
export const selectLogisticConfigurationList = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState): Array<IFamilyLogisticConfiguration> =>
    state.familiesList,
);
export const selectPreselectedFamily = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState): IFamilyLogisticConfiguration =>
    state?.preSelectedFamily,
);
export const selectLogisticConfigurationSelected = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState): IFamilyLogisticConfiguration => state.selectedFamily,
);

export const selectIsActivePopUp = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState): boolean => state.isActivePopUp,
);
export const selectApiStatusDashboard = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState): number => state.apiStatusDashboard,
);
export const selectApiStatusDetails = createSelector(
  selectLogisticConfiguration,
  (state: ILogisticConfigurationDetailsState): number => state.apiStatusDetails,
);

export const selectQueryInfoLogisticConfigurationList = createSelector(
  selectLogisticConfiguration,
  selectSearchTerm,
  selectFilterList,
  (
    state: ILogisticConfigurationDetailsState,
    searchTerm: string,
    selectedFilter: Array<FilterOptionPqf>,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [],
      CountElements: [],
      SumFields: [],
      Fields: [
        {Campo: 'IdCotPartidaCotizacionInvestigacion'},
        {Campo: 'IdMarca'},
        {Campo: 'NombreMarca'},
        {Campo: 'IdFamilia'},
        {Campo: 'IdProveedor'},
        {Campo: 'NombreProveedor'},
        {Campo: 'IdMarcaFamiliaProveedor'},
        {Campo: 'CatTipoProductoNombre'},
        {Campo: 'CatSubTipoProductoNombre'},
        {Campo: 'CatControlNombre'},
        {Campo: 'IdActual'},
        {Campo: 'IdAnterior'},
        {Campo: 'Mexicano'},
        {Campo: 'NombreImagenMarca'},
      ],
      GroupColumn: 'IdCotPartidaCotizacionInvestigacion',
      SortField: 'FechaCreacionPendiente',
      SortDirection: 'ASC',
    };

    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [...filters.Filters, {NombreFiltro: 'NombreProveedor', ValorFiltro: searchTerm}],
      };
    }

    selectedFilter.forEach((item) => {
      if (item.isActive && item.text !== SortOptionsFiltersPqf.newer) {
        filters = {
          ...filters,
          SortDirection: 'DESC',
        };
      }
    });

    return filters;
  },
);

export const selectProductInvestigationFollow = createSelector(
  selectCatProductInvestigationFollowList,
  (state: Array<CatProductoInvestigacionSeguimiento>): CatProductoInvestigacionSeguimiento =>
    find(state, (o: CatProductoInvestigacionSeguimiento) => o.Clave === 'ConfiguracionLogistica'),
);
export const selectProviderIsMexican = createSelector(
  selectLogisticConfigurationSelected,
  (state: IFamilyLogisticConfiguration): boolean => state?.Mexicano,
);

export const selectLogisticConfigurationDeliveryRouteSelected = createSelector(
  selectLogisticConfigurationSelected,
  (state: IFamilyLogisticConfiguration): IOfferDeliveryRoutes =>
    find(state?.detailsConfiguration, (o: IOfferDeliveryRoutes) => o?.isSelected) || null,
);

export const selectSumLogisticsTime = createSelector(
  selectLogisticConfigurationDeliveryRouteSelected,
  (state: IOfferDeliveryRoutes): totalsDaysTimeLogistic => {
    const totalDays: totalsDaysTimeLogistic = {
      timeLogistics: sum([
        Number(state?.DiasPedidoACompra),
        Number(state?.DiasCompraAEmbarque),
        Number(state?.DiasEmbarqueAArribo),
        Number(state?.DiasConsolidacionPharma),
        Number(state?.DiasArriboAImportacion),
        Number(state?.DiasImportacionAAlmacen),
      ]),
      timeCommerce: 0,
    };
    totalDays.timeCommerce = sum([
      Number(totalDays.timeLogistics),
      Number(state?.DiasAlmacenAInspeccion),
      Number(state?.DiasInspeccionAEmbalaje),
    ]);
    return totalDays;
  },
);

export const selectHasChangesFamilySelected = createSelector(
  selectLogisticConfigurationSelected,
  (state: IFamilyLogisticConfiguration): boolean => {
    let isValid: Array<boolean> = _map(state?.detailsConfiguration, (o, index: number) => {
      return !isEqual(
        omit(state.detailsConfiguration[index], ['isSelected']),
        omit(state.detailConfigurationBackup[index], ['isSelected']),
      );
    });
    return isValid.includes(true);
  },
);

export const selectSaveChangesValidation = createSelector(
  [selectLogisticConfigurationSelected, selectHasChangesFamilySelected, selectProviderIsMexican],
  (
    selectedConfiguration: IFamilyLogisticConfiguration,
    hasChanges: boolean,
    providerIsMexican: boolean,
  ): boolean => {
    const validateRoutes = filter(
      selectedConfiguration?.detailsConfiguration,
      (o: IOfferDeliveryRoutes) => {
        return !!(
          validNumberGreatZeroAndNotNull(o?.DiasPedidoACompra) &&
          validNumberGreatZeroAndNotNull(o?.DiasCompraAEmbarque) &&
          validNumberGreatZeroAndNotNull(o?.DiasEmbarqueAArribo) &&
          validNumberGreatZeroAndNotNull(o?.DiasArriboAImportacion) &&
          validNumberGreatZeroAndNotNull(o?.DiasAlmacenAInspeccion) &&
          validNumberGreatZeroAndNotNull(o?.DiasInspeccionAEmbalaje) &&
          (providerIsMexican ||
            (!providerIsMexican &&
              validNumberGreatZeroAndNotNull(o?.DiasConsolidacionPharma) &&
              validNumberGreatZeroAndNotNull(o?.DiasImportacionAAlmacen))) &&
          hasChanges
        );
      },
    );
    return selectedConfiguration?.detailsConfiguration?.length > 0 && validateRoutes.length >= 1;
  },
);

export const selectFinishValidation = createSelector(
  [selectLogisticConfigurationSelected, selectHasChangesFamilySelected, selectProviderIsMexican],
  (
    selectedConfiguration: IFamilyLogisticConfiguration,
    hasChanges: boolean,
    providerIsMexican: boolean,
  ): boolean => {
    const validateRoutes = filter(
      selectedConfiguration?.detailsConfiguration,
      (o: IOfferDeliveryRoutes) => {
        return !!(
          validNumberGreatZeroAndNotNull(o?.DiasPedidoACompra) &&
          validNumberGreatZeroAndNotNull(o?.DiasCompraAEmbarque) &&
          validNumberGreatZeroAndNotNull(o?.DiasEmbarqueAArribo) &&
          validNumberGreatZeroAndNotNull(o?.DiasArriboAImportacion) &&
          validNumberGreatZeroAndNotNull(o?.DiasAlmacenAInspeccion) &&
          validNumberGreatZeroAndNotNull(o?.DiasInspeccionAEmbalaje) &&
          (providerIsMexican ||
            (!providerIsMexican &&
              validNumberGreatZeroAndNotNull(o?.DiasConsolidacionPharma) &&
              validNumberGreatZeroAndNotNull(o?.DiasImportacionAAlmacen)))
        );
      },
    );
    return (
      selectedConfiguration?.detailsConfiguration?.length > 0 &&
      validateRoutes.length === selectedConfiguration?.detailsConfiguration?.length
    );
  },
);
