import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_UUID, ENUM_USER_FUNCTIONS} from '@appUtil/common.protocols';
import {filter, find, forEach, isEmpty, map} from 'lodash-es';
import {
  CorreoRecibidoCustom,
  FilesCustom,
  OCPendientesAjusteCustom,
  ReclassifiedMail,
} from '@appModels/store/mailbox/mailbox.models';
import {
  GMListaArchivosComentariosOReferencia,
  ParametroGeneradorProcesoMailBot,
} from 'api-catalogos';
import {CorreoRecibidoCliente} from 'api-logistica';

export const classificationInitializer = (classifications, idMailRecevide) =>
  map(classifications, (o) => {
    return {
      IsSelected: false,
      IsSelectedPreviously: false,
      CatClasificacionCorreoRecibidoReferencia: [],
      CorreoRecibidoClienteReferencia: [],
      CorreoRecibidoComentarios: [],
      ComentariosTemp: '',
      Subtotal: 0,
      Total: null,
      Iva: 0,
      ArchivoTemp: null,
      ArchivoTempName: '',
      ComentariosReferenciasTemp: '',
      ErrorDeCartera: false,
      UsuarioErrorCarteraSelect: {} as DropListOption,
      CatClasificacionCorreoRecibidoReferenciaTemp: {},
      IdCorreoRecibidoCliente: DEFAULT_UUID,
      IdCorreoRecibido: idMailRecevide,
      IdCliente: DEFAULT_UUID,
      IdCotCotizacion: DEFAULT_UUID,
      IdPcPromesaDeCompra: DEFAULT_UUID,
      IdPPPedido: null,
      IdContactoCliente: DEFAULT_UUID,
      IdFCCPagoCliente: DEFAULT_UUID,
      IdCatClasificacionCorreoRecibido: o.IdCatClasificacionCorreoRecibido,
      ClasificacionCorreoRecibido: o.ClasificacionCorreoRecibido,
      ...o,
    };
  });

// DOCS: CONTRUYE EL OBJETO QUE SE UTILIZA PARA LA TRANSACCIÓN DEL GUARDADO
export const buildParametroGeneradorProcesoMailBot = (
  reclassifiedMail: ReclassifiedMail,
  functions: Array<string>,
): ParametroGeneradorProcesoMailBot => {
  const classification = find(
    reclassifiedMail.classifications,
    (o) =>
      // (o.IsSelected && o.IsSelectedPreviously) ||
      !isEmpty(o.CorreoRecibidoComentarios) || !isEmpty(o.CorreoRecibidoClienteReferencia),
  );
  const others = classification
    ? filter(
        reclassifiedMail.classifications,
        (o) =>
          o.IdCatClasificacionCorreoRecibido !== classification.IdCatClasificacionCorreoRecibido,
      )
    : reclassifiedMail.classifications;
  const IdCorreoRecibido = reclassifiedMail.selectedMail.CorreoRecibido.IdCorreoRecibido;
  const commentsAndReferences = [];
  if (!isEmpty(reclassifiedMail.comments)) {
    forEach(reclassifiedMail.comments, (o) => commentsAndReferences.push(o));
  }
  if (!isEmpty(reclassifiedMail.commentsFiles)) {
    forEach(reclassifiedMail.commentsFiles.files, (o) => commentsAndReferences.push(o));
  }
  if (!isEmpty(reclassifiedMail.references)) {
    forEach(reclassifiedMail.references, (o) => commentsAndReferences.push(o));
  }
  if (!isEmpty(reclassifiedMail.referencesFiles)) {
    forEach(reclassifiedMail.referencesFiles.files, (o) => commentsAndReferences.push(o));
  }
  if (!isEmpty(reclassifiedMail.referencesLinkedFiles)) {
    forEach(reclassifiedMail.referencesLinkedFiles, (o) => commentsAndReferences.push(o));
  }
  return {
    AnalistaDeCuentasPorCobrar:
      filter(functions, (o: string) => o === ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar)
        .length > 0,
    CoordinadorDeServicioAlCliente:
      filter(
        functions,
        (o: string) => o === ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente,
      ).length > 0,
    CorreoRecibidoCliente: classification
      ? {
          Activo: true,
          IdCorreoRecibidoCliente: classification.IdCorreoRecibidoCliente,
          IdCatClasificacionCorreoRecibido: classification.IdCatClasificacionCorreoRecibido,
          IdCorreoRecibido: classification.IdCorreoRecibido,
          IdContactoCliente: classification.IdContactoCliente,
          IdCliente: classification.IdCliente,
          FechaRegistro: classification.FechaRegistro,
          FechaUltimaActualizacion: classification.FechaUltimaActualizacion,
          IdContacto: classification.IdContacto,
          IdUsuario: classification.IdUsuario,
          Leido: classification.Leido,
          Procesado: classification.Procesado,
        }
      : null,
    ListaCorreoRecibidoCliente: map(
      others,
      (o): CorreoRecibidoCliente => {
        return {
          Activo: true,
          IdCorreoRecibidoCliente: DEFAULT_UUID,
          IdCatClasificacionCorreoRecibido: o.IdCatClasificacionCorreoRecibido,
          IdCorreoRecibido: o.IdCorreoRecibido,
          IdContactoCliente: o.IdContactoCliente,
          IdCliente: o.IdCliente,
          FechaRegistro: o.FechaRegistro,
          FechaUltimaActualizacion: o.FechaUltimaActualizacion,
          IdContacto: o.IdContacto,
          IdUsuario: o.IdUsuario,
          Leido: o.Leido,
          Procesado: o.Procesado,
        };
      },
    ),
    ESAC: filter(functions, (o: string) => o === ENUM_USER_FUNCTIONS.functionEsac).length > 0,
    EVE: filter(functions, (o: string) => o === ENUM_USER_FUNCTIONS.functionEve).length > 0,
    EVI: filter(functions, (o: string) => o === ENUM_USER_FUNCTIONS.functionEvi).length > 0,
    IdCorreoRecibido: reclassifiedMail.selectedMail.CorreoRecibido.IdCorreoRecibido,
    ListaArchivosComentariosOReferencias: map(
      commentsAndReferences,
      (o): GMListaArchivosComentariosOReferencia => {
        return {
          ArchivoCorreoRecibido: o.Archivo
            ? {
                IdArchivoCorreoRecibido: DEFAULT_UUID,
                IdCorreoRecibido,
                IdArchivo: o.IdArchivo,
                Activo: true,
                Mostrar: false,
                FechaRegistro: o.FechaRegistro,
                FechaUltimaActualizacion: o.FechaUltimaActualizacion,
              }
            : null,
          CorreoRecibidoClienteReferencia:
            o.Referencia !== undefined
              ? {
                  Activo: true,
                  Comentario: o.Comentario,
                  IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
                  IdArchivoCorreoRecibido: o.IdArchivoCorreoRecibido,
                  FechaRegistro: o.FechaRegistro,
                  FechaUltimaActualizacion: o.FechaUltimaActualizacion,
                  IdCatClasificacionCorreoRecibidoReferencia:
                    o.IdCatClasificacionCorreoRecibidoReferencia,
                  IdCorreoRecibidoClienteReferencia: o.IdCorreoRecibidoClienteReferencia,
                  Referencia: o.Referencia,
                  Iva: o.Iva,
                  Total: o.Total,
                  Subtotal: o.Subtotal,
                  IdPPPedidoOriginal: o.IdPPPedidoOriginal,
                }
              : null,
          CorreoRecibidoComentario:
            o.Referencia === undefined
              ? {
                  Activo: true,
                  Comentario: o.Comentario,
                  IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
                  FechaRegistro: o.FechaRegistro,
                  FechaUltimaActualizacion: o.FechaUltimaActualizacion,
                  IdArchivoCorreoRecibido: o.IdArchivoCorreoRecibido || DEFAULT_UUID,
                  IdCorreoRecibidoComentario: o.IdCorreoRecibidoComentario,
                }
              : null,
        };
      },
    ),
  };
};
export const separateReferencesComments = (items) => {
  const commentsFiles: FilesCustom = {
    files: [],
  };
  const referencesFiles: FilesCustom = {
    files: [],
  };
  const comments: any[] = [];
  const references: any[] = [];
  const referencesLinkedFiles: any[] = [];

  forEach(items, (o) => {
    if (!isEmpty(o.CorreoRecibidoComentarios)) {
      forEach(o.CorreoRecibidoComentarios, (i) => {
        if (i.Archivo) {
          commentsFiles.files.push({
            ...i,
            IdCatClasificacionCorreoRecibido: o.IdCatClasificacionCorreoRecibido,
            IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
            file: i.Archivo,
          });
        } else {
          comments.push({...i, IdArchivoCorreoRecibido: DEFAULT_UUID});
        }
      });
    }
    if (!isEmpty(o.CorreoRecibidoClienteReferencia)) {
      forEach(o.CorreoRecibidoClienteReferencia, (i) => {
        if (i.Archivo) {
          referencesFiles.files.push({
            ...i,
            IdCatClasificacionCorreoRecibido: o.IdCatClasificacionCorreoRecibido,
            IdCatClasificacionCorreoRecibidoReferencia:
              i.IdCatClasificacionCorreoRecibidoReferencia,
            IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
            file: i.Archivo,
          });
        }
        if (!i.Archivo && i.IdArchivo) {
          referencesLinkedFiles.push({
            ...i,
          });
        }
        if (!i.Archivo && !i.IdArchivo) {
          references.push({
            ...i,
            IdArchivoCorreoRecibido: DEFAULT_UUID,
          });
        }
      });
    }
  });
  return {
    commentsFiles,
    referencesFiles,
    referencesLinkedFiles,
    comments,
    references,
  };
};
export const setVoidMaill = (selectedMailContent): CorreoRecibidoCustom => ({
  CorreoRecibido: {},
  CorreoRecibidoContenido: {},
  CorreoRecibidoCliente: [],
  CorreoRecibidoClienteToDelete: [],
  Archivos: [],
  Cliente: {},
  DefaultClassificationIsSelected: false,
  OCPending: {} as OCPendientesAjusteCustom,
  UsuariosErrorCartera: [] as DropListOption[],
  BlockClassificationEdition: false,
  fileIsActive: false,
  ocIsActive: false,
  fileMessage: 'SELECCIONA UN ARCHIVO',
  ocMessage: 'SELECCIONA UN ARCHIVO',
  fileToPreviewIsSelected: false,
  ocToPreviewIsSelected: false,
  fileToPreviewIsLoading: false,
  ocToPreviewIsLoading: false,
  vCorreoCliente: selectedMailContent,
  clientsWithSameMail: [],
  selectedClientToDrop: null,
});
