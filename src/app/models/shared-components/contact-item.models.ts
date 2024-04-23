import {CorreoElectronico, NumeroTelefonico} from 'api-catalogos';

export interface IContactItem {
  active?: boolean;
  department?: string;
  contactId?: string;
  job?: string;
  mail?: CorreoElectronico;
  mSurName?: string;
  name?: string;
  phone?: NumeroTelefonico;
  surName?: string;
}
