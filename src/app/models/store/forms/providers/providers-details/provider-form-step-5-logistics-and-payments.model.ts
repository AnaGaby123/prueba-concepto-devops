import {
  CatBanco,
  CatMarcaTarjeta,
  CatMedioDePago,
  ConfiguracionPagos,
  ConfiguracionPagosDatosBancariosDetalle,
  DatosBancarios,
  Proveedor,
} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export interface LogisticsAndPayments {
  logistics: Proveedor;
  logisticsBackUp: Proveedor;
  routeList: RutaEntrega[];
  routeListBackUp: RutaEntrega[];
  payment: Payment;
  paymentBackUp: Payment;
  cardMarkList: Array<ICardMark>;
  cardMarkListBackup: Array<ICardMark>;
  accountsBankForm: ConfiguracionPagosDatosBancariosDetalle;
}

export const initialLogisticsAndPayments = (): LogisticsAndPayments => ({
  logistics: {} as Proveedor,
  logisticsBackUp: {} as Proveedor,
  routeList: [],
  routeListBackUp: [],
  payment: initialPayment(),
  paymentBackUp: initialPayment(),
  cardMarkList: [],
  cardMarkListBackup: [],
  accountsBankForm: initialAccountBankForm(),
});
export const initialAccountBankForm = (): ConfiguracionPagosDatosBancariosDetalle => ({
  catMedioDePago: initialCatMedioDePago(),
  catBanco: initialCatBanco(),
  DatosBancarios: initialDatosBancarios(),
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdCatMedioDePago: null,
  IdConfiguracionPagos: null,
  IdConfiguracionPagosDatosBancarios: DEFAULT_UUID,
  IdDatosBancarios: null,
  IdEmpresa: null,
  IdCatMarcaTarjeta: null,
});
export const initialCatMedioDePago = (): CatMedioDePago => ({
  Activo: true,
  IdCatMedioDePago: DEFAULT_UUID,
  MedioDePago: null,
  ClaveFormaDePago: null,
  ObligatorioEnProveedor: true,
  RequiereNumeroDeCuenta: true,
});
export const initialCatBanco = (): CatBanco => ({
  Activo: true,
  Banco: null,
  IdCatBanco: DEFAULT_UUID,
  Clave: null,
  IdCatPais: DEFAULT_UUID,
  ClaveBroker: null,
});
export const initialDatosBancarios = (): DatosBancarios => ({
  IdDatosBancarios: DEFAULT_UUID,
  IdCatBanco: DEFAULT_UUID,
  NumeroDeCuenta: null,
  Beneficiario: null,
  Sucursal: null,
  Clabe: null,
  IdCatMoneda: null,
  NumeroTarjeta: null,
});

export interface ICardMark extends CatMarcaTarjeta {
  isChecked: boolean;
}

export interface Payment {
  configuracionPagos: ConfiguracionPagos;
  bankAccounts: Array<ConfiguracionPagosDatosBancariosDetalle>;
  accountsToDelete?: Array<ConfiguracionPagosDatosBancariosDetalle>;
}

export const initialPayment = (): Payment => ({
  configuracionPagos: initialConfigPayment(),
  bankAccounts: [],
  accountsToDelete: [],
});

const initialConfigPayment = (): ConfiguracionPagos => {
  return {
    Activo: true,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdCatCondicionesDePago: null,
    IdCatMedioDePago: null,
    IdConfiguracionPagos: DEFAULT_UUID,
    LimiteLineaCredito: null,
    LineaCredito: null,
    MontoDeCredito: null,
    NumeroDeCuenta: '',
  };
};

export interface ConfiguracionDatos {
  Activo?: boolean;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdCatMedioDePago?: string;
  IdConfiguracionPagos?: string;
  IdConfiguracionPagosDatosBancarios?: string;
  IdDatosBancarios?: string;
  datosBancarios?: DatosBancarios;
  Identificar: number;
  NameConfiguration: string;
  NameProperty: string;
}

export interface RutaEntrega {
  id: string;
  name: string;
  ValorEsperado: number;
  IdValorConfiguracionTiempoEntrega: string;
  identificador: number;
  idSelected: string;
  IdConfiguracionTiempoEntregaProveedor: string;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
}
