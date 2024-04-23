/* Core Imports */
import {createSelector} from '@ngrx/store';
import {
  concat,
  filter,
  find,
  findIndex,
  flatMapDeep,
  flow,
  forEach,
  isEmpty,
  isEqual,
  map as _map,
  reduce,
} from 'lodash-es';

/* Selectors Imports */
import {selectDailyMeetingDetails} from '@appSelectors/pendings/daily-meeting/daily-meeting.selectors';

/* Models Imports */
import {
  DailyMeetingDetailsState,
  IClientQuotationStrategyData,
  IEntriesPercentages,
  IGeneralData,
  IItemQuotation,
  IQueryResultIItemQuotation,
  IQuotation,
  IQuotationStrategyTactic,
  ITabs,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {ITabOption} from '@appModels/botonera/botonera-option';

/* Selectors Imports */
import {selectCatMonedaDropDropDown} from '@appSelectors/catalogs/catalogs.selectors';

/* Tools Imports */
import {
  DEFAULT_UUID,
  FREIGHT_EXPRESS,
  FREIGHTS_LAST_MILE,
  PAGING_LIMIT,
  QUOTATION_STRATEGY_TACTIC_1,
} from '@appUtil/common.protocols';
import {getArrayForDropDownList, getTotalFreights, toRound} from '@appUtil/util';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {IClientQuotation} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {GMCotFletes, ParametroListaMarcasCotizacionCerrarOferta} from 'api-logistica';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {
  IFreightItem,
  InternalSalesItem,
  StylesColumnTotalValue,
} from '@appModels/table/internal-sales-item';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import {QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';

//TODO: NUEVOS SELECTORES

export const selectEviUser = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => state?.eviSelected,
);
export const selectIdEviUser = createSelector(
  selectEviUser,
  (state: Evi): string => state?.IdUsuario,
);

export const selectClient = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => state?.clientSelected,
);
export const selectIdClient = createSelector(
  selectClient,
  (state: IClientQuotation): string => state?.IdCliente || DEFAULT_UUID,
);
export const selectQuotationSelected = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): IQuotation => state?.quotationSelected,
);
export const selectIdQuotationSelected = createSelector(
  selectQuotationSelected,
  (state: IQuotation): string => state?.IdCotCotizacion || DEFAULT_UUID,
);

export const selectQuotesByClient = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): Array<IQuotation> => state?.clientQuotes,
);
export const selectClientsFromEvi = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => state.listClients,
);
export const selectItemsQuotationSelected = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => state?.itemsQuotationSelected,
);

export const selectItemsQuotation = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): Array<IItemQuotation> => state.itemsQuotationSelected.Results,
);

export const selectItemsQuotationTotal = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): number => state.itemsQuotationSelected.TotalResults,
);

export const selectItemsQuotationDesiredPage = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): number => state.queryInfoItemsQuotation.desiredPage,
);

export const selectFetchMoreItemsInfo = createSelector(
  selectDailyMeetingDetails,
  selectItemsQuotation,
  selectItemsQuotationTotal,
  selectItemsQuotationDesiredPage,
  (
    state: DailyMeetingDetailsState,
    itemsListQuotation: Array<IItemQuotation>,
    totalResults: number,
    desiredPage: number,
  ): IFetchMoreItemsInfo => {
    return {
      itemList: itemsListQuotation,
      itemsTotalLength: totalResults,
      listRequestStatus: state.itemsQuotationStatus,
      desiredPage,
      pageSize: PAGING_LIMIT,
      totalPages: totalResults >= PAGING_LIMIT ? Math.ceil(totalResults / PAGING_LIMIT) : 0,
    };
  },
);

export const selectQuotationQueryInfo = createSelector(selectClient, (state: IClientQuotation) => {
  const queryInfo = queryInfoWithActiveFilter();
  queryInfo.Filters = [
    ...queryInfo.Filters,
    {NombreFiltro: 'TieneEstrategia', ValorFiltro: true},
    {NombreFiltro: 'Publicada', ValorFiltro: false},
    {NombreFiltro: 'IdCliente', ValorFiltro: state?.IdCliente || DEFAULT_UUID},
    {NombreFiltro: 'IdAjOfEstrategiaCotizacion', ValorFiltro: state?.IdAjOfEstrategiaCotizacion},
  ];
  return queryInfo;
});

export const selectQueryInfoParamsBrandsQuotationSelected = createSelector(
  selectIdQuotationSelected,
  (idQuotation: string) => {
    const params: ParametroListaMarcasCotizacionCerrarOferta = {
      AjusteDeOferta: false,
      Cancelacion: false,
      IdCotCotizacion: idQuotation,
      PartidaConfigAjusteOferta: 0,
      PromesaDeCompra: false,
      Seguimiento: false,
      Todas: true,
    };

    return params;
  },
);

//DOCS: MOSTRAR LA INFORMACIÓN GENERAL
export const selectUserData = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): IGeneralData => {
    const {clientSelected, eviSelected} = state;
    return {
      NombreUsuario: eviSelected.UsuarioTramita,
      IdCliente: clientSelected?.IdCliente || DEFAULT_UUID,
      IdAjOfEstrategiaCotizacion: clientSelected?.IdAjOfEstrategiaCotizacion || DEFAULT_UUID,
      NombreCliente: clientSelected?.Nombre || 'ND',
      ObjetivoCrecimientoFundamental: clientSelected?.ObjetivoCrecimientoFundamental || 0,
      ObjetivoFundamentalUSD: clientSelected?.ObjetivoFundamentalUSD || 0,
      Estrategia: clientSelected?.Estrategia || 'ND',
      TotalCotizadoUSD: clientSelected?.TotalCotizadoUSD || 0,
      TotalFacturadoMXN: clientSelected?.TotalFacturadoMXN || 0,
      TotalFacturadoUSD: clientSelected?.TotalFacturadoUSD || 0,
      TotalCotizado: clientSelected?.TotalCotizado || 0,
      Index: clientSelected?.Index || 'ND',
      HorasCaducidadMasReciente: clientSelected?.HorasCaducidadMasReciente || 0,
    };
  },
);

export const selectTotalAmountQuotes = createSelector(selectQuotesByClient, (quotes) =>
  reduce(
    quotes,
    (total, quotation) => {
      return total + quotation.TotalCotizado;
    },
    0,
  ),
);
export const selectQuotationStrategy = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): IClientQuotationStrategyData => state.clientQuotationStrategy,
);

export const selectIsLoadingQuotationStrategy = createSelector(
  selectDailyMeetingDetails,
  (state): number => state.clientQuotationStrategy.quotationStrategyStatus,
);

export const selectClientQuotationStrategy = createSelector(
  selectDailyMeetingDetails,
  (state): IClientQuotationStrategyData => state.clientQuotationStrategy,
);

export const selectListQuotationStrategy = createSelector(
  selectClientQuotationStrategy,
  (state: IClientQuotationStrategyData): Array<DropListOption> =>
    getArrayForDropDownList(state.listQuotationStrategy, 'IdCatEstrategiaCotizacion', 'Estrategia'),
);

export const itemSelected = createSelector(
  selectQuotationStrategy,
  (state: IClientQuotationStrategyData): DropListOption => state.itemSelected,
);

export const currentStrategy = createSelector(selectClient, (state: IClientQuotation) =>
  state?.Estrategia ? state?.Estrategia : '',
);

export const selectListQuotationTacticStrategy = createSelector(
  selectQuotationStrategy,
  (state: IClientQuotationStrategyData): Array<IQuotationStrategyTactic> =>
    state.listQuotationStrategyTactic,
);

export const selectListQuotationTacticStrategyBackup = createSelector(
  selectQuotationStrategy,
  (state: IClientQuotationStrategyData): string =>
    state.listQuotationStrategyTacticBackup[0]?.listSubTactic[0]?.ajOfQuotationStrategyTactic
      ?.Justificacion,
);

export const validateStrategy = createSelector(
  selectQuotationStrategy,
  (state: IClientQuotationStrategyData): boolean =>
    flow(
      () =>
        isEqual(state.ajOfQuotationStrategy, state.ajOfQuotationStrategyBackup) &&
        isEqual(state.listQuotationStrategyTactic, state.listQuotationStrategyTacticBackup),
      (isEqual) => {
        if (!isEqual || isEqual) {
          let isInvalid = true;
          forEach(state.listQuotationStrategyTactic, (tactic) => {
            if (tactic.isSelected) {
              if (
                tactic.listSubTactic.length > 0 &&
                tactic.Tactica !== QUOTATION_STRATEGY_TACTIC_1
              ) {
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

export const selectCardOptions = createSelector(
  selectQuotesByClient,
  selectCatMonedaDropDropDown,
  (quotations: Array<IQuotation>, listCurrencies: DropListOption[]): Array<ICard> => {
    const options: Array<ICard> = [];
    forEach(quotations, (o: IQuotation, index: number) => {
      const nameCurrency = filter(
        listCurrencies,
        (currency) => currency?.value === o.IdCatMoneda,
      )[0];
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
            label: !o.Recibido && !o.Leido ? 'Error' : o.Recibido && !o.Leido ? 'Pendiente' : '',
            color: !o.Recibido && !o.Leido ? '#fb8190' : o.Recibido && !o.Leido ? '#f5a623' : '',
            className: CLASS_NAMES.status,
          },
        ],
      });
    });
    return options;
  },
);
export const selectListClientsWithQuotations = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) =>
    _map(state.listClients, (client, index) => ({
      ...client,
      Index: index + 1,
    })),
);

export const selectTotalQuotes = createSelector(
  selectQuotesByClient,
  (state: Array<IQuotation>): number => state?.length || 0,
);

export const selectTotalUsdQuotes = createSelector(
  selectQuotesByClient,
  (quotes: Array<IQuotation>): number =>
    reduce(
      quotes,
      (total, quotation: IQuotation) => {
        return total + quotation?.TotalCotizadoUSD;
      },
      0,
    ),
);

export const selectOptionTabsSections = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): ITabs => state?.tabs,
);

export const selectTabsOptionsSectionSelected = createSelector(
  selectOptionTabsSections,
  (state: ITabs): Array<ITabOption> => state.tabsOptions,
);

export const selectTabSelectedSections = createSelector(
  selectOptionTabsSections,
  (state: ITabs): ITabOption => state.tabSelected,
);

export const selectIsLoadingItemsQuotation = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): number => state.itemsQuotationStatus,
);

export const selectCurrency = createSelector(selectClient, (client): string => client.currency);

export const currentQuotation = createSelector(
  selectQuotesByClient,
  (quotes: IQuotation[]): IQuotation =>
    findIndex(quotes, (quotation: IQuotation) => quotation.isSelected) !== -1
      ? find(quotes, (quotation) => quotation.isSelected)
      : ({
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
          currency: '',
        } as IQuotation),
);
export const selectBarPercentages = createSelector(
  selectDailyMeetingDetails,
  selectQuotationSelected,
  (state: DailyMeetingDetailsState): IEntriesPercentages => state.barPercentages,
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

export const selectPercentageByClient = createSelector(
  selectClient,
  (clientData: IClientQuotation): number =>
    flow([
      () => ({
        TotalFacturadoUSD: clientData?.TotalFacturadoUSD || 0,
        ObjetivoFundamentalUSD: clientData?.ObjetivoFundamentalUSD || 0,
      }),
      ({TotalFacturadoUSD, ObjetivoFundamentalUSD}) =>
        TotalFacturadoUSD > 0 && ObjetivoFundamentalUSD > 0
          ? toRound((TotalFacturadoUSD * 100) / ObjetivoFundamentalUSD, 2)
          : 0,
    ])(),
);

export const selectFreightQuoteSelected = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState): GMCotFletes => state.freightSelectedQuote,
);

export const selectColumnsConfig = createSelector(
  selectQuotationSelected,
  selectFreightQuoteSelected,
  selectItemsQuotationSelected,
  (state: IQuotation, freight: GMCotFletes, items): InternalSalesItem => {
    const showNotes = !isEmpty(filter(items.Results, (o: IItemQuotation) => o.Comentarios));
    return buildStrategyDefault(state, freight, showNotes);
  },
);

export const selectInternalSalesItem = createSelector(
  selectItemsQuotationSelected,
  selectQuotationSelected,
  selectCurrency,
  selectFreightQuoteSelected,
  (
    state: IQueryResultIItemQuotation,
    quoteSelected: IQuotation,
    currency: string,
    freight: GMCotFletes,
  ): InternalSalesItem[] => {
    if (state.Results?.length > 0 && freight !== null) {
      // TODO: Los tipados de items, items2, freightItems no son compatibles.
      let items: IItemQuotation[] = state.Results;
      if (freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0) {
        if (quoteSelected.FleteDesglosado) {
          const freightItem: IFreightItem = {
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
      const showNotes = !isEmpty(filter(items, (o: IItemQuotation) => o.Comentarios));
      return flatMapDeep(items, (father: IItemQuotation, index: number) => {
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
        number: o?.Numero,
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
      columnNumberItem: {},
      columnImgTypeItem: {},
      columnConcept: {
        nameFreight: o?.freightItem?.descriptionFreight,
      },
      columnNotes: showNotes
        ? {
            systemNotes: null,
            itemNotes: null,
          }
        : null,
      columnBrand: {},
      columnDeliveryTime: {},
      columnNumberPieces: {},
      columnUnitPrice: {},
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
