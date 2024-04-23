import {
  IDireccion,
  IHorarioAtencion,
  initialDatosDireccionclienteComentario,
  initialIDatosDireccioncliente,
  initialIDireccion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {isEmpty} from 'lodash-es';
import * as moment from 'moment';

export function getAddressFiltered(adressess) {
  const dataFiltered = adressess.Results.map((item) => {
    const direccion: IDireccion = initialIDireccion();
    Object.assign(direccion, item.Direccion);
    Object.assign(direccion.clienteDireccion, item.DireccionCliente);
    direccion.AddressTypeName = item?.catTipoDireccion ? item?.catTipoDireccion.Descripcion : '';
    direccion.PagaGuiaEnvio = item.DireccionCliente.PagaGuiaEnvio;
    direccion.TipoRegion = item?.catRutaEntrega ? item?.catRutaEntrega.RutaEntrega : '';
    if (item?.DatosDireccionCliente) {
      direccion.DeliveryData = initialIDatosDireccioncliente();
      Object.assign(direccion.DeliveryData, item.DatosDireccionCliente);
      Object.assign(direccion.clienteDireccion, item.DireccionCliente);
      if (item?.DatosDireccionCliente?.IdCatDestino && !isEmpty(item?.catTipoDireccion)) {
        direccion.DeliveryData.selectedDestination = {
          value: item?.DatosDireccionCliente.IdCatDestino,
          label: item?.catTipoDireccion.Descripcion,
        };
      }
    }
    if (item?.HorarioAtencionEntrega) {
      direccion.horariosEntrega = getDays(item.HorarioAtencionEntrega);
    }
    if (item?.HorarioAtencionCobro) {
      direccion.horariosCobro = getDays(item.HorarioAtencionCobro);
    }
    if (item?.HorarioAtencionVisita) {
      direccion.horariosVisita = getDays(item.HorarioAtencionVisita);
    }
    if (item?.HorarioAtencionRevision) {
      direccion.horariosRevision = getDays(item.HorarioAtencionRevision);
    }
    /*    direccion.DeliveryDataComments = _.map(direccion.DeliveryDataComments, (o) => {

    })*/
    if (item?.DatosDireccionClienteComentario.length > 0) {
      for (item of item.DatosDireccionClienteComentario) {
        direccion.DeliveryDataComments.push(
          Object.assign(initialDatosDireccionclienteComentario(), item),
        );
      }
    }
    return direccion;
  });
  return dataFiltered;
}

function getDays(item) {
  const array = [];
  if (item.HorarioAtencionLunes) {
    array.push(createObject(item.HorarioAtencionLunes, 'Lunes', true));
  }
  if (item.HorarioAtencionMartes) {
    array.push(createObject(item.HorarioAtencionMartes, 'Martes', true));
  }
  if (item.HorarioAtencionMiercoles) {
    array.push(createObject(item.HorarioAtencionMiercoles, 'Miercoles', true));
  }
  if (item.HorarioAtencionJueves) {
    array.push(createObject(item.HorarioAtencionJueves, 'Jueves', true));
  }
  if (item.HorarioAtencionViernes) {
    array.push(createObject(item.HorarioAtencionViernes, 'Viernes', true));
  }
  return array;
}

function createObject(item, dia, checket) {
  const obj: IHorarioAtencion = {
    IdHorarioAtencion: item.IdHorarioAtencion,
    HoraInicioPrimerHorario:
      moment(item.HoraInicioPrimerHorario, 'H:mm').format('H:mm').toString() || '8:00',
    HoraFinPrimerHorario:
      moment(item.HoraFinPrimerHorario, 'H:mm').format('H:mm').toString() || '14:00',
    HoraInicioSegundoHorario:
      item?.HoraInicioSegundoHorario !== null
        ? moment(item.HoraInicioSegundoHorario, 'H:mm').format('H:mm').toString()
        : null,
    HoraFinSegundoHorario:
      item?.HoraFinSegundoHorario !== null
        ? moment(item.HoraFinSegundoHorario, 'H:mm').format('H:mm').toString()
        : null,
    DosTurnos: item.DosTurnos,
    Activo: item.Activo,
    Dia: dia,
    checked: checket,
  };
  return obj;
}
