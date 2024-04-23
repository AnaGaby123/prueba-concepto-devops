import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {NEWER_VALUE, OLDER_VALUE} from '@appUtil/common.protocols';

export interface ILoadBalanceInFavorList {
  searchTerm: string;
  tabs: Array<ITabOption>;
  tabSelected: ITabOption;
  options: Array<DropListOption>;
  optionSelected: DropListOption;
  providers: Array<DropListOption>;
  providerSelected: DropListOption;
}

export const initialILoadBalanceInFavorList = (): ILoadBalanceInFavorList => ({
  searchTerm: '',
  tabs: [
    {
      id: '1',
      label: 'TODOS',
    },
    {
      id: '2',
      label: 'PROQUIFA',
    },
    {
      id: '3',
      label: 'PROVEEDORA',
    },
  ],
  tabSelected: {
    id: '1',
    label: 'TODOS',
  },
  options: [
    {
      value: '1',
      label: NEWER_VALUE,
    },
    {
      value: '2',
      label: OLDER_VALUE,
    },
  ],
  optionSelected: {
    value: '1',
    label: NEWER_VALUE,
  },
  providers: [],
  providerSelected: {} as DropListOption,
});
