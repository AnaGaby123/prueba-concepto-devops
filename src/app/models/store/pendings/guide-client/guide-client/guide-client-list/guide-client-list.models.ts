import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IGuideClientList {
  clientStatus: number;
  clientsNeedsToReload: boolean;
  searchTerm: string;
  selectedFreightOption: DropListOption;
  guideNumber: string;
}

export const initialIGuideClientList = (): IGuideClientList => ({
  clientStatus: API_REQUEST_STATUS_DEFAULT,
  clientsNeedsToReload: true,
  searchTerm: '',
  selectedFreightOption: {} as DropListOption,
  guideNumber: '',
});
