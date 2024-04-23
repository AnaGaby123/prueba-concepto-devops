import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {CatUnidad} from 'api-catalogos';

export const catUnidadBuildDropListOptions = (list: CatUnidad[]): DropListOptionPqf[] => {
  return list.map((it) => {
    return {
      id: it.IdCatUnidad,
      label: it.Unidad,
    };
  });
};
