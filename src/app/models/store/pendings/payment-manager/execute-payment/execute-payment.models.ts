import {
  IExecutePaymentList,
  initialIExecutePaymentList,
} from '@appModels/store/pendings/payment-manager/execute-payment/execute-payments-list/execute-payment-list.models';

export const TITLE_EXECUTE_PAYMENT = 'Ejecutar Pago';

export interface IExecutePayment {
  title: string;
  isInDetailsView: boolean;
  allowedToDetails: boolean;
  executePaymentList: IExecutePaymentList;
}

export const initialIExecutePayment = (): IExecutePayment => ({
  title: TITLE_EXECUTE_PAYMENT,
  isInDetailsView: false,
  allowedToDetails: false,
  executePaymentList: initialIExecutePaymentList(),
});
