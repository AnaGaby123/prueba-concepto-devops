import {
  initialIQuarantineManager,
  IQuarantineManager,
} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager.models';

export interface IResourceManagerState {
  quarantineManager: IQuarantineManager;
}

export const initialIResourceManagerState = (): IResourceManagerState => ({
  quarantineManager: initialIQuarantineManager(),
});
