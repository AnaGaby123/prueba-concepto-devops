/* Models Imports */
import {
  ILoadBalanceInFavorList,
  initialILoadBalanceInFavorList,
} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor-list/load-balance-in-favor-list.models';
import {
  ILoadBalanceInFavorDetails,
  initialILoadBalanceInFavorDetails,
} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor-details/load-balance-in-favor-details.models';

export const TITLE_LOAD_BALANCE_IN_FAVOR = 'CARGAR SALDO A FAVOR';

export interface ILoadBalanceInFavor {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  loadBalanceInFavorList: ILoadBalanceInFavorList;
  loadBalanceInFavorDetails: ILoadBalanceInFavorDetails;
}

export const initialILoadBalanceInFavor = (): ILoadBalanceInFavor => ({
  title: TITLE_LOAD_BALANCE_IN_FAVOR,
  detailsMode: false,
  allowToDetails: false,
  loadBalanceInFavorList: initialILoadBalanceInFavorList(),
  loadBalanceInFavorDetails: initialILoadBalanceInFavorDetails(),
});
