import {Cliente, ClienteDatosSTP, ConfiguracionPagos, DatosFacturacionCliente} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export interface IChargesClientForm {
  credit: Credit;
  billing: Billing;
  clientDataSTP: ClientDataSTP;
  dataBackup: IChargesClientBackUp;
  clientSelected: Cliente;
}

export interface IChargesClientBackUp {
  credit: Credit;
  billing: Billing;
  clientDataSTP: ClientDataSTP;
  clientSelected: Cliente;
}

export interface ClientDataSTP extends ClienteDatosSTP {
  enterpriseSelected: DropListOption;
  publicationEnterpriseSelected: DropListOption;
}

export interface Credit extends ConfiguracionPagos {
  paymentConditionsSelected: DropListOption;
  paymentFormSelected: DropListOption;
}

export interface Billing extends DatosFacturacionCliente {
  CatUseCFDISelected: DropListOption;
  CatPaymentMethodCFDISelected: DropListOption;
  CatRevisionSelected: DropListOption;
}

export const initialChargesClientsForm = (): IChargesClientForm => ({
  credit: initialCredit(),
  /*  credit: {} as Credit,*/
  billing: {} as Billing,
  dataBackup: {} as IChargesClientForm,
  clientSelected: {} as Cliente,
  clientDataSTP: {} as ClientDataSTP,
});

export const initialCredit = (): Credit => ({
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdCatCondicionesDePago: null,
  IdCatMedioDePago: null,
  IdConfiguracionPagos: DEFAULT_UUID,
  LimiteLineaCredito: null,
  LineaCredito: null,
  MontoDeCredito: null,
  NumeroDeCuenta: null,
  PorcentajeSobregiroLineaCredito: null,
  paymentConditionsSelected: {} as DropListOption,
  paymentFormSelected: {} as DropListOption,
});
