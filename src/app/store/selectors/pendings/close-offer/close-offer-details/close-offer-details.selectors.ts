import {createSelector} from '@ngrx/store';

// Models
import {CloseOfferState} from '@appModels/store/pendings/close-offer/close-offer.models';
import {
  AJUSTE_DE_OFERTA,
  CANCELACION,
  CloseOfferDetailsState,
  CustomerDetails,
  ESTADOS_COTIZACION,
  IItemQuotation,
  IQuotation,
  ITipoAjustePrecioObj,
  PROMESA_DE_COMPRA,
  ResumeSection,
  SEGUIMIENTO,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

// Selectors
import {selectCloseOfferNode} from '@appSelectors/pendings/close-offer/close-offer.selectors';

// Utils
import {
  every,
  filter,
  find,
  findIndex,
  flow,
  forEach,
  has,
  isEmpty,
  map as _map,
  omit,
  orderBy,
  reduce,
  sum,
  uniqBy,
} from 'lodash-es';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {CatMotivoCancelacionPartidaCotizacion, VProveedor} from 'api-catalogos';
import {
  IGeneralDataStrategyRead,
  initialGeneralDataStrategyRead,
  IQuotationStrategySubTactic,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';

import {ICard} from '@appModels/card/card';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {
  AjOfEstrategiaCotizacionTactica,
  CatMotivoSeguimientoCotizacion,
  GMCotFletes,
  TotalesPartidasConfiguradasMarcadas,
} from 'api-logistica';
import {buildAddressFormat, getArrayForDropDownList} from '@appUtil/util';
import {selectCatPaymentConditionsForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {InternalSalesItem} from '@appModels/table/internal-sales-item';
import {
  buildBodyGeneralItem,
  buildColumnsSectionAdjustmentOffer,
  buildColumnsSectionInProgress,
  buildColumnsSectionQuotationNew,
  buildColumnsSectionResume,
  buildItemFreight,
} from '@appHelpers/pending/closeOffer/closeOffer.helpers';
import {CLASS_NAMES, COLOR_STATUS} from '@appModels/shared-components/pqf-card';
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';

export const selectCloseOfferDetails = createSelector(
  selectCloseOfferNode,
  (state: CloseOfferState): CloseOfferDetailsState => state.closeOfferDetails,
);
export const selectClient = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): ClientsListItemForCloseOffer => state.clientSelected,
);
export const selectAllowedToResume = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): boolean => state.allowedToResume,
);
export const selectIsInResumeView = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): boolean => state.isInResumeView,
);
export const selectEntriesApiStatus = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): number => state.entriesApiStatus,
);
export const selectClientPanelIsOpen = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): boolean => state.clientPanelIsOpen,
);
export const selectSearchOptions = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<DropListOption> => state.searchOptions,
);
export const selectResumeSection = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): ResumeSection => state.resumeSection,
);

export const selectProvidersOptionsForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): Array<BarActivityOption> =>
    state
      ? _map(
          state.providerList,
          (o: VProveedor): BarActivityOption => ({
            id: o.IdProveedor,
            label: o.Nombre,
          }),
        )
      : [],
);
export const selectedProviderForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): VProveedor =>
    find(state.providerList, (o: VProveedor) => o.IdProveedor === state.selectedProviderId),
);
export const selectedBrandsStep = createSelector(
  selectResumeSection,
  (state: ResumeSection): number => state?.selectedProviderStep,
);
/*export const selectedBrandsId = createSelector(
  selectResumeSection,
  selectedBrandsStep,
  (state: ResumeSection, step: number): string =>
    !isEmpty(state) ? state.brandList[step].IdMarca : '',
);*/
export const selectedProvidersId = createSelector(
  selectResumeSection,
  (state: ResumeSection): string => state?.selectedProviderId,
);
export const selectedQuote = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): IQuotation => state.selectedQuote,
);

export const selectFolioQuotation = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): string => state.selectedQuote?.Folio,
);
export const selectedBrand = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): DropListOption => state.selectedBrand,
);
export const selectEntriesTotals = createSelector(
  selectedQuote,
  (state: IQuotation): TotalesPartidasConfiguradasMarcadas => state?.entriesTotals,
);
export const selectTabOptionsForResume = createSelector(
  selectCloseOfferDetails,
  selectEntriesTotals,
  (state: CloseOfferDetailsState, totals: TotalesPartidasConfiguradasMarcadas): Array<ITabOption> =>
    state
      ? _map(state.resumeTabOptions, (o: ITabOption) => ({
          id: o.id,
          label: `${o.label} · ${
            o.id === '1'
              ? totals.PartidasResumirEnSeguimiento
              : o.id === '2'
              ? totals.PartidasResumirEnAjusteOferta
              : o.id === '3'
              ? totals.PartidasResumirEnPromesaCompra
              : o.id === '4'
              ? totals.PartidasResumirEnCancelacion
              : 0
          }`,
        }))
      : [],
);
export const selectTabOptions = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<ITabOption> => (state ? state.resumeTabOptions : []),
);
export const selectTabOptionsForAdjustment = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<ITabOption> => (state ? state.adjustmentTabOptions : []),
);
export const selectBurgerOptions = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<DropListOption> =>
    state ? state.adjustmentBurgerOptions : [],
);
export const selectQuotes = createSelector(selectCloseOfferDetails, (state) => state.quotes);
export const selectConfiguredEntries = createSelector(
  selectEntriesTotals,
  (state: TotalesPartidasConfiguradasMarcadas): number => state?.PartidasEnResumen,
);
export const selectEntriesTotalsInResumeView = createSelector(
  selectEntriesTotals,
  (state: TotalesPartidasConfiguradasMarcadas): number =>
    sum([
      state?.PartidasResumirEnAjusteOferta,
      state?.PartidasResumirEnCancelacion,
      state?.PartidasResumirEnPromesaCompra,
      state?.PartidasResumirEnSeguimiento,
    ]),
);
export const selectQuoteStatus = createSelector(
  selectedQuote,
  (state: IQuotation): string => state?.EstadoCotizacion,
);
export const selectQuoteIsNew = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.EstadoCotizacion === ESTADOS_COTIZACION.enviada,
);
export const selectQuoteIsInProgress = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.EstadoCotizacion === ESTADOS_COTIZACION.enProgreso,
);
export const selectQuoteIsInAdjustment = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.EstadoCotizacion === ESTADOS_COTIZACION.ajusteDeOferta,
);
export const selectedTabOptionForAdjustment = createSelector(
  selectedQuote,
  (state: IQuotation): ITabOption =>
    state ? state.selectedAdjustmentTabOption : ({} as ITabOption),
);
export const selectedResumeTabOption = createSelector(
  selectedQuote,
  (state: IQuotation): ITabOption => state?.selectedResumeTabOption,
);
export const selectedResumeTabOptionIsTracing = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state.selectedResumeTabOption?.id === '1',
);
export const selectedResumeTabOptionIsAdjustment = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state.selectedResumeTabOption?.id === '2',
);
export const selectedResumeTabOptionIsBuyPromise = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state.selectedResumeTabOption?.id === '3',
);
export const selectedResumeTabOptionIsCancel = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state.selectedResumeTabOption?.id === '4',
);
export const selectedBurgerOptions = createSelector(
  selectedQuote,
  (state: IQuotation): DropListOption =>
    state ? state.selectedBurgerOption : ({} as DropListOption),
);
export const selectedDefaultSearchOption = createSelector(
  selectedQuote,
  (state: IQuotation): DropListOption => state?.selectedDefaultSearchOption,
);
export const selectedResumeSearchOption = createSelector(
  selectedQuote,
  (state: IQuotation): DropListOption => state?.selectedResumeSearchOption,
);
export const selectedDefaultSearchTerm = createSelector(
  selectedQuote,
  (state: IQuotation): string => state?.defaultSearchTerm,
);
export const selectedResumeSearchTerm = createSelector(
  selectedQuote,
  (state: IQuotation): string => state?.resumeSearchTerm,
);
export const selectecPriceItemsAjusted = createSelector(
  selectedQuote,
  (state: IQuotation): Array<ITipoAjustePrecioObj> => state?.priceItems,
);
export const selectIsLoadingItemsAjusted = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.isLoadingPriceItemsAdjusted,
);
export const selectedInProgressTabOption = createSelector(
  selectedQuote,
  (state: IQuotation): ITabOption => state?.selectedInProgressTabOption,
);
export const selectedInProgressTabOptionIsTracing = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.selectedInProgressTabOption?.id === '1',
);
export const selectedInProgressTabOptionIsAdjustment = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.selectedInProgressTabOption?.id === '2',
);
export const selectedInProgressTabOptionIsBuyPromise = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.selectedInProgressTabOption?.id === '3',
);
export const selectedInProgressTabOptionIsCancel = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.selectedInProgressTabOption?.id === '4',
);
export const selectSeeResumeActive = createSelector(
  selectedQuote,
  (state: IQuotation): boolean => state?.seeResumeActive,
);
export const totalOriginalEntries = createSelector(
  selectedQuote,
  (state: IQuotation): number => state?.itemsQuotation?.length,
);
export const selectItemsQuotation = createSelector(
  selectedQuote,
  (state: IQuotation): Array<IItemQuotation> =>
    state
      ? _map(state.itemsQuotation, (o: IItemQuotation) => ({
          ...o,
          commentsPop: {
            ...o.commentsPop,
            target: document.getElementById(o.commentsPop.elementId) as HTMLElement,
          },
          tracingPop: {
            ...o.tracingPop,
            target: document.getElementById(o.tracingPop.elementId) as HTMLElement,
          },
          freightPop: {
            ...o.freightPop,
            target: document.getElementById(o.freightPop.elementId) as HTMLElement,
          },
          ratePop: {
            ...o.ratePop,
            target: document.getElementById(o.ratePop.elementId) as HTMLElement,
          },
          pricePop: {
            ...o.pricePop,
            target: document.getElementById(o.pricePop.elementId) as HTMLElement,
          },
          children: _map(o.children, (i: IItemQuotation) => ({
            ...i,
            commentsPop: {
              ...i.commentsPop,
              target: document.getElementById(i.commentsPop.elementId) as HTMLElement,
            },
            tracingPop: {
              ...i.tracingPop,
              target: document.getElementById(i.tracingPop.elementId) as HTMLElement,
            },
            freightPop: {
              ...i.freightPop,
              target: document.getElementById(i.freightPop.elementId) as HTMLElement,
            },
            ratePop: {
              ...i.ratePop,
              target: document.getElementById(i.ratePop.elementId) as HTMLElement,
            },
            pricePop: {
              ...i.pricePop,
              target: document.getElementById(i.pricePop.elementId) as HTMLElement,
            },
          })),
        }))
      : [],
);
export const selectItemsQuotation2 = createSelector(
  selectedQuote,
  (state: IQuotation): Array<IItemQuotation> => {
    const items = [];

    forEach(state?.itemsQuotation, (o: IItemQuotation) => {
      items.push({
        ...o,
        commentsPop: {
          ...o.commentsPop,
          target: document.getElementById(o.commentsPop.elementId) as HTMLElement,
        },
        tracingPop: {
          ...o.tracingPop,
          target: document.getElementById(o.tracingPop.elementId) as HTMLElement,
        },
        freightPop: {
          ...o.freightPop,
          target: document.getElementById(o.freightPop.elementId) as HTMLElement,
        },
        ratePop: {
          ...o.ratePop,
          target: document.getElementById(o.ratePop.elementId) as HTMLElement,
        },
        pricePop: {
          ...o.pricePop,
          target: document.getElementById(o.pricePop.elementId) as HTMLElement,
        },
      });
      if (!isEmpty(o.children)) {
        forEach(o.children, (i: IItemQuotation) => {
          items.push({
            ...i,
            commentsPop: {
              ...i.commentsPop,
              target: document.getElementById(i.commentsPop.elementId) as HTMLElement,
            },
            tracingPop: {
              ...i.tracingPop,
              target: document.getElementById(i.tracingPop.elementId) as HTMLElement,
            },
            freightPop: {
              ...i.freightPop,
              target: document.getElementById(i.freightPop.elementId) as HTMLElement,
            },
            ratePop: {
              ...i.ratePop,
              target: document.getElementById(i.ratePop.elementId) as HTMLElement,
            },
            pricePop: {
              ...i.pricePop,
              target: document.getElementById(i.pricePop.elementId) as HTMLElement,
            },
          });
        });
      }
    });
    return items;
  },
);

export const selectItemsQuotationSelected = createSelector(
  selectedQuote,
  (state: IQuotation): IItemQuotation[] => state?.itemsQuotation || [],
);
export const selectDifferentBrand = createSelector(
  selectedQuote,
  (state: IQuotation) => uniqBy(state?.itemsQuotation, 'IdMarca')?.length,
);
export const selectItemsQuotationToSave = createSelector(
  selectItemsQuotation2,
  (state: Array<IItemQuotation>): Array<IItemQuotation> =>
    flow(
      () => filter(state, (o: IItemQuotation) => o.EnCerrarOferta),
      (items) =>
        _map(items, (o: IItemQuotation) =>
          omit(o, [
            'Index',
            'isSelectedInResume',
            'commentsPop',
            'tracingPop',
            'freightPop',
            'ratePop',
            'pricePop',
            'children',
            'isChild',
            'lastTracing',
          ]),
        ),
    )(),
);
export const selectTotalQuotes = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): number => state.quotes.listQuotes.length,
);
export const selectDataClient = createSelector(
  selectCloseOfferDetails,
  (state): CustomerDetails => {
    return {
      ...state.clientData,
      NivelIngreso: state.clientData.NivelIngreso ? state.clientData.NivelIngreso : 'ND',
      Nombre: state.clientData.Nombre ? state.clientData.Nombre : 'ND',
    };
  },
);
export const selectClientTotals = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState) => state.clientTotals,
);
export const selectGeneralDataObject = createSelector(
  selectQuotes,
  selectDataClient,
  (state, client): IGeneralDataStrategyRead => {
    const quotation: IQuotation = find(state.listQuotes, (o) => o.isSelected);
    if (isEmpty(quotation)) {
      return initialGeneralDataStrategyRead();
    }
    const {generalData, contact, Folio} = quotation;
    const {billingData, currency, paymentConditions, user, address} = generalData;
    return {
      totalQuotations:
        state.listQuotes.length === 1 ? '1 Cotización' : state.listQuotes.length + ' Cotizaciones',
      route: address && address.DescripcionRutaEntrega ? address.DescripcionRutaEntrega : 'N/D',
      whoBills: billingData && billingData.Alias ? billingData.Alias : 'N/D',
      billingCurrency: currency && currency.ClaveMoneda ? currency.ClaveMoneda : 'N/D',
      paymentConditions:
        paymentConditions && paymentConditions.CondicionesDePago
          ? paymentConditions.CondicionesDePago
          : 'N/D',
      assignedUser: client && client.ESAC ? client.ESAC : 'N/D',
      address: buildAddressFormat(address),
      folio: Folio ? Folio : 'N/D',
      contactName: contact
        ? `${contact.Nombres} ${contact.ApellidoPaterno} ${contact.ApellidoMaterno}`
        : 'ND',
      email: contact && contact.Email && contact.Email.Correo ? contact.Email.Correo : 'ND',
      phone1:
        contact && contact.Phone1 && contact.Phone1.Numero
          ? `${contact.Phone1.Numero}${
              contact.Phone1.Extension ? ` · Ext. ${contact.Phone1.Extension}` : ''
            }`
          : 'ND',
      phone2:
        contact && contact.Phone2 && contact.Phone2.Numero
          ? `${contact.Phone2.Numero}${
              contact.Phone2.Extension ? ` · Ext. ${contact.Phone2.Extension}` : ''
            }`
          : 'ND',
      mobile: contact && contact.Mobile && contact.Mobile.Numero ? contact.Mobile.Numero : 'ND',
      department: contact && contact.Departamento ? contact.Departamento : 'ND',
      position: contact && contact.Puesto ? contact.Puesto : 'ND',
      decisionLevel: contact && contact.NivelDecision ? contact.NivelDecision : 'ND',
      descriptionPosition: 'ND',
      incomeLevel: client?.NivelIngreso ?? 'ND',
      category: client?.Categoria,
    };
  },
);
export const selectBrands = createSelector(selectCloseOfferDetails, (state) => state.brands);
export const selectListBrands = createSelector(selectBrands, (state) =>
  state.listBrands ? state.listBrands : [],
);
export const selectIsLoadingBrands = createSelector(
  selectBrands,
  (state) => state.listBrandsStatus === 1,
);

export const selectQuotesForTabs = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<ICard> => {
    let counter = 0;
    return state
      ? _map(state.quotes.listQuotes, (o: IQuotation) => {
          return {
            value: o.IdCotCotizacion,
            active: o.isSelected,
            labels: [
              {
                label: `#${++counter} · FO-${o.Folio}`,
                className: CLASS_NAMES.title,
              },
              {
                label: `Valor Total ${new CurrencyFormat().transform(
                  Number((o.TotalCotizado || 0).toFixed(2)),
                  o.claveMoneda,
                )} ${o.claveMoneda}`,
                className: CLASS_NAMES.totalAmount,
              },
              {
                label: `${o.TotalProductos} ${o.TotalProductos === 1 ? 'Producto' : 'Productos'}`,
                className: CLASS_NAMES.countProducts,
              },
              {
                label:
                  o.Vigencia === 1 ? `Vigencia: ${o.Vigencia} Día` : `Vigencia: ${o.Vigencia} Días`,
                className: CLASS_NAMES.status,
                color: o.PorExpirar ? COLOR_STATUS.FOR_EXPIRE_TRUE : COLOR_STATUS.FOR_EXPIRE_FALSE,
              },
            ],
            image: o.SeguimientosVencidos > 0 ? 'assets/Images/close-offer/warning.svg' : null,
          };
        })
      : [];
  },
);
export const selectIdCotCotizacion = createSelector(
  selectedQuote,
  (state: IQuotation): string => state?.IdCotCotizacion,
);
export const selectPercentagesBar = createSelector(
  selectedQuote,
  (state: IQuotation): Array<IPercentageBarItems> => {
    return state
      ? [
          {
            id: '1',
            percentage: has(state.entriesPercentages, 'Original')
              ? `${state.entriesPercentages.Original.m_Item1}%`
              : '0%',
            title: 'ORIGINALES',
            subtitle: has(state.entriesPercentages, 'Original')
              ? `VALOR TOTAL ${new CurrencyFormat().transform(
                  state.entriesPercentages.Original.m_Item2,
                  state.claveMoneda,
                )} ${state.claveMoneda}`
              : `VALOR TOTAL 0 ${state.claveMoneda}`,
            color: '#6a6aae',
          },
          {
            id: '2',
            percentage: has(state.entriesPercentages, 'Complementaria')
              ? `${state.entriesPercentages.Complementaria.m_Item1}%`
              : '0%',
            title: 'COMPLEMENTARIAS',
            subtitle: has(state.entriesPercentages, 'Complementaria')
              ? `VALOR TOTAL ${new CurrencyFormat().transform(
                  state.entriesPercentages.Complementaria.m_Item2,
                  state.claveMoneda,
                )} ${state.claveMoneda}`
              : `VALOR TOTAL 0 ${state.claveMoneda}`,
            color: '#008894',
          },
          {
            id: '3',
            percentage: has(state.entriesPercentages, 'Promocion')
              ? `${state.entriesPercentages.Promocion.m_Item1}%`
              : '0%',
            title: 'PROMOCIÓN',
            subtitle: has(state.entriesPercentages, 'Promocion')
              ? `VALOR TOTAL ${new CurrencyFormat().transform(
                  state.entriesPercentages.Promocion.m_Item2,
                  state.claveMoneda,
                )} ${state.claveMoneda}`
              : `VALOR TOTAL 0 ${state.claveMoneda}`,
            color: '#e29d2a',
          },
          {
            id: '4',
            percentage: has(state.entriesPercentages, 'Alternativa')
              ? `${state.entriesPercentages.Alternativa.m_Item1}%`
              : '0%',
            title: 'ALTERNATIVA',
            subtitle: has(state.entriesPercentages, 'Alternativa')
              ? `VALOR TOTAL ${new CurrencyFormat().transform(
                  state.entriesPercentages.Alternativa.m_Item2,
                  state.claveMoneda,
                )} ${state.claveMoneda}`
              : `VALOR TOTAL 0 ${state.claveMoneda}`,
            color: '#cbb7a3',
          },
          {
            id: '5',
            percentage: has(state.entriesPercentages, 'Ahorro')
              ? `${state.entriesPercentages.Ahorro.m_Item1}%`
              : '0%',
            title: 'AHORRO',
            subtitle: has(state.entriesPercentages, 'Ahorro')
              ? `VALOR TOTAL ${new CurrencyFormat().transform(
                  state.entriesPercentages.Ahorro.m_Item2,
                  state.claveMoneda,
                )} ${state.claveMoneda}`
              : `VALOR TOTAL 0 ${state.claveMoneda}`,
            color: '#4ba92b',
          },
        ]
      : [];
  },
);

export const selectStrategies = createSelector(
  selectCloseOfferDetails,
  (state) => state.quotationStrategy,
);
export const selectDateOfStrategy = createSelector(
  selectStrategies,
  (state) => state?.ajOfQuotationStrategy?.FechaUltimaActualizacion,
);
export const selectTotalAmountQuotes = createSelector(selectQuotes, (state) =>
  reduce(
    state.listQuotes,
    (total, quotation) => {
      return total + quotation.TotalCotizadoUSD;
    },
    0,
  ),
);
export const itemSelected = createSelector(
  selectStrategies,
  (state): DropListOption => state.itemSelected,
);

export const selectSaleForValueTactic = createSelector(selectStrategies, (state) => {
  const filterData = filter(
    state.listQuotationStrategyTactic,
    (tactic) => tactic.Tactica === 'Venta Por Valor',
  );

  if (filterData && filterData.length > 0) {
    return filterData[0].listSubTactic[0]?.isSelected ? filterData[0].listSubTactic[0] : null;
  } else {
    return null;
  }
});
export const selectPriceTactic = createSelector(
  selectStrategies,
  (state): IQuotationStrategySubTactic => {
    const filterData = filter(
      state.listQuotationStrategyTactic,
      (tactic) => tactic.Tactica === 'Precio',
    );
    if (filterData && filterData.length > 0) {
      return filter(filterData[0].listSubTactic, (subT) => subT.isSelected).length > 0
        ? filter(filterData[0].listSubTactic, (subT) => subT.isSelected)[0]
        : null;
    } else {
      return null;
    }
  },
);

export const selectDeliveryTimeTactic = createSelector(
  selectStrategies,
  (state): IQuotationStrategySubTactic => {
    const filterData = filter(
      state.listQuotationStrategyTactic,
      (tactic) => tactic.Tactica === 'Tiempo de Entrega',
    );
    if (filterData && filterData.length > 0) {
      return filter(filterData[0].listSubTactic, (subT) => subT.isSelected).length > 0
        ? filter(filterData[0].listSubTactic, (subT) => subT.isSelected)[0]
        : null;
    } else {
      return null;
    }
  },
);
export const selectPaymentConditions = createSelector(
  selectStrategies,
  (state): Array<IQuotationStrategySubTactic> => {
    const filterData = filter(
      state.listQuotationStrategyTactic,
      (tactic) => tactic.Tactica === 'Condiciones de Pago',
    );
    if (filterData && filterData.length > 0) {
      return filter(filterData[0].listSubTactic, (subT) => subT.isSelected).length > 0
        ? filter(filterData[0].listSubTactic, (subT) => subT.isSelected)
        : [];
    } else {
      return [];
    }
  },
);
export const selectAumentarTiempoSubtactic = createSelector(
  selectPaymentConditions,
  (state): AjOfEstrategiaCotizacionTactica =>
    flow(
      () =>
        !isEmpty(state)
          ? filter(
              state,
              (o: IQuotationStrategySubTactic) => o.Subtactica === 'Aumentar tiempo de Condiciones',
            )
          : [],
      (subtactic) => (!isEmpty(subtactic) ? subtactic[0].ajOfQuotationStrategyTactic : {}),
    )(),
);
export const selectCheckedEntries = createSelector(
  selectItemsQuotation2,
  selectQuoteIsNew,
  selectQuoteIsInProgress,
  (state: Array<IItemQuotation>, isNew: boolean, isInProgress: boolean): Array<IItemQuotation> =>
    filter(
      state,
      (o: IItemQuotation) =>
        o.Seguimiento || o.AjusteDeOferta || o.PromesaDeCompra || o.Cancelacion,
    ),
);
export const selectCheckedEntriesInResume = createSelector(
  selectItemsQuotation2,
  (state: Array<IItemQuotation>): Array<IItemQuotation> =>
    filter(state, (o: IItemQuotation) => o.isSelectedInResume),
);
export const selectAllItemsInResumeAreSelected = createSelector(
  [selectItemsQuotation2, selectCheckedEntriesInResume],
  (invoices: Array<IItemQuotation>, checkedInvoices: Array<IItemQuotation>): boolean =>
    invoices.length > 0 && invoices.length === checkedInvoices.length,
);
export const validatorForSeeConfiguredButton = createSelector(
  selectedQuote,
  selectQuoteIsNew,
  selectQuoteIsInProgress,
  selectEntriesTotals,
  (
    quote: IQuotation,
    isNew: boolean,
    isInProgress: boolean,
    totals: TotalesPartidasConfiguradasMarcadas,
  ): boolean => true /*!!(isNew && totals.PartidasEnResumen > 0),*/,
);
export const validatorForResumeButton = createSelector(
  selectItemsQuotation2,
  selectQuoteIsNew,
  selectQuoteIsInProgress,
  selectQuoteIsInAdjustment,
  selectedInProgressTabOptionIsTracing,
  (
    entries: Array<IItemQuotation>,
    isNew: boolean,
    isInProgress: boolean,
    isInAdjustment: boolean,
    tabIsTracing: boolean,
  ): boolean =>
    flow(
      () =>
        filter(
          entries,
          (o: IItemQuotation) =>
            o.Seguimiento || o.AjusteDeOferta || o.PromesaDeCompra || o.Cancelacion,
        ),
      (items) =>
        (isNew && !isEmpty(items)) ||
        (isInProgress && tabIsTracing && (!isEmpty(items) || isEmpty(entries))) ||
        (isInAdjustment &&
          !isEmpty(filter(items, (i: IItemQuotation) => i.PromesaDeCompra || i.Cancelacion))),
    )(),
);
export const selectValidationAdjustmentPaymentConditions = createSelector(
  selectResumeSection,
  selectedQuote,
  selectCatPaymentConditionsForDropDown,
  (
    resumeSection: ResumeSection,
    selectedQuotation: IQuotation,
    paymentConditions: DropListOption[],
  ): boolean =>
    !!(
      resumeSection.paymentConditionsIsSelected &&
      resumeSection.additionalDays &&
      (resumeSection?.selectedAdjustmentPaymentConditions
        ? resumeSection?.selectedAdjustmentPaymentConditions
        : find(
            paymentConditions,
            (o: DropListOption) =>
              o.value === selectedQuotation?.generalData?.paymentConditions?.IdCatCondicionesDePago,
          )) &&
      resumeSection.adjustmentJustification?.trim() !== ''
    ),
);
export const validatorAcceptProcessButton = createSelector(
  selectedQuote,
  selectQuoteIsNew,
  selectQuoteIsInProgress,
  selectQuoteIsInAdjustment,
  selectSeeResumeActive,
  selectEntriesTotals,
  selectItemsQuotation2,
  selectValidationAdjustmentPaymentConditions,
  selectResumeSection,
  (
    quote: IQuotation,
    isNew: boolean,
    isInProgress: boolean,
    isInAdjustment: boolean,
    seeResumeActive: boolean,
    totals: TotalesPartidasConfiguradasMarcadas,
    items: Array<IItemQuotation>,
    paymentAdjustmentValidation: boolean,
    resumeSection: ResumeSection,
  ): boolean => {
    return !!(
      (isNew &&
        seeResumeActive &&
        quote?.EnCerrarOferta === totals?.PartidasEnResumen &&
        (resumeSection?.paymentConditionsIsSelected ? paymentAdjustmentValidation : true)) ||
      ((isInProgress || isInAdjustment) &&
        isEmpty(filter(items, (o: IItemQuotation) => o?.Seguimiento || o?.AjusteDeOferta)) &&
        quote?.EnCerrarOferta === totals?.PartidasEnResumen)
    );
  },
);
/*export const validatorAcceptInProcessStatusButton = createSelector(
  selectedQuote,
  selectEntriesTotals,
  (quote: IQuotation, totals: TotalesPartidasConfiguradasMarcadas): boolean => {
    return !!(
      quote?.AjusteDeOferta === 0 &&
      quote?.Seguimiento === 0 &&
      totals?.PartidasResumirEnAjusteOferta === 0 &&
      totals?.PartidasResumirEnCancelacion === 0 &&
      totals?.PartidasResumirEnPromesaCompra === 0 &&
      totals?.PartidasResumirEnSeguimiento === 0 &&
      !quote?.ajusteCondicionesPago
    );
  },
);*/
export const validatorForFooterResumeSection = createSelector(
  selectCheckedEntriesInResume,
  (entries: Array<IItemQuotation>): boolean => !isEmpty(entries),
);
export const validatorForFooterResumeSectionButton = createSelector(
  selectCheckedEntriesInResume,
  selectedResumeTabOption,
  selectResumeSection,
  (entries: Array<IItemQuotation>, tabOption: ITabOption, resumeSection: ResumeSection): boolean =>
    !!(
      tabOption.id === '1' &&
      !isEmpty(entries) &&
      !isEmpty(resumeSection.selectedFollowingReason) &&
      resumeSection.dateForFollowingString
    ) ||
    !!(tabOption.id === '2' && !isEmpty(entries) && resumeSection.freightIsSelected
      ? resumeSection.adjustmentJustification?.trim() !== '' &&
        resumeSection.selectedProviderId?.trim() !== '' &&
        !isEmpty(resumeSection.selectedAdjustmentPercentage)
      : resumeSection.minusTwoDaysIsSelected
      ? resumeSection.adjustmentJustification?.trim() !== ''
      : resumeSection.priceIsSelected &&
        every(
          entries,
          (o: IItemQuotation) => o.formPrice.valueAmount > 0 && o.formPrice.comments !== '',
        )) ||
    !!(
      tabOption.id === '3' &&
      !isEmpty(entries) &&
      resumeSection.dateForPurchasePromiseString &&
      resumeSection.purchasePromiseJustification?.trim() !== ''
    ) ||
    !!(
      tabOption.id === '4' &&
      !isEmpty(entries) &&
      !isEmpty(resumeSection.selectedCancelReason) &&
      resumeSection.cancelJustification?.trim() !== ''
    ),
);

// TODO: Resumir
export const selectCatMotivosSeguimiento = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<CatMotivoSeguimientoCotizacion> =>
    state?.catMotivosSeguimiento,
);
export const selectCatMotivoSeguimientoById = (id: string) =>
  createSelector(selectCloseOfferDetails, (state: CloseOfferDetailsState): string => {
    return (
      filter(
        state?.catMotivosSeguimiento,
        (o: CatMotivoSeguimientoCotizacion) => o.IdCatMotivoSeguientoCotizacion === id,
      )[0].Razones || null
    );
  });
export const selectCatMotivosSeguimientoForDropList = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<DropListOption> =>
    getArrayForDropDownList(
      state?.catMotivosSeguimiento,
      'IdCatMotivoSeguientoCotizacion',
      'Razones',
    ),
);
export const selectCatMotivosCancelacion = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<CatMotivoCancelacionPartidaCotizacion> =>
    state?.catMotivosCancelacion,
);
export const selectCatMotivoCancelacionById = (id: string) =>
  createSelector(
    selectCloseOfferDetails,
    (state: CloseOfferDetailsState): string =>
      filter(
        state?.catMotivosCancelacion,
        (o: CatMotivoCancelacionPartidaCotizacion) =>
          o.IdCatMotivoCancelacionPartidaCotizacion === id,
      )[0].Descripcion || null,
  );
export const selectCatMotivosCancelacionForDropList = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<DropListOption> =>
    getArrayForDropDownList(
      state?.catMotivosCancelacion,
      'IdCatMotivoCancelacionPartidaCotizacion',
      'Descripcion',
    ),
);
export const selectCatProveedorMarcas = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<CatMotivoCancelacionPartidaCotizacion> =>
    state?.catProveedorMarcas?.Proveedores,
);
export const selectCatProveedorMarcasForDropList = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<DropListOption> =>
    state?.catProveedorMarcas
      ? getArrayForDropDownList(state?.catProveedorMarcas?.Proveedores, 'IdProveedor', 'Nombre')
      : [],
);
export const selectCatPorcentajes = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState): Array<DropListOption> => state?.catPorcentajes,
);
// Promise
export const selectPromiseJustificationForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): string => state?.purchasePromiseJustification,
);
export const selectPurchasePromiseDateForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): Date => state?.dateForPurchasePromise,
);
// Seguimiento
export const selectFollowingReasonForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): DropListOption =>
    state?.selectedFollowingReason || ({} as DropListOption),
);
export const selectFollowingDateForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): Date => state?.dateForFollowing,
);

// Cancel
export const selectCancelJustificationForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): string => state?.cancelJustification,
);
export const selectCancelReasonForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): DropListOption => state?.selectedCancelReason || ({} as DropListOption),
);
// Ajuste de oferta
export const selectAdjustmentFreightIsSelectedForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): boolean => state?.freightIsSelected,
);
export const selectAdjustmentJustificationForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): string => state?.adjustmentJustification,
);
export const selectAdjustmentFreightForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): DropListOption =>
    state?.selectedAdjustmentFreight || ({} as DropListOption),
);
export const selectAdjustmentPercentageForResume = createSelector(
  selectResumeSection,
  (state: ResumeSection): DropListOption =>
    state?.selectedAdjustmentPercentage || ({} as DropListOption),
);
export const selectQuoteBrands = createSelector(
  selectCloseOfferDetails,
  (state) => state.quoteBrands,
);
export const selectBrandOptions = createSelector(selectQuoteBrands, (brands) => {
  return flow([
    () => brands,
    (options) =>
      reduce(
        options,
        (result, item) => {
          const index = findIndex(
            result,
            (o) => o.value === item.IdMarca && o.label === item.Nombre,
          );
          if (index === -1) {
            result.push({value: item.IdMarca, label: item.Nombre});
          }
          return result;
        },
        [] as Array<DropListOption>,
      ),
    (options) => orderBy(options, 'label'),
    // (options) => [{value: DEFAULT_UUID, label: 'Todas'}, ...options],
  ])();
});
export const selectResumeProviders = createSelector(selectResumeSection, (resume) => {
  return flow([
    () => resume.providerList,
    (options) =>
      reduce(
        options,
        (result, item: VProveedor) => {
          const index = findIndex(
            result,
            (o) => o.value === item.IdProveedor && o.label === item.Nombre,
          );
          if (index === -1) {
            result.push({value: item.IdProveedor, label: item.Nombre});
          }
          return result;
        },
        [] as Array<DropListOption>,
      ),
    (options) => orderBy(options, 'label'),
  ])();
});
// selectBrandsOptionsForResume
export const needsToReloadContacts = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState) => state.needsToReloadContacts,
);
export const selectOptionsContactEmail = createSelector(
  selectCloseOfferDetails,
  (state: CloseOfferDetailsState) => state.contactsEmail,
);
export const selectedPaymentConditions = createSelector(
  selectResumeSection,
  selectedQuote,
  selectCatPaymentConditionsForDropDown,
  (
    resume: ResumeSection,
    selectedQuotation: IQuotation,
    paymentConditions: DropListOption[],
  ): DropListOption =>
    resume?.selectedAdjustmentPaymentConditions
      ? resume?.selectedAdjustmentPaymentConditions
      : find(
          paymentConditions,
          (o: DropListOption) =>
            o.value === selectedQuotation?.generalData?.paymentConditions?.IdCatCondicionesDePago,
        ),
);

//DOCS: Objeto de flete
export const selectFreightQuoteSelected = createSelector(
  selectedQuote,
  (state: IQuotation): GMCotFletes => state?.freights,
);

//DOCS: Creación  de header en vista quotation-in-progress.component

export const selectHeaderInternalSalesItemInProgress = createSelector(
  selectItemsQuotationSelected,
  selectedQuote,
  selectSeeResumeActive,
  selectedInProgressTabOptionIsTracing,
  selectedInProgressTabOptionIsAdjustment,
  selectedInProgressTabOptionIsBuyPromise,
  selectedInProgressTabOptionIsCancel,
  selectFreightQuoteSelected,
  (
    items: IItemQuotation[],
    quoteSelected: IQuotation,
    seeResumeActive: boolean,
    tabTracing: boolean,
    tabAdjustment: boolean,
    tabBuyPromise: boolean,
    tabCancel: boolean,
    freight: GMCotFletes,
  ) => {
    const allCheckedFollowing = every(items, [SEGUIMIENTO, true]) && items?.length > 0;
    const allCheckedAdjustmentOffer = every(items, [AJUSTE_DE_OFERTA, true]) && items?.length > 0;
    const allCheckedPurchasePromise = every(items, [PROMESA_DE_COMPRA, true]) && items?.length > 0;
    const allCheckedCancellation = every(items, [CANCELACION, true]) && items?.length > 0;
    const item: IItemQuotation = {} as IItemQuotation;
    const showNotes = !isEmpty(filter(items, (o: IItemQuotation) => o.Comentarios));
    const itemBodyGeneral = buildBodyGeneralItem(showNotes, item, 0, freight, quoteSelected);
    return buildColumnsSectionInProgress(
      item,
      itemBodyGeneral,
      seeResumeActive,
      quoteSelected,
      true,
      {
        tabTracing,
        tabAdjustment,
        tabBuyPromise,
        tabCancel,
        allCheckedFollowing,
        allCheckedAdjustmentOffer,
        allCheckedPurchasePromise,
        allCheckedCancellation,
      },
    );
  },
);

export const selectInternalSalesItemInProgress = createSelector(
  selectedQuote,
  selectSeeResumeActive,
  selectedInProgressTabOptionIsTracing,
  selectedInProgressTabOptionIsAdjustment,
  selectedInProgressTabOptionIsBuyPromise,
  selectedInProgressTabOptionIsCancel,
  selectCloseOfferDetails,
  selectFreightQuoteSelected,
  (
    quoteSelected: IQuotation,
    seeResumeActive: boolean,
    tabTracing: boolean,
    tabAdjustment: boolean,
    tabBuyPromise: boolean,
    tabCancel: boolean,
    state: CloseOfferDetailsState,
    freight: GMCotFletes,
  ): InternalSalesItem[] => {
    if (quoteSelected?.itemsQuotation?.length > 0) {
      const itemsQuotation: IItemQuotation[] = buildItemFreight(quoteSelected, freight);
      const itemsInternal: InternalSalesItem[] = [];
      const showNotes = !isEmpty(filter(itemsQuotation, (o: IItemQuotation) => o.Comentarios));
      forEach(itemsQuotation, (item: IItemQuotation, index: number) => {
        const reasonCancel: CatMotivoCancelacionPartidaCotizacion = find(
          state?.catMotivosCancelacion,
          (o: CatMotivoCancelacionPartidaCotizacion) =>
            o.IdCatMotivoCancelacionPartidaCotizacion ===
            item?.cotCancelacionPartidaCotizacion?.IdCatMotivoCancelacionPartidaCotizacion,
        );
        const itemBodyGeneral = buildBodyGeneralItem(
          showNotes,
          item,
          index,
          freight,
          quoteSelected,
        );
        itemsInternal.push(
          buildColumnsSectionInProgress(
            item,
            itemBodyGeneral,
            seeResumeActive,
            quoteSelected,
            false,
            {
              reasonCancel: reasonCancel?.Descripcion,
              tabTracing,
              tabAdjustment,
              tabBuyPromise,
              tabCancel,
            },
          ),
        );
      });
      return itemsInternal;
    }
    return [];
  },
);

// DOCS: Creación de header en vista quotation-adjustment.component
export const selectHeaderInternalSalesItemAdjustment = createSelector(
  selectItemsQuotationSelected,
  selectedQuote,
  selectSeeResumeActive,
  selectedTabOptionForAdjustment,
  selectFreightQuoteSelected,
  (
    state: IItemQuotation[],
    quoteSelected: IQuotation,
    seeResumeActive: boolean,
    tab: ITabOption,
    freight: GMCotFletes,
  ) => {
    const allCheckedFollowing = every(state, [SEGUIMIENTO, true]) && state?.length > 0;
    const allCheckedAdjustmentOffer = every(state, [AJUSTE_DE_OFERTA, true]) && state?.length > 0;
    const allCheckedPurchasePromise = every(state, [PROMESA_DE_COMPRA, true]) && state?.length > 0;
    const allCheckedCancellation = every(state, [CANCELACION, true]) && state?.length > 0;
    const item: IItemQuotation = {} as IItemQuotation;
    const showNotes = !isEmpty(filter(state, (o: IItemQuotation) => o.Comentarios));
    const itemBodyGeneral = buildBodyGeneralItem(showNotes, item, 0, freight, quoteSelected);
    return buildColumnsSectionAdjustmentOffer(
      item,
      itemBodyGeneral,
      seeResumeActive,
      quoteSelected,
      true,
      {
        tab: tab?.id,
        allCheckedFollowing,
        allCheckedAdjustmentOffer,
        allCheckedPurchasePromise,
        allCheckedCancellation,
      },
    );
  },
);

//DOCS. Creción del item para la vista quotation-adjustment.component

export const selectInternalSalesItemAdjustment = createSelector(
  selectedQuote,
  selectSeeResumeActive,
  selectedTabOptionForAdjustment,
  selectFreightQuoteSelected,
  (
    quoteSelected: IQuotation,
    seeResumeActive: boolean,
    tab: ITabOption,
    freight: GMCotFletes,
  ): InternalSalesItem[] => {
    if (quoteSelected?.itemsQuotation?.length > 0) {
      const itemsQuotation: IItemQuotation[] = buildItemFreight(quoteSelected, freight);
      const itemsInternal: InternalSalesItem[] = [];
      const showNotes = !isEmpty(filter(itemsQuotation, (o: IItemQuotation) => o.Comentarios));
      forEach(itemsQuotation, (item: IItemQuotation, index: number) => {
        const itemBodyGeneral = buildBodyGeneralItem(
          showNotes,
          item,
          index,
          freight,
          quoteSelected,
        );
        itemsInternal.push(
          buildColumnsSectionAdjustmentOffer(
            item,
            itemBodyGeneral,
            seeResumeActive,
            quoteSelected,
            false,
            {
              tab: tab.id,
            },
          ),
        );
      });
      return itemsInternal;
    }
    return [];
  },
);

// DOCS: Creación del header en vista resume.component
export const selectHeaderInternalSalesItemResume = createSelector(
  selectItemsQuotationSelected,
  selectedQuote,
  selectFreightQuoteSelected,
  (items: IItemQuotation[], quoteSelected: IQuotation, freight: GMCotFletes) => {
    const allCheckedResume = every(items, ['isSelectedInResume', true]) && items?.length > 0;
    const ajOfPriceItemQuotation = find(
      items,
      (o: IItemQuotation) =>
        o?.ajOfPrecioCotizacion !== null && o?.ajOfPrecioCotizacion !== undefined,
    );
    const item: IItemQuotation = {} as IItemQuotation;
    const showNotes = !isEmpty(filter(items, (o: IItemQuotation) => o.Comentarios));
    const itemBodyGeneral = buildBodyGeneralItem(showNotes, item, 0, freight, quoteSelected);
    return buildColumnsSectionResume(item, itemBodyGeneral, quoteSelected, true, {
      allCheckedResume,
      showColumnAgreedPrice: ajOfPriceItemQuotation === undefined,
    });
  },
);

//DOCS: Creación del componente reutilizable en vista resume.component
export const selectInternalSalesItemResume = createSelector(
  selectedQuote,
  validatorForFooterResumeSection,
  selectResumeSection,
  selectFreightQuoteSelected,
  (
    quoteSelected: IQuotation,
    validatorForFooter: boolean,
    resumeData: ResumeSection,
    freight: GMCotFletes,
  ): InternalSalesItem[] => {
    if (quoteSelected?.itemsQuotation?.length > 0) {
      const itemsQuotation: IItemQuotation[] = buildItemFreight(quoteSelected, freight);
      const ajOfPriceItemQuotation = find(
        itemsQuotation,
        (o: IItemQuotation) =>
          o?.ajOfPrecioCotizacion !== null && o?.ajOfPrecioCotizacion !== undefined,
      );
      const itemsInternal: InternalSalesItem[] = [];
      const showNotes = !isEmpty(filter(itemsQuotation, (o: IItemQuotation) => o.Comentarios));
      forEach(itemsQuotation, (item: IItemQuotation, index: number) => {
        const itemBodyGeneral = buildBodyGeneralItem(
          showNotes,
          item,
          index,
          freight,
          quoteSelected,
        );
        itemsInternal.push(
          buildColumnsSectionResume(item, itemBodyGeneral, quoteSelected, false, {
            validatorForFooter,
            resumeData,
            showColumnAgreedPrice: ajOfPriceItemQuotation === undefined,
          }),
        );
      });
      return itemsInternal;
    }
    return [];
  },
);

//DOCs: Validar los gestión del header en vista quotation-new.component
export const selectHeaderInternalSalesItem = createSelector(
  selectItemsQuotationSelected,
  selectedQuote,
  selectSeeResumeActive,
  selectFreightQuoteSelected,
  (
    state: IItemQuotation[],
    quoteSelected: IQuotation,
    seeResumeActive: boolean,
    freight: GMCotFletes,
  ) => {
    const allCheckedFollowing = every(state, [SEGUIMIENTO, true]) && state?.length > 0;
    const allCheckedAdjustmentOffer = every(state, [AJUSTE_DE_OFERTA, true]) && state?.length > 0;
    const allCheckedPurchasePromise = every(state, [PROMESA_DE_COMPRA, true]) && state?.length > 0;
    const allCheckedCancellation = every(state, [CANCELACION, true]) && state?.length > 0;
    const item: IItemQuotation = {} as IItemQuotation;
    const showNotes = !isEmpty(filter(state, (o: IItemQuotation) => o.Comentarios));
    const itemBodyGeneral = buildBodyGeneralItem(showNotes, item, 0, freight, quoteSelected);
    return buildColumnsSectionQuotationNew(item, itemBodyGeneral, true, seeResumeActive, {
      allCheckedFollowing,
      allCheckedAdjustmentOffer,
      allCheckedPurchasePromise,
      allCheckedCancellation,
    });
  },
);

//DOCS: Creación del componente reutilizable en vista quotation-new.component
export const selectInternalSalesItem = createSelector(
  selectedQuote,
  selectSeeResumeActive,
  selectFreightQuoteSelected,
  (
    quoteSelected: IQuotation,
    seeResumeActive: boolean,
    freight: GMCotFletes,
  ): InternalSalesItem[] => {
    if (quoteSelected?.itemsQuotation?.length > 0) {
      const itemsQuotation: IItemQuotation[] = buildItemFreight(quoteSelected, freight);
      const itemsInternal: InternalSalesItem[] = [];
      const showNotes = !isEmpty(filter(itemsQuotation, (o: IItemQuotation) => o.Comentarios));
      forEach(itemsQuotation, (item: IItemQuotation, index: number) => {
        const itemBodyGeneral = buildBodyGeneralItem(
          showNotes,
          item,
          index,
          freight,
          quoteSelected,
        );
        itemsInternal.push(
          buildColumnsSectionQuotationNew(item, itemBodyGeneral, false, seeResumeActive),
        );
      });
      return itemsInternal;
    }
    return [];
  },
);

export const selectEmailForDialog = createSelector(
  selectGeneralDataObject,
  (generalData: IGeneralDataStrategyRead): IDropListMulti[] => {
    return [
      {
        value: '', // DOCS: NO SE CUENTA CON EL ATRIBUTO PARA EL ID DEL CORREO.
        labels: [{label: generalData?.email, isShow: true}],
      },
    ];
  },
);
export const paymentConditions = createSelector(
  selectGeneralDataObject,
  (generalData: IGeneralDataStrategyRead): string => generalData.paymentConditions,
);
