/* Core Imports */
import {createSelector} from '@ngrx/store';
import {
  concat,
  filter,
  flatMapDeep,
  flow,
  forEach,
  isEmpty,
  isEqual,
  map as _map,
  reduce,
} from 'lodash-es';

/* Models Imports */
import {
  IBrandWithContract,
  IEntriesPercentages,
  IGeneralDataContactQuotationStrategy,
  IGeneralDataQuotationStrategy,
  IItemQuotation,
  IQuotation,
  IQuotationStrategyData,
  IQuotationStrategyTactic,
  ITabs,
  IVClientStrategy,
  QuotationClientInfo,
  StateEmailQuote,
  StrategyDetailsState,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {IStrategyByClient} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {ICard} from '@appModels/card/card';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {VCliente} from 'api-catalogos';

/* Selectors Imports */
import {
  selectStrategyDetails,
  selectStrategyDetailsComponent,
} from '@appSelectors/pendings/strategy/strategy.selectors';

/* Tools Imports */
import {
  API_REQUEST_STATUS_LOADING,
  FREIGHT_EXPRESS,
  FREIGHTS_LAST_MILE,
  QUOTATION_STRATEGY_TACTIC_1,
} from '@appUtil/common.protocols';
import {
  buildAddressFormat,
  getArrayForDropDownList,
  getTotalFreights,
  toRound,
} from '@appUtil/util';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {selectCatMonedaDropDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {GMCotFletes, ParametroListaMarcasCotizacionCerrarOferta} from 'api-logistica';
import {initialQuotation} from '@appHelpers/pending/strategy/strategy.helpers';
import {
  IFreightItem,
  InternalSalesItem,
  StylesColumnTotalValue,
} from '@appModels/table/internal-sales-item';
import {CLASS_NAMES, COLOR_STATUS} from '@appModels/shared-components/pqf-card';
import {QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';

export const selectClientStrategySelected = createSelector(
  selectStrategyDetails,
  (state: StrategyDetailsState) => state.selectedClient,
);

export const selectIdClient = createSelector(
  selectClientStrategySelected,
  (state: IStrategyByClient) => state.IdCliente,
);

export const selectClientNameHeader = createSelector(
  [selectClientStrategySelected, selectStrategyDetailsComponent],
  (clientData: IStrategyByClient, isDetails) => (isDetails ? clientData.Nombre : ''),
);

export const selectPercentageByClient = createSelector(
  selectClientStrategySelected,
  (clientData): number => {
    return clientData.TotalFacturadoUSD > 0 && clientData.ObjetivoFundamentalUSD > 0
      ? toRound((clientData.TotalFacturadoUSD * 100) / clientData.ObjetivoFundamentalUSD, 2)
      : 0;
  },
);

export const selectTotalCharged = createSelector(
  selectClientStrategySelected,
  (clientData): number => (clientData.TotalFacturadoUSD ? clientData.TotalFacturadoUSD : 0),
);

export const selectTotalFundamentalObjective = createSelector(
  selectClientStrategySelected,
  (clientData): number =>
    clientData.ObjetivoFundamentalUSD ? clientData.ObjetivoFundamentalUSD : 0,
);
export const selectIdAjStrategy = createSelector(
  selectClientStrategySelected,
  (clientData: IStrategyByClient): string => clientData.IdAjOfEstrategiaCotizacion,
);

export const selectQuotes = createSelector(
  selectStrategyDetails,
  (state): Array<IQuotation> => state.quotations.quotationsList,
);
export const selectedQuotation = createSelector(
  selectStrategyDetails,
  (state): IQuotation => (state?.selectedQuotation ? state.selectedQuotation : initialQuotation()),
);

export const selectItemsQuotationSelected = createSelector(
  selectStrategyDetails,
  (state: StrategyDetailsState) => state.itemsQuotationSelected?.Results,
);

export const selectCardOptions = createSelector(
  selectQuotes,
  selectCatMonedaDropDropDown,
  selectedQuotation,
  (state, listMonedas): Array<ICard> => {
    const options: Array<ICard> = [];
    forEach(state, (o: IQuotation, index: number) => {
      const nameCurrency = filter(listMonedas, (currency) => currency?.value === o.IdCatMoneda)[0];
      options.push({
        active: o.isSelected,
        value: o.IdCotCotizacion,
        labels: [
          {
            label: `#${index + 1} · ${o.Folio}`,
            className: CLASS_NAMES.title,
          },
          {
            label: `Valor Total ${new CurrencyFormat().transform(
              o.TotalCotizado,
              nameCurrency?.label,
            )} ${nameCurrency?.label}`,
            className: CLASS_NAMES.totalAmount,
          },
          {
            label: `${o.TotalProductos} ${o.TotalProductos === 1 ? 'Producto' : 'Productos'}`,
            className: CLASS_NAMES.countProducts,
          },
          {
            label:
              o.EstadoCorreoCotizacion === StateEmailQuote.ErrorEnEnvio
                ? 'Error'
                : o.EstadoCorreoCotizacion === StateEmailQuote.Pendiente
                ? 'Pendiente'
                : '',
            className: CLASS_NAMES.status,
            color:
              o.EstadoCorreoCotizacion === StateEmailQuote.ErrorEnEnvio
                ? COLOR_STATUS.ERROR_SENT
                : o.EstadoCorreoCotizacion === StateEmailQuote.Pendiente
                ? COLOR_STATUS.PENDING
                : '',
          },
        ],
      });
    });
    return options;
  },
);

export const selectQuotationsQueryInfo = createSelector(selectIdClient, (idClient: string) => {
  let queryInfo = queryInfoWithActiveFilter(false, false);
  queryInfo = {
    Filters: [
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: idClient,
      },
      {
        NombreFiltro: 'TieneEstrategia',
        ValorFiltro: false,
      },
    ],
    SortField: 'FechaEnvio',
    SortDirection: 'desc',
  };
  return queryInfo;
});

export const selectContactDetailsQueryInfo = createSelector(
  selectedQuotation,
  (quotation: IQuotation) => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters = [
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: quotation.IdCliente,
      },
      {
        NombreFiltro: 'IdContacto',
        ValorFiltro: quotation.IdContacto,
      },
    ];
    return queryInfo;
  },
);

export const selectBrandsWithContractQueryInfo = createSelector(
  selectIdClient,
  (idClient: string) => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters = [
      {
        NombreFiltro: 'IdCliente_Contrato',
        ValorFiltro: idClient,
      },
    ];
    return queryInfo;
  },
);

export const selectParamsListBrandsQuotationCloseOffer = createSelector(
  selectedQuotation,
  (quotation: IQuotation) => {
    const paramsListBrandsQuotationCloseOffer: ParametroListaMarcasCotizacionCerrarOferta = {
      AjusteDeOferta: false,
      Cancelacion: false,
      IdCotCotizacion: quotation.IdCotCotizacion,
      PartidaConfigAjusteOferta: 0,
      PromesaDeCompra: false,
      Seguimiento: false,
      Todas: true,
    };
    return paramsListBrandsQuotationCloseOffer;
  },
);

export const selectTotalQuotes = createSelector(selectQuotes, (state) => state.length);

export const selectTotalPending = createSelector(selectQuotes, (state): number =>
  reduce(
    state,
    (total, quotation) => {
      return quotation.EstadoCorreoCotizacion === StateEmailQuote.Pendiente ? total + 1 : total;
    },
    0,
  ),
);
export const selectContactData = createSelector(
  selectStrategyDetails,
  (state): IGeneralDataContactQuotationStrategy => {
    if (state?.contact) {
      const {
        Nombres,
        ApellidoPaterno,
        ApellidoMaterno,
        Email,
        Phone1,
        Phone2,
        Departamento,
        Puesto,
        NivelDecision,
      } = state?.contact;
      return {
        names: Nombres ?? 'N/D',
        lastName: ApellidoPaterno ?? undefined,
        surname: ApellidoMaterno ?? undefined,
        email: Email?.Correo ?? 'N/D',
        phone1: Phone1?.Numero
          ? Phone1.Numero + (Phone1?.Extension ? ' · Ext.' + Phone1?.Extension : '')
          : 'N/D',
        phone2: Phone2?.Numero
          ? Phone2.Numero + (Phone2?.Extension ? ' · Ext.' + Phone2?.Extension : '')
          : 'N/D',
        department: Departamento ?? 'N/D',
        job: Puesto ?? 'N/D',
        decisionLevel: NivelDecision ?? 'N/D',
      };
    }
  },
);

export const selectTotalError = createSelector(selectQuotes, (quotes): number =>
  reduce(
    quotes,
    (total, quotation) => {
      return quotation.EstadoCorreoCotizacion === StateEmailQuote.ErrorEnEnvio ? total + 1 : total;
    },
    0,
  ),
);

export const selectTotalAmountQuotes = createSelector(selectQuotes, (quotes: Array<IQuotation>) =>
  reduce(
    quotes,
    (total, quotation: IQuotation) => {
      return total + quotation.TotalCotizadoUSD;
    },
    0,
  ),
);

export const selectBrandsContract = createSelector(
  selectStrategyDetails,
  (state) => state.brandsContract,
);

export const selectListBrands = createSelector(
  selectBrandsContract,
  (state): Array<IBrandWithContract> => state.listBrands,
);

export const selectIsLoadingBrands = createSelector(
  selectBrandsContract,
  (state): boolean => state.listBrandsStatus === API_REQUEST_STATUS_LOADING,
);

export const selectIsLoadingItemsQuote = createSelector(
  selectStrategyDetails,
  (state): number => state.itemsQuotationStatus,
);
export const selectQuotationStrategy = createSelector(
  selectStrategyDetails,
  (state): IQuotationStrategyData => state.quotationStrategy,
);

export const selectListQuotationStrategy = createSelector(
  selectQuotationStrategy,
  (state): Array<DropListOption> =>
    getArrayForDropDownList(state.listQuotationStrategy, 'IdCatEstrategiaCotizacion', 'Estrategia'),
);

export const itemSelected = createSelector(
  selectQuotationStrategy,
  (state): DropListOption => state.itemSelected,
);

export const selectListQuotationTacticStrategy = createSelector(
  selectQuotationStrategy,
  (state): Array<IQuotationStrategyTactic> => state.listQuotationStrategyTactic,
);

export const validateStrategy = createSelector(selectQuotationStrategy, (state): boolean =>
  flow(
    () =>
      isEqual(state.ajOfQuotationStrategy, state.ajOfQuotationStrategyBackup) &&
      isEqual(state.listQuotationStrategyTactic, state.listQuotationStrategyTacticBackup),
    (isEqual) => {
      if (!isEqual) {
        let isInvalid = true;
        forEach(state.listQuotationStrategyTactic, (tactic) => {
          if (tactic.isSelected) {
            if (tactic.listSubTactic.length > 0 && tactic.Tactica !== QUOTATION_STRATEGY_TACTIC_1) {
              let validateSubTactic = false;
              forEach(tactic.listSubTactic, (subTactic) => {
                if (subTactic.isSelected) {
                  validateSubTactic = true;
                  return;
                }
              });
              if (!validateSubTactic) {
                isInvalid = true;
                return false;
              } else {
                isInvalid = false;
                // return false;
              }
            } else {
              isInvalid = false;
            }
          }
        });
        return !isInvalid;
      } else {
        return false;
      }
    },
  )(),
);

export const selectIsLoadingQuotationStrategy = createSelector(
  selectQuotationStrategy,
  (state): boolean => state.quotationStrategyStatus === API_REQUEST_STATUS_LOADING,
);
export const selectGeneralDataClient = createSelector(
  selectStrategyDetails,
  (state: StrategyDetailsState): QuotationClientInfo => state?.generalDataClient,
);
export const selectClientDataGeneral = createSelector(
  selectGeneralDataClient,
  (state: QuotationClientInfo): IVClientStrategy => state?.client,
);
export const selectedQuotationClientInfoMapped = createSelector(
  selectStrategyDetails,
  (state: StrategyDetailsState): IGeneralDataQuotationStrategy => {
    if (state?.generalDataClient) {
      const {
        client,
        contact,
        billingData,
        currency,
        paymentConditions,
        user,
        address,
        deliveryRoute,
      } = state?.generalDataClient;
      return {
        clientName: client?.Nombre ?? 'N/D',
        incomeLevel: client?.NivelIngreso ?? 'N/D',
        category: client?.Categoria,
        route: deliveryRoute && deliveryRoute.RutaEntrega ? deliveryRoute.RutaEntrega : 'N/D',
        whoBills: billingData && billingData.Alias ? billingData.Alias : 'N/D',
        billingCurrency: currency && currency.ClaveMoneda ? currency.ClaveMoneda : 'N/D',
        paymentConditions:
          paymentConditions && paymentConditions.CondicionesDePago
            ? paymentConditions.CondicionesDePago
            : 'N/D',
        assignedUser: client && client?.ESAC ? client?.ESAC : 'N/D',
        /*        address: address
          ? `${address.Calle} No.${address.NumeroExterior ? address.NumeroExterior : 'S/N'} ${
              address.Colonia
            } C.P ${address.CodigoPostal} ${address.Municipio} ${address.Estado}`
          : 'N/D',*/
        address: buildAddressFormat(address),
        folio: state.selectedQuotation.Folio,
        image: client?.image ? client.image : client?.Nombre ? client.Nombre : 'N/D',
        imageHover: client?.imageHover ? client.imageHover : client?.Nombre ? client.Nombre : 'N/D',
      };
    }
    return {} as IGeneralDataQuotationStrategy;
  },
);

export const selectCurrency = createSelector(selectStrategyDetails, (state): string => {
  let currency = '';
  if (!isEmpty(state.generalDataClient) && !isEmpty(state.generalDataClient.currency)) {
    currency = state.generalDataClient.currency.ClaveMoneda;
  }
  return currency;
});

export const selectClientData = createSelector(
  selectStrategyDetails,
  (state): VCliente => {
    return {
      ...state.generalDataClient?.client,
      NivelIngreso: state.generalDataClient?.client.NivelIngreso
        ? state.generalDataClient?.client.NivelIngreso
        : 'ND',
      Nombre: state.generalDataClient?.client.Nombre
        ? state.generalDataClient?.client.Nombre
        : 'ND',
      NombreImagen: state?.generalDataClient?.client?.NombreImagen,
    };
  },
);

export const selectTabs = createSelector(selectStrategyDetails, (state): ITabs => state.tabs);

export const selectTabsOptions = createSelector(
  selectTabs,
  (state): Array<ITabOption> => state.tabsOptions,
);

export const selectTabSelected = createSelector(
  selectTabs,
  (state): ITabOption => state.tabSelected,
);

export const selectBarPercentages = createSelector(
  selectStrategyDetails,
  selectedQuotation,
  (state: StrategyDetailsState): IEntriesPercentages => state.barPercentages,
);

//DOCS: OBTENER LOS PORCENTAJES PARA LA GRAFICA DE BARRAS
//DOCS: ORIGINALES, COMPLEMENTARIAS, PROMOCION, ALTERNATIVAS Y AHORRO

export const selectPercentagesBar = createSelector(
  [selectBarPercentages, selectCurrency],
  (state: IEntriesPercentages, currency: string): Array<IPercentageBarItems> => {
    return state?.Ahorro
      ? [
          {
            id: '1',
            percentage:
              state?.Original?.m_Item1 > 0 ? `${toRound(state?.Original?.m_Item1, 2)}%` : '0%',
            title: 'ORIGINALES',
            subtitle: `VALOR TOTAL ${new CurrencyFormat().transform(
              state?.Original?.m_Item2,
              currency,
            )} ${currency}`,
            color: '#6a6aae',
            value: state?.Original?.m_Item1,
          },
          {
            id: '2',
            percentage:
              state?.Complementaria?.m_Item1 > 0
                ? `${toRound(state?.Complementaria?.m_Item1, 2)}%`
                : '0%',
            title: 'COMPLEMENTARIAS',
            subtitle: `VALOR TOTAL ${new CurrencyFormat().transform(
              state?.Complementaria?.m_Item2,
              currency,
            )} ${currency}`,
            color: '#008894',
            value: state?.Complementaria?.m_Item1,
          },
          {
            id: '3',
            percentage:
              state?.Promocion?.m_Item1 > 0 ? `${toRound(state?.Promocion?.m_Item1, 2)}%` : '0%',
            title: 'PROMOCIÓN',
            subtitle: `VALOR TOTAL ${new CurrencyFormat().transform(
              state?.Promocion?.m_Item2,
              currency,
            )} ${currency}`,
            color: '#e29d2a',
            value: state?.Promocion?.m_Item1,
          },
          {
            id: '4',
            percentage:
              state?.Alternativa?.m_Item1 > 0
                ? `${toRound(state?.Alternativa?.m_Item1, 2)}%`
                : '0%',
            title: 'ALTERNATIVAS',
            subtitle: `VALOR TOTAL ${new CurrencyFormat().transform(
              state?.Alternativa?.m_Item2,
              currency,
            )} ${currency}`,
            color: '#cbb7a3',
            value: state?.Alternativa?.m_Item1,
          },
          {
            id: '5',
            percentage:
              state?.Ahorro?.m_Item1 > 0 ? `${toRound(state?.Ahorro?.m_Item1, 2)}%` : '0%',
            title: 'AHORRO',
            subtitle: `VALOR TOTAL ${new CurrencyFormat().transform(
              state?.Ahorro?.m_Item2,
              currency,
            )} ${currency}`,
            color: '#4ba92b',
            value: state?.Ahorro?.m_Item1,
          },
        ]
      : [];
  },
);

export const selectOfferSection = createSelector(
  selectStrategyDetails,
  (state: StrategyDetailsState) => state.offerSection,
);

export const selectFreightQuoteSelected = createSelector(
  selectStrategyDetails,
  (state: StrategyDetailsState): GMCotFletes => state.freightSelectedQuote,
);

export const selectColumnsHeaderConfig = createSelector(
  selectedQuotation,
  selectFreightQuoteSelected,
  selectItemsQuotationSelected,
  (state: IQuotation, freight: GMCotFletes, items): InternalSalesItem => {
    const showNotes = !isEmpty(filter(items, (o: IItemQuotation) => o.Comentarios));
    return buildStrategyDefault(state, freight, showNotes);
  },
);

export const selectInternalSalesItem = createSelector(
  selectItemsQuotationSelected,
  selectedQuotation,
  selectCurrency,
  selectFreightQuoteSelected,
  selectIsLoadingItemsQuote,
  (
    items: IItemQuotation[],
    quoteSelected: IQuotation,
    currency: string,
    freight: GMCotFletes,
    status: number,
  ): InternalSalesItem[] => {
    if (items?.length > 0 && freight !== null) {
      if (freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0) {
        if (quoteSelected.FleteDesglosado) {
          const freightItem: IFreightItem = {
            index: items?.length + 1,
            descriptionFreight: freight?.FleteExpress?.IdCotCotizacionFleteExpress
              ? FREIGHT_EXPRESS
              : FREIGHTS_LAST_MILE,
            subtotal: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {
              subtotal: true,
            }),
            iva: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {iva: true}),
            total: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress),
          };
          items = concat(items, [{freightItem}]);
        }
      }
      return flatMapDeep(items, (father: IItemQuotation, index: number) => {
        const showNotes = !isEmpty(filter(items, (o: IItemQuotation) => o.Comentarios));
        const resultArray: InternalSalesItem[] = [];
        resultArray.push(
          buildStrategyDefault(quoteSelected, freight, showNotes, false, currency, index, father),
        );
        _map(father.PartidasHijas, (child: IItemQuotation, subIndex: number) => {
          if (child?.TipoPartidaCotizacion !== QuotationItemTypes.Original) {
            resultArray.push(
              buildStrategyDefault(
                quoteSelected,
                freight,
                showNotes,
                true,
                currency,
                subIndex,
                child,
              ),
            );
          }
        });
        return resultArray;
      });
    }
    return [];
  },
);

export const selectTotalItems = createSelector(
  selectInternalSalesItem,
  (state: InternalSalesItem[]) => state?.length || 0,
);

const buildStrategyDefault = (
  quoteSelected: IQuotation = {} as IQuotation,
  freight: GMCotFletes = {} as GMCotFletes,
  showNotes = false,
  showArrow = false,
  currency = '',
  index = 0,
  o: IItemQuotation = {} as IItemQuotation,
): InternalSalesItem => {
  let item: InternalSalesItem;
  if (!o.freightItem) {
    item = {
      data: o,
      index,
      backgroundColorByTypeItem: o?.TipoPartidaCotizacion,
      columnNumberItem: {
        number: index + 1,
        showArrow,
      },
      columnImgTypeItem: {
        value: o?.TipoPartidaCotizacion,
      },
      columnConcept: {
        availabilityKey: o?.cotPartidaCotizacionDetalle?.vProducto?.DisponibilidadClave,
        cat: o?.Catalogo,
        typePresentation: o?.TipoPresentacion,
        presentation: o?.Presentacion,
        unity: o?.Unidad,
        description: o?.Descripcion,
        type: o?.Tipo,
        subType: o?.Subtipo,
        control: o?.Control,
        controlled: o?.Controlado,
        dateValidation:
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.FechaCaducidadVigenciaCuraduria,
        conversionRate: o?.PorcentajeTasasConversionTipo,
        proratedExpress:
          freight?.FleteExpress &&
          freight?.FleteExpress?.IdProveedor ===
            o.cotPartidaCotizacionDetalle?.vProducto?.IdProveedorPrincipal &&
          !quoteSelected.FleteDesglosado,
        author: o?.cotPartidaCotizacionDetalle?.vProducto?.Autor ?? 'N/D',
        formatPublication: o?.cotPartidaCotizacionDetalle?.vProducto?.FormatoPublicacion ?? 'N/D',
        typeMode: o?.cotPartidaCotizacionDetalle?.vProducto?.MedioDifusion ?? 'N/D',
        datesSuggested:
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
        dateAvailability: o?.cotPartidaCotizacionDetalle?.vProducto?.FechaDisponibilidadBackOrder,
        alternate: o?.cotPartidaCotizacionDetalle?.vProducto?.TotalAlternativo,
        complementary: o?.cotPartidaCotizacionDetalle?.vProducto?.TotalComplementario,
        supplements: o?.cotPartidaCotizacionDetalle?.vProducto?.TotalSuplementario,
      },
      columnNotes: showNotes
        ? o?.Comentarios
          ? {
              systemNotes: null,
              itemNotes: o?.Comentarios,
            }
          : {
              systemNotes: null,
              itemNotes: null,
            }
        : null,
      columnBrand: {
        src: o?.imageHover,
        nameBrand: o?.NombreMarca,
        showConversionRate: true,
        conversionRate: o?.PorcentajeTasasConversionMarca,
        isSelectPercentageConversion: false,
      },
      columnDeliveryTime: {
        days: o?.TiempoEstimadoEntrega,
        isEdit: false,
        isFreight:
          freight?.FleteExpress?.IdProveedor ===
          o.cotPartidaCotizacionDetalle?.vProducto?.IdProveedorPrincipal,
      },
      columnNumberPieces: {
        value: o?.NumeroDePiezas,
      },
      columnUnitPrice: {
        value: o?.PrecioCotizadoUnitarioConvertido,
        currency,
      },
      columnProFreight: {
        showColumn:
          freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0
            ? !quoteSelected?.FleteDesglosado
            : false,
        value: o?.PrecioFleteNoDesglosado,
        currency,
      },
      columnSubtotal: {
        value: o?.PrecioCotizadoSubtotal,
        currency,
      },
      columnIva: {
        value: o?.PrecioIVA,
        currency,
      },
      columnTotalValue: {
        value: o?.PrecioCotizadoTotal,
        style: StylesColumnTotalValue.General,
        listPrice:
          o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
            ?.PrecioListaConvertido,
        currency,
        pieces: o?.NumeroDePiezas,
      },
    };
  } else {
    item = {
      data: o,
      index,
      backgroundColorByTypeItem: o?.TipoPartidaCotizacion,
      columnNumberItem: {
        number: o.freightItem?.index,
      },
      columnImgTypeItem: {},
      columnConcept: {
        nameFreight: o?.freightItem?.descriptionFreight,
      },
      columnBrand: {},
      columnDeliveryTime: {},
      columnNumberPieces: {},
      columnUnitPrice: {},
      columnNotes: showNotes
        ? {
            systemNotes: null,
            itemNotes: null,
          }
        : null,
      columnProFreight: {
        showColumn:
          freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0
            ? !quoteSelected?.FleteDesglosado
            : false,
      },
      columnSubtotal: {
        value: o?.freightItem?.subtotal,
        currency,
      },
      columnIva: {
        value: o?.freightItem?.iva || 0,
        currency,
      },
      columnTotalValue: {
        style: StylesColumnTotalValue.General,
        value: o?.freightItem?.total,
        currency,
      },
    };
  }
  return item;
};
