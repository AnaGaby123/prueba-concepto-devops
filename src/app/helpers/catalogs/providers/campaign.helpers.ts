import {QueryResultVCampana, VCampana} from 'api-catalogos';
import {
  IVCampana,
  IVQueryResultVCampana,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-3-campaign.model';
import {map} from 'lodash-es';
import {API_REQUEST_STATUS_DEFAULT, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const buildInitialCampaigns = (campaigns: QueryResultVCampana): IVQueryResultVCampana => ({
  ...campaigns,
  Results: map(campaigns.Results, (o: VCampana, index: number) => ({
    ...o,
    apiStatusItemsRelated: API_REQUEST_STATUS_DEFAULT,
    Index: index + 1,
    isSelected: index === 0,
    needsToReload: true,
  })),
});

export const buildNewItemToSave = (campaignForm: IVCampana, type: DropListOption): IVCampana => ({
  ...campaignForm,
  TipoCampana: type.label,
  isSelected: false,
  needsToReload: false,
  itemCampaign: [],
  itemsRelated: campaignForm.itemsRelated,
  apiStatusItemsRelated: API_REQUEST_STATUS_SUCCEEDED,
});
export const typeActionFetchProvider = 'Fetch provider families load';
export const typeActionSearchOption = 'Set selected search option';
