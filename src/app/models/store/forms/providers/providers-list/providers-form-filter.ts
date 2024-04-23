export interface ProvidersFormFilter {
  id: number;
  label: string;
  selected: string;
  imgUrl: string;
  imgUrlSelected: string;
  filterName: string;
  isSelected: boolean;
  hasOptions: boolean;
  options: Array<ProviderFilterOption>;
}

export interface ProviderFilterOption {
  id: string | boolean;
  name: string;
}

export interface ProviderFilterOptions {
  resultCatTipoDeProducto: Array<ProviderFilterOption>;
  resultAgenteAduanal: Array<ProviderFilterOption>;
  resultCatRutaEntrega: Array<ProviderFilterOption>;
  resultSistemaUsuarios: Array<ProviderFilterOption>;
}

export const initialFiltersState = (): Array<ProvidersFormFilter> => [
  {
    id: 1,
    label: 'Estrategicos',
    selected: 'TODOS',
    imgUrl: 'assets/Images/providers/estrategicos.svg',
    imgUrlSelected: 'assets/Images/providers/hover_estrategicos.svg',
    filterName: 'ExisteRelacionComercial',
    isSelected: false,
    hasOptions: false,
    options: [{name: 'Todos', id: true}],
  },
  {
    id: 2,
    label: 'Tipo de Productos',
    selected: 'TODOS',
    imgUrl: 'assets/Images/providers/producto.svg',
    imgUrlSelected: 'assets/Images/providers/hover_producto.svg',
    filterName: 'IdCatTipoProducto', // 'IdCatCorporativo',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: '-1'}],
  },
  {
    id: 3,
    label: 'Agente aduanal',
    selected: 'TODOS',
    imgUrl: 'assets/Images/providers/agente.svg',
    imgUrlSelected: 'assets/Images/providers/hover_agente.svg',
    filterName: 'IdAgenteAduanal',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: '-1'}],
  },
  {
    id: 4,
    label: 'Proveedores',
    selected: 'TODOS',
    imgUrl: 'assets/Images/providers/proveedores.svg',
    imgUrlSelected: 'assets/Images/providers/hover_proveedores.svg',
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
    label: 'Región',
    selected: 'TODOS',
    imgUrl: 'assets/Images/providers/region.svg',
    imgUrlSelected: 'assets/Images/providers/hover_region.svg',
    filterName: 'IdCatRutaEntrega',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: '-1'}],
  },
  {
    id: 6,
    label: 'Comprador',
    selected: 'TODOS',
    imgUrl: 'assets/Images/providers/comprador.svg',
    imgUrlSelected: 'assets/Images/providers/hover_comprador.svg',
    filterName: 'IdUsuarioComprador',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: '-1'}],
  },
  {
    id: 7,
    label: 'Pagador',
    selected: 'TODOS',
    imgUrl: 'assets/Images/providers/pagador.svg',
    imgUrlSelected: 'assets/Images/providers/hover_pagador.svg',
    filterName: 'IdUsuarioPagador',
    isSelected: false,
    hasOptions: true,
    options: [{name: 'Todos', id: '-1'}],
  },
];
