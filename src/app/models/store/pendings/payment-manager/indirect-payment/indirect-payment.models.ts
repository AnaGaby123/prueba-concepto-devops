export interface IIndirectPayment {
  title: string;
  seeResume: boolean;
}

export const initialIIndirectPayment = (): IIndirectPayment => ({
  title: 'Cargar pago indirecto',
  seeResume: false,
});
