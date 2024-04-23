/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {
  selectDetails,
  selectIdUserSelected,
} from '@appSelectors/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.selectors';

/* Models Imports */
import {
  IAuthorization,
  IClientAdjustmentOffer,
  IClients,
  IConfigExpressFreight,
  IDetailsState,
  IOfferAdjustmentClientQuotations,
  offerAdjustCarrousel,
  quotationOfferAdjustmentConfig,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {
  AjOfCondicionesdePagoCotizacion,
  AjusteMenosDosDiasPartidaObj,
  AjustePrecioPartidaObj,
  CatTipoAutorizacion,
  CotPartidaCotizacionDetalle,
  ParametroAutorizacion,
  QueryInfo,
  VClienteEVIajusteOfertaLista,
} from 'api-logistica';

/* Tools Imports */
import {
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {filter, find, forEach, isEmpty, map as _map} from 'lodash-es';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {
  selectCatAuthorizationTypes,
  selectPaymentConditionsForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {InternalSalesItem} from '@appModels/table/internal-sales-item';
import {
  buildInternalSalesItemExpressFreight,
  buildInternalSalesItemPrice,
  buildInternalSalesItemResumeAdjustment,
  buildInternalSalesItemTwoDays,
} from '@appHelpers/pending/offer-adjustment/offer-adjustment.helpers';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';

export const selectClients = createSelector(selectDetails, (state: IDetailsState) => state.clients);
export const selectContentOfferAdjustment = createSelector(
  selectDetails,
  (state: IDetailsState) => state.contentOfferAdjustment,
);
export const selectClientSelected = createSelector(
  selectDetails,
  (state: IDetailsState) => state.clientSelected,
);
export const selectIdClientSelected = createSelector(
  selectClientSelected,
  (state: IClientAdjustmentOffer) => state?.IdCliente,
);
export const selectIdAjOfQuotationStrategySelected = createSelector(
  selectClientSelected,
  (state: IClientAdjustmentOffer) =>
    state?.IdCliente ? state.IdAjOfEstrategiaCotizacion : DEFAULT_UUID,
);
export const selectNameClientSelected = createSelector(
  selectClientSelected,
  (state: IClientAdjustmentOffer) => (state?.Nombre ? state.Nombre : 'NA'),
);
export const selectIndexClientSelected = createSelector(
  selectClientSelected,
  (state: IClientAdjustmentOffer) => (state?.Index ? state.Index : 'NA'),
);
export const selectStrategyClientSelected = createSelector(
  selectClientSelected,
  (state: IClientAdjustmentOffer) => (state?.Estrategia ? state.Estrategia : 'NA'),
);
export const selectFiltersTab = createSelector(
  selectClients,
  (clients: IClients) => clients.filterTabs,
);
export const selectTabSelected = createSelector(
  selectClients,
  (clients: IClients) => clients.tabSelected,
);
export const selectSearchTypes = createSelector(
  selectClients,
  (clients: IClients) => clients.searchTypes,
);
export const selectSearchTypeSelected = createSelector(
  selectClients,
  (clients: IClients) => clients.typeSelected,
);
export const selectValuesFilter = createSelector(
  selectClients,
  (clients: IClients) => clients.valuesFilter,
);
export const selectFilterSelected = createSelector(
  selectClients,
  (clients: IClients) => clients.valueFilterSelected,
);
export const selectSearchTerm = createSelector(
  selectClients,
  (clients: IClients) => clients.searchTerm,
);
export const selectIsLoadingClients = createSelector(
  selectClients,
  (clients: IClients) => clients.dataListClientsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectIsLoadingMoreClients = createSelector(
  selectClients,
  (clients: IClients) => clients.isLoadingMoreClients,
);
export const selectListClients = createSelector(selectClients, (clients: IClients) =>
  _map(clients.listClients, (client, index) => ({
    ...client,
    Index: index + 1,
  })),
);
export const selectTotalClients = createSelector(
  selectClients,
  (clients: IClients) => clients.totalClients,
);
export const selectCurrentPage = createSelector(
  selectClients,
  (clients: IClients) => clients.queryInfo.desiredPage,
);
export const selectTotalQuotations = createSelector(
  selectListClients,
  (clients: Array<VClienteEVIajusteOfertaLista>) => {
    let totalQuotations = 0;
    forEach(clients, (client) => {
      totalQuotations = totalQuotations + client.TotalCotizacionesEnAjuste;
    });
    return totalQuotations;
  },
);
export const selectQueryInfo = createSelector(
  selectClients,
  selectIdUserSelected,
  selectFilterSelected,
  selectTabSelected,
  selectSearchTerm,
  (
    clients: IClients,
    idClient: string,
    filterSelected: DropListOption,
    tabSelected,
    searchTerm: string,
  ) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [{NombreFiltro: 'IdUsuario', ValorFiltro: idClient}];
    queryInfo.SortField = 'TotalUSDPartidasEnAjuste';
    if (filterSelected.value === '1') {
      queryInfo.SortDirection = 'desc';
    } else {
      queryInfo.SortDirection = 'asc';
    }

    if (tabSelected.id === '2') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {NombreFiltro: 'ConAjusteTiempoEntrega', ValorFiltro: true},
      ];
    } else if (tabSelected.id === '3') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {NombreFiltro: 'ConAjusteCondicionesPago', ValorFiltro: true},
      ];
    } else if (tabSelected.id === '4') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {NombreFiltro: 'ConAjustePrecio', ValorFiltro: true},
      ];
    }

    if (searchTerm !== '') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {NombreFiltro: 'ClienteEstrategiaAjuste', ValorFiltro: searchTerm},
      ];
    }
    return queryInfo;
  },
);

// REWORK
export const selectClientQuotations = createSelector(
  selectDetails,
  (state: IDetailsState): IOfferAdjustmentClientQuotations => state.clientQuotations,
);
export const selectCarrouselApiStatus = createSelector(
  selectClientQuotations,
  (state: IOfferAdjustmentClientQuotations): boolean =>
    state.apiStatus !== API_REQUEST_STATUS_SUCCEEDED,
);
export const selectCarrouselOptions = createSelector(
  selectClientQuotations,
  (state: IOfferAdjustmentClientQuotations): Array<ICard> =>
    _map(
      state.quotations,
      (o: offerAdjustCarrousel): ICard => {
        return {
          active: o.selected,
          value: o.IdCotCotizacion,
          labels: [
            {label: `#${o.index} · FO-${o.Folio}`, className: CLASS_NAMES.title},
            {
              label: `Valor Total ${new CurrencyFormat().transform(
                o.TotalPartidasEnAjuste,
                o.ClaveMoneda,
              )} ${o.ClaveMoneda}`,
              className: CLASS_NAMES.totalAmount,
            },
            {
              label: `${o.TotalProductos} ${o.TotalProductos === 1 ? 'Producto' : 'Productos'}`,
              className: CLASS_NAMES.countProducts,
            },
          ],
        };
      },
    ),
);
export const selectedCarrouselCard = createSelector(
  selectClientQuotations,
  (state: IOfferAdjustmentClientQuotations): offerAdjustCarrousel =>
    find(state.quotations, (o: offerAdjustCarrousel) => o.selected),
);
export const selectDeliveryTimeControls = createSelector(
  selectedCarrouselCard,
  (state: offerAdjustCarrousel) => state?.deliveryTimeControls,
);

export const selectedItemExpressFreight = createSelector(
  selectedCarrouselCard,
  (state: offerAdjustCarrousel): IConfigExpressFreight => {
    if (state?.deliveryTimeControls?.expressFreight) {
      return find(state?.offerConfig?.expressFreight, (item: IConfigExpressFreight) => {
        return item.showItems;
      });
    }
    return null;
  },
);

export const selectedItemsByOption = createSelector(
  selectedCarrouselCard,
  selectDeliveryTimeControls,
  (state: offerAdjustCarrousel, deliveryTimeControls: any): InternalSalesItem[] => {
    let item: InternalSalesItem[] = [];
    if (state?.deliveryTimeControls?.twoDays) {
      const showNotes = !isEmpty(
        filter(
          state?.offerConfig?.twoDaysConfig,
          (o: AjusteMenosDosDiasPartidaObj) =>
            o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
        ),
      );
      item = _map(
        state?.offerConfig?.twoDaysConfig,
        (item: AjusteMenosDosDiasPartidaObj, index: number) => {
          return buildInternalSalesItemTwoDays(showNotes, item, index, state, deliveryTimeControls);
        },
      );
    }
    if (state?.deliveryTimeControls?.expressFreight) {
      item = _map(
        state?.offerConfig?.expressFreight,
        (item: IConfigExpressFreight, index: number) => {
          const showNotes = !isEmpty(
            filter(
              item.listaCotPartidaCotizacionDetalles,
              (o: CotPartidaCotizacionDetalle) =>
                o?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
            ),
          );
          return buildInternalSalesItemTwoDays(showNotes, item, index, state, deliveryTimeControls);
        },
      );
    }
    return item;
  },
);

export const selectedQuotationCurrency = createSelector(
  selectedCarrouselCard,
  (state): string => state?.ClaveMoneda,
);
export const selectOfferConfigObj = createSelector(
  selectedCarrouselCard,
  (state: offerAdjustCarrousel): quotationOfferAdjustmentConfig => state?.offerConfig,
);
export const selectPaymentConditionsObj = createSelector(
  selectedCarrouselCard,
  (state: offerAdjustCarrousel): AjOfCondicionesdePagoCotizacion =>
    state?.offerConfig?.paymentConditions,
);
export const selectedQuotationPaymentCondition = createSelector(
  [selectedCarrouselCard, selectPaymentConditionsForDropDown],
  (quotation: offerAdjustCarrousel, conditions: Array<DropListOption>) =>
    find(conditions, (o: DropListOption) => o?.value === quotation?.IdCatCondicionesDePago)?.label,
);
export const selectPaymentConditionsFormQuotation = createSelector(
  [selectedCarrouselCard, selectPaymentConditionsForDropDown],
  (quotation: offerAdjustCarrousel, conditions: Array<DropListOption>): DropListOption =>
    find(conditions, (o: DropListOption) => o?.value === quotation?.IdCatCondicionesDePago),
);
export const selectedPaymentConditionFromObj = createSelector(
  [selectPaymentConditionsObj, selectPaymentConditionsForDropDown],
  (state: AjOfCondicionesdePagoCotizacion, conditions: Array<DropListOption>): DropListOption =>
    find(conditions, (o: DropListOption) => o?.value === state?.IdCatCondicionesDePago),
);
export const disableAditionalDays = createSelector(
  selectedPaymentConditionFromObj,
  (selectedCondition: DropListOption): boolean =>
    selectedCondition?.label.includes('Anticipo') || selectedCondition?.label.includes('entrega'),
);

export const selectPriceConfig = createSelector(
  selectedCarrouselCard,
  (state: offerAdjustCarrousel): Array<AjustePrecioPartidaObj> => state?.offerConfig?.priceConfig,
);
export const selectExpressFreightList = createSelector(
  selectOfferConfigObj,
  (state: quotationOfferAdjustmentConfig): Array<IConfigExpressFreight> => state?.expressFreight,
);
export const selectAllItemsInConfigurations = createSelector(selectOfferConfigObj, (state) => {
  const items = [];
  if (state?.twoDaysConfig.length > 0) {
    state.twoDaysConfig.forEach((i) => items.push(i));
  }
  if (state?.priceConfig.length > 0) {
    state.priceConfig.forEach((i) => items.push(i));
  }
  return items;
});

export const twoDaysStepValidatorNext = createSelector(
  selectOfferConfigObj,
  (state: quotationOfferAdjustmentConfig): boolean =>
    filter(
      state?.twoDaysConfig,
      (o: AjusteMenosDosDiasPartidaObj) =>
        !o?.ajOfValorConfiguracionTiempoEntregaCotizacion?.Aceptado &&
        !o?.ajOfValorConfiguracionTiempoEntregaCotizacion?.Rechazado,
    ).length === 0,
);
export const expressFreightStepValidatorNext = createSelector(
  selectOfferConfigObj,
  (state: quotationOfferAdjustmentConfig): boolean =>
    filter(
      state?.expressFreight,
      (o: IConfigExpressFreight) =>
        !o?.ajOfFleteExpressCotizacion?.Aceptado &&
        !o?.ajOfFleteExpressCotizacion?.Rechazado &&
        !o?.ajOfFleteExpressCotizacion?.ParcialmenteAceptado,
    ).length === 0,
);
export const deliveryTimeNextStepEnableValidator = createSelector(
  [twoDaysStepValidatorNext, expressFreightStepValidatorNext],
  (twoDaysValidator, expressFreightValidator): boolean =>
    twoDaysValidator && expressFreightValidator,
);
export const paymentConditionsNextStepEnableValidator = createSelector(
  selectOfferConfigObj,
  (state: quotationOfferAdjustmentConfig): boolean =>
    ((state?.paymentConditions?.Aceptado || state?.paymentConditions?.Rechazado) &&
      !isEmpty(state.paymentConditions?.Comentarios)) ||
    isEmpty(state?.paymentConditions),
);
export const priceNextStepEnableValidator = createSelector(
  selectOfferConfigObj,
  (state: quotationOfferAdjustmentConfig): boolean =>
    filter(
      state?.priceConfig,
      (o: AjustePrecioPartidaObj) =>
        !o.ajOfPrecioCotizacion.Aceptado &&
        !o.ajOfPrecioCotizacion.Rechazado &&
        !o.ajOfPrecioCotizacion.ParcialmenteAceptado,
    ).length === 0,
);
export const selectCatAuthorizationType = createSelector(
  selectCatAuthorizationTypes,
  (state): CatTipoAutorizacion =>
    find(state.listAuthorizationTypes, (o: CatTipoAutorizacion) => o.Clave === 'ajustedeoferta'),
);
export const selectAuthorization = createSelector(
  selectedCarrouselCard,
  (state: offerAdjustCarrousel): IAuthorization => state?.authorizationObj,
);
export const selectCode = createSelector(
  selectAuthorization,
  (state: IAuthorization): Array<string> => state?.code || [null, null, null, null],
);
export const authorizationFinderQueryInfo = createSelector(
  [selectCatAuthorizationType, selectedCarrouselCard, selectIdUser],
  (
    authorizationType: CatTipoAutorizacion,
    quotation: offerAdjustCarrousel,
    IdUser: string,
  ): QueryInfo => {
    return {
      Filters: [
        {
          NombreFiltro: 'IdCatTipoAutorizacion',
          ValorFiltro: authorizationType?.IdCatTipoAutorizacion,
        },
        {
          NombreFiltro: 'IdOperacion',
          ValorFiltro: quotation?.IdCotCotizacion,
        },
        {
          NombreFiltro: 'IdUsuarioSolicita',
          ValorFiltro: IdUser,
        },
      ],
    };
  },
);

export const cancelCodeQueryInfo = createSelector(
  selectAuthorization,
  (state) => state?.authorization?.IdAutorizacion,
);
export const sendCodeQueryInfo = createSelector(
  [selectAuthorization, selectedCarrouselCard],
  (authorization: IAuthorization, quotation: offerAdjustCarrousel): ParametroAutorizacion => {
    return {
      IdCatTipoAutorizacion: null,
      IdOperacion: null,
      IdAutorizacion: authorization?.authorization?.IdAutorizacion,
      IdUsuarioAutoriza: null,
      CodigoAutorizacion: authorization?.CodigoAutorizacion,
      Descripcion: null,
    };
  },
);
export const selectCodePopInfoMessage = createSelector(
  [selectOfferConfigObj, selectedPaymentConditionFromObj],
  (state: quotationOfferAdjustmentConfig, selectedPaymenCondition: DropListOption) => {
    const paymentConditionsMessage = selectedPaymenCondition
      ? `Condiciones de pago solicitadas: ${selectedPaymenCondition?.label} +${state.paymentConditions.DiasAdicionales}`
      : '';
    const priceItems = filter(
      state?.priceConfig,
      (o: AjustePrecioPartidaObj) => o.ajOfPrecioCotizacion.RequiereAutorizacion,
    );
    const adjustmentMessage = `Ajuste de precio: ${priceItems?.length} ${
      priceItems?.length === 1 ? 'Producto' : 'Productos'
    }`;
    return paymentConditionsMessage + '\n' + adjustmentMessage || '';
  },
);

//DOCS: Pintar las partidas al dar click sobre una partida desplegable, sección "Flete Express"
export const selectedItemsDetails = createSelector(
  selectedCarrouselCard,
  selectedItemExpressFreight,
  (state: offerAdjustCarrousel, express: IConfigExpressFreight) => {
    let items: InternalSalesItem[] = [];
    if (express !== undefined && state !== null) {
      const showNotes = !isEmpty(
        filter(
          express?.listaCotPartidaCotizacionDetalles,
          (o: CotPartidaCotizacionDetalle) =>
            o?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
        ),
      );
      items = _map(
        express?.listaCotPartidaCotizacionDetalles,
        (item: CotPartidaCotizacionDetalle, index: number) => {
          return buildInternalSalesItemExpressFreight(showNotes, item, index, state);
        },
      );
    }
    return items;
  },
);

//Docs: Construcción del item reutlizable sección "4.- Resumen de Ajustes"
export const selectHeaderInternalSalesItemResumeAdjustment = createSelector(
  selectAllItemsInConfigurations,
  selectedCarrouselCard,
  (state: any[], quoteSelected: offerAdjustCarrousel): InternalSalesItem => {
    const showNotes = !isEmpty(
      filter(
        state,
        (o: AjustePrecioPartidaObj) =>
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios ||
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
      ),
    );
    return buildInternalSalesItemResumeAdjustment(showNotes, {}, 0, quoteSelected);
  },
);

//Docs: Construcción del item reutlizable sección "4.- Resumen de Ajustes"
export const selectInternalSalesItemResumeAdjustment = createSelector(
  selectAllItemsInConfigurations,
  selectedCarrouselCard,
  (state: any[], quoteSelected: offerAdjustCarrousel): InternalSalesItem[] => {
    const showNotes = !isEmpty(
      filter(
        state,
        (o: AjustePrecioPartidaObj) =>
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios ||
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
      ),
    );
    return _map(
      state,
      (o, index: number): InternalSalesItem => {
        return buildInternalSalesItemResumeAdjustment(showNotes, o, index, quoteSelected);
      },
    );
  },
);

//DOCS: Construccion del Header del item reutilizable sección "3.- Precio"
export const selectHeaderInternalSalesItemPrice = createSelector(
  selectPriceConfig,
  selectedCarrouselCard,
  (state: AjustePrecioPartidaObj[], quoteSelected: offerAdjustCarrousel): InternalSalesItem => {
    const showNotes = !isEmpty(
      filter(
        state,
        (o: AjustePrecioPartidaObj) =>
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
      ),
    );
    return buildInternalSalesItemPrice(showNotes, {}, 0, quoteSelected);
  },
);

//DOCS: Construccion del item reutilizable sección "Precio"
export const selectInternalSalesItemPrice = createSelector(
  selectPriceConfig,
  selectedCarrouselCard,
  (state: AjustePrecioPartidaObj[], quoteSelected: offerAdjustCarrousel): InternalSalesItem[] => {
    let items: InternalSalesItem[] = [];
    const showNotes = !isEmpty(
      filter(
        state,
        (o: AjustePrecioPartidaObj) =>
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
      ),
    );
    items = _map(state, (item: AjustePrecioPartidaObj, index: number) => {
      return buildInternalSalesItemPrice(showNotes, item, index, quoteSelected);
    });
    return items;
  },
);

//DOCS: Construcción del item reutilizable sección "Flete Express"
export const selectHeaderInternalSalesExpressFreight = createSelector(
  selectedCarrouselCard,
  selectedItemExpressFreight,
  (state: offerAdjustCarrousel, express: IConfigExpressFreight) => {
    const showNotes = !isEmpty(
      filter(
        express?.listaCotPartidaCotizacionDetalles,
        (o: CotPartidaCotizacionDetalle) =>
          o?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
      ),
    );
    return buildInternalSalesItemExpressFreight(showNotes, {}, 0, state);
  },
);

//DOCS: Construcción del item reutilizable sección "Menos 2 dias"
export const selectHeaderInternalSalesItemTwoDays = createSelector(
  selectedCarrouselCard,
  selectDeliveryTimeControls,
  (state: offerAdjustCarrousel, deliveryTimeControls: any) => {
    const showNotes = !isEmpty(
      filter(
        state?.offerConfig?.twoDaysConfig,
        (o: AjusteMenosDosDiasPartidaObj) =>
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
      ),
    );
    return buildInternalSalesItemTwoDays(showNotes, {}, 0, state, deliveryTimeControls);
  },
);
