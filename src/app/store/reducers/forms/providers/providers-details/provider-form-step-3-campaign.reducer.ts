import {createReducer, on} from '@ngrx/store';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';

import {
  Campaign,
  initialCampaign,
  initialCampaignDetails,
  initialCampaignList,
  IVCampana,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-3-campaign.model';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {campaingsProviderActions, providersDetailsActions} from '@appActions/forms/providers';
import {filter, find, isEmpty, map} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {getArrayForDropDownList} from '@appUtil/util';

const initialStateCampaign: Campaign = {
  ...initialCampaign(),
};

export const campaignReducer = createReducer(
  initialStateCampaign,
  on(providersDetailsActions.SET_INITIAL_DATA_ADD_EDIT_PROVIDER, (state, action) =>
    initialCampaign(),
  ),
  on(campaingsProviderActions.CLEAN_CAMPAIGNS_STATE, (state) => ({
    ...initialCampaign(),
  })),
  // DOCS: REDUCER DE LISTADO
  on(campaingsProviderActions.GET_CAPAIGNS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    campaignList: {
      ...state.campaignList,
      queryInfo: {
        ...state.campaignList.queryInfo,
        desiredPage: isFirstPage ? 1 : state.campaignList.queryInfo.desiredPage + 1,
        apiStatus: isFirstPage ? API_REQUEST_STATUS_DEFAULT : API_REQUEST_STATUS_LOADING,
      },
      apiStatusCampaigns: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(
    campaingsProviderActions.GET_CAPAIGNS_SUCCESS,
    (state: Campaign, {campaigns}): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        campaigns: {
          ...state.campaignList.campaigns,
          Results:
            state.campaignList.queryInfo.desiredPage === 1
              ? [...campaigns.Results]
              : [...state.campaignList.campaigns.Results, ...campaigns.Results],
          TotalResults: campaigns.TotalResults,
        },
        queryInfo: {
          ...state.campaignList.queryInfo,
          apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        },
        apiStatusCampaigns: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    campaingsProviderActions.SET_SELECTED_CAMPAIGN,
    (state: Campaign, {campaignId}): Campaign => {
      return {
        ...state,
        campaignList: {
          ...state.campaignList,
          campaigns: {
            ...state.campaignList.campaigns,
            // DOCS: Recorrer los elementos
            Results: map(
              state.campaignList.campaigns.Results,
              (o: IVCampana): IVCampana => {
                if (o.IdCampana === campaignId) {
                  return {
                    ...o,
                    isSelected: true,
                  };
                }
                return {
                  ...o,
                  isSelected: false,
                };
              },
            ),
          },
          selectedCampaign: find(
            state.campaignList.campaigns.Results,
            (o: IVCampana) => o.IdCampana === campaignId,
          ),
          apiStatusCampaigns: API_REQUEST_STATUS_SUCCEEDED,
        },
      };
    },
  ),
  on(
    campaingsProviderActions.SET_API_STATUS_ITEMS_RELATED,
    (state: Campaign, {status}): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        selectedCampaign: {
          ...state.campaignList.selectedCampaign,
          apiStatusItemsRelated: status,
        },
      },
    }),
  ),
  on(
    campaingsProviderActions.GET_CAMPAIGNS_DETAILS_SUCCESS,
    (state: Campaign, {items, IdCampaign}): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        campaigns: {
          ...state.campaignList.campaigns,
          Results: map(
            state.campaignList.campaigns.Results,
            (o: IVCampana): IVCampana => {
              if (o.IdCampana === IdCampaign) {
                return {
                  ...o,
                  itemCampaign: items,
                };
              }
              return o;
            },
          ),
        },
        selectedCampaign: {
          ...state.campaignList.selectedCampaign,
          itemCampaign: items,
          needsToReload: false,
        },
      },
    }),
  ),
  on(
    campaingsProviderActions.GET_CAMPAIGNS_ITEMS_SUCCESS,
    (state: Campaign, {items, IdCampaign}): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        campaigns: {
          ...state.campaignList.campaigns,
          Results: map(
            state.campaignList.campaigns.Results,
            (o: IVCampana): IVCampana => {
              if (o.IdCampana === IdCampaign) {
                return {
                  ...o,
                  itemsRelated: items,
                  needsToReload: false,
                };
              }
              return o;
            },
          ),
        },
        selectedCampaign: {
          ...state.campaignList.selectedCampaign,
          itemsRelated: items,
        },
      },
    }),
  ),
  on(
    campaingsProviderActions.GET_CAPAIGNS_FAILED,
    (state: Campaign): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        apiStatusCampaigns: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(campaingsProviderActions.SET_ADD_CAMPAING, (state, action) => ({
    ...state,
    campaignList: !action.addCampaing ? initialCampaignList() : state.campaignList,
    campaignDetails: {
      ...state.campaignDetails,
      campaign: initialCampaignDetails().campaign,
      campaignFilterSelected: null,
      editCampaign: initialCampaignDetails().editCampaign,
      needsToReloadFamiliesProvider: true,
      currentPageProducts: initialCampaignDetails().currentPageProducts,
      needsToReloadTrademark: true,
      currentPageClassifications: initialCampaignDetails().currentPageClassifications,
      searchTermTrademark: initialCampaignDetails().searchTermTrademark,
      familiesProvider: initialCampaignDetails().familiesProvider,
      needsToReloadProducts: true,
      trademark: initialCampaignDetails().trademark,
      classifications: initialCampaignDetails().classifications,
      products: initialCampaignDetails().products,
      needsToReloadClassifications: true,
      apiStatusClassifications: initialCampaignDetails().apiStatusClassifications,
      apiStatusFamiliesProvider: initialCampaignDetails().apiStatusClassifications,
      apiStatusProducts: initialCampaignDetails().apiStatusProducts,
      currentPageProvidersFamilies: initialCampaignDetails().currentPageProvidersFamilies,
      apiStatusTrademark: initialCampaignDetails().apiStatusTrademark,
      currentPageTrademark: initialCampaignDetails().currentPageTrademark,
      searchTermClassifications: initialCampaignDetails().searchTermClassifications,
      searchTermFamiliesProvider: initialCampaignDetails().searchTermFamiliesProvider,
      searchTermProducts: initialCampaignDetails().searchTermProducts,
      labelsTexts: initialCampaignDetails().labelsTexts,
    },
    addCampaing: action.addCampaing,
    backup: {},
  })),
  on(
    campaingsProviderActions.SET_SELECTED_TAB_OPTION,
    (state: Campaign, {selectedCampaignTabOption}): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        campaigns: {
          Results: [],
          TotalResults: 0,
        },
        selectedCampaignTabOption,
      },
    }),
  ),
  on(
    campaingsProviderActions.SET_SEARCH_TERM_CAMPAIGN,
    (state: Campaign, {searchTerm}): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        campaigns: {
          Results: [],
          TotalResults: 0,
        },
        queryInfo: {
          ...state.campaignList.queryInfo,
          searchTerm,
        },
      },
    }),
  ),

  // DOCS: ACCIONES EN DETALLES
  on(campaingsProviderActions.SET_ID_CAMPAIGN_BY_SELECTED, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      campaignFilterSelected: action.idCampaignBy,
      campaign: {
        ...state.campaignDetails.campaign,
        generaData: {
          ...state.campaignDetails.campaign.generaData,
          IdCatTipoCampana: action.idCampaignBy.value.toString(),
        },
        itemsRelated: [],
      },
      products:
        action.idCampaignBy.label === 'Producto'
          ? {
              Results: [],
              TotalResults: 0,
            }
          : state.campaignDetails.products,
      classifications:
        action.idCampaignBy.label === 'Agrupador por característica'
          ? {
              Results: [],
              TotalResults: 0,
            }
          : state.campaignDetails.classifications,
      trademark:
        action.idCampaignBy.label === 'Marca'
          ? {
              Results: [],
              TotalResults: 0,
            }
          : state.campaignDetails.trademark,
      familiesProvider:
        action.idCampaignBy.label === 'Familia' || action.idCampaignBy.label === 'Proveedor'
          ? {
              Results: [],
              TotalResults: 0,
            }
          : state.campaignDetails.familiesProvider,
      needsToReloadProducts: action.idCampaignBy.label === 'Producto',
      needsToReloadClassifications: action.idCampaignBy.label === 'Agrupador por característica',
      needsToReloadTrademark: action.idCampaignBy.label === 'Marca',
      needsToReloadFamiliesProvider:
        action.idCampaignBy.label === 'Proveedor' || action.idCampaignBy.label === 'Familia',
      searchTermClassifications: '',
      searchTermProducts: '',
      searchTermTrademark: '',
      searchTermFamiliesProvider: '',
    },
  })),
  on(campaingsProviderActions.SET_API_STATUS_PRODUCTS, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      apiStatusProducts: action.status,
    },
  })),
  on(campaingsProviderActions.GET_PRODUCTS_SUCCESS, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      products: {
        ...state.campaignDetails.products,
        Results:
          state.campaignDetails.currentPageProducts === 1
            ? [...action.products.Results]
            : [...state.campaignDetails.products.Results, ...action.products.Results],
        TotalResults: action.products.TotalResults,
      },
      needsToReloadProducts: false,
    },
  })),
  on(campaingsProviderActions.SET_FORM_GENERAL_DATA_BY_FIELD_NAME, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      campaign: {
        ...state.campaignDetails.campaign,
        generaData: {
          ...state.campaignDetails.campaign.generaData,
          [action.fieldName]: action.fieldValue,
        },
      },
    },
  })),
  on(campaingsProviderActions.SET_RADIO_VALUE, (state, {label}) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      campaign: {
        ...state.campaignDetails.campaign,
        generaData: {
          ...state.campaignDetails.campaign.generaData,
          Dinero: label === 'Dinero',
          ValorComisionDinero:
            label === 'Dinero'
              ? state.campaignDetails.campaign.generaData.ValorComisionDinero
              : null,
          Porcentaje: label === 'Porcentaje',
          ValorComisionPorcentaje:
            label === 'Porcentaje'
              ? state.campaignDetails.campaign.generaData.ValorComisionPorcentaje
              : null,
        },
      },
    },
  })),
  on(catalogsActions.GET_CAT_TIPO_CAMPANA_SUCCESS, (state, {lisCampaigns}) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      campaignFilterOptions: getArrayForDropDownList(
        lisCampaigns,
        'IdCatTipoCampana',
        'TipoCampana',
      ),
      campaignFilterSelected: null,
    },
  })),
  on(
    campaingsProviderActions.CAMPAIGN_EDIT,
    (state: Campaign, action): Campaign => {
      const campaignTypeSelected = find(
        state.campaignDetails.campaignFilterOptions,
        (o: DropListOption) => o.value === action.campaign.IdCatTipoCampana,
      );
      return {
        ...state,
        campaignDetails: {
          ...state.campaignDetails,
          campaignFilterSelected: find(
            state.campaignDetails.campaignFilterOptions,
            (o: DropListOption) => o.value === action.campaign.IdCatTipoCampana,
          ),
          campaign: {
            generaData: find(
              state.campaignList.campaigns.Results,
              (o: IVCampana) => o.IdCampana === action.campaign.IdCampana,
            ),
            itemsRelated: [...state.campaignList.selectedCampaign.itemsRelated],
            itemsToDelete: [],
          },
          editCampaign: true,
        },
        addCampaing: true,
      };
    },
  ),
  on(campaingsProviderActions.SET_DETAILS_BACKUP, (state) => ({
    ...state,
    backup: {
      campaignForm: state.campaignDetails.campaign,
    },
  })),
  on(campaingsProviderActions.SET_API_STATUS_TRADEMARK, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      apiStatusTrademark: action.status,
    },
  })),
  on(campaingsProviderActions.GET_TRADEMARK_SUCCESS, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      trademark: {
        ...state.campaignDetails.trademark,
        Results:
          state.campaignDetails.currentPageTrademark === 1
            ? [...action.trademark.Results]
            : [...state.campaignDetails.trademark.Results, ...action.trademark.Results],
        TotalResults: action.trademark.TotalResults,
      },
      needsToReloadTrademark: false,
    },
  })),
  on(campaingsProviderActions.SET_API_STATUS_FAMILIES_PROVIDER, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      apiStatusFamiliesProvider: action.status,
    },
  })),
  on(campaingsProviderActions.FETCH_PROVIDER_FAMILIES_SUCCESS, (state, {items}) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      familiesProvider: {
        ...state.campaignDetails.familiesProvider,
        Results:
          state.campaignDetails.currentPageProvidersFamilies === 1
            ? [...items.Results]
            : [...state.campaignDetails.familiesProvider.Results, ...items.Results],
        TotalResults: items.TotalResults,
      },
      needsToReloadFamiliesProvider: false,
    },
  })),
  on(campaingsProviderActions.FETCH_PROVIDER_SUCCESS, (state, {items}) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      campaign: {
        ...state.campaignDetails.campaign,
        itemsRelated: items.Results,
      },
      needsToReloadFamiliesProvider: false,
    },
  })),
  on(
    campaingsProviderActions.ADD_CAMPAIGN_ITEM,
    (state: Campaign, {item, idByType}): Campaign => {
      const generalData: IVCampana = state.campaignDetails.campaign.generaData;
      const type = state.campaignDetails.campaignFilterSelected.label;
      let obj;
      let node;
      switch (type) {
        case 'Producto':
          {
            obj = {
              IdCampanaProducto: DEFAULT_UUID,
              IdCampana: null,
              IdProducto: item.IdProducto,
              Activo: true,
            };
            node = 'IdProducto';
          }
          break;
        case 'Agrupador por característica':
          {
            obj = {
              IdCampanaCatClasificacionProducto: DEFAULT_UUID,
              IdCampana: null,
              IdAgrupadorCaracteristica: item.IdAgrupadorCaracteristica,
              Activo: true,
            };
            node = 'IdAgrupadorCaracteristica';
          }
          break;
        case 'Marca':
          {
            obj = {
              IdCampanaMarca: DEFAULT_UUID,
              IdCampana: null,
              IdMarca: item.IdMarca,
              Activo: true,
            };
            node = 'IdMarca';
          }
          break;
        default: {
          obj = {
            IdCampanaProveedorFamilia: DEFAULT_UUID,
            IdMarcaFamiliaProveedor: item.IdMarcaFamiliaProveedor,
            Activo: true,
          };
          node = 'IdMarcaFamiliaProveedor';
        }
      }
      return {
        ...state,
        campaignDetails: {
          ...state.campaignDetails,
          campaign: {
            ...state.campaignDetails.campaign,
            generaData: state.campaignDetails.editCampaign
              ? {
                  ...state.campaignDetails.campaign.generaData,
                  itemCampaign: {
                    ...generalData.itemCampaign,
                    Results: isEmpty(
                      filter(generalData.itemCampaign.Results, (o) => o[node] === item[node]),
                    )
                      ? [...generalData.itemCampaign.Results, obj]
                      : generalData.itemCampaign.Results,
                  },
                }
              : state.campaignDetails.campaign.generaData,
            itemsRelated: isEmpty(
              filter(state.campaignDetails.campaign.itemsRelated, (o) => o[node] === item[node]),
            )
              ? [...state.campaignDetails.campaign.itemsRelated, item]
              : state.campaignDetails.campaign.itemsRelated,
          },
        },
      };
    },
  ),
  on(campaingsProviderActions.REMOVE_CAMPAIGN_ITEM, (state, {item}) => {
    const campaign: IVCampana = state.campaignDetails.campaign.generaData;
    const type = campaign?.TipoCampana || '';
    let node;
    let itemToDelete;
    let id;
    if (type !== '') {
      switch (type) {
        case 'Producto':
          {
            node = 'IdProducto';
            id = 'IdCampanaProducto';
          }
          break;
        case 'Agrupador por característica':
          {
            node = 'IdAgrupadorCaracteristica';
            id = 'IdCampanaCatClasificacionProducto';
          }
          break;
        case 'Marca':
          {
            node = 'IdMarca';
            id = 'IdCampanaMarca';
          }
          break;
        default:
          {
            node = 'IdMarcaFamiliaProveedor';
            id = 'IdCampanaProveedorFamilia';
          }
          break;
      }
      itemToDelete = find(
        campaign.itemCampaign.Results,
        (o) => o[node] === item[node] && o[id] !== DEFAULT_UUID,
      );
    }
    return {
      ...state,
      campaignDetails: {
        ...state.campaignDetails,
        campaign: {
          ...state.campaignDetails.campaign,
          generaData: state.campaignDetails.editCampaign
            ? {
                ...state.campaignDetails.campaign.generaData,
                itemCampaign: !isEmpty(itemToDelete)
                  ? {
                      ...campaign.itemCampaign,
                      Results: filter(campaign.itemCampaign.Results, (o) => o !== itemToDelete),
                    }
                  : campaign.itemCampaign,
              }
            : state.campaignDetails.campaign.generaData,
          itemsRelated: filter(state.campaignDetails.campaign.itemsRelated, (o) => o !== item),
          itemsToDelete: !isEmpty(itemToDelete)
            ? [...state.campaignDetails.campaign.itemsToDelete, itemToDelete]
            : state.campaignDetails.campaign.itemsToDelete,
        },
      },
    };
  }),
  on(campaingsProviderActions.SET_API_STATUS_CLASSIFICATIONS, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      apiStatusClassifications: action.status,
    },
  })),
  on(campaingsProviderActions.GET_CLASSIFICATIONS_SUCCESS, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      classifications: {
        ...state.campaignDetails.classifications,
        Results:
          state.campaignDetails.currentPageClassifications === 1
            ? [...action.classifications.Results]
            : [...state.campaignDetails.classifications.Results, ...action.classifications.Results],
        TotalResults: action.classifications.TotalResults,
      },
      needsToReloadClassifications: false,
    },
  })),
  on(campaingsProviderActions.SET_SEARCH_TERM_PRODUCTS, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      searchTermProducts: action.fieldValue,
      products: {
        Results: [],
        TotalResults: 0,
      },
      needsToReloadProducts: true,
      currentPageProducts: 1,
    },
  })),
  on(campaingsProviderActions.SET_SEARCH_TERM_CLASSIFICATIONS, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      searchTermClassifications: action.fieldValue,
      classifications: {
        Results: [],
        TotalResults: 0,
      },
      needsToReloadClassifications: true,
      currentPageClassifications: 1,
    },
  })),
  on(campaingsProviderActions.SET_SEARCH_TERM_FAMILIES_PROVIDER, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      searchTermFamiliesProvider: action.fieldValue,
      familiesProvider: {
        Results: [],
        TotalResults: 0,
      },
      currentPageProvidersFamilies: 1,
      needsToReloadFamiliesProvider: true,
    },
  })),
  on(campaingsProviderActions.SET_SEARCH_TERM_TRADEMARK, (state, action) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      searchTermTrademark: action.fieldValue,
      trademark: {
        Results: [],
        TotalResults: 0,
      },
      currentPageTrademark: 1,
      needsToReloadTrademark: true,
    },
  })),
  on(
    campaingsProviderActions.SET_CAMPAIGNS_BACKUP,
    (state: Campaign, action): Campaign => ({
      ...state,
      backup: {
        campaignForm: state.campaignDetails.campaign,
        campaigns: state.campaignList.campaigns.Results,
      },
    }),
  ),
  on(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS, (state) => ({
    ...state,
    campaignList: {
      ...state.campaignList,
      ...initialCampaignList(),
    },
    campaignDetails: {
      ...state.campaignDetails,
      campaign: initialCampaignDetails().campaign,
      campaignFilterSelected: null,
      editCampaign: initialCampaignDetails().editCampaign,
      needsToReloadFamiliesProvider: true,
      currentPageProducts: initialCampaignDetails().currentPageProducts,
      needsToReloadTrademark: true,
      currentPageClassifications: initialCampaignDetails().currentPageClassifications,
      searchTermTrademark: initialCampaignDetails().searchTermTrademark,
      familiesProvider: initialCampaignDetails().familiesProvider,
      needsToReloadProducts: true,
      trademark: initialCampaignDetails().trademark,
      classifications: initialCampaignDetails().classifications,
      products: initialCampaignDetails().products,
      needsToReloadClassifications: true,
      apiStatusClassifications: initialCampaignDetails().apiStatusClassifications,
      apiStatusFamiliesProvider: initialCampaignDetails().apiStatusClassifications,
      apiStatusProducts: initialCampaignDetails().apiStatusProducts,
      currentPageProvidersFamilies: initialCampaignDetails().currentPageProvidersFamilies,
      apiStatusTrademark: initialCampaignDetails().apiStatusTrademark,
      currentPageTrademark: initialCampaignDetails().currentPageTrademark,
      searchTermClassifications: initialCampaignDetails().searchTermClassifications,
      searchTermFamiliesProvider: initialCampaignDetails().searchTermFamiliesProvider,
      searchTermProducts: initialCampaignDetails().searchTermProducts,
      labelsTexts: initialCampaignDetails().labelsTexts,
    },
    addCampaing: false,
  })),
  on(
    campaingsProviderActions.ADD_CAMPAIGN_LIST_DELETE,
    (state, {campaign}): Campaign => ({
      ...state,
      campaignList: {
        ...state.campaignList,
        campaigns: {
          ...state.campaignList.campaigns,
          Results: filter(
            state.campaignList.campaigns.Results,
            (o: IVCampana) => o.IdCampana !== campaign.IdCampana,
          ),
        },
        // TODO: REVISAR PORQUÉ SE GUARDA selectedCampaign
        /*        selectedCampaign:
          campaign.IdCampana === state.campaignList.selectedCampaign.IdCampana
            ? null
            : state.campaignList.selectedCampaign,*/
        campaignsToDelete: [...state.campaignList.campaignsToDelete, campaign],
      },
    }),
  ),
  on(campaingsProviderActions.SET_CAMPAIGN_ID, (state, {IdCampana}) => ({
    ...state,
    campaignDetails: {
      ...state.campaignDetails,
      campaign: {
        ...state.campaignDetails.campaign,
        generaData: {
          ...state.campaignDetails.campaign.generaData,
          IdCampana,
        },
      },
    },
  })),
  on(campaingsProviderActions.SAVE_ITEMS_RELATED_LOAD, (state, {IdCampana}) => {
    const generalData: IVCampana = state.campaignDetails.campaign.generaData;
    return {
      ...state,
      campaignDetails: {
        ...state.campaignDetails,
        campaign: {
          ...state.campaignDetails.campaign,
          generaData: state.campaignDetails.editCampaign
            ? {
                ...generalData,
                itemCampaign: {
                  ...generalData.itemCampaign,
                  Results: map(generalData.itemCampaign.Results, (o) => {
                    return {
                      ...o,
                      IdCampana,
                    };
                  }),
                },
              }
            : state.campaignDetails.campaign.generaData,
        },
      },
    };
  }),
  on(campaingsProviderActions.RESTORE_CAMPAIGNS_BACKUP, (state) => {
    return {
      ...state,
      campaignDetails: {
        ...state.campaignDetails,
        campaign: state.backup.campaignForm,
      },
      campaignList: {
        ...state.campaignList,
        campaigns: {
          ...state.campaignList.campaigns,
          Results: state.backup.campaigns,
        },
      },
      addCampaing: false,
      backup: {},
    };
  }),
);
