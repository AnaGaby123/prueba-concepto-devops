import {AttributeDashboard, ProductoRatificacionObj, Resumen} from 'api-logistica';
import {forEach, map} from 'lodash-es';
import {ProviderListItemForRegulatoryResearch} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';
import {addRowIndex} from '@appUtil/util';
import {
  ProductRatificationExtended,
  ProductRatificationExtendedList,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.models';
import {DEFAULT_UUID, ENUM_PRODUCT_FAMILY} from '@appUtil/common.protocols';
import {
  Producto,
  ProductoCapacitacion,
  ProductoDispositivoMedico,
  ProductoEstandar,
  ProductoLabware,
  ProductoPublicacion,
  ProductoReactivo,
  VProductoDetalle,
} from 'api-catalogos';

const buildProvidersFromRegulatoryResearch = (
  providerList: Array<Resumen>,
): Array<ProviderListItemForRegulatoryResearch> => {
  providerList = addRowIndex(0, 0, providerList);
  return map(
    providerList,
    (o: Resumen): ProviderListItemForRegulatoryResearch => {
      const newObject: ProviderListItemForRegulatoryResearch = {
        ...o,
        IdProveedor: o.DescripcionLlave,
      };
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    },
  );
};
const buildProductsFromRegulatoryResearchResponse = (
  productList: Array<ProductoRatificacionObj>,
): ProductRatificationExtendedList => {
  productList = addRowIndex(0, 0, productList);
  return map(
    productList,
    (o: ProductoRatificacionObj, index: number): ProductRatificationExtended => ({
      ...o,
      isSelected: index === 0,
      needsToReloadInfo: true,
      technicalSection: {},
      regulatorySection: {},
      productDetails: null,
      productDetailsBackUp: null,
      IdcotPartidaInvestigacion: '',
      casValid: true,
      brandImage: null,
      imagePresentation: null,
    }),
  );
};
export {buildProvidersFromRegulatoryResearch, buildProductsFromRegulatoryResearchResponse};

export const buildParamsByFamily = (family: string, vProduct: Producto) => {
  if (isProductTraining(family)) {
    const productoCapacitacion: ProductoCapacitacion = {
      Activo: true,
      DescripcionDetallada: null,
      DuracionEvento: null,
      FechaRegistro: vProduct?.FechaRegistro,
      FechaUltimaActualizacion: vProduct?.FechaUltimaActualizacion,
      IdCatMedioDifusion: null,
      IdProducto: null,
      IdProductoCapacitacion: null,
      NumeroDePersonasPorGrupo: null,
      PrecioPorGrupo: null,
      PrecioPorPersona: null,
    };
    return productoCapacitacion;
  }
  return null;
};
export const isProductStandar = (label: string): boolean => {
  return (
    label === ENUM_PRODUCT_FAMILY.standarBiologicNormal ||
    label === ENUM_PRODUCT_FAMILY.standarBiologicNational ||
    label === ENUM_PRODUCT_FAMILY.standarBiologicMundial ||
    label === ENUM_PRODUCT_FAMILY.standarBiologicOrigin ||
    label === ENUM_PRODUCT_FAMILY.standarChemistNormal ||
    label === ENUM_PRODUCT_FAMILY.standarChemistNotional ||
    label === ENUM_PRODUCT_FAMILY.standarChemistMundial ||
    label === ENUM_PRODUCT_FAMILY.standarChemistOrigin
  );
};
export const isStandarAndReactiveBiologic = (label: string): boolean => {
  return (
    label === ENUM_PRODUCT_FAMILY.standarBiologicNormal ||
    label === ENUM_PRODUCT_FAMILY.standarBiologicNational ||
    label === ENUM_PRODUCT_FAMILY.standarBiologicMundial ||
    label === ENUM_PRODUCT_FAMILY.standarBiologicOrigin ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicNormal ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicNational ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicMundial ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicOrigin
  );
};

export const isStandarAndReactiveChemist = (label: string): boolean => {
  return (
    label === ENUM_PRODUCT_FAMILY.standarChemistNormal ||
    label === ENUM_PRODUCT_FAMILY.standarChemistNotional ||
    label === ENUM_PRODUCT_FAMILY.standarChemistMundial ||
    label === ENUM_PRODUCT_FAMILY.standarChemistOrigin ||
    label === ENUM_PRODUCT_FAMILY.reagentChemistNormal ||
    label === ENUM_PRODUCT_FAMILY.reagentChemistNational ||
    label === ENUM_PRODUCT_FAMILY.reagentChemistcMundial ||
    label === ENUM_PRODUCT_FAMILY.reagentChemistOrigin
  );
};

export const isProductReactive = (label: string): boolean => {
  return (
    label === ENUM_PRODUCT_FAMILY.reagentChemistNormal ||
    label === ENUM_PRODUCT_FAMILY.reagentChemistNational ||
    label === ENUM_PRODUCT_FAMILY.reagentChemistcMundial ||
    label === ENUM_PRODUCT_FAMILY.reagentChemistOrigin ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicNormal ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicNational ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicMundial ||
    label === ENUM_PRODUCT_FAMILY.reagentBiologicOrigin
  );
};
export const isProductPublication = (label: string): boolean => {
  return label === ENUM_PRODUCT_FAMILY.publications;
};
export const isProductLabware = (label: string): boolean => {
  return label === ENUM_PRODUCT_FAMILY.labware;
};
export const isProductMedicalDispositive = (label: string): boolean => {
  return label === ENUM_PRODUCT_FAMILY.medicalDevices;
};
export const isProductTraining = (label: string): boolean => {
  return label === ENUM_PRODUCT_FAMILY.training;
};

export const setProductoEstandar = (getValue): ProductoEstandar => {
  return {
    AELC: !!getValue('AELC'),
    Activo: !!getValue('Activo'),
    CAS: getValue('CAS'),
    CarateristicasFisicas: getValue('CarateristicasFisicas'),
    Composicion: getValue('Composicion'),
    DatosToxicologicos: getValue('DatosToxicologicos'),
    FormulaQuimica: getValue('FormulaQuimica'),
    IdArchivoAvisoDeQuimicosEsenciales: getValue('IdArchivoAvisoDeQuimicosEsenciales'),
    IdArchivoCartaDeDisponibilidad: getValue('IdArchivoCartaDeDisponibilidad'),
    IdArchivoCartaDeUso: getValue('IdArchivoCartaDeUso'),
    IdArchivoCicoplafest: getValue('IdArchivoCicoplafest'),
    IdArchivoEstructuraMolecular: getValue('IdArchivoEstructuraMolecular'),
    IdArchivoFichaTecnica: getValue('IdArchivoFichaTecnica'),
    IdArchivoHojaSeguridad: getValue('IdArchivoHojaSeguridad'),
    IdArchivoOtroPermiso: getValue('IdArchivoOtroPermiso'),
    IdArchivoPermisoDeAdquisicionEnPlaza: getValue('IdArchivoPermisoDeAdquisicionEnPlaza'),
    IdArchivoPermisoDeImprotacion: getValue('IdArchivoPermisoDeImprotacion'),
    IdArchivoTratado: getValue('IdArchivoTratado'),
    IdArchivoZoosanitarios: getValue('IdArchivoZoosanitarios'),
    IdCatAplicacion: getValue('IdCatAplicacion'),
    IdCatClasificacionRegulatoria: getValue('IdCatClasificacionRegulatoria'),
    IdCatEstadoFisico: getValue('IdCatEstadoFisico'),
    IdCatManejoAlmacenaje: getValue('IdCatManejoAlmacenaje'),
    IdCatManejoTransporte: getValue('IdCatManejoTransporte'),
    IdCatMedioTransporte: getValue('IdCatMedioTransporte'),
    IdCatRestriccionDeCompra: getValue('IdCatRestriccionDeCompra'),
    IdCatRestriccionFlete: getValue('IdCatRestriccionFlete'),
    IdCatTipoPresentacion: getValue('IdCatTipoPresentacion'),
    IdCatUso: getValue('IdCatUso'),
    IdProducto: getValue('IdProducto'),
    IdProductoEstandar: getValue('IdProductoEstandar') || DEFAULT_UUID,
    NotasRegulatoriasALaImportacion: getValue('NotasRegulatoriasALaImportacion'),
    Pureza: getValue('Pureza'),
    Sinonimos: getValue('Sinonimos'),
    TLCUE: !!getValue('TLCUE'),
    TMEC: !!getValue('TMEC'),
    USMCA: !!getValue('USMCA'),
  };
};
export const setProductoCapacitacion = (getValue): ProductoCapacitacion => {
  return {
    Activo: !!getValue('Activo'),
    DescripcionDetallada: getValue('DescripcionDetallada'),
    DuracionEvento: getValue('DuracionEvento'),
    FechaRegistro: getValue('FechaRegistro'),
    FechaUltimaActualizacion: getValue('FechaUltimaActualizacion'),
    IdCatMedioDifusion: getValue('IdCatMedioDifusion'),
    IdProducto: getValue('IdProducto'),
    IdProductoCapacitacion: getValue('IdProductoCapacitacion') || DEFAULT_UUID,
    NumeroDePersonasPorGrupo: getValue('NumeroDePersonasPorGrupo'),
    PrecioPorGrupo: !!getValue('PrecioPorGrupo'),
    PrecioPorPersona: !!getValue('PrecioPorPersona'),
  };
};
export const setProductoLabware = (getValue): ProductoLabware => {
  return {
    AELC: !!getValue('AELC'),
    Activo: !!getValue('Activo'),
    CAS: getValue('CAS'),
    CarateristicasFisicas: getValue('CarateristicasFisicas'),
    Composicion: getValue('Composicion'),
    DatosToxicologicos: getValue('DatosToxicologicos'),
    FormulaQuimica: getValue('FormulaQuimica'),
    IdArchivoAvisoDeQuimicosEsenciales: getValue('IdArchivoAvisoDeQuimicosEsenciales'),
    IdArchivoCartaDeDisponibilidad: getValue('IdArchivoCartaDeDisponibilidad'),
    IdArchivoCartaDeUso: getValue('IdArchivoCartaDeUso'),
    IdArchivoCicoplafest: getValue('IdArchivoCicoplafest'),
    IdArchivoFichaTecnica: getValue('IdArchivoFichaTecnica'),
    IdArchivoHojaSeguridad: getValue('IdArchivoHojaSeguridad'),
    IdArchivoPermisoDeAdquisicionEnPlaza: getValue('IdArchivoPermisoDeAdquisicionEnPlaza'),
    IdArchivoPermisoDeImprotacion: getValue('IdArchivoPermisoDeImprotacion'),
    IdArchivoTratado: getValue('IdArchivoTratado'),
    IdArchivoZoosanitarios: getValue('IdArchivoZoosanitarios'),
    IdCatAplicacion: getValue('IdCatAplicacion'),
    IdCatClasificacionRegulatoria: getValue('IdCatClasificacionRegulatoria'),
    IdCatEstadoFisico: getValue('IdCatEstadoFisico'),
    IdCatManejoAlmacenaje: getValue('IdCatManejoAlmacenaje'),
    IdCatManejoTransporte: getValue('IdCatManejoTransporte'),
    IdCatMedioTransporte: getValue('IdCatMedioTransporte'),
    IdCatRestriccionDeCompra: getValue('IdCatRestriccionDeCompra'),
    IdCatRestriccionFlete: getValue('IdCatRestriccionFlete'),
    IdCatTipoPresentacion: getValue('IdCatTipoPresentacion'),
    IdCatUso: getValue('IdCatUso'),
    IdProducto: getValue('IdProducto'),
    IdProductoLabware: getValue('IdProductoLabware') || DEFAULT_UUID,
    NotasRegulatoriasALaImportacion: getValue('NotasRegulatoriasALaImportacion'),
    NumeroDeRegistroSanitario: getValue('NumeroDeRegistroSanitario'),
    Pureza: getValue('Pureza'),
    TLCUE: !!getValue('TLCUE'),
    TMEC: !!getValue('TMEC'),
    USMCA: !!getValue('USMCA'),
  };
};
export const setProductoPublicacion = (getValue): ProductoPublicacion => {
  return {
    IdProductoPublicacion: getValue('IdProductoPublicacion') || DEFAULT_UUID,
    IdProducto: getValue('IdProducto'),
    IdCatFormatoPublicacion: getValue('IdCatFormatoPublicacion'),
    Autor: getValue('Autor'),
    IdArchivoFichaTecnica: getValue('IdArchivoFichaTecnica'),
    IdArchivoHojaSeguridad: getValue('IdArchivoHojaSeguridad'),
    IdCatRestriccionFlete: getValue('IdCatRestriccionFlete'),
    IdArchivoTratado: getValue('IdArchivoTratado'),
    USMCA: !!getValue('USMCA'),
    TLCUE: !!getValue('TLCUE'),
    AELC: !!getValue('AELC'),
    TMEC: !!getValue('TMEC'),
    Activo: !!getValue('Activo'),
    ISBN: getValue('ISBN'),
    Edicion: getValue('Edicion'),
    Editorial: getValue('Editorial'),
  };
};
export const setProductoReactivo = (getValue): ProductoReactivo => {
  return {
    AELC: !!getValue('AELC'),
    Activo: !!getValue('Activo'),
    CarateristicasFisicas: getValue('CarateristicasFisicas'),
    Composicion: getValue('Composicion'),
    DatosToxicologicos: getValue('DatosToxicologicos'),
    FormulaQuimica: getValue('FormulaQuimica'),
    IdArchivoAvisoDeQuimicosEsenciales: getValue('IdArchivoAvisoDeQuimicosEsenciales'),
    IdArchivoCartaDeDisponibilidad: getValue('IdArchivoCartaDeDisponibilidad'),
    IdArchivoCartaDeUso: getValue('IdArchivoCartaDeUso'),
    IdArchivoCicoplafest: getValue('IdArchivoCicoplafest'),
    IdArchivoEstructuraMolecular: getValue('IdArchivoEstructuraMolecular'),
    IdArchivoFichaTecnica: getValue('IdArchivoFichaTecnica'),
    IdArchivoHojaSeguridad: getValue('IdArchivoHojaSeguridad'),
    IdArchivoOtroPermiso: getValue('IdArchivoOtroPermiso'),
    IdArchivoPermisoDeAdquisicionEnPlaza: getValue('IdArchivoPermisoDeAdquisicionEnPlaza'),
    IdArchivoPermisoDeImprotacion: getValue('IdArchivoPermisoDeImprotacion'),
    IdArchivoTratado: getValue('IdArchivoTratado'),
    IdArchivoZoosanitarios: getValue('IdArchivoZoosanitarios'),
    IdCatAplicacion: getValue('IdCatAplicacion'),
    IdCatClasificacionRegulatoria: getValue('IdCatClasificacionRegulatoria'),
    IdCatEstadoFisico: getValue('IdCatEstadoFisico'),
    IdCatManejoAlmacenaje: getValue('IdCatManejoAlmacenaje'),
    IdCatManejoTransporte: getValue('IdCatManejoTransporte'),
    IdCatMedioTransporte: getValue('IdCatMedioTransporte'),
    IdCatRestriccionDeCompra: getValue('IdCatRestriccionDeCompra'),
    IdCatRestriccionFlete: getValue('IdCatRestriccionFlete'),
    IdCatTipoPresentacion: getValue('IdCatTipoPresentacion'),
    IdCatUso: getValue('IdCatUso'),
    IdProducto: getValue('IdProducto'),
    IdProductoReactivo: getValue('IdProductoReactivo') || DEFAULT_UUID,
    NotasRegulatoriasALaImportacion: getValue('NotasRegulatoriasALaImportacion'),
    Pureza: getValue('Pureza'),
    Sinonimos: getValue('Sinonimos'),
    TLCUE: !!getValue('TLCUE'),
    TMEC: !!getValue('TMEC'),
    Taxonomia: getValue('Taxonomia'),
    USMCA: !!getValue('USMCA'),
  };
};
export const setProductoMedicalDispositive = (getValue): ProductoDispositivoMedico => {
  return {
    AELC: !!getValue('AELC'),
    Activo: !!getValue('Activo'),
    IdArchivoFichaTecnica: getValue('IdArchivoFichaTecnica'),
    IdArchivoHojaSeguridad: getValue('IdArchivoHojaSeguridad'),
    IdArchivoTratado: getValue('IdArchivoTratado'),
    IdCatManejoAlmacenaje: getValue('IdCatManejoAlmacenaje'),
    IdCatRestriccionDeCompra: getValue('IdCatRestriccionDeCompra'),
    IdCatRestriccionFlete: getValue('IdCatRestriccionFlete'),
    IdProducto: getValue('IdProducto'),
    IdProductoDispositivoMedico: getValue('IdProductoDispositivoMedico') || DEFAULT_UUID,
    NumeroDeRegistroSanitario: getValue('NumeroDeRegistroSanitario'),
    TLCUE: !!getValue('TLCUE'),
    TMEC: !!getValue('TMEC'),
    USMCA: !!getValue('USMCA'),
  };
};

export const getSetterProduct = (nodeRootAfter: string, getValue): any => {
  switch (nodeRootAfter) {
    case 'ProductoEstandar':
      return setProductoEstandar(getValue);
      break;
    case 'ProductoCapacitacion':
      return setProductoCapacitacion(getValue);
      break;
    case 'ProductoLabware':
      return setProductoLabware(getValue);
      break;
    case 'ProductoPublicacion':
      return setProductoPublicacion(getValue);
      break;
    case 'ProductoReactivo':
      return setProductoReactivo(getValue);
      break;
    case 'ProductoDispositivoMedico':
      return setProductoMedicalDispositive(getValue);
      break;
  }
};

export const hasRestrictionsAndRegulations = (producDetails: VProductoDetalle): boolean => {
  if (producDetails?.ProductoReactivo) {
    return true;
  }
  if (producDetails?.ProductoEstandar) {
    return true;
  }
  if (producDetails?.ProductoLabware) {
    return true;
  }
  return false;
};
