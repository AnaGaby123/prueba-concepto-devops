import {TypedAction} from '@ngrx/store/src/models';

export interface AuthCodeDialog {
  customerName?: string; // DOCS: ATTRIBUTE FOR CUSTOMER/CLIENT NAME
  description?: string; // DOCS: ATTRIBUTE TO SHOW A DESCRIPION MESSAGE JUST BELOW THE RESUME
  email?: string; // DOCS: ATTRIBUTE TO OBTAIN THE MAIL TO USE
  paymentConditions?: string; // DOCS: ATTIBUTE TO SEND PAYMENT CONDITIONS
  purchaseOrder?: string; // DOCS: ATTRIBUTE FOR PURCHASE ORDER SELECT FROM DASHBOARD
  resume?: string; // DOCS: ATTRIBUTE TO SHOW THE AUTHORIZATION
  actionAfterValid?: TypedAction<string>; // DOCS: ACTION TO EXECUTE WHEN CODE IS VALID
}
