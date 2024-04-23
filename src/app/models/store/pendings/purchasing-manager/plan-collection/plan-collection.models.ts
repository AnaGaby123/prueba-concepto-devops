import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/*DOCS: TODOS LOS ELEMENTOS SE COLOCARON DE FORMA STATICA PARA PRUEBAS CON EL DISEÑO, CUANDO YA SE TENGA LA ESTRUCTURA
    DE LOS SERVICIOS SE COLOCARAN EN SU LUGAR DEL ESTADO*/
export const TITLE_PLAN_COLLECTION = 'PLANEAR RECOLECCIÓN';

export interface IPlanCollection {
  title: string;
  detailsMode: boolean;
  tabOptions: Array<ITabOption>;
  filterByValue: Array<DropListOption>;
  filterBySearch: Array<DropListOption>;
  selectedByValue: DropListOption;
  selectedBySearch: DropListOption;
}

export const initialPlanCollection = (): IPlanCollection => ({
  title: TITLE_PLAN_COLLECTION,
  detailsMode: false,
  tabOptions: [
    {
      id: '1',
      label: 'TODOS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 7,
    },
    {
      id: '2',
      label: '3 + DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 7,
    },
    {
      id: '3',
      label: '3  DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
    {
      id: '4',
      label: '2 DÍAS',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
    {
      id: '5',
      label: '1 DÍA',
      activeSubtitle: true,
      labelSubtitle: 'PZAS',
      totalSubtitle: 0,
    },
  ],
  filterByValue: [
    {value: '1', label: 'Mayor Valor $'},
    {value: '2', label: 'Mayor Menor $'},
  ],
  filterBySearch: [
    {value: '1', label: 'Proveedor'},
    {value: '2', label: 'Orden de Compra'},
  ],
  selectedByValue: {value: '1', label: 'Mayor Valor $'},
  selectedBySearch: {value: '1', label: 'Proveedor'},
});
