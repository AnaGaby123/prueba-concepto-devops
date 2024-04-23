import {
  IControlSupplierClaimList,
  initialIControlSupplierClaimList,
} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-list/control-supplier-claim-list.models';
import {
  IControlSupplierClaimDetails,
  initialIControlSupplierClaimDetails,
} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-details/control-supplier-claim-details.models';

export const TITLE_CONTROL_SUPPLIER_CLAIM = 'Controlar Reclamo Proveedor';

export interface IControlSupplierClaim {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  controlSupplierClaimList: IControlSupplierClaimList;
  controlSupplierClaimDetails: IControlSupplierClaimDetails;
}

export const initialIControlSupplierClaim = (): IControlSupplierClaim => ({
  title: TITLE_CONTROL_SUPPLIER_CLAIM,
  detailsMode: false,
  allowToDetails: false,
  controlSupplierClaimList: initialIControlSupplierClaimList(),
  controlSupplierClaimDetails: initialIControlSupplierClaimDetails(),
});
