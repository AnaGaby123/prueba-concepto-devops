/* Models Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';

export interface IWareHouseDashboard {
  tabs: Array<ITabOption>;
  tabSelected: ITabOption;
}

export const initialIWareHouseDashboard = (): IWareHouseDashboard => ({
  tabs: [
    {
      id: '1',
      label: 'Hoy',
      total: 0,
    },
    {
      id: '2',
      label: 'Mañana',
      total: 0,
    },
    {
      id: '3',
      label: 'Pasado Mañana',
      total: 0,
    },
    {
      id: '4',
      label: 'Futuro',
      total: 0,
    },
    {
      id: '5',
      label: 'Todo',
      total: 0,
    },
  ],
  tabSelected: {
    id: '1',
    label: 'Hoy',
    total: 0,
  },
});
