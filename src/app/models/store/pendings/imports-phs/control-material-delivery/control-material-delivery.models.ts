import {
  IControlMaterialDeliveryList,
  initialIControlMaterialDeliveryList,
} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {
  IControlMaterialDeliveryDetails,
  initialIControlMaterialDeliveryDetails,
} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.models';

export const TITLE_CONTROL_MATERIAL_DELIVERY = 'CONTROLAR ENTREGA MATERIAL';

export interface IControlMaterialDelivery {
  title: string;
  detailsMode: boolean;
  controlMaterialDeliveryList: IControlMaterialDeliveryList;
  controlMaterialDeliveryDetails: IControlMaterialDeliveryDetails;
}

export const initialIControlMaterialDelivery = (): IControlMaterialDelivery => ({
  title: TITLE_CONTROL_MATERIAL_DELIVERY,
  detailsMode: false,
  controlMaterialDeliveryList: initialIControlMaterialDeliveryList(),
  controlMaterialDeliveryDetails: initialIControlMaterialDeliveryDetails(),
});
