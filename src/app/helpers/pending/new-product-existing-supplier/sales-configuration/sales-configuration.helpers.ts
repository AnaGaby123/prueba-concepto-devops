import {forEach, map} from 'lodash-es';
import {addRowIndex, extractID} from '@appUtil/util';
import {AttributeDashboard, Resumen} from 'api-logistica';
import {
  IFamiliesSalesConfig,
  IVMarcaFamiliaIndustriaObj,
} from '@appModels/store/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.models';
import {buildStringFamily} from '@appUtil/strings';
import {
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  VMarcaFamiliaIndustriaObj,
} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

const buildSalesConfigFamilies = (familiesList: Array<Resumen>): Array<IFamiliesSalesConfig> => {
  familiesList = addRowIndex(0, 0, familiesList);
  return map(
    familiesList,
    (o, index): IFamiliesSalesConfig => {
      const newObject: IFamiliesSalesConfig = {
        ...o,
        IdCotPartidaCotizacionInvestigacion: o.DescripcionLlave,
        isSelected: index === 0,
        needsToReload: true,
        configuration: [],
        configurationBackUp: [],
      };
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    },
  );
};
//DOCS: AGREGAR EL NOMBRE DE LA IMAGEN A  LOS ITEMS

const buildAddImageItemsConfigurationSalesConfiguration = (
  itemsConfigurationLogistic: Array<IFamiliesSalesConfig>,
): Array<IFamiliesSalesConfig> => {
  return map(
    itemsConfigurationLogistic,
    (o: IFamiliesSalesConfig): IFamiliesSalesConfig => {
      const newObject: IFamiliesSalesConfig = {
        ...o,
        imageHover: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}_hover.svg`,
        fullFamilyName: buildStringFamily(
          o.CatTipoProductoNombre,
          o.CatSubTipoProductoNombre,
          o.CatControlNombre,
          ' · ',
        ),
      };
      return newObject;
    },
  );
};
const setIndexListConfigurationDetails = (
  items: Array<VMarcaFamiliaIndustriaObj>,
): Array<IVMarcaFamiliaIndustriaObj> =>
  map(
    items,
    (o: IVMarcaFamiliaIndustriaObj, Index): IVMarcaFamiliaIndustriaObj => ({
      ...o,
      Index,
      needsToSave: false,
      inRevision: false,
      habilitado: o.Activo && o.IdMarcaFamiliaCatIndustria !== DEFAULT_UUID,
      isOriginal: o.Activo && o.IdMarcaFamiliaCatIndustria !== DEFAULT_UUID,
      ConfiguracionComisionProveedor: {
        ...o.ConfiguracionComisionProveedor,
        ComisionFrenteComercial:
          o.IdMarcaFamiliaCatIndustria === DEFAULT_UUID
            ? null
            : o.ConfiguracionComisionProveedor.ComisionFrenteComercial,
        ComisionPharma:
          o.IdMarcaFamiliaCatIndustria === DEFAULT_UUID
            ? null
            : o.ConfiguracionComisionProveedor.ComisionPharma,
        FactorDeCostoFijo:
          o.IdMarcaFamiliaCatIndustria === DEFAULT_UUID
            ? null
            : o.ConfiguracionComisionProveedor.FactorDeCostoFijo,
      },
      ConfiguracionPrecioUtilidadCategoriaProveedor: map(
        o.ConfiguracionPrecioUtilidadCategoriaProveedor,
        (
          i: ConfiguracionPrecioUtilidadCategoriaProveedorObj,
        ): ConfiguracionPrecioUtilidadCategoriaProveedorObj => ({
          ...i,
          UtilidadNivelIngreso:
            o.IdMarcaFamiliaCatIndustria === DEFAULT_UUID ? null : i.UtilidadNivelIngreso,
        }),
      ),
    }),
  );
const buildBrandFamilyCatIndustry = (
  item: IVMarcaFamiliaIndustriaObj,
  idBrandFamilyCatIndustry: string,
): IVMarcaFamiliaIndustriaObj => ({
  ...item,
  IdMarcaFamiliaCatIndustria: idBrandFamilyCatIndustry,
  ConfiguracionComisionProveedor: {
    ...item.ConfiguracionComisionProveedor,
    IdMarcaFamiliaCatIndustria: idBrandFamilyCatIndustry,
  },
  ConfiguracionPrecioUtilidadCategoriaProveedor: map(
    item.ConfiguracionPrecioUtilidadCategoriaProveedor,
    (
      i: ConfiguracionPrecioUtilidadCategoriaProveedorObj,
    ): ConfiguracionPrecioUtilidadCategoriaProveedorObj => ({
      ...i,
      IdMarcaFamiliaCatIndustria: idBrandFamilyCatIndustry,
    }),
  ),
});

const buildFamilyFromUtilityPriceResp = (
  ids: string[],
  familyBrandIndustryItem: IVMarcaFamiliaIndustriaObj,
): IVMarcaFamiliaIndustriaObj => ({
  ...familyBrandIndustryItem,
  ConfiguracionPrecioUtilidadCategoriaProveedor: map(
    familyBrandIndustryItem.ConfiguracionPrecioUtilidadCategoriaProveedor,
    (utility, index: number) => ({
      ...utility,
      IdConfiguracionPrecioUtilidadCategoriaProveedor: extractID(ids[index]),
    }),
  ),
  ConfiguracionComisionProveedor: {
    ...familyBrandIndustryItem.ConfiguracionComisionProveedor,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
  },
});

const buildFamilyFromCommissionProviderResp = (
  id: string,
  familyBrandIndustryItem: IVMarcaFamiliaIndustriaObj,
): IVMarcaFamiliaIndustriaObj => ({
  ...familyBrandIndustryItem,
  needsToSave: false,
  isOriginal: true,
  ConfiguracionComisionProveedor: {
    ...familyBrandIndustryItem.ConfiguracionComisionProveedor,
    IdConfiguracionComisionProveedor: extractID(id),
  },
});

enum SALES_CONFIGURATION_FIELDS {
  FactorDeCostoFijo = 'FactorDeCostoFijo',
  ComisionFrenteComercial = 'ComisionFrenteComercial',
  ComisionPharma = 'ComisionPharma',
  AAPlus = 'AA+',
  AA = 'AA',
  MA = 'MA',
  AM = 'AM',
  MM = 'MM',
  AB = 'AB',
  MB = 'MB',
  BAJO = 'BAJO',
  WEB = 'WEB',
  DIST = 'DIST',
}

export {
  SALES_CONFIGURATION_FIELDS,
  buildAddImageItemsConfigurationSalesConfiguration,
  buildBrandFamilyCatIndustry,
  buildFamilyFromCommissionProviderResp,
  buildFamilyFromUtilityPriceResp,
  buildSalesConfigFamilies,
  setIndexListConfigurationDetails,
};
