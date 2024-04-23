import {
  initialIQuarantineManagerList,
  IQuarantineManagerList,
} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager-list/quarantine-manager-list.models';
import {
  initialIQuarantineManagerDetails,
  IQuarantineManagerDetails,
} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager-details/quarantine-manager-details.models';

export const TITLE_QUARANTINE_MANAGER = 'GESTOR DE CUARENTENA';

export interface IQuarantineManager {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  quarantineManagerList: IQuarantineManagerList;
  quarantineManagerDetails: IQuarantineManagerDetails;
}

export const initialIQuarantineManager = (): IQuarantineManager => ({
  title: TITLE_QUARANTINE_MANAGER,
  detailsMode: false,
  allowToDetails: false,
  quarantineManagerList: initialIQuarantineManagerList(),
  quarantineManagerDetails: initialIQuarantineManagerDetails(),
});
