/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface ILoadBalanceInFavorDetails {
  companies: Array<DropListOption>;
  companySelected: DropListOption;
}

export const initialILoadBalanceInFavorDetails = (): ILoadBalanceInFavorDetails => ({
  companies: [],
  companySelected: {} as DropListOption,
});
