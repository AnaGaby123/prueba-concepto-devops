/* core imports */
import {createReducer, on} from '@ngrx/store';
import {filter, find, first, map, orderBy} from 'lodash-es';

/* model imports */
import {
  ENUM_TYPE_QUOTATION,
  ICotPartidasInvetigacionCotizacion,
  IGMCotPartidasDetalle,
  IInvestigationProductData,
  initialQuotationDetails,
  initialQuotationPdfSection,
  initialQuotationSearchFilters,
  IQuotation,
  QuotationDetailsState,
  QuotationItemCombined,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {IClientQuotesDetails} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';

/* action import*/
import {
  checkOutQuotationActions,
  listQuotesActions,
  newClientFormActions,
  offlineProductActions,
  quotationDetailsActions,
  totalQuotePdfActions,
} from '@appActions/quotation';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IProduct,
  ProductSearchResult,
} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {
  IFlete,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {
  CatMedioDifusion,
  CatTipoCotizacion,
  ContactoDetalleObj,
  NumeroTelefonico,
  VDireccion,
  VMarcaFamilia,
} from 'api-catalogos';
import {
  initialContactForm,
  initialTelephoneNumber,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {initialIDireccion} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {initialProduct} from '@appModels/store/quotation/quotation-details/details/sections/offline-product.models';
import {
  initialGMClient,
  initialGMClientDirection,
  initialGMClientQuotation,
  initialGMContactForm,
  initialGMDirection,
} from '@appModels/store/quotation/quotation-details/details/sections/gm-client-quotation.models';
import {CotCotizacionFleteExpress, VCotCotizacion} from 'api-logistica';
import {
  buildArrayExpressFreights,
  buildArrayLastMileFreights,
  buildCotPartidaCotizacion,
  buildQuotationsListFromResponse,
  CatQuotationState,
  TypeDelivery,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {replaceND} from '@appUtil/util';
import {
  FETCH_FILE_PDF_INVESTIGATION_FAILED,
  FETCH_FILE_PDF_INVESTIGATION_LOAD,
} from '@appActions/quotation/quotation-details/details/total-quote-pdf/total-quote-pdf.actions';
import {SET_ADD_ITEMS_INVESTIGATION_NEEDS_TO_RELOAD} from '@appActions/quotation/quotation-details/quotation-details.actions';

/* reducer imports */

/* tools imports */

const initialStateQuotationDetails: QuotationDetailsState = {
  ...initialQuotationDetails(),
};

export const quotationDetailsReducer2 = createReducer(
  initialQuotationDetails(),
  on(
    quotationDetailsActions.SET_SELECTED_CLIENT,
    (state: QuotationDetailsState, {selectedClient}) => ({
      ...state,
      selectedClient,
    }),
  ),
  on(
    quotationDetailsActions.FETCH_QUOTATIONS_LIST_SUCCESS,
    (state: QuotationDetailsState, {quotationsList}): QuotationDetailsState => ({
      ...state,
      quotationsList,
      selectedQuotation: quotationsList[0],
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          IdsCotizacion: [quotationsList[0]?.IdCotCotizacion],
        },
      },
    }),
  ),
  on(
    quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS,
    (state: QuotationDetailsState, {selectedQuotationDetails}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        selectedQuotationDetails,
      },
    }),
  ),
  on(
    quotationDetailsActions.FETCH_UPDATE_SELECTED_QUOTATION_DETAILS_SUCCESS,
    (state: QuotationDetailsState, {selectedQuotationDetails}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotCotizacion: {
            ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
            IdCatEstadoCotizacion: selectedQuotationDetails.CotCotizacion.IdCatEstadoCotizacion,
          },
          CotPartidasInvetigacionCotizacion:
            selectedQuotationDetails.CotPartidasInvetigacionCotizacion,
          InvestigacionesFinalizadas: selectedQuotationDetails.InvestigacionesFinalizadas,
        },
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_DATA_SELECTED_CLIENT_QUOTATION_DETAIL,
    (state: QuotationDetailsState, {input, value}): QuotationDetailsState => ({
      ...state,
      selectedClient: {
        ...state.selectedClient,
        quotesDetails: map(state.selectedClient.quotesDetails, (o: IClientQuotesDetails) => ({
          ...o,
          [input]: value,
        })),
      },
    }),
  ),
  on(
    quotationDetailsActions.FETCH_QUOTATION_DETAIL,
    (state: QuotationDetailsState, {idQuotation}): QuotationDetailsState => ({
      ...state,
      selectedClient: {
        ...state.selectedClient,
        quotesDetails: map(state.selectedClient.quotesDetails, (o) => {
          return {
            ...o,
            isSelected: o.IdCotCotizacion === idQuotation,
          };
        }),
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_CONTACTS_EMAIL,
    (state: QuotationDetailsState, {contacts}): QuotationDetailsState => ({
      ...state,
      contactsEmail: [...contacts],
    }),
  ),
  on(
    quotationDetailsActions.SET_CONTACTS,
    (state: QuotationDetailsState, {contacts}): QuotationDetailsState => ({
      ...state,
      contacts: [...contacts],
    }),
  ),
  on(
    quotationDetailsActions.SET_SEARCH_TERM_CLIENT,
    (state: QuotationDetailsState, {searchTerm}): QuotationDetailsState => ({
      ...state,
      clientListStatus: API_REQUEST_STATUS_LOADING,
      searchTermClient: searchTerm,
      clientsList: {
        Results: [],
        TotalResults: 0,
      },
    }),
  ),
  on(quotationDetailsActions.FETCH_CAT_CLIENTS_SUCCESS, (state, {response}) => ({
    ...state,
    clientListStatus: API_REQUEST_STATUS_SUCCEEDED,
    clientsList: response,
    clientsRequestStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(quotationDetailsActions.FETCH_CAT_CLIENTS_FAILED, (state) => ({
    ...state,
    clientListStatus: API_REQUEST_STATUS_FAILED,
    clientsRequestStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(
    quotationDetailsActions.FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS,
    (state: QuotationDetailsState, {queryResult}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        clientInfo: queryResult,
      },
    }),
  ),
  on(
    quotationDetailsActions.FETCH_RELOAD_QUOTATION_DATA,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        needsToReloadInfo: true,
      },
    }),
  ),
  on(
    quotationDetailsActions.FETCH_MAIL_SUCCESS,
    (state: QuotationDetailsState, {data}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        needsToReloadInfo: false,
        mailData: data,
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_SELECTED_QUOTATION,
    (state: QuotationDetailsState, {quotationId}): QuotationDetailsState => ({
      ...state,
      // DOCS: Recorrer las cotizaciones
      quotationsList: map(state.quotationsList, (o: IQuotation) => {
        // DOCS: Encontrar la cotización actualmente seleccionada
        if (o.IdCotCotizacion === state.selectedQuotation?.IdCotCotizacion) {
          // DOCS: Respaldar la info de la cotización actualmente seleccionada dentro de la lista de cotizaciones y se desmarca
          return {
            ...state.selectedQuotation,
            isSelected: false,
          };
          // DOCS: Encontrar la nueva cotización que se esta seleccionando
        } else if (o.IdCotCotizacion === quotationId) {
          // DOCS: Marcar la cotización como seleccionada
          return {...o, isSelected: true};
        }
        // DOCS: Devolver la cotización sin ningún cambio si no coincide con ninguna de las validaciones
        return {...o, isSelected: false};
      }),
      selectedQuotation: map(
        [find(state.quotationsList, (o: IQuotation): boolean => o.IdCotCotizacion === quotationId)],
        (i: IQuotation) => ({...i, isSelected: true}),
      )[0],
      quotationItemsSearchFilters: initialQuotationSearchFilters(),
      productsSearchResults: [],
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          IdsCotizacion: [quotationId],
        },
      },
    }),
  ),
  /* DOCS: Filtros de búsqueda para las partidas*/
  on(
    listQuotesActions.SET_TYPE_SEARCH,
    (state: QuotationDetailsState, {typeSearch}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        searchTypeSelectedOption: typeSearch,
      },
    }),
  ),
  on(
    listQuotesActions.SET_FILTER_SELECTED,
    (state: QuotationDetailsState, {field, item}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        [field]: item,
        searchTerm: state.quotationItemsSearchFilters.runSearchTerm,
        productsQueryInfo: {
          ...state.quotationItemsSearchFilters.productsQueryInfo,
          desiredPage: state.quotationItemsSearchFilters.runSearchTerm
            ? 1
            : state.quotationItemsSearchFilters.productsQueryInfo.desiredPage,
        },
      },
    }),
  ),
  on(
    listQuotesActions.SET_RUN_SEARCH_TERM,
    (state: QuotationDetailsState, {searchTerm}): QuotationDetailsState => {
      return {
        ...state,
        quotationItemsSearchFilters: {
          ...state.quotationItemsSearchFilters,
          searchTerm,
          optionOfProductSelected: {} as DropListOption,
          productsQueryInfo: {
            ...state.quotationItemsSearchFilters.productsQueryInfo,
            desiredPage: 1,
          },
        },
      };
    },
  ),
  on(
    listQuotesActions.SET_OPTION_OF_PRODUCT_SELECTED,
    (state: QuotationDetailsState, {option}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        runSearchTerm: option.label,
        searchTerm: option.label,
        optionOfProductSelected: option,
        productsQueryInfo: {
          ...state.quotationItemsSearchFilters.productsQueryInfo,
          desiredPage: 1,
        },
      },
    }),
  ),
  on(
    listQuotesActions.CLEAR_SEARCH_TERM,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        runSearchTerm: '',
        searchTerm: '',
        productSuggestionResults: [],
        optionOfProductSelected: {} as DropListOption,
        listProductsStatus: API_REQUEST_STATUS_DEFAULT,
        listProducts: [],
        total: 0,
        productsQueryInfo: {
          ...state.quotationItemsSearchFilters.productsQueryInfo,
          Filters: [],
          desiredPage: 1,
        },
      },
    }),
  ),
  on(listQuotesActions.SET_PRODUCT_SELECTED, (state, {product}) => ({
    ...state,
    selectedProduct: product,
  })),
  on(
    listQuotesActions.SET_PRODUCT_SELECTED_SUCCESS,
    (state: QuotationDetailsState, {vProductDetails}): QuotationDetailsState => ({
      ...state,
      productsSearchResults: map(state.productsSearchResults, (o: ProductSearchResult) => ({
        ...o,
        isSelected: o.IdProducto === vProductDetails?.IdProducto ? !o.isSelected : false,
        vProductDetails: vProductDetails ?? o.vProductDetails,
      })),
    }),
  ),
  on(listQuotesActions.SET_PIECES_PRODUCT_SUCCESS, (state, {item}) => ({
    ...state,
    productsSearchResults: map(state.productsSearchResults, (product: ProductSearchResult) => {
      if (product.IdProducto === item.IdProducto) {
        return {...product, ...item};
      }
      return product;
    }),
  })),
  on(listQuotesActions.SET_DATE_REALIZATION, (state, {input, date}) => ({
    ...state,
    quotationItemsSearchFilters: {
      ...state.quotationItemsSearchFilters,
      listProducts: map(state.quotationItemsSearchFilters.listProducts, (product: IProduct) => {
        if (product.isSelected) {
          return {
            ...product,
            dateRealization: {
              ...product.dateRealization,
              [input]: date,
            },
          };
        } else {
          return {...product};
        }
      }),
    },
  })),
  on(quotationDetailsActions.SET_STATUS_CONTACTS, (state, {contact}) => ({
    ...state,
    contactsEmail: map(state.contactsEmail, (o) => {
      if (contact.value === o.value) {
        return {...o, isSelected: !o.isSelected};
      }
      return o;
    }),
  })),
  on(quotationDetailsActions.SET_STATUS_CONTACTS_CANCEL, (state) => ({
    ...state,
    contactsEmail: map(state.contactsEmail, (o) => ({...o, isSelected: false})),
  })),
  on(
    quotationDetailsActions.SAVE_ITEM_QUOTATION_SUCCESS,
    (state: QuotationDetailsState, {idProduct}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        listProducts: map(state.quotationItemsSearchFilters.listProducts, (product) => ({
          ...product,
          NumeroDePiezas: product.IdProducto === idProduct ? 1 : product.NumeroDePiezas,
        })),
      },
    }),
  ),
  on(
    listQuotesActions.FETCH_QUOTATION_RELATED_SUCCESS,
    (state: QuotationDetailsState, {list, IdProduct}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        listProducts: map(state.quotationItemsSearchFilters.listProducts, (product) => {
          if (product.IdProducto === IdProduct) {
            return {
              ...product,
              listRelated: list,
              openRelated: !product.openRelated,
            };
          }
          return product;
        }),
      },
    }),
  ),
  on(
    listQuotesActions.SET_LINKED_QUOTE,
    (state: QuotationDetailsState, {item}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        linkedQuotes: {
          ...state.quotationItemsSearchFilters.linkedQuotes,
          ...item,
          needsToReload:
            state.quotationItemsSearchFilters.linkedQuotes.idCotCotizacion !== item.idCotCotizacion,
        },
      },
    }),
  ),
  on(
    listQuotesActions.FETCH_FILE_PDF_SUCCESS,
    (state: QuotationDetailsState, {base64}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        base64File: base64,
      },
    }),
  ),
  on(
    listQuotesActions.FETCH_FILE_BASE64_LOAD,
    (state: QuotationDetailsState, {IdArchivo}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        linkedQuotes: {
          ...state.quotationItemsSearchFilters.linkedQuotes,
          idArchivo: IdArchivo,
        },
      },
    }),
  ),
  on(
    listQuotesActions.SET_TYPE_SEARCH,
    (state: QuotationDetailsState, {typeSearch}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        searchTypeSelectedOption: typeSearch,
      },
    }),
  ),
  on(
    listQuotesActions.SET_MODAL_IS_OPEN_RESEND_QUOTATION,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        modalIsOpenResendQuotation: value,
      },
    }),
  ),
  on(
    listQuotesActions.UPDATE_LIST_PRODUCTS,
    (state: QuotationDetailsState, {IdProducto}): QuotationDetailsState => ({
      ...state,
      productsSearchResults: map(state.productsSearchResults, (o: ProductSearchResult) => {
        if (o.IdProducto === IdProducto) {
          return {
            ...o,
            isInViewQuotesLinked: true,
          };
        } else {
          return {...o, isInViewQuotesLinked: false};
        }
      }),
    }),
  ),
  on(
    listQuotesActions.VIEW_FILE_IS_LOADING,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        viewFileIsLoading: value,
      },
    }),
  ),
  on(
    listQuotesActions.VIEW_FILE_SUCCESS,
    (state: QuotationDetailsState, {fileBase64}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        base64File: fileBase64,
      },
    }),
  ),
  on(
    listQuotesActions.GET_OPTIONS_OF_PRODUCTS,
    (state: QuotationDetailsState, {runSearchTerm}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        productSuggestionResultsStatus: API_REQUEST_STATUS_LOADING,
        runSearchTerm,
        searchTerm: !runSearchTerm ? '' : state.quotationItemsSearchFilters.searchTerm,
      },
    }),
  ),
  on(
    listQuotesActions.GET_OPTIONS_OF_PRODUCTS_FAILED,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        productSuggestionResultsStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    listQuotesActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS,
    (state: QuotationDetailsState, {products}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        productSuggestionResults: products,
        productSuggestionResultsStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    listQuotesActions.FETCH_PRODUCTS,
    (state: QuotationDetailsState, {isFirstPage}): QuotationDetailsState => ({
      ...state,
      productsSearchResultsStatus: API_REQUEST_STATUS_LOADING,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        // listProductsStatus: API_REQUEST_STATUS_LOADING,
        productsQueryInfo: {
          ...state.quotationItemsSearchFilters.productsQueryInfo,
          desiredPage: isFirstPage
            ? 1
            : state.quotationItemsSearchFilters.productsQueryInfo.desiredPage + 1,
        },
      },
    }),
  ),
  on(
    listQuotesActions.FETCH_PRODUCTS_FAILED,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      productsSearchResults: [],
      productsSearchResultsStatus: API_REQUEST_STATUS_FAILED,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        total: 0,
      },
    }),
  ),
  on(
    listQuotesActions.FETCH_PRODUCTS_SUCCESS,
    (state: QuotationDetailsState, {products, total}): QuotationDetailsState => ({
      ...state,
      productsSearchResults:
        state.quotationItemsSearchFilters.productsQueryInfo.desiredPage === 1
          ? [...products]
          : [...state.productsSearchResults, ...products],
      productsSearchResultsStatus: API_REQUEST_STATUS_SUCCEEDED,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        total,
      },
    }),
  ),
  on(
    listQuotesActions.SET_OPTION_FILTER_PRODUCT,
    (state: QuotationDetailsState, {item}): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: {
        ...state.quotationItemsSearchFilters,
        optionSelected: item,
      },
    }),
  ),

  /* DOCS: Pantalla Resumen*/
  on(
    checkOutQuotationActions.SET_MODAL_IS_OPEN_SEND_QUOTATION,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => {
      return {
        ...state,
        resumeSection: {
          ...state.resumeSection,
          modalIsOpenSendQuotation: value,
        },
      };
    },
  ),
  on(
    checkOutQuotationActions.SET_TAB,
    (state: QuotationDetailsState, {tab}): QuotationDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        tapSelected: tab,
      },
    }),
  ),
  on(
    checkOutQuotationActions.SET_SEARCH_TERM,
    (state: QuotationDetailsState, {searchTerm}): QuotationDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        searchTerm,
      },
    }),
  ),
  on(checkOutQuotationActions.CLOSE_ITEM_DETAILS_POP, (state, {value}) => ({
    ...state,
    quotationItemsSearchFilters: {
      ...state.quotationItemsSearchFilters,
      optionSelected: state.quotationItemsSearchFilters.options[0],
    },
    selectedQuotation: {
      ...state.selectedQuotation,
      selectedQuotationDetails: {
        ...state.selectedQuotation.selectedQuotationDetails,
        CotPartidasCotizacion: value
          ? map(
              state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
              (o: IGMCotPartidasDetalle, index): IGMCotPartidasDetalle => {
                if (o.selected) {
                  return {
                    ...o,
                    CotPartidaCotizacion:
                      state.selectedQuotation.selectedQuotationDetails.selectedProduct
                        .CotPartidaCotizacion,
                    CotProductoOferta:
                      state.selectedQuotation.selectedQuotationDetails.selectedProduct
                        .CotProductoOferta,
                    fechasRealizacionCapacitacion:
                      state.selectedQuotation.selectedQuotationDetails.selectedProduct
                        .fechasRealizacionCapacitacion,
                    selected: false,
                  };
                }
                return {
                  ...o,
                };
              },
            )
          : state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
      },
    },
  })),
  on(checkOutQuotationActions.SET_DETAILS_PRODUCT_LOAD, (state, {itemQuotation, index}) => ({
    ...state,
    selectedQuotation: {
      ...state.selectedQuotation,
      selectedQuotationDetails: {
        ...state.selectedQuotation.selectedQuotationDetails,
        CotPartidasCotizacion: map(
          state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
          (o: IGMCotPartidasDetalle, i): IGMCotPartidasDetalle => ({
            ...o,
            selected: i === index,
          }),
        ),
        selectedProduct: itemQuotation,
      },
    },
  })),
  on(checkOutQuotationActions.SET_VPRODUCTO_DETALLE, (state, {vProductoDetalle}) => ({
    ...state,
    selectedQuotation: {
      ...state.selectedQuotation,
      selectedQuotationDetails: {
        ...state.selectedQuotation.selectedQuotationDetails,
        selectedProduct: {
          ...state.selectedQuotation.selectedQuotationDetails.selectedProduct,
          vProductoDetalle,
        },
      },
    },
  })),
  on(checkOutQuotationActions.UPDATE_COT_COTIZACION, (state, {CotCotizacion}) => ({
    ...state,
    selectedQuotation: {
      ...state.selectedQuotation,
      selectedQuotationDetails: {
        ...state.selectedQuotation.selectedQuotationDetails,
        selectedProduct: {
          ...state.selectedQuotation.selectedQuotationDetails.selectedProduct,
          CotProductoOferta: CotCotizacion,
        },
      },
    },
  })),
  on(checkOutQuotationActions.SET_ITEM_NOTE, (state, {Comentarios}) => ({
    ...state,
    selectedQuotation: {
      ...state.selectedQuotation,
      selectedQuotationDetails: {
        ...state.selectedQuotation.selectedQuotationDetails,
        selectedProduct: {
          ...state.selectedQuotation.selectedQuotationDetails.selectedProduct,
          CotPartidaCotizacion: {
            ...state.selectedQuotation.selectedQuotationDetails.selectedProduct
              .CotPartidaCotizacion,
            Comentarios,
          },
        },
      },
    },
  })),
  on(checkOutQuotationActions.SET_NEW_DATE, (state, {dates}) => ({
    ...state,
    selectedQuotation: {
      ...state.selectedQuotation,
      selectedQuotationDetails: {
        ...state.selectedQuotation.selectedQuotationDetails,
        selectedProduct: {
          ...state.selectedQuotation.selectedQuotationDetails.selectedProduct,
          fechasRealizacionCapacitacion: dates,
        },
      },
    },
  })),
  on(
    checkOutQuotationActions.SET_UNIT_PRICE_SUCCESS,
    (state: QuotationDetailsState, {priceUnit}): QuotationDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        itemQuotationSelected: {
          ...state.resumeSection.itemQuotationSelected,
          PrecioCotizadoUnitarioPactado: priceUnit,
          priceUnit,
        },
      },
    }),
  ),
  on(
    checkOutQuotationActions.GET_CAT_FREIGHT_SUCCESS,
    (state: QuotationDetailsState, {list, statusQuotation}): QuotationDetailsState => {
      // DOCS Encuentra el flete ultima milla que se selecciono
      const selctedFreight: IFlete = find(list, (o: IFlete) => o?.isSelected);

      // DOCS Encuentra el flete express que se selecciono
      const selectedFreightExpress: IFreightExpress = find(
        state.selectedQuotation.freights.listFreightsExpress?.list,
        (o: IFreightExpress) => o?.isSelected,
      );
      // DOCS Costruye el arreglo de partidas ya considerando el recalculo del TEE cuando existe un flete express
      const buildCotPartidaCotizacionTEE = buildCotPartidaCotizacion(
        state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
        selectedFreightExpress,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
      );
      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          selectedQuotationDetails: {
            ...state.selectedQuotation?.selectedQuotationDetails,
            cotCotizacionFletesUltimaMilla:
              selctedFreight && statusQuotation !== CatQuotationState.Enviada
                ? // DOCS Actualiza el precio del flete en caso de existir
                  buildArrayLastMileFreights(
                    buildCotPartidaCotizacionTEE,
                    state.selectedQuotation.selectedQuotationDetails.cotCotizacionFletesUltimaMilla,
                    selctedFreight,
                    state.selectedQuotation.IdCotCotizacion,
                    state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
                    state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
                    state?.selectedQuotation?.clientInfo?.addressSelected?.PagaGuiaEnvio,
                    state?.selectedQuotation?.clientInfo?.addressSelected?.EsMensajeriaInterna,
                  )
                : state?.selectedQuotation?.selectedQuotationDetails
                    ?.cotCotizacionFletesUltimaMilla,
            cotCotizacionFleteExpress:
              selctedFreight && statusQuotation !== CatQuotationState.Enviada
                ? buildArrayExpressFreights(
                    state.selectedQuotation.selectedQuotationDetails.cotCotizacionFleteExpress,
                    state.selectedQuotation.IdCotCotizacion,
                    selectedFreightExpress,
                  )
                : state?.selectedQuotation?.selectedQuotationDetails?.cotCotizacionFleteExpress,
            CotPartidasCotizacion:
              statusQuotation !== CatQuotationState.Enviada
                ? buildCotPartidaCotizacionTEE
                : state?.selectedQuotation?.selectedQuotationDetails?.CotPartidasCotizacion,
          },
          freights: {
            ...state.selectedQuotation?.freights,
            lastMileFreights: {
              ...state.selectedQuotation?.freights.lastMileFreights,
              list: orderBy(list, 'PrecioConvertidoMonedaCotizacion', 'asc'),
              listBackUp: orderBy(list, 'PrecioConvertidoMonedaCotizacion', 'asc'),
              needToReload: false,
            },
          },
          freightSelected: find(list, (o: IFlete) => o.isSelected) ?? null,
        },
      };
    },
  ),
  on(
    checkOutQuotationActions.GET_CAT_FREIGHT_EXPRESS_SUCCESS,
    (state: QuotationDetailsState, {list, statusQuotation}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        selectedQuotationDetails: {
          ...state.selectedQuotation?.selectedQuotationDetails,
          cotCotizacionFleteExpress:
            find(list, (o: IFreightExpress) => o.isSelected) &&
            statusQuotation !== CatQuotationState.Enviada
              ? // DOCS Actualiza el precio del flete en caso de existir
                map(
                  state.selectedQuotation?.selectedQuotationDetails?.cotCotizacionFleteExpress,
                  (it: CotCotizacionFleteExpress): CotCotizacionFleteExpress => {
                    const updateValues: IFreightExpress = find(
                      list,
                      (o: IFreightExpress) => o?.isSelected,
                    );
                    return {
                      ...it,
                      Precio: updateValues?.PrecioConvertidoMonedaCotizacion,
                    };
                  },
                )
              : state?.selectedQuotation?.selectedQuotationDetails?.cotCotizacionFleteExpress,
        },
        freights: {
          ...state.selectedQuotation.freights,
          listFreightsExpress: {
            ...state.selectedQuotation.freights.listFreightsExpress,
            list,
            listBackUp: list,
            needToReload: false,
          },
        },
        freightExpressSelected: find(list, (o: IFreightExpress) => o.isSelected) ?? null,
      },
    }),
  ),
  on(
    checkOutQuotationActions.GET_CAT_FREIGHT_EXPRESS_UPDATE_SUCCESS,
    (state: QuotationDetailsState, {list, statusQuotation}): QuotationDetailsState => {
      // DOCS Encuentra el flete express que se selecciono
      const selectedFreightExpress: IFreightExpress = find(
        list,
        (o: IFreightExpress) => o?.isSelected,
      );
      const selectedFreight: IFlete = find(
        state.selectedQuotation.freights.lastMileFreights?.list,
        (o: IFlete) => o?.isSelected,
      );
      // DOCS Costruye el arreglo de partidas ya considerando el recalculo del TEE cuando existe un flete express
      const buildCotPartidaCotizacionTEE = buildCotPartidaCotizacion(
        state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
        selectedFreightExpress,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
      );
      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          selectedQuotationDetails: {
            ...state.selectedQuotation?.selectedQuotationDetails,
            CotPartidasCotizacion: buildCotPartidaCotizacionTEE,
            cotCotizacionFletesUltimaMilla: buildArrayLastMileFreights(
              buildCotPartidaCotizacionTEE,
              state.selectedQuotation.selectedQuotationDetails.cotCotizacionFletesUltimaMilla,
              selectedFreight,
              state.selectedQuotation.IdCotCotizacion,
              state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
              state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
              state?.selectedQuotation?.clientInfo?.addressSelected?.PagaGuiaEnvio,
              state?.selectedQuotation?.clientInfo?.addressSelected?.EsMensajeriaInterna,
            ),
            cotCotizacionFleteExpress:
              find(list, (o: IFreightExpress) => o.isSelected) &&
              statusQuotation !== CatQuotationState.Enviada
                ? // DOCS Actualiza el precio del flete en caso de existir
                  map(
                    state.selectedQuotation?.selectedQuotationDetails?.cotCotizacionFleteExpress,
                    (it: CotCotizacionFleteExpress): CotCotizacionFleteExpress => {
                      const updateValues: IFreightExpress = find(
                        list,
                        (o: IFreightExpress) => o?.isSelected,
                      );
                      return {
                        ...it,
                        Precio: updateValues?.PrecioConvertidoMonedaCotizacion,
                      };
                    },
                  )
                : state?.selectedQuotation?.selectedQuotationDetails?.cotCotizacionFleteExpress,
          },
          freights: {
            ...state.selectedQuotation.freights,
            listFreightsExpress: {
              ...state.selectedQuotation.freights.listFreightsExpress,
              list,
              listBackUp: list,
              needToReload: false,
            },
          },
          freightExpressSelected: find(list, (o: IFreightExpress) => o.isSelected) ?? null,
        },
      };
    },
  ),
  on(
    checkOutQuotationActions.SET_IS_SELECTED_FREIGHT_EXPRESS,
    (state: QuotationDetailsState, {item}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        freights: {
          ...state.selectedQuotation.freights,
          listFreightsExpress: {
            ...state.selectedQuotation.freights.listFreightsExpress,
            list: map(
              state.selectedQuotation.freights.listFreightsExpress.list,
              (o: IFreightExpress): IFreightExpress => {
                if (o.IdProveedor === item.IdProveedor) {
                  return {...o, isSelected: !o.isSelected};
                }
                return {
                  ...o,
                  isSelected: false,
                };
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    checkOutQuotationActions.SET_OPTION_FREIGHT_CONVENTIONAL,
    (state: QuotationDetailsState, {item}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        freights: {
          ...state.selectedQuotation.freights,
          lastMileFreights: {
            ...state.selectedQuotation.freights.lastMileFreights,
            list: map(
              state.selectedQuotation.freights.lastMileFreights.list,
              (freight): IFlete => {
                if (freight.IdFlete === item.IdFlete) {
                  return {...freight, isSelected: !freight.isSelected};
                }
                return {...freight, isSelected: false};
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    checkOutQuotationActions.SELECTED_ALL_FREIGHT_EXPRESS,
    (state: QuotationDetailsState, {status}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        freights: {
          ...state.selectedQuotation.freights,
          listFreightsExpress: {
            ...state.selectedQuotation.freights.listFreightsExpress,
            list: map(
              state.selectedQuotation.freights.listFreightsExpress.list,
              (provider): IFreightExpress => {
                return {...provider, isSelected: status};
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    checkOutQuotationActions.RESTORE_FREIGHT_DATA,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        freights: {
          ...state.selectedQuotation.freights,
          listFreightsExpress: {
            ...state.selectedQuotation.freights.listFreightsExpress,
            list: state.selectedQuotation.freights.listFreightsExpress.listBackUp,
          },
          lastMileFreights: {
            ...state.selectedQuotation.freights.lastMileFreights,
            list: state.selectedQuotation.freights.lastMileFreights.listBackUp,
          },
        },
      },
    }),
  ),
  on(
    checkOutQuotationActions.SET_FREIGHT_QUOTATION,
    (state: QuotationDetailsState, {comment, isBrokenDown}): QuotationDetailsState => {
      // DOCS Encuentra el flete express que se selecciono
      const selectedFreightExpress: IFreightExpress = find(
        state.selectedQuotation.freights.listFreightsExpress?.list,
        (o: IFreightExpress) => o?.isSelected,
      );

      // DOCS Encuentra el flete ultima milla que se selecciono
      const selectedFreight: IFlete = find(
        state.selectedQuotation.freights.lastMileFreights?.list,
        (o: IFlete) => o?.isSelected,
      );

      // DOCS Costruye el arreglo de partidas ya considerando el recalculo del TEE cuando existe un flete express
      const buildCotPartidaCotizacionTEE = buildCotPartidaCotizacion(
        state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
        selectedFreightExpress,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
      );
      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          FleteDesglosado: isBrokenDown,
          freights: {
            ...state.selectedQuotation.freights,
            lastMileFreights: {
              ...state.selectedQuotation.freights.lastMileFreights,
              listBackUp: state.selectedQuotation.freights.lastMileFreights.list,
            },
            listFreightsExpress: {
              ...state.selectedQuotation.freights.listFreightsExpress,
              listBackUp: state.selectedQuotation.freights.listFreightsExpress.list,
            },
          },
          selectedQuotationDetails: {
            ...state.selectedQuotation.selectedQuotationDetails,
            CotCotizacion: {
              ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
              ComentarioFlete: comment,
              FleteDesglosado: isBrokenDown,
            },
            CotPartidasCotizacion: buildCotPartidaCotizacionTEE,
            cotCotizacionFleteExpress: buildArrayExpressFreights(
              state.selectedQuotation.selectedQuotationDetails.cotCotizacionFleteExpress,
              state.selectedQuotation.IdCotCotizacion,
              selectedFreightExpress,
            ),
            cotCotizacionFletesUltimaMilla: buildArrayLastMileFreights(
              buildCotPartidaCotizacionTEE,
              state.selectedQuotation.selectedQuotationDetails.cotCotizacionFletesUltimaMilla,
              selectedFreight,
              state.selectedQuotation.IdCotCotizacion,
              state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
              state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
              state?.selectedQuotation?.clientInfo?.addressSelected?.PagaGuiaEnvio,
              state?.selectedQuotation?.clientInfo?.addressSelected?.EsMensajeriaInterna,
            ),
          },
          freightSelected: selectedFreight ? selectedFreight : null,
          freightExpressSelected: selectedFreightExpress ? selectedFreightExpress : null,
        },
      };
    },
  ),

  /* DOCS: offline product section*/
  on(
    offlineProductActions.NAVIGATE_OFFLINE_PRODUCT_INIT_EFFECT,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacion: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacion,
            IdCotCotizacion: state.selectedQuotation.IdCotCotizacion,
          },
        },
        brandSelected: state.quotationItemsSearchFilters.selectedBrandFilter,
      },
    }),
  ),
  on(
    offlineProductActions.FETCH_TYPES_FAMILY_WITH_PRINCIPAL_PROVIDER_SUCCESS,
    (
      state: QuotationDetailsState,
      {typesFamiliesOptionsApi, typesFamiliesOptionsDropList},
    ): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        typesFamiliesOptionsApi,
        typesFamiliesOptionsDropList,
      },
    }),
  ),
  on(
    offlineProductActions.SET_TYPE_FAMILY_OPTION,
    (state: QuotationDetailsState, {familyOption}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        typeFamilySelected: familyOption,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacion: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacion,
            IdMarcaFamiliaProveedor: find(
              state.offlineProductSection.typesFamiliesOptionsApi.Results,
              (o: VMarcaFamilia) => o.IdMarcaFamilia === familyOption.value,
            )?.IdMarcaFamiliaProveedor,
          },
        },
      },
    }),
  ),
  on(
    offlineProductActions.SET_QUANTITY,
    (state: QuotationDetailsState, {quantity}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacion: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacion,
            Cantidad: quantity,
          },
        },
      },
    }),
  ),
  on(
    offlineProductActions.SET_UNIT_PRODUCT,
    (state: QuotationDetailsState, {idUnit}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacion: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacion,
            IdCatUnidad: idUnit.value.toString(),
          },
        },
        typeUnitSelected: idUnit,
      },
    }),
  ),
  on(
    offlineProductActions.SET_NAME_PRODUCT,
    (state: QuotationDetailsState, {name}): QuotationDetailsState => ({
      ...state,

      offlineProductSection: {
        ...state.offlineProductSection,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacion: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacion,
            Descripcion: name,
          },
        },
      },
    }),
  ),
  on(
    offlineProductActions.SET_NOTES,
    (state: QuotationDetailsState, {notes}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacionComentario: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacionComentario,
            Comentario: notes,
          },
        },
      },
    }),
  ),
  on(
    offlineProductActions.SET_STATUS_API,
    (state: QuotationDetailsState, {offlineProductStatus}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        offlineProductStatus,
      },
    }),
  ),
  on(
    offlineProductActions.SET_CATALOG,
    (state: QuotationDetailsState, {catalog}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacion: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacion,
            Catalogo: catalog?.trim(),
          },
        },
      },
    }),
  ),
  on(
    offlineProductActions.SET_PIECES,
    (state: QuotationDetailsState, {pieces}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        data: {
          ...state.offlineProductSection.data,
          cotPartidaCotizacionInvestigacion: {
            ...state.offlineProductSection.data.cotPartidaCotizacionInvestigacion,
            Piezas: pieces,
          },
        },
      },
    }),
  ),
  on(
    offlineProductActions.FETCH_PRODUCT_EXISTING_SUCCESS_WITH_RESULTS,
    (state: QuotationDetailsState, {response}): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        productExisting: response,
      },
    }),
  ),
  on(
    offlineProductActions.RESET_PRODUCT_EXISTING,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      offlineProductSection: {
        ...state.offlineProductSection,
        productExisting: {} as ProductSearchResult,
      },
    }),
  ),
  on(
    offlineProductActions.INITIAL_OFFLINE_PRODUCT,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      offlineProductSection: initialProduct(),
    }),
  ),
  on(
    offlineProductActions.SAVE_OFFLINE_PRODUCT_SUCCESS,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationItemsSearchFilters: initialQuotationSearchFilters(),
    }),
  ),
  /* DOCS: totalQuotePdf Section*/
  on(
    totalQuotePdfActions.NAVIGATE_TO_PDF_OF_SELECTED_QUOTATION_INIT_EFFECT,
    (state: QuotationDetailsState, {isLinkedQuote, quotation}): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: {
        ...state.quotationPdfSection,
        isLinkedQuote,
        quotationSelectedPdf: quotation === null ? state.selectedQuotation : quotation,
      },
    }),
  ),
  on(
    totalQuotePdfActions.FETCH_FILE_PDF_SUCCESS,
    (state: QuotationDetailsState, {base64}): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: {
        ...state.quotationPdfSection,
        base64File: base64,
        base64FileStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    totalQuotePdfActions.GENERATE_PDF_FAILED,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: {
        ...state.quotationPdfSection,
        base64FileStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    totalQuotePdfActions.GENERATE_PDF_LOAD,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: {
        ...state.quotationPdfSection,
        base64FileStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    totalQuotePdfActions.FETCH_FILE_PDF_INVESTIGATION_SUCCESS,
    (state: QuotationDetailsState, {base64}): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: {
        ...state.quotationPdfSection,
        base64FileInvestigation: base64,
        base64FileInvestigationStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    totalQuotePdfActions.FETCH_FILE_PDF_INVESTIGATION_FAILED,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: {
        ...state.quotationPdfSection,
        base64FileInvestigationStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    totalQuotePdfActions.FETCH_FILE_PDF_INVESTIGATION_LOAD,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: {
        ...state.quotationPdfSection,
        base64FileInvestigationStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    totalQuotePdfActions.CLEAN_DATA_QUOTE_PDF,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      quotationPdfSection: initialQuotationPdfSection(),
    }),
  ),
  /* DOCS: newCustomer section*/
  on(
    newClientFormActions.INIT_LIST_COMPONENT_EFFECT,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          IdsCotizacion: [state.selectedQuotation.IdCotCotizacion],
        },
      },
    }),
  ),
  on(
    newClientFormActions.SET_INPUT_FORM_ADDRESS_NEW_CLIENT,
    (state: QuotationDetailsState, {input, value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Direccion: {
            ...state.newCustomerSection.gmClientQuotation.Direccion,
            [input]: value,
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.SET_PHONE_NUMBER,
    (
      state: QuotationDetailsState,
      {field, value, phoneType, phoneTypeId},
    ): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          contactForm: {
            ...state.newCustomerSection.gmClientQuotation.contactForm,
            NumerosTelefonicos: !!find(
              state.newCustomerSection.gmClientQuotation.contactForm.NumerosTelefonicos,
              (o: NumeroTelefonico) => o?.IdCatTipoNumeroTelefonico === phoneTypeId,
            )
              ? !value
                ? filter(
                    state.newCustomerSection.gmClientQuotation.contactForm?.NumerosTelefonicos,
                    (o: NumeroTelefonico) => o?.IdCatTipoNumeroTelefonico !== phoneTypeId,
                  )
                : map(
                    state.newCustomerSection.gmClientQuotation.contactForm?.NumerosTelefonicos,
                    (o: NumeroTelefonico, index): NumeroTelefonico => ({
                      ...o,
                      [field]: o?.IdCatTipoNumeroTelefonico === phoneTypeId ? value : o[field],
                    }),
                  )
              : !value
              ? [...state.newCustomerSection.gmClientQuotation.contactForm?.NumerosTelefonicos]
              : [
                  ...state.newCustomerSection.gmClientQuotation.contactForm?.NumerosTelefonicos,
                  {
                    ...initialTelephoneNumber(),
                    [field]: value,
                    IdCatTipoNumeroTelefonico: phoneTypeId,
                  },
                ],
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.VALIDATE_ZIP_CODE_SUCCESS_ADDRESS,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        zipCodeIsValid: value,
      },
    }),
  ),
  on(
    newClientFormActions.SET_DROP_FORM_NEW_ADDRESS_DATA,
    (state: QuotationDetailsState, {input, value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Direccion: {
            ...state.newCustomerSection.gmClientQuotation.Direccion,
            [input]: value?.value,
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.VERIFY_EMAIL,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        existingEmail: value,
      },
    }),
  ),
  on(
    newClientFormActions.SET_ALERT_EXIT,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        alertChanges: value,
      },
    }),
  ),
  on(
    newClientFormActions.FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT,
    (state: QuotationDetailsState, {lat, lng}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Direccion: {
            ...state.newCustomerSection.gmClientQuotation.Direccion,
            Longitud: lng,
            Latitud: lat,
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.CLEAN_DISTANCE_MAPS,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        addressForm: {
          ...state.newCustomerSection.addressForm,
          Longitud: null,
          Latitud: null,
          clienteDireccion: {
            ...state.newCustomerSection.addressForm?.clienteDireccion,
            DistanciaCartaPorte: null,
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.SET_CONTACT_FORM,
    (state: QuotationDetailsState): QuotationDetailsState => {
      const contact: ContactoDetalleObj = state.newCustomerSection.contactForm;
      if (contact.IdContacto === DEFAULT_UUID) {
        return {
          ...state,
          newCustomerSection: {
            ...state.newCustomerSection,
            contacts: [...state.newCustomerSection.contacts, contact],
            contactForm: initialContactForm(),
          },
        };
      } else {
        return {
          ...state,
          newCustomerSection: {
            ...state.newCustomerSection,
            contacts: map(state.newCustomerSection.contacts, (o: ContactoDetalleObj) => {
              if (o?.IdContacto === contact?.IdContacto) {
                return contact;
              }
              return {...o};
            }),
            contactForm: initialContactForm(),
          },
        };
      }
    },
  ),
  on(
    newClientFormActions.UPDATE_LAT_LNG,
    (state: QuotationDetailsState, {lat, lng}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        addressForm: {
          ...state.newCustomerSection.addressForm,
          Latitud: lat,
          Longitud: lng,
        },
      },
    }),
  ),

  on(
    newClientFormActions.SHOW_MAP_NEW_CLIENT,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        showMap: value,
      },
    }),
  ),
  on(
    newClientFormActions.SET_SELECTED_NEW_CONTACT,
    (state: QuotationDetailsState, {contact, index}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          contactIndexEdit: index,
          contactForm: {
            ...contact,
            DatosPersona: {
              ...contact.DatosPersona,
              Departamento: contact?.DatosPersona?.Departamento || 'N/D',
              Titulo: contact?.DatosPersona?.Titulo || 'N/D',
              Puesto: contact?.DatosPersona?.Puesto || 'N/D',
            },
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.FETCH_DISTANCE_SUCCESS,
    (state: QuotationDetailsState, {distanceCartaPorte}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        addressForm: {
          ...state.newCustomerSection.addressForm,
          clienteDireccion: {
            ...state.newCustomerSection.addressForm?.clienteDireccion,
            DistanciaCartaPorte: distanceCartaPorte,
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.SET_PAY_SHIPPING,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        addressForm: {
          ...state.newCustomerSection.addressForm,
          clienteDireccion: {
            ...state.newCustomerSection.addressForm?.clienteDireccion,
            PagaGuiaEnvio: value,
          },
        },
      },
    }),
  ),
  on(newClientFormActions.SET_SELECTED_NEW_CONTACT_EDIT, (state: QuotationDetailsState) => {
    return {
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        contactForm: initialContactForm(),
      },
    };
  }),
  on(
    newClientFormActions.SET_ID_CONTACT,
    (state: QuotationDetailsState, {idPerson, index}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        contacts: map(state.newCustomerSection.contacts, (o, i) => {
          if (i === index) {
            return {...o, IdDatosPersona: idPerson};
          }
          return o;
        }),
      },
    }),
  ),

  on(
    newClientFormActions.SET_ID_MAIL,
    (state: QuotationDetailsState, {index, idEmail}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        contacts: map(state.newCustomerSection.contacts, (o, i) => {
          if (i === index) {
            return {
              ...o,
              CorreoElectronico: {
                ...o.CorreoElectronico,
                IdCorreoElectronico: idEmail,
              },
            };
          }
          return o;
        }),
      },
    }),
  ),
  on(
    newClientFormActions.SET_ID_CONTACT_CLIENT,
    (state: QuotationDetailsState, {idContactClient, index}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        contacts: map(state.newCustomerSection.contacts, (o, i) => {
          if (i === index) {
            return {...o, IdContactoCliente: idContactClient};
          }
          return o;
        }),
      },
    }),
  ),
  on(
    newClientFormActions.UPDATE_CLIENT,
    (state: QuotationDetailsState, {idClient}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        selectedClient: {
          ...state.newCustomerSection.selectedClient,
          IdCliente: idClient,
        },
      },
    }),
  ),
  on(
    newClientFormActions.GENERATE_BACKUP_MEW_CLIENT,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        backup: {
          selectedClient: state.newCustomerSection.selectedClient,
          contacts: state.newCustomerSection.contacts,
        },
      },
    }),
  ),
  on(
    newClientFormActions.SAVE_FORM_CONTACT,
    (state: QuotationDetailsState): QuotationDetailsState => {
      const contact: ContactoDetalleObj = state.newCustomerSection.contactForm;
      if (contact.IdContacto === DEFAULT_UUID) {
        return {
          ...state,
          newCustomerSection: {
            ...state.newCustomerSection,
            contacts: [...state.newCustomerSection.contacts, contact],
            contactForm: initialContactForm(),
          },
        };
      } else {
        return {
          ...state,
          newCustomerSection: {
            ...state.newCustomerSection,
            contacts: map(state.newCustomerSection.contacts, (o: ContactoDetalleObj) => {
              if (o?.IdContacto === contact?.IdContacto) {
                return contact;
              }
              return {...o};
            }),
            contactForm: initialContactForm(),
          },
        };
      }
    },
  ),
  on(newClientFormActions.REMOVE_CONTACT, (state: QuotationDetailsState, {index}) => {
    const contacts = [...state.newCustomerSection.gmClientQuotation.ContactosCliente];
    contacts.splice(index, 1);
    return {
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          ContactosCliente: contacts,
        },
      },
    };
  }),
  on(
    newClientFormActions.CLEAN_DATA_FORM_ADDRESS,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Direccion: initialGMDirection(),
        },
        allowEditForm: false,
      },
    }),
  ),
  on(
    newClientFormActions.CLEAN_GM_CLIENT_QUOTATION_DATA,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: initialGMClientQuotation(),
      },
    }),
  ),
  on(
    newClientFormActions.CLEAN_FORM_DATA_CONTACT,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          contactForm: initialGMContactForm(),
          contactIndexEdit: null,
        },
      },
    }),
  ),
  on(
    newClientFormActions.CLEAN_GENERAL_DATA_STATE,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        selectedClient: initialGMClient(),
        contacts: [],
        backup: {
          selectedClient: {},
          contacts: [],
        },
        addressForm: initialIDireccion(),
        contactForm: initialContactForm(),
      },
    }),
  ),
  on(
    newClientFormActions.SET_DATA_INPUT_FORM_NEW_CLIENT,
    (state: QuotationDetailsState, {input, value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Cliente: {
            ...state.newCustomerSection.gmClientQuotation.Cliente,
            [input]: value,
          },
        },
      },
    }),
  ),

  on(
    newClientFormActions.SET_DATA_CONTACT_NEW_CONTACT,
    (state: QuotationDetailsState, {input, value, property}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          contactForm: {
            ...state.newCustomerSection.gmClientQuotation.contactForm,
            [property]: {
              ...state.newCustomerSection.gmClientQuotation.contactForm[property],
              [input]: value,
            },
          },
        },
      },
    }),
  ),
  on(newClientFormActions.SET_SELECTED_CLIENT_TO_LINK_NEW_CONTACT, (state, {client}) => ({
    ...state,
    newCustomerSection: {
      ...state.newCustomerSection,
      selectedClient: client,
      gmClientQuotation: {
        ...state.newCustomerSection.gmClientQuotation,
        IdCliente: client.IdCliente,
      },
    },
  })),
  on(
    newClientFormActions.SET_DATA_DROP_CONTACT_MEW_CLIENT,
    (state: QuotationDetailsState, {input, option}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        contactForm: {
          ...state.newCustomerSection.contactForm,
          [input]: option.value,
        },
      },
    }),
  ),
  on(
    newClientFormActions.CHECK_PICK_UP,
    (state: QuotationDetailsState, {deliveryAddressSelected}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Direccion: deliveryAddressSelected.value !== '3' ? null : initialGMDirection(),
          DireccionCliente:
            deliveryAddressSelected.value !== '3' ? null : initialGMClientDirection(),
          Cliente: {
            ...state.newCustomerSection.gmClientQuotation.Cliente,
            RecogeEnProquifa: deliveryAddressSelected.value !== '3',
          },
        },
        selectedClient: {
          ...state.newCustomerSection.selectedClient,
          RecogeEnProquifa: deliveryAddressSelected.value !== '3',
        },
        deliveryAddressSelected,
      },
    }),
  ),
  on(
    newClientFormActions.SET_RESET_FORM,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        contactForm: {
          ...state.newCustomerSection.contactForm,
        },
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Direccion: {
            ...state.newCustomerSection.gmClientQuotation.Direccion,
            IdCatPais: '',
            Calle: '',
            NumeroExterior: '',
            NumeroInterior: '',
            CodigoPostal: '',
            Estado: '',
            Ciudad: '',
            Municipio: '',
            Colonia: '',
          },
          DireccionCliente: {
            ...state.newCustomerSection.gmClientQuotation.DireccionCliente,
            DistanciaCartaPorte: null,
          },
        },
        allowEditForm: false,
      },
    }),
  ),
  on(
    newClientFormActions.SET_DROP_NEW_FORM_DATA_ROL,
    (state: QuotationDetailsState, {idInput, stringInput, value}): QuotationDetailsState => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        selectedClient: {
          ...state.newCustomerSection.selectedClient,
          [stringInput]: value?.value,
          [idInput]: value?.label,
        },
      },
    }),
  ),

  on(
    newClientFormActions.SET_DATA_CONTACT_FORM_EMAIL,
    (state: QuotationDetailsState, {input, value}): QuotationDetailsState => {
      if (input === 'Mail') {
        return {
          ...state,
          newCustomerSection: {
            ...state.newCustomerSection,
            contactForm: {
              ...state.newCustomerSection.contactForm,
              Mail: value,
              CorreoElectronico: map(
                state.newCustomerSection.contactForm?.CorreoElectronico,
                (o) => {
                  return {
                    ...o,
                    Correo: value,
                  };
                },
              ),
            },
          },
        };
      } else {
        return {
          ...state,
          newCustomerSection: {
            ...state.newCustomerSection,
            contactForm: {
              ...state.newCustomerSection.contactForm,
              [input]: value,
            },
          },
        };
      }
    },
  ),
  on(
    quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION_SUCCESS,
    (state: QuotationDetailsState, {itemQuotation}): QuotationDetailsState => {
      // DOCS Encuentra el flete ultima milla que se selecciono
      const setProductToQuotation = [
        ...state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
        itemQuotation,
      ];
      // DOCS Encuentra el flete express que se selecciono
      const selectedFreightExpress: IFreightExpress = find(
        state.selectedQuotation.freights.listFreightsExpress?.list,
        (o: IFreightExpress) => o?.isSelected,
      );

      // DOCS Encuentra el flete ultima milla que se selecciono
      const selectedFreight: IFlete = find(
        state.selectedQuotation.freights.lastMileFreights?.list,
        (o: IFlete) => o?.isSelected,
      );
      // DOCS Costruye el arreglo de partidas ya considerando el recalculo del TEE cuando existe un flete express
      const buildCotPartidaCotizacionTEE = buildCotPartidaCotizacion(
        setProductToQuotation,
        selectedFreightExpress,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
      );
      // DOCS Construye el arreglo de fletes ultima milla
      const buildArrayLastMileFreightsData = buildArrayLastMileFreights(
        buildCotPartidaCotizacionTEE,
        state.selectedQuotation.selectedQuotationDetails.cotCotizacionFletesUltimaMilla,
        selectedFreight,
        state.selectedQuotation.IdCotCotizacion,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
        state?.selectedQuotation?.clientInfo?.addressSelected?.PagaGuiaEnvio,
        state?.selectedQuotation?.clientInfo?.addressSelected?.EsMensajeriaInterna,
      );
      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          selectedQuotationDetails: {
            ...state.selectedQuotation.selectedQuotationDetails,
            CotPartidasCotizacion: buildCotPartidaCotizacionTEE,
            cotCotizacionFletesUltimaMilla: buildArrayLastMileFreightsData,
          },
          freights: {
            ...state.selectedQuotation.freights,
            listFreightsExpress: {
              ...state.selectedQuotation.freights.listFreightsExpress,
              needToReload: true,
            },
          },
        },
      };
    },
  ),
  on(
    quotationDetailsActions.ADD_ITEM_SAVING_TO_SELECTED_QUOTATION_SUCCESS,
    (state: QuotationDetailsState, {itemsQuotation, productIndex}): QuotationDetailsState => {
      const addQuotationCollection = [
        ...state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
      ];
      addQuotationCollection.splice(++productIndex, 0, ...itemsQuotation);
      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          selectedQuotationDetails: {
            ...state.selectedQuotation.selectedQuotationDetails,
            CotPartidasCotizacion: addQuotationCollection,
          },
        },
      };
    },
  ),
  on(
    quotationDetailsActions.SET_TYPE_QUOTATION,
    (state: QuotationDetailsState, {option}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        IdCatTipoCotizacion: option.value,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotCotizacion: {
            ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
            IdCatTipoCotizacion: option.value,
          },
        },
      },
    }),
  ),
  // DOCS: Selecciona el tipo de entrega de la cotizacion cuando acepta parciales
  on(
    quotationDetailsActions.SET_TYPE_DELIVERY_QUOTATION,
    (state: QuotationDetailsState, {option}): QuotationDetailsState => {
      const selectedFreight: IFlete = find(
        state.selectedQuotation.freights.lastMileFreights?.list,
        (o: IFlete) => o?.isSelected,
      );
      // DOCS Encuentra el flete express que se selecciono
      const selectedFreightExpress: IFreightExpress = find(
        state.selectedQuotation.freights.listFreightsExpress?.list,
        (o: IFreightExpress) => o?.isSelected,
      );
      // DOCS Costruye el arreglo de partidas ya considerando el recalculo del TEE cuando existe un flete express
      const buildCotPartidaCotizacionTEE = buildCotPartidaCotizacion(
        state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
        selectedFreightExpress,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        option.value === TypeDelivery.unique,
      );
      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          selectedQuotationDetails: {
            ...state.selectedQuotation.selectedQuotationDetails,
            CotCotizacion: {
              ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
              EntregaUnica: option.value === TypeDelivery.unique,
            },
            CotPartidasCotizacion: buildCotPartidaCotizacionTEE,
            cotCotizacionFletesUltimaMilla: buildArrayLastMileFreights(
              buildCotPartidaCotizacionTEE,
              state.selectedQuotation.selectedQuotationDetails.cotCotizacionFletesUltimaMilla,
              selectedFreight,
              state.selectedQuotation.IdCotCotizacion,
              state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
              option.value === TypeDelivery.unique,
              state?.selectedQuotation?.clientInfo?.addressSelected?.PagaGuiaEnvio,
              state?.selectedQuotation?.clientInfo?.addressSelected?.EsMensajeriaInterna,
            ),
          },
        },
      };
    },
  ),
  on(
    quotationDetailsActions.SET_FREIGHT_APPORTION,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        FleteDesglosado: value,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotCotizacion: {
            ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
            FleteDesglosado: value,
          },
        },
      },
    }),
  ),
  on(quotationDetailsActions.SHOW_LINK_NEW_CONTACT_POP_UP, (state, {open}) => ({
    ...state,
    isLinkNewClientPopUpOpen: open,
  })),
  on(quotationDetailsActions.CLEAN_LINK_ADD_NEW_CONTACT_POP_UP, (state) => ({
    ...state,
    newCustomerSection: {
      ...state.newCustomerSection,
      gmClientQuotation: {
        ...state.newCustomerSection.gmClientQuotation,
        contactForm: initialGMContactForm(),
        contactIndexEdit: null,
      },
    },
  })),
  on(quotationDetailsActions.SHOW_LINK_ADD_NEW_CONTACT_POP_UP_SUCCESS, (state, {open}) => ({
    ...state,
    isLinkAddNewClientPopUpSuccess: open,
  })),
  on(quotationDetailsActions.CLEAN_LINK_NEW_CONTACT_CLIENT_LIST, (state) => ({
    ...state,
    clientsList: {
      Results: [],
      TotalResults: 0,
    },
    clientListStatus: API_REQUEST_STATUS_DEFAULT,
  })),
  on(
    quotationDetailsActions.ACTIVE_INPUT_CONTROLLED_IN_ITEM_QUOTATION,
    (state: QuotationDetailsState, {idItemQuotation, productIndex}) => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotPartidasCotizacion: map(
            state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
            (item: QuotationItemCombined, index) => ({
              ...item,
              activeInputControlled:
                item.CotPartidaCotizacion.IdCotPartidaCotizacion !== DEFAULT_UUID &&
                index === productIndex
                  ? !item.activeInputControlled
                  : index === productIndex && !item.activeInputControlled,
            }),
          ),
        },
      },
    }),
  ),
  on(
    quotationDetailsActions.SAVE_QUOTATION_SUCCESS,
    (state: QuotationDetailsState, {quotation}) => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        needsToReloadInfo: true,
        selectedQuotationDetails: quotation,
      },
    }),
  ),
  on(
    quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_SUCCESS,
    (state: QuotationDetailsState, {quotationsUpdate}) => {
      const quotationSelected = find(
        quotationsUpdate,
        (o: VCotCotizacion) => o.IdCotCotizacion === state.selectedQuotation.IdCotCotizacion,
      );

      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          ...quotationSelected,
        },
        quotationsList:
          quotationsUpdate?.length === state.quotationsList?.length
            ? map(state.quotationsList, (o: IQuotation) => {
                if (o.isSelected) {
                  return {...o, ...quotationSelected};
                } else {
                  return {...o};
                }
              })
            : buildQuotationsListFromResponse(
                quotationsUpdate,
                state.selectedQuotation.IdCotCotizacion,
              ),
        quotationItemsSearchFilters: initialQuotationSearchFilters(),
        productsSearchResults: [],
      };
    },
  ),
  on(quotationDetailsActions.RESTORE_INITIAL_STATE, (state: QuotationDetailsState) => ({
    ...initialQuotationDetails(),
  })),
  on(newClientFormActions.SET_GM_CONTACT_CLIENT_QUOTATION, (state, {isLinkContact}) => {
    const clientContacts = [...state.newCustomerSection.gmClientQuotation.ContactosCliente];
    const {contactForm} = state.newCustomerSection.gmClientQuotation;
    const contact = {
      ...contactForm,
      DatosPersona: {
        ...contactForm.DatosPersona,
        Puesto: replaceND(contactForm.DatosPersona?.Puesto),
        Titulo: replaceND(contactForm.DatosPersona?.Titulo),
        Departamento: replaceND(contactForm.DatosPersona?.Departamento),
      },
    };
    if (isLinkContact) {
      clientContacts[0] = contact;
    } else {
      const {contactIndexEdit} = state.newCustomerSection.gmClientQuotation;
      if (contactIndexEdit !== null) {
        clientContacts[contactIndexEdit] = contact;
      } else {
        clientContacts.push(contact);
      }
    }
    return {
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          ContactosCliente: clientContacts,
        },
      },
    };
  }),
  on(newClientFormActions.GET_CONTACTS_BY_QUOTATION_SUCCESS, (state, {contacts}) => ({
    ...state,
    newCustomerSection: {
      ...state.newCustomerSection,
      gmClientQuotation: {
        ...state.newCustomerSection.gmClientQuotation,
        contactForm: {
          ...state.newCustomerSection.gmClientQuotation.contactForm,
          ...contacts[0],
        },
      },
    },
  })),
  on(newClientFormActions.LINK_NEW_CONTACT_TO_CLIENT, (state) => ({
    ...state,
    newCustomerSection: {
      ...state.newCustomerSection,
      gmClientQuotation: {
        ...state.newCustomerSection.gmClientQuotation,
        // DOCS: ESTOS DATOS SE DEBEN DE MANDAR EN NULL,
        Cliente: null,
        Direccion: null,
        DireccionCliente: null,
      },
    },
  })),
  on(newClientFormActions.LINK_NEW_CONTACT_TO_CLIENT_SUCCESS, (state: QuotationDetailsState) => ({
    ...state,
    isLinkAddNewClientPopUpOpen: false,
    newCustomerSection: {
      ...state.newCustomerSection,
      gmClientQuotation: {
        ...state.newCustomerSection.gmClientQuotation,
        contactForm: initialGMContactForm(),
        contactIndexEdit: null,
      },
    },
  })),
  on(
    newClientFormActions.SET_ID_ENTRY_LEVEL,
    (state: QuotationDetailsState, {listCatNivelIngreso}) => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Cliente: {
            ...state.newCustomerSection.gmClientQuotation.Cliente,
            IdCatNivelIngreso: find(listCatNivelIngreso, {NivelIngreso: 'BAJO'})?.IdCatNivelIngreso,
          },
        },
      },
    }),
  ),
  on(
    newClientFormActions.SET_ID_CAT_ADDRESS_TYPE,
    (state: QuotationDetailsState, {lisCatAddressType}) => ({
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        gmClientQuotation: {
          ...state.newCustomerSection.gmClientQuotation,
          Direccion: {
            ...state.newCustomerSection.gmClientQuotation.Direccion,
            IdCatTipoDireccion: find(lisCatAddressType, {Descripcion: 'Entrega'})
              ?.IdCatTipoDireccion,
          },
        },
      },
    }),
  ),
  on(newClientFormActions.SAVE_NEW_CLIENT_SUCCESS, (state: QuotationDetailsState) => ({
    ...state,
    newCustomerSection: {
      ...state.newCustomerSection,
      gmClientQuotation: initialGMClientQuotation(),
    },
  })),
  on(listQuotesActions.SET_MEDIA_OUTLET_TO_PRODUCT, (state, {CatMedioDeDifusion}) => {
    const productSelected = state.selectedProduct;
    return {
      ...state,
      productsSearchResults: map(state.productsSearchResults, (p: ProductSearchResult) => {
        if (p.IdProducto === productSelected.IdProducto) {
          return {
            ...p,
            vProductDetails: {
              ...p.vProductDetails,
              MedioDifusion: find(
                CatMedioDeDifusion,
                (m: CatMedioDifusion) =>
                  m.IdCatMedioDifusion ===
                  p.vProductDetails?.ProductoCapacitacion?.IdCatMedioDifusion,
              )?.MedioDifusion,
            },
          };
        } else {
          return {
            ...p,
          };
        }
      }),
    };
  }),
  // DOCS Borra una partida de la cotizacion y recalcula
  on(quotationDetailsActions.DELETE_ITEM_QUOTATION, (state, {index}) => {
    // DOCS Arma el nuevo arreglo de partidas quitando la partida por eliminar
    const filterItemsQuotations: Array<IGMCotPartidasDetalle> = filter(
      state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
      (q: IGMCotPartidasDetalle, i: number) => q && i !== index,
    );
    // DOCS Obtiene el objeto del flete express seleccionado
    const selectedFreightExpress: IFreightExpress = find(
      state.selectedQuotation.freights.listFreightsExpress?.list,
      (o: IFreightExpress) => o?.isSelected,
    );
    // DOCS Arma el recalculo de los TEE en las partidas de la cotización
    const itemsRecalculateTEE = buildCotPartidaCotizacion(
      filterItemsQuotations,
      selectedFreightExpress,
      state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
      state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
    );
    const hasItemsWithSamePrincipalProvider: Array<IGMCotPartidasDetalle> = filterItemsQuotations
      ? filter(
          filterItemsQuotations,
          (o: IGMCotPartidasDetalle) =>
            o?.CotProductoOferta?.IdProveedor ===
            first(state.selectedQuotation.selectedQuotationDetails?.cotCotizacionFleteExpress)
              ?.IdProveedor,
        )
      : [];
    // DOCS Encuentra el flete ultima milla que se selecciono
    const selectedFreight: IFlete = find(
      state.selectedQuotation.freights.lastMileFreights.list,
      (o: IFlete) => o?.isSelected,
    );

    return {
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotPartidasCotizacion: itemsRecalculateTEE,
          CotCotizacion: {
            ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
            /* TODO: Revisar si esta acción impacta hacia adelante en el flujo*/
            /*FleteDesglosado: filterItemsQuotations?.length
              ? state.selectedQuotation.selectedQuotationDetails.CotCotizacion.FleteDesglosado
              : false,*/
            ComentarioFlete: filterItemsQuotations?.length
              ? state.selectedQuotation.selectedQuotationDetails?.CotCotizacion?.ComentarioFlete
              : null,
          },
          cotCotizacionFleteExpress: hasItemsWithSamePrincipalProvider?.length
            ? state.selectedQuotation.selectedQuotationDetails?.cotCotizacionFleteExpress
            : [],
          cotCotizacionFletesUltimaMilla: buildArrayLastMileFreights(
            itemsRecalculateTEE,
            state.selectedQuotation.selectedQuotationDetails.cotCotizacionFletesUltimaMilla,
            selectedFreight,
            state.selectedQuotation.IdCotCotizacion,
            state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
            state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
            state?.selectedQuotation?.clientInfo?.addressSelected?.PagaGuiaEnvio,
            state?.selectedQuotation?.clientInfo?.addressSelected?.EsMensajeriaInterna,
          ),
        },
        freightSelected: filterItemsQuotations.length
          ? state.selectedQuotation.freightSelected
          : null,
        freightExpressSelected: hasItemsWithSamePrincipalProvider?.length
          ? state.selectedQuotation.freightExpressSelected
          : null,
        freights: {
          ...state.selectedQuotation.freights,
          listFreightsExpress: {
            ...state.selectedQuotation.freights.listFreightsExpress,
            list: hasItemsWithSamePrincipalProvider?.length
              ? state.selectedQuotation.freights.listFreightsExpress.list
              : [],
            listBackUp: hasItemsWithSamePrincipalProvider?.length
              ? state.selectedQuotation.freights.listFreightsExpress.listBackUp
              : [],
            needToReload: hasItemsWithSamePrincipalProvider.length
              ? state.selectedQuotation.freights.listFreightsExpress.needToReload
              : true,
          },
          lastMileFreights: {
            ...state.selectedQuotation.freights.lastMileFreights,
            list: filterItemsQuotations.length
              ? state.selectedQuotation.freights.lastMileFreights.list
              : [],
            listBackUp: filterItemsQuotations.length
              ? state.selectedQuotation.freights.lastMileFreights.list
              : [],
            needToReload: filterItemsQuotations.length
              ? state.selectedQuotation.freights.lastMileFreights.needToReload
              : true,
          },
        },
      },
    };
  }),
  on(
    quotationDetailsActions.SET_DELIVERY_ADDRESS,
    (state: QuotationDetailsState, {deliveryAddress, typesQuotations}): QuotationDetailsState => {
      // DOCS Encuentra la direccion nueva entre las direcciones de entrega del cliente
      const selectedDeliveryAddress: VDireccion =
        find(
          state.selectedQuotation.clientInfo.address,
          (o: VDireccion) => o.IdDireccion === deliveryAddress.value,
        ) || null;

      // DOCS Si el cliente paga guia o es mensajeria interna del catalogo de fletes ultima milla se quita el seleccionado
      const freightLastMileCatalog =
        selectedDeliveryAddress.PagaGuiaEnvio || selectedDeliveryAddress.EsMensajeriaInterna
          ? map(
              state.selectedQuotation.freights.lastMileFreights.list,
              (o: IFlete): IFlete => ({...o, isSelected: false}),
            )
          : state.selectedQuotation.freights.lastMileFreights.list;

      // DOCS Selecciona el flete ultima milla que coincida con la ruta entrega en caso de que tenga un flete ultima milla seleccionado.
      let isFirstFreightSelected = true; // DOCS Bandera para solo seleccionar el primer flete ultima milla al cambiar de ruta
      const freightLastMile = find(freightLastMileCatalog, (o: IFlete) => o?.isSelected)
        ? map(
            state.selectedQuotation.freights.lastMileFreights.list,
            (o: IFlete): IFlete => {
              if (
                o.IdCatRutaEntrega === selectedDeliveryAddress.IdCatRutaEntrega &&
                isFirstFreightSelected
              ) {
                isFirstFreightSelected = false;
                return {...o, isSelected: true};
              }
              return {...o, isSelected: false};
            },
          )
        : freightLastMileCatalog;

      // DOCS Encuentra el flete ultima milla que se selecciono
      const selectedFreight: IFlete = find(freightLastMile, (o: IFlete) => o?.isSelected);
      // DOCS Encuentra el flete express que se selecciono
      const selectedFreightExpress: IFreightExpress = find(
        state.selectedQuotation.freights.listFreightsExpress?.list,
        (o: IFreightExpress) => o?.isSelected,
      );
      // DOCS Arma la cantidad de fletes ultima milla de aucerdo a los datos de la nueva direccion de entrega seleccionada
      const buildSelectedFreightsLastMille = buildArrayLastMileFreights(
        state?.selectedQuotation?.selectedQuotationDetails?.CotPartidasCotizacion,
        state.selectedQuotation.selectedQuotationDetails.cotCotizacionFletesUltimaMilla,
        selectedFreight,
        state.selectedQuotation.IdCotCotizacion,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
        selectedDeliveryAddress.PagaGuiaEnvio,
        selectedDeliveryAddress.EsMensajeriaInterna,
      );

      const itemsQuotation = map(
        state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
        (o: IGMCotPartidasDetalle): IGMCotPartidasDetalle => ({
          ...o,
          IdCatRutaEntrega: selectedDeliveryAddress.IdCatRutaEntrega,
        }),
      );

      // DOCS Recalculo los TEE de las partidas de la cotización
      const itemsRecalculateTEE = buildCotPartidaCotizacion(
        itemsQuotation,
        selectedFreightExpress,
        state?.selectedQuotation?.clientInfo?.addressSelected?.AceptaParciales,
        state?.selectedQuotation?.selectedQuotationDetails?.CotCotizacion?.EntregaUnica,
      );
      const typeQuotationTotal: CatTipoCotizacion = find(
        typesQuotations,
        (o: CatTipoCotizacion) => o.Clave === ENUM_TYPE_QUOTATION.TOTAL,
      );

      return {
        ...state,
        activeErrorAddress: false,
        selectedQuotation: {
          ...state.selectedQuotation,
          IdDireccion: selectedDeliveryAddress.IdDireccion,
          clientInfo: {
            ...state.selectedQuotation.clientInfo,
            addressSelected: selectedDeliveryAddress,
          },
          freightSelected:
            selectedDeliveryAddress.PagaGuiaEnvio || selectedDeliveryAddress.EsMensajeriaInterna
              ? null
              : state.selectedQuotation.freightSelected,
          freights: {
            ...state.selectedQuotation.freights,
            lastMileFreights: {
              ...state.selectedQuotation.freights.lastMileFreights,
              list: freightLastMile,
              listBackUp: freightLastMile,
            },
            listFreightsExpress: {
              ...state.selectedQuotation.freights.listFreightsExpress,
              needToReload: true,
            },
          },
          selectedQuotationDetails: {
            ...state.selectedQuotation.selectedQuotationDetails,
            CotCotizacion: {
              ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
              IdDireccion: selectedDeliveryAddress.IdDireccion,
              IdCatZona: selectedDeliveryAddress.IdCatZona,
              IdCatTipoCotizacion: !selectedDeliveryAddress.EsMensajeriaInterna
                ? typeQuotationTotal.IdCatTipoCotizacion
                : state.selectedQuotation.selectedQuotationDetails.CotCotizacion
                    .IdCatTipoCotizacion,
              /* TODO: Revisar si se requiere esta validación o no en los flujos siguientes*/
              /*FleteDesglosado:
                (state.selectedQuotation.selectedQuotationDetails.cotCotizacionFleteExpress
                  .length ||
                  buildSelectedFreightsLastMille.length) &&
                (!selectedDeliveryAddress.EsMensajeriaInterna ||
                  !selectedDeliveryAddress.PagaGuiaEnvio)
                  ? state.selectedQuotation.selectedQuotationDetails.CotCotizacion.FleteDesglosado
                  : false,*/
              EntregaUnica:
                buildSelectedFreightsLastMille.length > 1 && selectedDeliveryAddress.AceptaParciales
                  ? state.selectedQuotation.selectedQuotationDetails.CotCotizacion.EntregaUnica
                  : null,
            },
            CotPartidasCotizacion: itemsRecalculateTEE,
            cotCotizacionFletesUltimaMilla: buildSelectedFreightsLastMille,
          },
        },
      };
    },
  ),
  on(
    quotationDetailsActions.SET_ID_CONTACT,
    (state: QuotationDetailsState, {idContact}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        IdContactoCliente: idContact,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotCotizacion: {
            ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
            IdContactoCliente: idContact,
          },
        },
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_ADD_PRODUCT_FOUND_BY_PROVIDER_LOAD,
    (state: QuotationDetailsState, {item}): QuotationDetailsState => ({
      ...state,
      investigationProductPopUp: {
        ...state.investigationProductPopUp,
        ...item,
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_PRODUCT_TO_INVESTIGATION_SELECTED,
    (state: QuotationDetailsState, {product}): QuotationDetailsState => ({
      ...state,
      investigationProductPopUp: {
        ...state.investigationProductPopUp,
        producto: product,
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_INVESTIGATION_PRODUCT_ACTIVE_POP_UP,
    (state: QuotationDetailsState, {isOpen}): QuotationDetailsState => ({
      ...state,
      investigationProductPopUpIsOpen: isOpen,
    }),
  ),
  on(
    quotationDetailsActions.FETCH_FILE_EVIDENCE_SUCCESS,
    (state: QuotationDetailsState, {file}): QuotationDetailsState => ({
      ...state,
      investigationProductPopUp: {
        ...state.investigationProductPopUp,
        evidenceFile: file,
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_OPEN_DETAILS_PRODUCT_INVESTIGATION,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      isOpenDetailsProductInvestigation: value,
    }),
  ),
  on(
    quotationDetailsActions.SET_ATTEND_INVESTIGATION_SUCCESS,
    (state: QuotationDetailsState, {attendedInvestigationData}): QuotationDetailsState => ({
      ...state,
      attendedInvestigationData,
    }),
  ),
  on(
    quotationDetailsActions.SET_EVI_COMMENT,
    (state: QuotationDetailsState, {comment}): QuotationDetailsState => ({
      ...state,
      reattendedInvestigation: {
        ...state.reattendedInvestigation,
        Comentario: comment,
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_REATTEND_INVESTIGATION_SUCCESS,
    (
      state: QuotationDetailsState,
      {IdCotPartidaCotizacionInvestigacion},
    ): QuotationDetailsState => ({
      ...state,
      reattendedInvestigation: initialStateQuotationDetails.reattendedInvestigation,
      selectedQuotation: {
        ...state.selectedQuotation,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotPartidasInvetigacionCotizacion: map(
            state.selectedQuotation.selectedQuotationDetails.CotPartidasInvetigacionCotizacion,
            (o: ICotPartidasInvetigacionCotizacion): ICotPartidasInvetigacionCotizacion => {
              if (
                o.ProductoInvestigacionObj.IdCotPartidaCotizacionInvestigacion ===
                IdCotPartidaCotizacionInvestigacion
              ) {
                return {
                  ...o,
                  ProductoInvestigacionObj: {
                    ...o.ProductoInvestigacionObj,
                    EstadoInvestigacion: 'Por reatender',
                    ClaveEstadoInvestigacion: 'porreatender',
                  },
                };
              }
              return {
                ...o,
              };
            },
          ),
        },
      },
    }),
  ),
  on(
    quotationDetailsActions.SET_OPEN_DETAILS_PRODUCT_INVESTIGATION,
    (state: QuotationDetailsState): QuotationDetailsState => ({
      ...state,
      reattendedInvestigation: initialStateQuotationDetails.reattendedInvestigation,
    }),
  ),
  on(
    quotationDetailsActions.SET_ACTIVE_ERROR_ADDRESS,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      activeErrorAddress: value,
    }),
  ),
  on(newClientFormActions.SET_ALLOW_EDIT_FORM, (state, {allowed}) => {
    return {
      ...state,
      newCustomerSection: {
        ...state.newCustomerSection,
        allowEditForm: allowed,
      },
    };
  }),
  on(
    quotationDetailsActions.UPDATE_TRAININGS_DATES,
    (state, {dates, index}): QuotationDetailsState => {
      return {
        ...state,
        selectedQuotation: {
          ...state.selectedQuotation,
          selectedQuotationDetails: {
            ...state.selectedQuotation.selectedQuotationDetails,
            CotPartidasCotizacion: map(
              state.selectedQuotation.selectedQuotationDetails.CotPartidasCotizacion,
              (o: IGMCotPartidasDetalle, i: number): IGMCotPartidasDetalle => {
                if (i === index) {
                  return {
                    ...o,
                    fechasRealizacionCapacitacion: dates,
                  };
                }
                return {
                  ...o,
                };
              },
            ),
          },
        },
      };
    },
  ),
  on(
    quotationDetailsActions.CHANGE_CURRENCY_QUOTATION_SUCCESS,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        IdCatMoneda: value.CotCotizacion.IdCatMoneda,
        selectedQuotationDetails: value,
        freights: {
          ...state.selectedQuotation.freights,
          lastMileFreights: {
            ...state.selectedQuotation.freights.lastMileFreights,
            needToReload: true,
            list: [],
            listBackUp: [],
          },
          listFreightsExpress: {
            ...state.selectedQuotation.freights.listFreightsExpress,
            needToReload: true,
            list: [],
            listBackUp: [],
          },
        },
      },
      quotationItemsSearchFilters: initialQuotationSearchFilters(),
      productsSearchResults: [],
      productsSearchResultsStatus: API_REQUEST_STATUS_DEFAULT,
    }),
  ),
  on(
    quotationDetailsActions.SET_ADD_ITEMS_INVESTIGATION_NEEDS_TO_RELOAD,
    (state: QuotationDetailsState, {value}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        needsToReloadItemsInvestigationQuotation: value,
        selectedQuotationDetails: {
          ...state.selectedQuotation.selectedQuotationDetails,
          CotCotizacion: {
            ...state.selectedQuotation.selectedQuotationDetails.CotCotizacion,
            SeGuardanPartidasInvestigacion: true,
          },
        },
      },
    }),
  ),
  on(
    quotationDetailsActions.GET_CONFIGURATION_INVESTIGATION_SUCCESS,
    (state: QuotationDetailsState, {productDataInvestigation}): QuotationDetailsState => ({
      ...state,
      selectedQuotation: {
        ...state.selectedQuotation,
        productDataInvestigation,
      },
    }),
  ),
);
