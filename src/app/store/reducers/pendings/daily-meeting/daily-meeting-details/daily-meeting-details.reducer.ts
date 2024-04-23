/* Core Import */
import {createReducer, on} from '@ngrx/store';
import {find, map} from 'lodash-es';

/* Models Imports */
import {
  DailyMeetingDetailsState,
  IQuotation,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';

/* Actions Imports */
import {
  dailyMeetingDetailsActions,
  dailyMeetingDetailsDashboardActions,
  dailyMeetingDetailsOfferActions,
  dailyMeetingDetailsOfferDelinquentActions,
  dailyMeetingDetailsOfferDeliveryActions,
} from '@appActions/pendings/daily-meeting';

/* Tools Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  QUOTATION_STRATEGY_TACTIC_1,
} from '@appUtil/common.protocols';

import {
  initialClientQuotationStrategyData,
  initialDailyMeetingDetails,
  initialDashboardClients,
  initialIDeliquent,
  initialIDelivery,
  initialItemSelectedQuotation,
  initialOfferState,
  initialOptions,
} from '@appHelpers/pending/daily-meeting/daily-meeting.helpers';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
import {
  IClientQuotation,
  MapTabsStatus,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';

export const dailyMeetingDetailsReducer = createReducer(
  initialDailyMeetingDetails(),
  on(
    dailyMeetingDetailsActions.FETCH_BAR_PERCENTAGES_SUCCESS,
    (state: DailyMeetingDetailsState, {itemsBarPercentage}): DailyMeetingDetailsState => ({
      ...state,
      barPercentages: itemsBarPercentage,
    }),
  ),
  on(
    dailyMeetingDetailsActions.FETCH_FREIGHT_SUCCESS,
    (state: DailyMeetingDetailsState, {freight}): DailyMeetingDetailsState => ({
      ...state,
      freightSelectedQuote: freight,
      itemsQuotationStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    dailyMeetingDetailsActions.SET_SELECTED_EVI_DAILY_MEETING,
    (state: DailyMeetingDetailsState, {eviSelected}): DailyMeetingDetailsState => ({
      ...state,
      eviSelected,
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      offerSection: {
        ...state.offerSection,
        listTypesOfSearch: initialOptions(),
      },
    }),
  ),
  on(
    dailyMeetingDetailsActions.CLEAN_ALL_DAILY_MEETING_DETAIL,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => initialDailyMeetingDetails(),
  ),
  on(
    dailyMeetingDetailsActions.SET_QUOTATION_SELECTED,
    (state: DailyMeetingDetailsState, {idQuotation}): DailyMeetingDetailsState => ({
      ...state,
      clientQuotes: map(state.clientQuotes, (o) => ({
        ...o,
        isSelected: o.IdCotCotizacion === idQuotation,
      })),
      quotationSelected: find(
        state.clientQuotes,
        (o: IQuotation) => idQuotation === o.IdCotCotizacion,
      ),
      offerSection: initialOfferState(),
      itemsQuotationSelected: initialItemSelectedQuotation(),
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      barPercentages: {},
    }),
  ),
  on(
    dailyMeetingDetailsActions.FETCH_ITEMS_QUOTATION_LOAD,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    dailyMeetingDetailsActions.FETCH_MORE_ITEMS_QUOTATION,
    (state: DailyMeetingDetailsState, {isFirstPage}): DailyMeetingDetailsState => ({
      ...state,
      queryInfoItemsQuotation: {
        ...state.queryInfoItemsQuotation,
        desiredPage: isFirstPage ? 1 : state.queryInfoItemsQuotation.desiredPage + 1,
      },
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    dailyMeetingDetailsActions.FETCH_ITEMS_QUOTATION_SELECTED_SUCCESS,
    (state: DailyMeetingDetailsState, {response, currentPage}): DailyMeetingDetailsState => ({
      ...state,
      itemsQuotationStatus:
        currentPage === 1 ? API_REQUEST_STATUS_LOADING : API_REQUEST_STATUS_SUCCEEDED,
      itemsQuotationSelected: {
        Results:
          currentPage === 1
            ? [...response.Results]
            : [...state.itemsQuotationSelected?.Results, ...response.Results],
        TotalResults: response.TotalResults,
      },
      offerSection: {
        ...state.offerSection,
        listBrandsSelectedQuotation:
          response?.Results.length > 0 ? state.offerSection.listBrandsSelectedQuotation : [],
        brandSelected: {value: DEFAULT_UUID, label: 'Todas'},
      },
    }),
  ),
  on(
    dailyMeetingDetailsActions.FETCH_ITEMS_QUOTATION_SELECTED_FAILED,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_SUCCESS,
    (
      state: DailyMeetingDetailsState,
      {clientQuotes, quotationSelected},
    ): DailyMeetingDetailsState => ({
      ...state,
      quotationSelected,
      clientQuotes,
      listQuotesStatus: API_REQUEST_STATUS_SUCCEEDED,
      queryInfoItemsQuotation: {...state.queryInfoItemsQuotation, desiredPage: 1},
    }),
  ),
  on(
    dailyMeetingDetailsActions.SET_TAB_OPTION,
    (state: DailyMeetingDetailsState, {tab}): DailyMeetingDetailsState => ({
      ...state,
      tabs: {
        ...state.tabs,
        tabSelected: tab,
      },
    }),
  ),
  on(
    dailyMeetingDetailsActions.SET_CURRENCY,
    (state: DailyMeetingDetailsState, {currency}): DailyMeetingDetailsState => ({
      ...state,
      quotationSelected: {
        ...state.quotationSelected,
        currency,
      },
      clientSelected: {
        ...state.clientSelected,
        currency,
      },
    }),
  ),
  //DOCS: ACCIONES DEL DASHBOARD DENTRO DE DETALLES
  on(
    dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_TABS_DASHBOARD_SUCCESS,
    (state: DailyMeetingDetailsState, {tabs}): DailyMeetingDetailsState => ({
      ...state,
      dashboardClients: {
        ...state.dashboardClients,
        tabsOptions: map(state.dashboardClients.tabsOptions, (o: ITabOption) => ({
          ...o,
          totalSubtitle: find(
            tabs,
            (i: AttributeDashboard) => i.DescriptionField === MapTabsStatus[Number(o.id) - 1],
          )?.ValueField as number,
          labelSubtitle:
            find(
              tabs,
              (i: AttributeDashboard) => i.DescriptionField === MapTabsStatus[Number(o.id) - 1],
            )?.ValueField !== 1
              ? o.labelSubtitle
              : 'Cliente',
        })),
      },
      clientQuotationStrategy: {
        ...state.clientQuotationStrategy,
        quotationStrategyStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_LOAD,
    (state: DailyMeetingDetailsState) => ({
      ...state,
      listClientsStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS,
    (state: DailyMeetingDetailsState, {listClients, clientSelected}): DailyMeetingDetailsState => ({
      ...state,
      clientSelected,
      listClients,
      listClientsStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_FAILED,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      listClientsStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS_ZERO,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      listClientsStatus: API_REQUEST_STATUS_SUCCEEDED,
      clientQuotes: [],
      clientSelected: {} as IClientQuotation,
      itemsQuotationStatus: API_REQUEST_STATUS_SUCCEEDED,
      itemsQuotationSelected: initialItemSelectedQuotation(),
      clientQuotationStrategy: {
        ...state.clientQuotationStrategy,
        quotationStrategyStatus: API_REQUEST_STATUS_SUCCEEDED,
        listQuotationStrategyTactic: [],
      },
      offerSection: initialOfferState(),
    }),
  ),

  on(
    dailyMeetingDetailsDashboardActions.SET_SEARCH_TERM_DASHBOARD,
    dailyMeetingDetailsDashboardActions.SET_TYPE_FILTER_DASHBOARD_SELECTED,
    dailyMeetingDetailsDashboardActions.SET_TAB_DASHBOARD_SELECTED_MACBOOK,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      listClients: [],
      clientQuotes: [],
      clientSelected: {} as IClientQuotation,
      listClientsStatus: API_REQUEST_STATUS_LOADING,
      itemsQuotationSelected: initialItemSelectedQuotation(),
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      offerSection: initialOfferState(),
      clientQuotationStrategy: {
        ...initialClientQuotationStrategyData(),
        quotationStrategyStatus: API_REQUEST_STATUS_LOADING,
      },
      barPercentages: {},
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.SET_SEARCH_TERM_DASHBOARD,
    (state: DailyMeetingDetailsState, {searchTerm}): DailyMeetingDetailsState => ({
      ...state,
      dashboardClients: {
        ...state.dashboardClients,
        searchTerm,
      },
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.SET_SEARCH_TYPE_DASHBOARD_SELECTED,
    (state: DailyMeetingDetailsState, {searchTypeSelected}): DailyMeetingDetailsState => ({
      ...state,
      dashboardClients: {
        ...state.dashboardClients,
        searchTypeSelected,
      },
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.SET_TYPE_FILTER_DASHBOARD_SELECTED,
    (state: DailyMeetingDetailsState, {typeFilterOptionSelected}): DailyMeetingDetailsState => ({
      ...state,
      dashboardClients: {
        ...state.dashboardClients,
        typeFilterOptionSelected,
      },
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.SET_TAB_DASHBOARD_SELECTED_IPAD,
    (state: DailyMeetingDetailsState, {tabSelectedIpad}): DailyMeetingDetailsState => ({
      ...state,
      dashboardClients: {
        ...state.dashboardClients,
        tabSelectedIpad,
      },
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.SET_TAB_DASHBOARD_SELECTED_MACBOOK,
    (state: DailyMeetingDetailsState, {tabSelectedMacBook}): DailyMeetingDetailsState => ({
      ...state,
      dashboardClients: {
        ...state.dashboardClients,
        tabSelectedMacBook,
      },
    }),
  ),
  on(
    dailyMeetingDetailsDashboardActions.SET_SELECTED_CLIENT_DASHBOARD,
    (state: DailyMeetingDetailsState, {clientSelected}): DailyMeetingDetailsState => ({
      ...state,
      clientSelected,
      barPercentages: {},
      itemsQuotationSelected: initialItemSelectedQuotation(),
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      offerSection: initialOfferState(),
      clientQuotationStrategy: {
        ...initialClientQuotationStrategyData(),
        quotationStrategyStatus: API_REQUEST_STATUS_LOADING,
      },
      queryInfoItemsQuotation: {...state.queryInfoItemsQuotation, desiredPage: 1},
    }),
  ),
  //DOCS: ACCIONES PARA PUBLICAR ESTRATEGIA
  on(dailyMeetingDetailsActions.SET_OPTION_STRATEGY, (state, {data}) => ({
    ...state,
    clientQuotationStrategy: {
      ...state.clientQuotationStrategy,
      itemSelected: data,
    },
  })),
  on(
    dailyMeetingDetailsActions.FETCH_QUOTATION_STRATEGY_SUCCESS,
    (
      state: DailyMeetingDetailsState,
      {listQuotationStrategyTacticOptions, ajOfQuotationStrategy, itemSelected, catStrategies},
    ): DailyMeetingDetailsState => ({
      ...state,
      clientQuotationStrategy: {
        ...state.clientQuotationStrategy,
        listQuotationStrategy: catStrategies.listQuotationStrategy,
        listQuotationStrategyTactic: listQuotationStrategyTacticOptions,
        listQuotationStrategyTacticBackup: listQuotationStrategyTacticOptions,
        itemSelected,
        quotationStrategyStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadQuotationStrategy: false,
        ajOfQuotationStrategy,
        ajOfQuotationStrategyBackup: ajOfQuotationStrategy,
      },
    }),
  ),
  on(
    dailyMeetingDetailsActions.SET_OPTION_STRATEGY_TACTIC,
    (state: DailyMeetingDetailsState, {id, value, textObservation}): DailyMeetingDetailsState => ({
      ...state,
      clientQuotationStrategy: {
        ...state.clientQuotationStrategy,
        listQuotationStrategyTactic: map(
          state.clientQuotationStrategy.listQuotationStrategyTactic,
          (tactic) =>
            tactic.IdCatEstrategiaCotizacionTactica === id
              ? {
                  ...tactic,
                  isSelected: value,
                  listSubTactic: map(tactic.listSubTactic, (subTactic) => ({
                    ...subTactic,
                    isSelected: tactic.Tactica === QUOTATION_STRATEGY_TACTIC_1 ? value : false,
                    ajOfQuotationStrategyTactic: {
                      ...subTactic.ajOfQuotationStrategyTactic,
                      Observaciones:
                        tactic.Tactica === QUOTATION_STRATEGY_TACTIC_1 && textObservation !== ''
                          ? textObservation
                          : '',
                      Activo: tactic.Tactica === QUOTATION_STRATEGY_TACTIC_1 ? value : false,
                    },
                  })),
                }
              : tactic,
        ),
      },
    }),
  ),
  on(
    dailyMeetingDetailsActions.SET_OPTION_STRATEGY_SUB_TACTIC,
    (state, {idTactic, idSubTactic, value, isMultiSubTactic, textObservation}) => ({
      ...state,
      clientQuotationStrategy: {
        ...state.clientQuotationStrategy,
        listQuotationStrategyTactic: map(
          state.clientQuotationStrategy.listQuotationStrategyTactic,
          (tactic) => ({
            ...tactic,
            listSubTactic:
              tactic.IdCatEstrategiaCotizacionTactica === idTactic
                ? map(tactic.listSubTactic, (subTactic) =>
                    subTactic.IdCatEstrategiaCotizacionSubtactica === idSubTactic
                      ? {
                          ...subTactic,
                          isSelected: value,
                          ajOfQuotationStrategyTactic: {
                            ...subTactic.ajOfQuotationStrategyTactic,
                            Activo: value,
                            Observaciones: textObservation,
                            // Justificacion: textJustification,
                          },
                        }
                      : {
                          ...subTactic,
                          isSelected: isMultiSubTactic ? subTactic.isSelected : false,
                          ajOfQuotationStrategyTactic: {
                            ...subTactic.ajOfQuotationStrategyTactic,
                            Activo: isMultiSubTactic ? subTactic.isSelected : false,
                            Observaciones: isMultiSubTactic
                              ? subTactic.ajOfQuotationStrategyTactic.Observaciones
                              : '',
                          },
                        },
                  )
                : tactic.listSubTactic,
          }),
        ),
      },
    }),
  ),
  on(
    dailyMeetingDetailsActions.SAVE_STRATEGY_SUCCESS,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,

      dashboardClients: {
        ...initialDashboardClients(),
      },
    }),
  ),
  //DOCS: ACCIONES DENTRO DE OFERTAS
  on(
    dailyMeetingDetailsOfferActions.SET_BRAND_OFFER_ITEMS_OFFER_SELECTED,
    (state: DailyMeetingDetailsState, {brand}): DailyMeetingDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      itemsQuotationSelected: initialItemSelectedQuotation(),
      offerSection: {
        ...state.offerSection,
        brandSelected: brand,
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferActions.FETCH_SELECTED_QUOTE_BRANDS_OFFER_SUCCESS,
    (state: DailyMeetingDetailsState, {brands}): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        listBrandsSelectedQuotation: brands,
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferActions.SET_SEARCH_TERM_ITEMS_OFFER,
    (state: DailyMeetingDetailsState, {searchTerm}): DailyMeetingDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      itemsQuotationSelected: initialItemSelectedQuotation(),
      offerSection: {
        ...state.offerSection,
        listBrandsSelectedQuotation: [],
        searchTerm,
      },
      queryInfoItemsQuotation: {
        ...state.queryInfoItemsQuotation,
        desiredPage: 1,
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferActions.SET_SEARCH_TYPE_ITEMS_OFFER,
    (state: DailyMeetingDetailsState, {searchType}): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        typeOfSearchSelected: searchType,
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferActions.SET_FILTER_BY_BRAND_ITEMS_OFFER,
    (state: DailyMeetingDetailsState, {value}) => ({
      ...state,
      itemsQuotationSelected: initialItemSelectedQuotation(),
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      offerSection: {
        ...state.offerSection,
        selectedBrand: value,
      },
    }),
  ),
  //DOCS: ACCIONES DENTRO DE OFERTAS (GRAFICA DE CONDICIONES DE PAGO)
  on(
    dailyMeetingDetailsOfferDelinquentActions.FETCH_PENDING_INVOICES_SUCCESS,
    (state: DailyMeetingDetailsState, {dataPendingInvoices}) => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delinquent: {
          ...state.offerSection.delinquent,
          dataPendingInvoiceStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReloadPendingInvoices: false,
          dataPendingInvoices,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDelinquentActions.FETCH_PENDING_INVOICES_FAILED,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delinquent: {
          ...state.offerSection.delinquent,
          dataPendingInvoiceStatus: API_REQUEST_STATUS_FAILED,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDelinquentActions.SET_FILTER_BY_TYPE,
    (state: DailyMeetingDetailsState, {filterByType}): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delinquent: {
          ...state.offerSection.delinquent,
          filterByType,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDelinquentActions.CLEAN_ALL_DELINQUENT,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delinquent: initialIDeliquent(),
      },
    }),
  ),
  //DOCS: ACCIONES DENTRO DE OFERTAS (GRAFICA DE ENTREGAS)
  on(
    dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delivery: {
          ...state.offerSection.delivery,
          dataDeliveriesStatus: API_REQUEST_STATUS_LOADING,
          needsToReloadDataDeliveries: true,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY_SUCCESS,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delivery: {
          ...state.offerSection.delivery,
          dataDeliveriesStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReloadDataDeliveries: false,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY_FAILED,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delivery: {
          ...state.offerSection.delivery,
          dataDeliveriesStatus: API_REQUEST_STATUS_SUCCEEDED,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDeliveryActions.SET_LIST_DELIVERIES,
    (state: DailyMeetingDetailsState, {listDeliveries}): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delivery: {
          ...state.offerSection.delivery,
          listDeliveries,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDeliveryActions.SET_CHART_DATA_DELIVERY,
    (state: DailyMeetingDetailsState, {dataChartDelivery}): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delivery: {
          ...state.offerSection.delivery,
          dataChartDelivery,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDeliveryActions.SET_TOTAL_DELIVERIES,
    (state: DailyMeetingDetailsState, {totalDeliveries}): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delivery: {
          ...state.offerSection.delivery,
          totalDeliveries,
        },
      },
    }),
  ),
  on(
    dailyMeetingDetailsOfferDeliveryActions.CLEAN_ALL_DELIVERY,
    (state: DailyMeetingDetailsState): DailyMeetingDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        delivery: initialIDelivery(),
      },
    }),
  ),
);
