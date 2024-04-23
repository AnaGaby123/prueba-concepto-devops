/* tslint:disable */
export interface StpAbono {
  Estado?: string;
  FechaAutorizacion?: string;
  FechaCancelacion?: string;
  FechaDevolucion?: string;
  FechaLiquidacion?: string;
  IdStpAbono?: string;
  claveRastreo?: string;
  conceptoPago?: string;
  cuentaBeneficiario?: string;
  cuentaOrdenante?: string;
  empresa?: string;
  fechaOperacion?: number;
  id?: number;
  institucionBeneficiaria?: number;
  institucionOrdenante?: number;
  monto?: number;
  nombreBeneficiario?: string;
  nombreOrdenante?: string;
  referenciaNumerica?: number;
  rfcCurpBeneficiario?: string;
  rfcCurpOrdenante?: string;
  tipoCuentaBeneficiario?: number;
  tipoCuentaOrdenante?: number;
}
