import {map} from 'lodash-es';
import {IBrandItemConfig} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';
import {VSectorIndustriaFamilia} from 'api-catalogos';
import {DEFAULT_DATE} from '@appUtil/common.protocols';

export const buildBrandConfigItem = (
  items: Array<VSectorIndustriaFamilia>,
): Array<IBrandItemConfig> => {
  return map(
    items,
    (o: VSectorIndustriaFamilia): IBrandItemConfig => {
      return {
        ...o,
        original: true,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IdProveedor: o.IdProveedor,
        IdMarcaFamilia: o.IdMarcaFamilia,
      };
    },
  );
};
