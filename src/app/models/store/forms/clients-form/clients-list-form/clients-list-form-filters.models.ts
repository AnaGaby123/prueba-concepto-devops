import {DEFAULT_UUID} from '@appUtil/common.protocols';

export interface IClientsFormFilter {
  id: number;
  label: string;
  selected: string;
  imgUrl: string;
  imgUrlSelected: string;
  filterName: string;
  isSelected: boolean;
  hasOptions: boolean;
  options: Array<ClientFilterOption>;
}

export interface ClientFilterOption {
  id: string | boolean;
  name: string;
}

export const initialClientFilterState = (): Array<IClientsFormFilter> => [
  {
    id: 1,
    label: 'Nivel de ingreso',
    selected: 'Todos',
    imgUrl: 'assets/Images/catalogo/nivelingreso.svg',
    imgUrlSelected: 'assets/Images/catalogo/nivel_de_ingreso_hover.svg',
    filterName: 'IdCatNivelIngreso',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: DEFAULT_UUID}],
  },
  {
    id: 2,
    label: 'Corporativo',
    selected: '',
    imgUrl: 'assets/Images/catalogo/coorporativo.svg',
    imgUrlSelected: 'assets/Images/catalogo/corporativo_hover.svg',
    filterName: '', // 'IdCatCorporativo',
    isSelected: false,
    hasOptions: false,
    options: [],
  },
  {
    id: 3,
    label: 'Ruta',
    selected: 'TODOS',
    imgUrl: 'assets/Images/catalogo/ruta_negro.svg',
    imgUrlSelected: 'assets/Images/catalogo/ruta_hover.svg',
    filterName: 'IdCatRutaEntrega',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: DEFAULT_UUID}],
  },
  {
    id: 4,
    label: 'Clientes',
    selected: 'TODOS',
    imgUrl: 'assets/Images/catalogo/cliente_negro.svg',
    imgUrlSelected: 'assets/Images/catalogo/contacto_hover.svg',
    filterName: 'Activo',
    isSelected: true,
    hasOptions: true,
    options: [
      {name: 'Todos', id: '-1'},
      {name: 'Habilitados', id: true},
      {name: 'Deshabilitados', id: false},
    ],
  },
  {
    id: 5,
    label: 'Cuenta Clave',
    selected: '',
    imgUrl: 'assets/Images/catalogo/Cuenta_Clave_negro.svg',
    imgUrlSelected: 'assets/Images/catalogo/cuenta_clave_hover.svg',
    filterName: 'CuentaClave',
    isSelected: false,
    hasOptions: false,
    options: [],
  },
  {
    id: 6,
    label: 'ESAC',
    selected: 'TODOS',
    imgUrl: 'assets/Images/catalogo/ESAC_negro.svg',
    imgUrlSelected: 'assets/Images/catalogo/esac_hover.svg',
    filterName: 'IdUsuarioESAC',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: DEFAULT_UUID}],
  },
  {
    id: 7,
    label: 'EV',
    selected: 'TODOS',
    imgUrl: 'assets/Images/catalogo/ESAC_negro.svg',
    imgUrlSelected: 'assets/Images/catalogo/esac_hover.svg',
    filterName: 'IdUsuarioEVI',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: DEFAULT_UUID}],
  },
];
