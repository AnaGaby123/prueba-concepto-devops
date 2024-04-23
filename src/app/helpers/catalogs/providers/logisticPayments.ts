import {RutaEntrega} from '@appModels/store/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.model';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

export function pathCat(list) {
  const listAux: RutaEntrega[] = [];
  list.forEach((item, index) => {
    listAux.push({
      id: item.IdCatRutaEntrega,
      ValorEsperado: 0,
      name: item.RutaEntrega,
      IdValorConfiguracionTiempoEntrega: DEFAULT_UUID,
      identificador: index,
      idSelected: '',
      IdConfiguracionTiempoEntregaProveedor: DEFAULT_UUID,
      FechaRegistro: item.FechaRegistro,
      FechaUltimaActualizacion: item.FechaUltimaActualizacion,
    });
  });
  return listAux;
}
