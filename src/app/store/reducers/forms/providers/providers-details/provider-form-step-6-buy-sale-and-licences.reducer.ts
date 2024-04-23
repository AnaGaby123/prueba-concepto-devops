import {createReducer, on} from '@ngrx/store';
import {
  BuySaleAndLicenses,
  initialBuySaleAndLicenses,
  initialLicense,
  ProviderCompanyList,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.model';
import {filter, find, isEmpty, isEqual, map} from 'lodash-es';

import {buySaleProviderActions} from '@appActions/forms/providers';
import {ProveedorEmpresa, ProveedorRegalias} from 'api-catalogos';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

const initialStateBuySaleAndLicenses: BuySaleAndLicenses = {
  ...initialBuySaleAndLicenses(),
};

export const buySaleAndLicensesReducer = createReducer(
  initialStateBuySaleAndLicenses,
  on(buySaleProviderActions.FETCH_PROVIDER_SUCCESS, (state, {providerNode, months}) => {
    const monthSelected: DropListOption = find(
      months,
      (o: DropListOption) => o.value === providerNode.MesInicioFiscal.toString(),
    );
    return {
      ...state,
      providerNode: {
        ...providerNode,
        MesInicioFiscal: !isEmpty(monthSelected) ? Number(monthSelected.value) : 0,
      },
      customizedCheck: !!providerNode.MesInicioFiscal,
      monthSelected: monthSelected ? monthSelected : null,
    };
  }),
  on(buySaleProviderActions.SET_MONTH, (state, {month}) => ({
    ...state,
    monthSelected: month,
    providerNode: {
      ...state.providerNode,
      MesInicioFiscal: !isEmpty(month) ? Number(month.value) : 0,
    },
  })),
  on(
    buySaleProviderActions.SET_CUSTOMIZED_CHECK,
    (state: BuySaleAndLicenses, {value}): BuySaleAndLicenses => ({
      ...state,
      customizedCheck: value,
      monthSelected: null,
      providerNode: {
        ...state.providerNode,
        MesInicioFiscal: 0,
      },
    }),
  ),
  on(buySaleProviderActions.GET_PROVIDER_COMPANIES_DATA_SUCCESS, (state, {providerCompanies}) => ({
    ...state,
    listProviderCompanies: providerCompanies,
  })),
  on(buySaleProviderActions.GET_PROVIDER_LICENSES_DATA_SUCCESS, (state, {providerLicenses}) => ({
    ...state,
    providerLicenses,
  })),
  on(
    buySaleProviderActions.SET_BUY_SALE_LICENSES_BACKUP,
    (state: BuySaleAndLicenses, action): BuySaleAndLicenses => ({
      ...state,
      backUp: {
        ...state.backUp,
        providerNode: state.providerNode,
        listProviderCompanies: state.listProviderCompanies,
        providerLicenses: state.providerLicenses,
        customizedCheck: state.customizedCheck,
        monthSelected: state.monthSelected,
      },
    }),
  ),
  on(buySaleProviderActions.SET_NEW_LICENSE_DATA, (state, {input, value}) => {
    return {
      ...state,
      licenseForm: {
        ...state.licenseForm,
        [input]: value,
        IdProveedor: state.providerNode.IdProveedor,
      },
    };
  }),
  on(buySaleProviderActions.SET_LICENSE_FORM, (state) => ({
    ...state,
    providerLicenses: [...state.providerLicenses, state.licenseForm],
    licenseForm: initialLicense(),
  })),
  on(buySaleProviderActions.UPDATE_COMPANY_INFO, (state, {company, value}) => ({
    ...state,
    listProviderCompanies: map(
      state.listProviderCompanies,
      (o: ProviderCompanyList): ProviderCompanyList => {
        const prueba = {...o.providerCompany} as ProveedorEmpresa;
        if (o.IdEmpresa === company) {
          if (value) {
            return {
              ...o,
              providerCompany: {
                ...prueba,
                NumeroCliente: '',
              },
              selected: value,
            };
          } else {
            return {
              ...o,
              providerCompany: {
                ...prueba,
                NumeroCliente: null,
              },
              selected: value,
            };
          }
        }
        return o;
      },
    ),
  })),
  on(buySaleProviderActions.SET_CLIENT_NUMBER, (state, {IdEmpresa, value}) => ({
    ...state,
    listProviderCompanies: map(
      state.listProviderCompanies,
      (o: ProviderCompanyList): ProviderCompanyList => {
        if (o.IdEmpresa === IdEmpresa) {
          return {
            ...o,
            providerCompany: {
              ...o.providerCompany,
              NumeroCliente: value,
            },
          };
        }
        return o;
      },
    ),
  })),
  on(buySaleProviderActions.SAVE_PROVIDER_DATA_LOAD, (state) => ({
    ...state,
    listProviderCompaniesToDelete: filter(
      state.listProviderCompanies,
      (o: ProviderCompanyList) =>
        !o.selected && o.providerCompany.IdProveedorEmpresa !== DEFAULT_UUID,
    ),
    providerLicensesToDelete: filter(state.providerLicenses, (o: ProveedorRegalias) => !o.Activo),
  })),
  on(
    buySaleProviderActions.SET_PROVIDER_DATA,
    (state: BuySaleAndLicenses, {input, value}): BuySaleAndLicenses => {
      if (input === 'CompraEnLinea') {
        return {
          ...state,
          providerNode: {
            ...state.providerNode,
            CompraEnLinea: value,
            CompraTradicional: !value,
          },
        };
      }
      if (input === 'CompraTradicional') {
        return {
          ...state,
          providerNode: {
            ...state.providerNode,
            CompraEnLinea: !value,
            CompraTradicional: value,
          },
        };
      }
      if (input === 'IdCatMonedaPagos') {
        return {
          ...state,
          providerNode: {
            ...state.providerNode,
            FactorConversion:
              value === state.providerNode.IdCatMonedaVentas
                ? null
                : state.providerNode.FactorConversion,
            [input]: value,
          },
        };
      }
      if (input === 'IdCatMonedaVentas') {
        return {
          ...state,
          providerNode: {
            ...state.providerNode,
            FactorConversion:
              value === state.providerNode.IdCatMonedaPagos
                ? null
                : state.providerNode.FactorConversion,
            [input]: value,
          },
        };
      }
      return {
        ...state,
        providerNode: {
          ...state.providerNode,
          [input]: value,
        },
      };
    },
  ),
  on(
    buySaleProviderActions.EDIT_ITEM_CHECKED,
    (state, {item, value}): BuySaleAndLicenses => ({
      ...state,
      providerLicenses: map(
        state.providerLicenses,
        (o: ProveedorRegalias): ProveedorRegalias => {
          if (isEqual(o, item)) {
            return {
              ...o,
              Activo: value,
            };
          }
          return o;
        },
      ),
    }),
  ),
  on(buySaleProviderActions.RESTORE_BUY_SALE_LICENSES_BACKUP, (state) => ({
    ...state,
    providerNode: state.backUp.providerNode,
    listProviderCompanies: state.backUp.listProviderCompanies,
    providerLicenses: state.backUp.providerLicenses,
    customizedCheck: state.backUp.customizedCheck,
    monthSelected: state.backUp.monthSelected,
  })),
  on(buySaleProviderActions.SET_ID_PROVEEDOR_EMPRESA, (state, {IdProveedorEmpresa, index}) => ({
    ...state,
    listProviderCompanies: map(
      state.listProviderCompanies,
      (o: ProviderCompanyList, i): ProviderCompanyList => {
        if (i === index) {
          return {
            ...o,
            providerCompany: {
              ...o.providerCompany,
              IdProveedorEmpresa,
            },
          };
        }
        return o;
      },
    ),
  })),
  on(buySaleProviderActions.DISABLE_PROVIDER_COMPANY_SUCCESS, (state, {companies}) => ({
    ...state,
    listProviderCompanies: map(
      state.listProviderCompanies,
      (o: ProviderCompanyList): ProviderCompanyList => {
        return find(companies, (c: ProviderCompanyList) => o.IdEmpresa === c.IdEmpresa)
          ? {
              ...o,
              providerCompany: {
                ...o.providerCompany,
                IdProveedorEmpresa: DEFAULT_UUID,
              },
            }
          : o;
      },
    ),
  })),
  on(buySaleProviderActions.SET_ID_PROVEEDOR_REGALIAS, (state, {IdProveedorRegalias, index}) => ({
    ...state,
    providerLicenses: map(
      state.providerLicenses,
      (o: ProveedorRegalias, i): ProveedorRegalias => {
        if (i === index) {
          return {
            ...o,
            IdProveedorRegalias,
          };
        }
        return o;
      },
    ),
  })),
  on(buySaleProviderActions.DISABLE_LICENSES_SUCCESS, (state) => ({
    ...state,
    providerLicensesToDelete: [],
  })),
  on(buySaleProviderActions.CLEAN_STATE, (state) => ({
    ...initialBuySaleAndLicenses(),
  })),
);
