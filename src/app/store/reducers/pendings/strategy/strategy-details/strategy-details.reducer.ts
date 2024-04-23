/* Core Import */
import {createReducer, on} from '@ngrx/store';
import {find, map} from 'lodash-es';

/* Models Imports */
import {
  IQuotation,
  StrategyDetailsState,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';

/* Actions Imports */
import {strategyDetailsActions} from '@appActions/pendings/strategy';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  QUOTATION_STRATEGY_TACTIC_1,
} from '@appUtil/common.protocols';

import {offerActions} from '@appActions/pendings/strategy/strategy-details/details';

import {
  initialIDefaulter,
  initialItemSelectedQuotation,
  initialOfferState,
  initialStrategyDetails,
} from '@appHelpers/pending/strategy/strategy.helpers';

export const strategyDetailsReducer = createReducer(
  initialStrategyDetails(),
  on(
    strategyDetailsActions.SET_SELECTED_CLIENT_STRATEGY,
    (state: StrategyDetailsState, {selectedClient}): StrategyDetailsState => ({
      ...state,
      selectedClient,
      brandsContract: {
        ...state.brandsContract,
        listBrandsStatus: API_REQUEST_STATUS_LOADING,
      },
      quotationStrategy: {
        ...state.quotationStrategy,
        quotationStrategyStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    strategyDetailsActions.FETCH_FREIGHT_SUCCESS,
    (state: StrategyDetailsState, {freight}): StrategyDetailsState => ({
      ...state,
      freightSelectedQuote: freight,
      itemsQuotationStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    strategyDetailsActions.FETCH_FREIGHT_FAILED,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    strategyDetailsActions.FETCH_QUOTES_SUCCESS,
    (state: StrategyDetailsState, {quotationsList, selectedQuotation}): StrategyDetailsState => ({
      ...state,
      quotations: {
        quotationsList,
        listQuotesStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
      selectedQuotation,
      queryInfo: {...state.queryInfo, desiredPage: 1},
    }),
  ),
  on(
    strategyDetailsActions.FETCH_QUOTES_FAILED,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      quotations: {
        ...state.quotations,
        listQuotesStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    strategyDetailsActions.FETCH_BRANDS_FAILED,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      brandsContract: {
        ...state.brandsContract,
        listBrandsStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    strategyDetailsActions.FETCH_BRANDS_SUCCESS,
    (state: StrategyDetailsState, {brands}): StrategyDetailsState => ({
      ...state,
      brandsContract: {
        ...state.brandsContract,
        listBrands: brands,
        listBrandsStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadBrands: false,
      },
    }),
  ),
  on(
    strategyDetailsActions.CLEAN_ALL_STRATEGY_DETAIL,
    (state: StrategyDetailsState): StrategyDetailsState => initialStrategyDetails(),
  ),
  on(
    strategyDetailsActions.FETCH_SELECTED_QUOTE_BRANDS_SUCCESS,
    (state: StrategyDetailsState, {brandsSelectedQuotation}): StrategyDetailsState => ({
      ...state,
      brandsSelectedQuotation,
      brandSelectedFilter: {value: DEFAULT_UUID, label: 'Todas'},
    }),
  ),
  on(
    strategyDetailsActions.SET_SELECTED_BRAND,
    (state: StrategyDetailsState, {brandSelectedFilter}): StrategyDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      itemsQuotationSelected: initialItemSelectedQuotation(),
      brandSelectedFilter,
      offerSection: {
        ...state.offerSection,
        selectedBrand: brandSelectedFilter,
      },
    }),
  ),
  on(
    strategyDetailsActions.SET_CONTACT,
    (state: StrategyDetailsState, {contacts}): StrategyDetailsState => ({
      ...state,
      contact: contacts,
    }),
  ),
  on(
    strategyDetailsActions.SET_QUOTATION_SELECTED,
    (state: StrategyDetailsState, {idQuotation}): StrategyDetailsState => ({
      ...state,
      queryInfo: {...state.queryInfo, desiredPage: 1},
      quotations: {
        ...state.quotations,
        quotationsList: map(state.quotations.quotationsList, (o) => ({
          ...o,
          isSelected: o.IdCotCotizacion === idQuotation,
        })),
      },
      selectedQuotation: find(
        state.quotations.quotationsList,
        (o: IQuotation) => idQuotation === o.IdCotCotizacion,
      ),
      barPercentages: {},
      brandsSelectedQuotation: [],
      itemsQuotationSelected: initialItemSelectedQuotation(),
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
      offerSection: initialOfferState(),
    }),
  ),
  on(
    strategyDetailsActions.SET_QUOTATION_SELECTED_V2,
    (state: StrategyDetailsState, {selectedQuotation}): StrategyDetailsState => ({
      ...state,
      selectedQuotation,
      offerSection: initialOfferState(),
    }),
  ),
  on(
    strategyDetailsActions.FETCH_ITEMS_QUOTATION,
    (state: StrategyDetailsState, {isFirstPage}): StrategyDetailsState => ({
      ...state,
      queryInfo: {
        ...state.queryInfo,
        desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
      },
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    strategyDetailsActions.FETCH_BAR_PERCENTAGES_SUCCESS,
    (state: StrategyDetailsState, {itemsBarPercentage}): StrategyDetailsState => ({
      ...state,
      barPercentages: itemsBarPercentage,
    }),
  ),
  on(
    strategyDetailsActions.FETCH_ITEMS_QUOTATION_LOAD,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    strategyDetailsActions.FETCH_ITEMS_QUOTATION_SUCCESS,
    (state: StrategyDetailsState, {response, currentPage}): StrategyDetailsState => ({
      ...state,
      itemsQuotationStatus:
        currentPage === 1 ? API_REQUEST_STATUS_LOADING : API_REQUEST_STATUS_SUCCEEDED,
      itemsQuotationSelected: {
        ...state.itemsQuotationSelected,
        Results:
          currentPage === 1
            ? [...response.Results]
            : [...state.itemsQuotationSelected?.Results, ...response.Results],
        TotalResults: response.TotalResults,
      },
    }),
  ),
  on(
    strategyDetailsActions.FETCH_ITEMS_QUOTATION_FAILED,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      itemsQuotationStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    strategyDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      quotationStrategy: {
        ...state.quotationStrategy,
        quotationStrategyStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    strategyDetailsActions.FETCH_QUOTATION_STRATEGY_SUCCESS,
    (
      state: StrategyDetailsState,
      {
        listQuotationStrategy,
        listQuotationStrategyTacticOptions,
        ajOfQuotationStrategy,
        itemSelected,
      },
    ): StrategyDetailsState => ({
      ...state,
      quotationStrategy: {
        ...state.quotationStrategy,
        listQuotationStrategy,
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
    strategyDetailsActions.SET_OPTION_STRATEGY,
    (state: StrategyDetailsState, {data}): StrategyDetailsState => ({
      ...state,
      quotationStrategy: {
        ...state.quotationStrategy,
        ajOfQuotationStrategy: {
          ...state.quotationStrategy.ajOfQuotationStrategy,
          IdCatEstrategiaCotizacion: data.value.toString(),
        },
        itemSelected: data,
      },
    }),
  ),
  on(
    strategyDetailsActions.SET_OPTION_STRATEGY_TACTIC,
    (state: StrategyDetailsState, {id, value, textJustification}): StrategyDetailsState => ({
      ...state,
      quotationStrategy: {
        ...state.quotationStrategy,
        listQuotationStrategyTactic: map(
          state.quotationStrategy.listQuotationStrategyTactic,
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
                      Justificacion:
                        tactic.Tactica === QUOTATION_STRATEGY_TACTIC_1 && textJustification !== ''
                          ? textJustification
                          : '' /*subTactic.ajOfQuotationStrategyTactic.Justificacion*/,
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
    strategyDetailsActions.SET_OPTION_STRATEGY_SUB_TACTIC,
    (
      state: StrategyDetailsState,
      {idTactic, idSubTactic, value, isMultiSubTactic, textJustification},
    ): StrategyDetailsState => ({
      ...state,
      quotationStrategy: {
        ...state.quotationStrategy,
        listQuotationStrategyTactic: map(
          state.quotationStrategy.listQuotationStrategyTactic,
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
                            Justificacion: textJustification,
                          },
                        }
                      : {
                          ...subTactic,
                          isSelected: isMultiSubTactic ? subTactic.isSelected : false,
                          ajOfQuotationStrategyTactic: {
                            ...subTactic.ajOfQuotationStrategyTactic,
                            Activo: isMultiSubTactic ? subTactic.isSelected : false,
                            Justificacion: isMultiSubTactic
                              ? subTactic.ajOfQuotationStrategyTactic.Justificacion
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
    strategyDetailsActions.SAVE_STRATEGY_SUCCESS,
    (state: StrategyDetailsState, {response}): StrategyDetailsState => ({
      ...state,
      quotationStrategy: {
        ...state.quotationStrategy,
        responseSaveStrategy: response,
      },
    }),
  ),

  on(
    strategyDetailsActions.SET_TAB_OPTION,
    (state: StrategyDetailsState, {tab}): StrategyDetailsState => ({
      ...state,
      tabs: {
        ...state.tabs,
        tabSelected: tab,
      },
    }),
  ),
  on(
    strategyDetailsActions.FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS,
    (state: StrategyDetailsState, {queryResult}): StrategyDetailsState => ({
      ...state,
      generalDataClient: {
        ...queryResult,
      },
    }),
  ),
  //DOCS: ACTIONS DE LA SECCIÓN DE OFERTA
  on(
    offerActions.SET_SEARCH_TERM,
    (state: StrategyDetailsState, {searchTerm}): StrategyDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        searchTerm,
      },
      itemsQuotationSelected: {
        ...state.itemsQuotationSelected,
        Results: [],
      },
      queryInfo: {
        ...state.queryInfo,
        desiredPage: 1,
      },
    }),
  ),
  on(
    offerActions.SET_SEARCH_TYPE,
    (state: StrategyDetailsState, {searchType}): StrategyDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        typeOfSearch: searchType,
      },
    }),
  ),
  on(
    offerActions.SET_FILTER_BY_BRAND,
    (state: StrategyDetailsState, {value}): StrategyDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        selectedBrand: value,
      },
    }),
  ),
  //DOCS: ACTIONS DE LA SECCIÓN DE OFERTA PERO EN CONDICIONES DE PAGO (GRAFICA)
  on(
    offerActions.FETCH_PENDING_INVOICES,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        defaulter: {
          ...state.offerSection.defaulter,
          dataPendingInvoiceStatus: API_REQUEST_STATUS_LOADING,
          needsToReloadPendingInvoices: true,
        },
      },
    }),
  ),
  on(
    offerActions.FETCH_PENDING_INVOICES_SUCCESS,
    (state: StrategyDetailsState, {dataPendingInvoices}): StrategyDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        defaulter: {
          ...state.offerSection.defaulter,
          dataPendingInvoices,
          dataPendingInvoiceStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReloadPendingInvoices: false,
        },
      },
    }),
  ),
  on(
    offerActions.FETCH_PENDING_INVOICES_FAILED,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        defaulter: {
          ...state.offerSection.defaulter,
          dataPendingInvoiceStatus: API_REQUEST_STATUS_FAILED,
        },
      },
    }),
  ),
  on(
    offerActions.SET_FILTER_BY_TYPE_PENDING_INVOICES,
    (state: StrategyDetailsState, {filterByType}) => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        defaulter: {
          ...state.offerSection.defaulter,
          filterByType,
        },
      },
    }),
  ),
  on(
    offerActions.CLEAN_ALL_INFORMATION_DEFAULTER,
    (state: StrategyDetailsState): StrategyDetailsState => ({
      ...state,
      offerSection: {
        ...state.offerSection,
        defaulter: initialIDefaulter(),
      },
    }),
  ),
);
