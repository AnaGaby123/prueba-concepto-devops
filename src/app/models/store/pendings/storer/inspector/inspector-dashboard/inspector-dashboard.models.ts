import {ITabOption} from '@appModels/botonera/botonera-option';

export interface IInspectorDashboard {
  tabOptions: Array<ITabOption>;
  selectedTab: ITabOption;
}

export const initialIInspectorDashBoard = (): IInspectorDashboard => ({
  tabOptions: [
    {
      id: '1',
      label: 'Hoy',
      supValue: '1',
    },
    {
      id: '2',
      label: 'Mañana',
      supValue: '1',
    },
    {
      id: '3',
      label: 'Pasado Mañana',
      supValue: '1',
    },
    {
      id: '4',
      label: 'Futuro',
      supValue: '1',
    },
    {
      id: '5',
      label: 'Todo',
      supValue: '1',
    },
  ],
  selectedTab: {
    id: '1',
    label: 'Hoy',
    supValue: '1',
  },
});
