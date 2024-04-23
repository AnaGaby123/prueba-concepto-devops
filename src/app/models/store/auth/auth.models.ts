import {AppToken} from '@appModels/auth/token.model';
import {UserInfo} from '@appModels/auth/user-info.model';

export interface AuthState {
  isAuthenticated?: boolean;
  token: AppToken;
  userInfo: UserInfo;
  returnUrl?: string;
}

export interface IUser {
  username: string;
  password: string;
}
