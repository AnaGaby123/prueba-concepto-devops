import {AttributeDashboard, Resumen} from 'api-logistica';
import {forEach, map as _map} from 'lodash-es';

import {addRowIndex, extractID} from '@appUtil/util';
import {IFamilyLogisticConfiguration} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

const buildProvidersFromLogisticConfiguration = (
  providerList: Array<Resumen>,
): Array<IFamilyLogisticConfiguration> => {
  providerList = addRowIndex(0, 0, providerList);
  return _map(providerList, (o) => {
    const newObject = {
      ...o,
      IdCotPartidaCotizacionInvestigacion: o.DescripcionLlave,
    };
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });

    return newObject;
  });
};

//DOCS: AGREGAR EL NOMBRE DE LA IMAGEN A  LOS ITEMS

const buildAddImageItemsConfigurationLogistic = (
  itemsConfigurationLogistic: Array<IFamilyLogisticConfiguration>,
) => {
  return _map(itemsConfigurationLogistic, (o) => {
    const newObject = {
      ...o,
      imageHover: `assets/Images/logos/${o.NombreImagenMarca?.toLowerCase()}_hover.svg`,
    };

    return newObject;
  });
};

//DOCS: VALIDAR INPUT DE CONFIGURACÍON LOGISITCA

const validNumberGreatZeroAndNotNull = (value: number): boolean => value !== null && value >= 0;

/*DOCS: CONSTRUYE EL ARREGLO  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega Y ValorConfiguracionTiempoEntrega*/

const buildResponseSaveChangesConfigurationLogistic = (
  ids: string[],
  family: IFamilyLogisticConfiguration,
): IFamilyLogisticConfiguration => {
  return {
    ...family,
    detailsConfiguration: _map(family.detailsConfiguration, (o, index: number) => {
      return {
        ...o,
        IdConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: extractID(ids[index]),
      };
    }),
    detailConfigurationBackup: _map(family.detailsConfiguration, (o, index: number) => {
      return {
        ...o,
        IdConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: extractID(ids[index]),
      };
    }),
  };
};

export {
  buildProvidersFromLogisticConfiguration,
  buildResponseSaveChangesConfigurationLogistic,
  validNumberGreatZeroAndNotNull,
  buildAddImageItemsConfigurationLogistic,
};
