import {createSelector} from '@ngrx/store';
import {selectProvidersAddEdit} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
import {ProvidersDetailsState} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  Campaign,
  CampaignDetails,
  CampaignList,
  ICampaignForm,
  IVCampana,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-3-campaign.model';
import {filter, isEmpty, isEqual, sumBy} from 'lodash-es';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {getProviderId} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {CampaignsViewConfigurations} from '@appModels/catalogos/providers/campaigns/campaigns';
import {Campana, VAgrupadorCaracteristica, VMarcaFamilia} from 'api-catalogos';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';
import {PAGING_LIMIT} from '@appUtil/common.protocols';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {VMarca, VProducto} from 'api-logistica';

export const selectProvidersCampaign = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state.campaign,
);
export const getAddCampaing = createSelector(
  selectProvidersCampaign,
  (state: Campaign) => state.addCampaing,
);

// SELECTORES PARA LISTADO DE CAMPANAS
export const selectCampaignList = createSelector(
  selectProvidersCampaign,
  (state) => state.campaignList,
);

export const selectQueryInfo = createSelector(
  selectCampaignList,
  (state: CampaignList): any => state.queryInfo,
);
export const selectCampaignTabOptions = createSelector(
  selectCampaignList,
  (state: CampaignList): Array<ITabOption> => state.campaignTabOptions,
);
export const selectedCampaignTabOption = createSelector(
  selectCampaignList,
  (state: CampaignList): ITabOption => state.selectedCampaignTabOption,
);
export const selectCampaignListQueryInfo = createSelector(
  getProviderId,
  selectQueryInfo,
  selectedCampaignTabOption,
  (providerId: string, campaignQueryInfo: any, tabOption: ITabOption) => {
    const queryInfo = queryInfoWithActiveFilter(tabOption.id === '1');
    queryInfo.SortField = 'FechaRegistro';
    queryInfo.SortDirection = 'desc';
    queryInfo.Filters.push({
      NombreFiltro: 'IdProveedor',
      ValorFiltro: providerId,
    });
    if (campaignQueryInfo.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'Nombre',
        ValorFiltro: campaignQueryInfo.searchTerm,
      });
    }
    queryInfo.desiredPage = campaignQueryInfo.desiredPage;
    queryInfo.pageSize = PAGING_LIMIT;
    return queryInfo;
  },
);
export const selectFetchMoreCampaignListInfo = createSelector(
  selectCampaignList,
  selectCampaignListQueryInfo,
  (state, queryInfo): IFetchMoreItemsInfo => {
    return {
      itemList: state.campaigns?.Results,
      itemsTotalLength: state.campaigns?.TotalResults,
      listRequestStatus: state.queryInfo.apiStatus,
      desiredPage: queryInfo.desiredPage,
      pageSize: queryInfo.pageSize,
      totalPages:
        state.campaigns?.TotalResults >= queryInfo.pageSize
          ? Math.ceil(state.campaigns?.TotalResults / queryInfo.pageSize)
          : 0,
    };
  },
);
export const campaigns = createSelector(
  selectCampaignList,
  (state: CampaignList) => state.campaigns,
);
export const selectedCampaign = createSelector(
  selectCampaignList,
  (state: CampaignList) => state.selectedCampaign,
);
export const selectItemsRelated = createSelector(
  selectedCampaign,
  (state: IVCampana) => state?.itemsRelated,
);
export const selectItemsRelatedProductsSum = createSelector(selectItemsRelated, (state: any[]) =>
  state && !isEmpty(state) ? sumBy(state, (o) => o?.Productos || o?.TotalProductos) : 0,
);
export const apiStatusItemsRelated = createSelector(
  selectedCampaign,
  (state: IVCampana) => state?.apiStatusItemsRelated,
);
export const apiStatusCampaing = createSelector(
  selectCampaignList,
  (state: CampaignList) => state.apiStatusCampaigns,
);
export const searchTermCampaign = createSelector(
  selectCampaignList,
  (state: CampaignList) => state.queryInfo.searchTerm,
);
export const selectedCampaignType = createSelector(
  selectedCampaign,
  (state: IVCampana) => state?.TipoCampana,
);
export const selectedNeedsToReloadCampaign = createSelector(
  selectedCampaign,
  (state: IVCampana) => {
    return state?.needsToReload;
  },
);
export const selectedCampaignId = createSelector(
  selectedCampaign,
  (state: IVCampana) => state?.IdCampana,
);
export const selectedCampaignDetailsQueryInfo = createSelector(
  selectedCampaignId,
  (campaignId: string) => {
    const queryInfo = queryInfoWithActiveFilter(true);
    queryInfo.Filters.push({
      NombreFiltro: 'IdCampana',
      ValorFiltro: campaignId,
    });
    return queryInfo;
  },
);

// DOCS: SELECTORES DETALLES
export const selectCampaignDetails = createSelector(
  selectProvidersCampaign,
  (state) => state.campaignDetails,
);
export const selectCampaignFilterSelected = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.campaignFilterSelected,
);
export const editCampaign = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.editCampaign,
);
export const selectCampaignForm = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.campaign,
);
export const selectCampaignGeneralData = createSelector(
  selectCampaignForm,
  (state: ICampaignForm) => state?.generaData,
);
export const selectCampaignItemsRelated = createSelector(
  selectCampaignForm,
  (state: ICampaignForm): Array<VProducto | VAgrupadorCaracteristica | VMarcaFamilia | VMarca> =>
    state?.itemsRelated,
);
export const selectCampaignItemsRelatedToDelete = createSelector(
  selectCampaignForm,
  (state: ICampaignForm) => state?.itemsToDelete,
);
export const selectDates = createSelector(
  selectCampaignGeneralData,
  (generalData: Campana): Array<Date> => {
    const dates: Array<Date> = [];
    dates[0] = currentDateWithoutHoursUTCFormatDate(new Date(generalData.FechaInicio));
    dates[1] = currentDateWithoutHoursUTCFormatDate(new Date(generalData.FechaFin));

    return dates;
  },
);
export const labelTexts = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) =>
    filter(
      state.labelsTexts,
      (o: CampaignsViewConfigurations) => o.id === state.campaignFilterSelected?.label,
    )[0],
);
export const needsToReloadProducts = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.needsToReloadProducts,
);
export const currentPageProducts = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.currentPageProducts,
);
export const searchTermProducts = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.searchTermProducts,
);
export const getProducts = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.products,
);
export const apiStatusProducts = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.apiStatusProducts,
);
export const needsToReloadTrademark = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.needsToReloadTrademark,
);
export const currentPageTrademark = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.currentPageTrademark,
);
export const searchTermTrademark = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.searchTermTrademark,
);
export const getTrademark = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.trademark,
);
export const apiStatusTrademark = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.apiStatusTrademark,
);
export const needsToReloadClassifications = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.needsToReloadClassifications,
);
export const currentPageClassifications = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.currentPageClassifications,
);
export const searchTermClassifications = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.searchTermClassifications,
);
export const getClassifications = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.classifications,
);
export const apiStatusClassifications = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.apiStatusClassifications,
);
export const needsToReloadFamiliesProvider = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.needsToReloadFamiliesProvider,
);
export const currentPageProvidersFamilies = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.currentPageProvidersFamilies,
);
export const searchTermFamiliesProvider = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.searchTermFamiliesProvider,
);
export const getFamiliesProvider = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.familiesProvider,
);
export const apiStatusFamiliesProvider = createSelector(
  selectCampaignDetails,
  (state: CampaignDetails) => state.apiStatusFamiliesProvider,
);
export const selectCampaignsToDelete = createSelector(
  selectCampaignList,
  (state) => state.campaignsToDelete,
);
export const saveListValidation = createSelector(selectProvidersCampaign, (state: Campaign) => {
  return !isEqual(state.campaignList.campaigns.Results, state.backup?.campaigns);
});
export const selectCampaignFormValidation = createSelector(
  selectProvidersCampaign,
  (state: Campaign) => {
    const campaign = state?.campaignDetails?.campaign;
    const initialDate = new Date(campaign?.generaData?.FechaInicio);
    const finalDate = new Date(campaign?.generaData?.FechaFin);
    return (
      !isEmpty(campaign?.generaData.IdCatTipoCampana) &&
      !isEmpty(campaign?.generaData.Nombre) &&
      !isEmpty(campaign?.generaData.Objetivo) &&
      (campaign?.generaData.Dinero || campaign?.generaData.Porcentaje) &&
      (campaign?.generaData.ValorComisionDinero !== null ||
        campaign?.generaData.ValorComisionPorcentaje !== null) &&
      !isEmpty(campaign.itemsRelated) &&
      finalDate > initialDate
    );
  },
);

export const selectCampaignHasChanges = createSelector(
  selectProvidersCampaign,
  (state: Campaign) => {
    return (
      !isEqual(
        JSON.stringify(state.campaignDetails.campaign),
        JSON.stringify(state.backup?.campaignForm),
      ) ||
      (!state.addCampaing &&
        !isEqual(
          JSON.stringify(state.campaignList?.campaigns?.Results),
          JSON.stringify(state.backup?.campaigns),
        ))
    );
  },
);
export const saveValidatorStep3 = createSelector(
  selectProvidersCampaign,
  saveListValidation,
  selectCampaignFormValidation,
  (providerCampaign: Campaign, listValidation: boolean, detailsValidation: boolean) => {
    if (providerCampaign.addCampaing) {
      return detailsValidation;
    } else {
      return listValidation;
    }
  },
);
