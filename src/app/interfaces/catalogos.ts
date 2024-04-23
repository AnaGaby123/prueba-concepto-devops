export interface Cliente {
  Activo: boolean;
  AreaCorporativo: boolean;
  Contrato: string;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
  IdCatCorporativo: string;
  IdCatIndustria: string;
  IdCatMedioDePago: string;
  IdCatNivelIngreso: string;
  IdCatRolCliente: string;
  IdCatImportanciaCliente: string;
  IdCatSector: string;
  IdCliente: string;
  Importancia: number;
  Industria: string;
  MedioDePago: string;
  NivelIngreso: string;
  Nombre: string;
  NombreCatRolCliente: string;
  NombreCorporativo: string;
  ObjetivoCrecimientoDeseado: number;
  ObjetivoCrecimientoFundamental: number;
  Pagina: string;
  PortalFactura: string;
  Sector: string;
  Vendedor: string;
  Alias: string;
  IdUxFaseWizard: string;
  EsTerceroAutorizado: boolean;
  IdConfiguracionPagos: string;
}

export interface ClientesResponse {
  Activo: boolean;
  AreaCorporativo: boolean;
  Contrato: string;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
  IdCatCorporativo: string;
  IdCatIndustria: string;
  IdCatMedioDePago: string;
  IdCatNivelIngreso: string;
  IdCatRolCliente: string;
  IdCatSector: string;
  IdCliente: string;
  Importancia: number;
  Industria: string;
  MedioDePago: string;
  NivelIngreso: string;
  Nombre: string;
  NombreCatRolCliente: string;
  NombreCorporativo: string;
  ObjetivoCrecimientoDeseado: number;
  ObjetivoCrecimientoFundamental: number;
  Pagina: string;
  PortalFactura: string;
  Sector: string;
  Vendedor: string;
  IdUxFaseWizard: string;
  EsTerceroAutorizado: boolean;
  IdConfiguracionPagos: string;
}

export interface Clientes {
  data: Cliente[];
  importancias: any[];
  contacto: any;
  direccion: any[];
  datosPago: any[];
  marcas: Marcas[];
  listaContactos: any[];
}

export function initialClientes(): Clientes {
  return {
    data: [],
    importancias: [],
    contacto: [],
    direccion: [],
    datosPago: [],
    marcas: [],
    listaContactos: [],
  };
}

export interface Marcas {
  IdMarca: string;
  Nombre: string;
  RazonSocial: string;
  IdCatPaisManufactura: string;
  IdDireccion: string;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
  Activo: boolean;
}

export interface State {
  customer: Cliente;
}

export interface Proveedor {
  IdProveedor: string;
  Nombre: string;
  Productos: number;
  Familias: number;
}

export interface Proveedores {
  data: Proveedor[];
}

export function initialProveedores(): Proveedores {
  return {
    data: [],
  };
}

export interface ProvFam {
  IdProveedorFamilia: string;
  IdFamilia: string;
}
