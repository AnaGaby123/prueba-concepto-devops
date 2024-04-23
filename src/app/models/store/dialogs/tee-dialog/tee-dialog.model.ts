import {IPurchaseOrderItem} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';

export interface TeeDialog {
  item: IPurchaseOrderItem;
  emit: boolean;
}

export const initialTeeDialogState = (): TeeDialog => ({
  item: {},
  emit: false,
});
