import {VUsuarioDetalle} from 'api-catalogos';

export interface UserInfo extends VUsuarioDetalle {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  role: string[];
  preferred_username: string;
}
