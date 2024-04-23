export interface IPaymentOrder {
  title: string;
  week: any;
}

export const initialIPaymentOrder = (): IPaymentOrder => ({
  title: 'Orden de pago',
  week: null,
});
