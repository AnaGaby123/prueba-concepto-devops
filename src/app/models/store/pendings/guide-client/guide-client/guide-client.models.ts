/* Models Imports */
import {
  IGuideClientList,
  initialIGuideClientList,
} from '@appModels/store/pendings/guide-client/guide-client/guide-client-list/guide-client-list.models';

export const TITLE_GUIDE_CLIENT = 'GUÍA CLIENTE';

export interface IGuideClient {
  title: string;
  guideClientList: IGuideClientList;
}

export const initialIGuideClient = (): IGuideClient => ({
  title: TITLE_GUIDE_CLIENT,
  guideClientList: initialIGuideClientList(),
});
