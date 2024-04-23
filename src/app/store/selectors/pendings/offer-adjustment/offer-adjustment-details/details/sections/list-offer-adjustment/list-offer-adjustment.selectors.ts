/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {
  selectClientQuotations,
  selectContentOfferAdjustment,
  selectIdAjOfQuotationStrategySelected,
  selectIdClientSelected,
} from '@appSelectors/pendings/offer-adjustment/offer-adjustment-details/details/details.selectors';

/* Models Imports */
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {
  ICatProvidersFreight,
  IClientQuotes,
  IContentDetailsGeneral,
  IContentOfferAdjustment,
  IQuotation,
  ITacticsAndSubtactics,
  offerAdjustCarrousel,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {FilterTuple, QueryInfo} from 'api-logistica';

/* Tools Imports */
import {toRound} from '@appUtil/util';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {filter, find, flow, isEmpty, reduce} from 'lodash-es';

export const selectContentDetailsGeneral = createSelector(
  selectContentOfferAdjustment,
  (state: IContentOfferAdjustment) => state?.contentDetailsGeneral,
);
export const selectDataPercentageBar = createSelector(
  selectContentDetailsGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral) => {
    let items: Array<IPercentageBarItems> = [];
    const valorTotalEnCierre =
      contentDetailsGeneral.percentageBarTotalInClosing.ValorTotalUSDenCierre;
    const originales = contentDetailsGeneral.percentageBarTotalInClosing.TotalPartidasOriginales;
    const complementarias =
      contentDetailsGeneral.percentageBarTotalInClosing.TotalPartidasComplementarias;
    const promocion = contentDetailsGeneral.percentageBarTotalInClosing.TotalPartidasPromocion;
    const alternativas =
      contentDetailsGeneral.percentageBarTotalInClosing.TotalPartidasAlternativas;
    const ahorro = contentDetailsGeneral.percentageBarTotalInClosing.TotalPartidasAhorro;

    items = [
      ...items,
      {
        id: '1',
        percentage: `${
          valorTotalEnCierre > 0 ? toRound((originales / valorTotalEnCierre) * 100, 2) : 0
        }%`,
        subtitle: `Originales · ${new CurrencyFormat().transform(originales, 'USD')}`,
        color: '#6a6aae',
      },
      {
        id: '2',
        percentage: `${
          valorTotalEnCierre > 0 ? toRound((complementarias / valorTotalEnCierre) * 100, 2) : 0
        }%`,
        subtitle: `comp · ${new CurrencyFormat().transform(complementarias, 'USD')}`,
        color: '#008894',
      },
      {
        id: '3',
        percentage: `${
          valorTotalEnCierre > 0 ? toRound((promocion / valorTotalEnCierre) * 100, 2) : 0
        }%`,
        subtitle: `promoción · ${new CurrencyFormat().transform(promocion, 'USD')}`,
        color: '#e29d2a',
      },
      {
        id: '4',
        percentage: `${
          valorTotalEnCierre > 0 ? toRound((alternativas / valorTotalEnCierre) * 100, 2) : 0
        }%`,
        subtitle: `alternativas · ${new CurrencyFormat().transform(alternativas, 'USD')}`,
        color: '#cbb7a3',
      },
      {
        id: '5',
        percentage: `${
          valorTotalEnCierre > 0 ? toRound((ahorro / valorTotalEnCierre) * 100, 2) : 0
        }%`,
        subtitle: `ahorro · ${new CurrencyFormat().transform(ahorro, 'USD')}`,
        color: '#4ba92b',
      },
    ];
    return items;
  },
);
export const selectDataPercentageBarCustom = createSelector(
  selectContentDetailsGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral) => {
    let items: Array<IPercentageBarItems> = [];

    items = [
      ...items,
      {
        id: '1',
        percentage: `${0}%`,
        subtitle: `Originales · ${new CurrencyFormat().transform(0, 'USD')}`,
        color: '#6a6aae',
      },
      {
        id: '2',
        percentage: `${0}%`,
        subtitle: `comp · ${new CurrencyFormat().transform(0, 'USD')}`,
        color: '#008894',
      },
      {
        id: '3',
        percentage: `${0}%`,
        subtitle: `promoción · ${new CurrencyFormat().transform(0, 'USD')}`,
        color: '#e29d2a',
      },
      {
        id: '4',
        percentage: `${0}%`,
        subtitle: `alternativas · ${new CurrencyFormat().transform(0, 'USD')}`,
        color: '#cbb7a3',
      },
      {
        id: '5',
        percentage: `${0}%`,
        subtitle: `ahorro · ${new CurrencyFormat().transform(0, 'USD')}`,
        color: '#4ba92b',
      },
    ];
    return items;
  },
);
export const selectTotalInClosing = createSelector(
  selectContentDetailsGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral) =>
    contentDetailsGeneral.percentageBarTotalInClosing.ValorTotalUSDenCierre,
);
export const selectQueryInfoQuotation = createSelector(
  [selectContentOfferAdjustment, selectIdClientSelected, selectIdAjOfQuotationStrategySelected],
  (state: IContentOfferAdjustment, idClient: string, idAjOfQuotationStrategy: string) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [
      {NombreFiltro: 'IdCliente', ValorFiltro: idClient},
      {
        NombreFiltro: 'IdAjOfEstrategiaCotizacion',
        ValorFiltro: idAjOfQuotationStrategy,
      },
      {NombreFiltro: 'ConAjusteOferta', ValorFiltro: true},
    ];
    return queryInfo;
  },
);
export const selectQueryInfoAmountBilled = createSelector(
  [selectContentOfferAdjustment, selectIdClientSelected],
  (state: IContentOfferAdjustment, idClient: string) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [
      {NombreFiltro: 'IdCliente', ValorFiltro: idClient},
      {NombreFiltro: 'AjusteDeOferta', ValorFiltro: true},
    ];
    queryInfo.pageSize = 100;
    queryInfo.desiredPage = 1;
    return queryInfo;
  },
);
export const selectQueryDataProgressBarTotalInClosing = createSelector(
  [selectContentOfferAdjustment, selectIdClientSelected],
  (state: IContentOfferAdjustment, idClient: string) => {
    let queryInfo: Array<FilterTuple> = [];
    queryInfo = [
      ...queryInfo,
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: idClient,
      },
    ];
    return queryInfo;
  },
);
export const selectContentDetailGeneral = createSelector(
  selectContentOfferAdjustment,
  (state: IContentOfferAdjustment) => state?.contentDetailsGeneral,
);
export const selectCatProvidersFreight = createSelector(
  selectContentDetailGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral): Array<ICatProvidersFreight> =>
    contentDetailsGeneral.catProvidersFreight,
);
export const selectClientQuotesByClient = createSelector(
  selectContentDetailGeneral,
  (state: IContentDetailsGeneral): IClientQuotes =>
    flow([
      () =>
        find(
          state.quotationsData,
          (o: IClientQuotes) =>
            o.idClient === state.currentClient?.IdCliente &&
            o.idAjOfQuotationStrategy === state.currentClient?.IdAjOfEstrategiaCotizacion,
        ),
      (data) => (isEmpty(data) ? ({} as IClientQuotes) : data),
    ])(),
);

/* TODO: Esta propiedad actualmente no se ocupa, Revisar Funcionalidad
export const currentQuotation = createSelector(
  selectClientQuotesByClient,
  (quotes): IQuotation =>
    findIndex(quotes.quotations, (quotation: IQuotation) => quotation.isSelected) !== -1
      ? find(quotes.quotations, (quotation: IQuotation) => quotation.isSelected)
      : ({
          // FIXME: No coincide el tipado, quitar el as IQuotation
          Activo: false,
          AgregarDatosFacturacion: false,
          Ajustada: false,
          Caducada: false,
          ComentarioFlete: '',
          Consecutivo: 0,
          DiasDePagoAdicionales: 0,
          DiasDePagoAdicionalesDeOrigen: 0,
          DiasDePagoDeOrigen: 0,
          Enviado: false,
          EstadoCotizacion: '',
          FechaCaducidad: '',
          FechaCotizacion: '',
          FechaEnvio: '',
          FechaLectura: '',
          FechaRecepcion: '',
          FechaRegistro: '',
          FechaUltimaActualizacion: '',
          FleteDesglosado: false,
          Folio: '',
          IdCatCondicionesDePago: '',
          IdCatCondicionesDePagoDeOrigen: '',
          IdCatEstadoCotizacion: '',
          IdCatMoneda: '',
          IdCatNivelIngreso: '',
          IdCatTipoCotizacion: '',
          IdCatZona: '',
          IdCliente: '',
          IdContacto: '',
          IdContactoCliente: '',
          IdCotCotizacion: '',
          IdDatosFacturacionCliente: '',
          IdDireccion: '',
          IdEmpresa: '',
          IdFlete: '',
          IdSolicitudAutorizacionCambio: '',
          IdUsuarioTramita: '',
          Leido: false,
          NivelIngreso: '',
          Nombre: '',
          Piezas: 0,
          Recibido: false,
          TipoCotizacion: '',
          TotalArchivos: 0,
          TotalControlados: 0,
          TotalCotizado: 0,
          TotalNoControlados: 0,
          TotalProductos: 0,
          TotalUSDPartidas: 0,
          montoFlete: 0,
          subtotalFlete: 0,
          subtotalIVA: 0,
          subtotalPartidas: 0,
          isSelected: false,
          index: 0,
          needsToReloadItemQuotation: false,
          itemsQuotation: [],
          itemsQuotationStatus: -1,
          currency: '',
          listQuotationStrategyTacticOptions: [],
          listQuotationStrategyTacticOptionsStatus: -1,
          needsToReloadListQuotationStrategyTacticOptions: true,
          paymentConditions: {
            paymentConditionsSelected: {} as DropListOption,
            confPaymentConditions: {
              confPaymentConditions: {} as AjOfCondicionesdePagoCotizacion,
              confPaymentConditionsStatus: -1,
              needsToReloadConfPaymentConditions: true,
              finances: false,
            },
          },
          authorizationRequest: {
            Autorizado: false,
            IdCodigoValidacion: DEFAULT_UUID,
            IdCorreoEnviado: DEFAULT_UUID,
            IdSolicitudAutorizacionCambio: DEFAULT_UUID,
            IdUsuarioAprueba: DEFAULT_UUID,
            IdUsuarioSolicitaAutorizacion: DEFAULT_UUID,
          },
          emailSentTo: '',
        } as IQuotation),
);*/
export const selectQuotationSelected = createSelector(
  selectClientQuotesByClient,
  (quotes: IClientQuotes) =>
    filter(quotes.quotations, (quotation) => quotation.isSelected === true)[0],
);
export const selectFolioQuotationsSelected = createSelector(
  selectQuotationSelected,
  (quotation: IQuotation) => (quotation?.Folio ? quotation.Folio : 'NA'),
);
export const selectTotalFacturadoUSD = createSelector(
  selectContentDetailGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral) =>
    contentDetailsGeneral.progressBarAmountBilled.TotalFacturadoUSD,
);
export const selectObjetivoFundamental = createSelector(
  selectContentDetailGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral) =>
    contentDetailsGeneral.progressBarAmountBilled.ObjetivoFundamentalUSD,
);
export const selectPercentageBarAmountBilledVSAnnualSaleObjective = createSelector(
  [selectTotalFacturadoUSD, selectObjetivoFundamental],
  (totalFacturado, objetivoFundamental) =>
    totalFacturado && objetivoFundamental ? (totalFacturado * 100) / objetivoFundamental : 0,
);
export const selectQuotations = createSelector(selectClientQuotations, (state) => state.quotations);
export const selectTotalInAdjustment = createSelector(
  selectQuotations,
  (quotes: Array<offerAdjustCarrousel>) =>
    reduce(
      quotes,
      (total, quote: offerAdjustCarrousel) => {
        return total + quote?.TotalUSDPartidasEnAjuste;
      },
      0,
    ),
);
export const selectDataPercentageBarPopUpFirst = createSelector(
  selectContentOfferAdjustment,
  (state: IContentOfferAdjustment) => {
    return [
      {
        id: '1',
        percentage: '0%',
        title: 'Originales',
        subtitle: 'valor total $0.00 usd',
        color: '#2fd2e0',
      },
      {
        id: '2',
        percentage: '0%',
        title: 'complementarias',
        subtitle: 'valor total $0.00 usd',
        color: '#12b0bd',
      },
      {
        id: '3',
        percentage: '0%',
        title: 'promoción',
        subtitle: 'valor total $0.00 usd',
        color: '#008894',
      },
    ];
  },
);
export const selectDataPercentageBarPopUpSecond = createSelector(
  selectContentOfferAdjustment,
  (state: IContentOfferAdjustment) => {
    return [
      {
        id: '1',
        percentage: '0%',
        title: 'Alternativas',
        subtitle: 'valor total $0.00 usd',
        color: '#7fca65',
      },
      {
        id: '2',
        percentage: '0%',
        title: 'Ahorro',
        subtitle: 'valor total $0.00 usd',
        color: '#60bf40',
      },
    ];
  },
);
export const selectOptionsBarActivities = createSelector(
  selectContentDetailsGeneral,
  (contentDetailGeneral: IContentDetailsGeneral) => contentDetailGeneral.barActivitiesOptions,
);
export const selectOptionBarActivitySelected = createSelector(
  selectContentDetailsGeneral,
  (contentDetailGeneral: IContentDetailsGeneral) => contentDetailGeneral.barActivitySelected,
);
export const selectTacticsAndSubtactics = createSelector(
  selectContentDetailGeneral,
  (state: IContentDetailsGeneral) => state.tacticsAndSubtactics,
);
export const selectNeedsToReloadTactics = createSelector(
  selectTacticsAndSubtactics,
  (tacticsAndSubtactics: ITacticsAndSubtactics) => tacticsAndSubtactics.needsToReloadTactics,
);
export const selectNeedsToReloadSubtactics = createSelector(
  selectTacticsAndSubtactics,
  (tacticsAndSubtactics: ITacticsAndSubtactics) => tacticsAndSubtactics.needsToReloadSubtactics,
);
export const selectCatalogTactics = createSelector(
  selectTacticsAndSubtactics,
  (tacticsAndSubtactics: ITacticsAndSubtactics) => tacticsAndSubtactics.tactics,
);
export const selectCatalogSubtactics = createSelector(
  selectTacticsAndSubtactics,
  (tacticsAndSubtactics: ITacticsAndSubtactics) => tacticsAndSubtactics.subtactics,
);
export const selectIdRequestAuthorizationChange = createSelector(
  selectQuotationSelected,
  (quotationSelected: IQuotation) =>
    quotationSelected?.authorizationRequest?.IdSolicitudAutorizacionCambio,
);
export const selectIsOpenPopUpCode = createSelector(
  selectContentDetailsGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral) => contentDetailsGeneral.popUpCode,
);

export const selectIsOpenPopUpReject = createSelector(
  selectContentDetailsGeneral,
  (contentDetailsGeneral: IContentDetailsGeneral) => contentDetailsGeneral.popUpReject,
);
