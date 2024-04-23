import {ContactoDetalleProvObj} from 'api-catalogos';

export interface IProviderContact extends ContactoDetalleProvObj {
  fullName: string;
  providerName: string;
  providerImage?: string;
}
