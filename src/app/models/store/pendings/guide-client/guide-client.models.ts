import {
  IGuideClient,
  initialIGuideClient,
} from '@appModels/store/pendings/guide-client/guide-client/guide-client.models';

export interface IGuideClientState {
  guideClient: IGuideClient;
}

export const initialIGuideClientState = (): IGuideClientState => ({
  guideClient: initialIGuideClient(),
});
