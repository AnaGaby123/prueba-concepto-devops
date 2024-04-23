/* tslint:disable */
import { Cliente } from './cliente';
import { GMContactoClienteCompleto } from './gmcontacto-cliente-completo';
import { Direccion } from './direccion';
import { DireccionCliente } from './direccion-cliente';
export interface GMClienteCotizacion {
  Cliente?: Cliente;
  ContactosCliente?: Array<GMContactoClienteCompleto>;
  Direccion?: Direccion;
  DireccionCliente?: DireccionCliente;
  IdCliente?: string;
  IdsCotizacion?: Array<string>;
}
