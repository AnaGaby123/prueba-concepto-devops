import {Empresa, Proveedor, ProveedorEmpresa, ProveedorRegalias} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface BuySaleAndLicenses {
  monthsOptions: Array<DropListOption>;
  monthSelected: DropListOption;
  providerNode: Proveedor;
  listProviderCompanies: Array<ProviderCompanyList>;
  listProviderCompaniesToDelete: Array<ProviderCompanyList>;
  licenseForm: ProveedorRegalias;
  providerLicenses: Array<ProveedorRegalias>;
  providerLicensesToDelete: Array<ProveedorRegalias>;
  backUp: BuySaleLicensesBackUp;
  customizedCheck: boolean;
}

export interface ProviderCompanyList extends Empresa {
  selected: boolean;
  providerCompany: ProveedorEmpresa;
}

export interface BuySaleLicensesBackUp {
  providerNode: Proveedor;
  listProviderCompanies: Array<ProviderCompanyList>;
  providerLicenses: Array<ProveedorRegalias>;
  customizedCheck: boolean;
  monthSelected: DropListOption;
}

export const initialBuySaleAndLicenses = (): BuySaleAndLicenses => ({
  monthsOptions: initialMonthsOptions(),
  monthSelected: null,
  providerNode: {} as Proveedor,
  listProviderCompanies: [],
  listProviderCompaniesToDelete: [],
  licenseForm: initialLicense(),
  providerLicenses: [],
  providerLicensesToDelete: [],
  backUp: {
    providerNode: {},
    listProviderCompanies: [],
    providerLicenses: [],
    customizedCheck: null,
    monthSelected: null,
  },
  customizedCheck: false,
});
export const initialLicense = (): ProveedorRegalias => ({
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdProveedor: null,
  Etiqueta: null,
  Porcentaje: null,
  IdProveedorRegalias: DEFAULT_UUID,
});
export const initialMonthsOptions = (): Array<DropListOption> => [
  {value: '1', label: 'Enero'},
  {value: '2', label: 'Febrero'},
  {value: '3', label: 'Marzo'},
  {value: '4', label: 'Abril'},
  {value: '5', label: 'Mayo'},
  {value: '6', label: 'Junio'},
  {value: '7', label: 'Julio'},
  {value: '8', label: 'Agosto'},
  {value: '9', label: 'Septiembre'},
  {value: '10', label: 'Octubre'},
  {value: '11', label: 'Noviembre'},
  {value: '12', label: 'Diciembre'},
];
