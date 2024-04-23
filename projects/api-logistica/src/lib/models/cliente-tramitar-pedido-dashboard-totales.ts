/* tslint:disable */
export interface ClienteTramitarPedidoDashboardTotales {
  TodasLasOCRecibidas?: number;
  TodasLasOCTemporal?: number;
  TodosLosClientes?: number;
  TodosLosClientesConOCTemporal?: number;
  TotalPartidas?: number;
  TotalPartidasPorTipo?: {[key: string]: number};
  TotalUSDPartidasPorTipo?: {[key: string]: number};
  ValorTotalUSD?: number;
}
