import {CatClasificacionInformativaProducto} from 'api-catalogos';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';

export const catClasificacionInformativaBuildDropListOptions = (
  list: CatClasificacionInformativaProducto[],
): DropListOptionPqf[] => {
  return list.map((it) => {
    return {
      id: it.IdCatClasificacionInformativaProducto,
      label: it.Clasificacion,
    };
  });
};

const formatClassification = (label: string, addPoints = true) => {
  let arrayLabel = label.trim().split(' ');
  let newLabel = '';
  arrayLabel = arrayLabel.filter((it) => !it.includes('N/A'));
  const maxTypes = arrayLabel.length - 1;
  arrayLabel.forEach((it: string, index: number) => {
    newLabel += it.trim();
    if (maxTypes > index && addPoints) {
      newLabel += ' · ';
    } else {
      newLabel += ' ';
    }
  });

  return newLabel.trim();
};

export const formatListFamily = (list: DropListOptionPqf[]): DropListOptionPqf[] => {
  return list.map((it) => {
    it.label = formatClassification(it.label, !it.label.startsWith('Dispositivo'));
    return it;
  });
};
