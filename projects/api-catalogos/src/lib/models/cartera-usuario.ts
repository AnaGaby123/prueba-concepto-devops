/* tslint:disable */
import { ClienteCarteraDatos } from './cliente-cartera-datos';
export interface CarteraUsuario {
  ClientesCarteraCobrador?: Array<ClienteCarteraDatos>;
  ClientesCarteraCoordinadorDeVentaInterna?: Array<ClienteCarteraDatos>;
  ClientesCarteraESAC?: Array<ClienteCarteraDatos>;
  ClientesCarteraEVE?: Array<ClienteCarteraDatos>;
  ClientesCarteraEVI?: Array<ClienteCarteraDatos>;
  ClientesCoordinadorDeServicioAlCliente?: Array<ClienteCarteraDatos>;
  ClientesGerenteDeVentas?: Array<ClienteCarteraDatos>;
}
