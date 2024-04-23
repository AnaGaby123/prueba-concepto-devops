/* Core Imports */
import {createReducer} from '@ngrx/store';

/* Tools Imports */
/* Models Imports */
import {
  initialPayment,
  IPayment,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';

/* Actions Imports */

const initialIPayment: IPayment = {
  ...initialPayment(),
};

export const paymentReducer = createReducer(initialIPayment);
