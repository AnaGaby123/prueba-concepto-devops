import {OptionBar} from '@appModels/options-bar/options-bar';
import {ITabOption} from '@appModels/botonera/botonera-option';

export interface IInspectorDetails {
  steps: Array<OptionBar>;
  step1: any;
  step2: IStep2Inspector;
  step3: any;
}

export const initialIInspectorDetails = (): IInspectorDetails => ({
  steps: [
    {
      id: 1,
      label: 'Inspecionar Partida',
      isEnable: false,
      isSelected: false,
      number: 1,
      icon: 'assets/Images/check_disabled.svg',
      showIcon: false,
    },
    {
      id: 2,
      label: 'Inspecionar Piezas',
      isEnable: false,
      isSelected: false,
      number: 2,
      icon: 'assets/Images/check_disabled.svg',
      showIcon: false,
    },
    {
      id: 3,
      label: 'Almacenar Productos',
      isEnable: false,
      isSelected: false,
      number: 3,
      icon: 'assets/Images/check_disabled.svg',
      showIcon: false,
    },
  ],
  step1: {},
  step2: initialStep2State(),
  step3: {},
});

export interface IStep2Inspector {
  confirmMessageActive: boolean;
  popWithTabsActive: boolean;
  popTabOptions: Array<ITabOption>;
  popTabSelected: ITabOption;
  editBatch: any;
  nonDispatchablePiece: any;
}

export const initialStep2State = (): IStep2Inspector => ({
  confirmMessageActive: false,
  popWithTabsActive: false,
  popTabOptions: [
    {
      id: '1',
      label: 'Editar Lote',
      activeSubtitle: false,
    },
    {
      id: '2',
      label: 'Pieza no Despachable',
      activeSubtitle: false,
    },
  ],
  popTabSelected: {
    id: '1',
    label: 'Editar Lote',
    activeSubtitle: false,
  },
  editBatch: {},
  nonDispatchablePiece: {},
});
