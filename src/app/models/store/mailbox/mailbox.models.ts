import {
  Archivo,
  ArchivoCorreoRecibido,
  CatClasificacionCorreoRecibido,
  CatClasificacionCorreoRecibidoReferencia,
  Cliente,
  CorreoRecibido,
  CorreoRecibidoCliente,
  CorreoRecibidoClienteReferencia,
  CorreoRecibidoComentario,
  CorreoRecibidoContenido,
  CorreosClientesTotales,
  UrlSubirArchivo,
  VCorreoRecibidoObj,
} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilters} from '@appModels/filters/Filters';
import {PpPedido} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT, MAILBOX_FEATURE_KEY} from '@appUtil/common.protocols';
import * as fromRoot from '@appCore/core.state';
import {initialProviderQueryInfo} from '@appModels/store/forms/providers/providers-list/providers-query-info';
import {QueryInfo} from 'api-finanzas';

export interface AppState extends fromRoot.AppState {
  [MAILBOX_FEATURE_KEY]: MailboxState;
}

export interface MailboxState {
  receivedMailsArray: VCorreoClienteCustom[];
  selectedMail: CorreoRecibidoCustom;
  viewedEmails: CorreoRecibidoCustom[];
  catClassifications: CatClasificacionCorreoRecibidoCustom[];
  searchTerm: string;
  orderValue: DropListOption;
  linkMailActivate: boolean;
  title: string;
  name: string;
  mailIsSelected: boolean;
  currentPage: number;
  totalResults: number;
  isLoading: number;
  isMessageLoading: boolean;
  needsToReload: boolean;
  queryInfo: QueryInfo;
  totalFooter: CorreosClientesTotales;
  deleteMailPop: boolean;
}

export const initialMailBoxState = (): MailboxState => ({
  receivedMailsArray: [] as VCorreoClienteCustom[],
  selectedMail: {} as CorreoRecibidoCustom,
  viewedEmails: [],
  catClassifications: [],
  searchTerm: '',
  orderValue: {
    value: 'desc',
    label: 'Más Nuevos',
  },
  linkMailActivate: false,
  title: 'BUZÓN',
  name: '',
  mailIsSelected: false,
  currentPage: 1,
  totalResults: 0,
  totalFooter: {
    Correos: 0,
    Contactos: 0,
    Documentos: 0,
  },
  isLoading: API_REQUEST_STATUS_DEFAULT,
  isMessageLoading: false,
  needsToReload: true,
  queryInfo: initialProviderQueryInfo(),
  deleteMailPop: false,
});

export interface CorreoRecibidoCustom {
  CorreoRecibido: CorreoRecibido;
  CorreoRecibidoContenido: CorreoRecibidoContenido;
  CorreoRecibidoCliente: CorreoRecibidoClienteCustom[];
  CorreoRecibidoClienteToDelete: CorreoRecibidoClienteCustom[];
  Archivos: Array<ArchivoCustom>;
  Cliente: Cliente;
  UsuariosErrorCartera: DropListOption[];
  DefaultClassificationIsSelected: boolean;
  OCPending: OCPendientesAjusteCustom;
  BlockClassificationEdition: boolean;
  fileIsActive: boolean;
  ocIsActive: boolean;
  fileMessage: string;
  ocMessage: string;
  fileToPreviewIsSelected: boolean;
  ocToPreviewIsSelected: boolean;
  fileToPreviewIsLoading: boolean;
  ocToPreviewIsLoading: boolean;
  vCorreoCliente?: VCorreoClienteCustom;
  correoRecibidoClienteService?: CorreoRecibidoCliente;
  clientsWithSameMail: Array<DropListOption>;
  selectedClientToDrop: DropListOption;
}

export interface CorreoRecibidoClienteCustom
  extends CorreoRecibidoCliente,
    CatClasificacionCorreoRecibido {
  IsSelected: boolean;
  IsSelectedPreviously: boolean;
  ComentariosTemp: string;
  ComentariosReferenciasTemp: string;
  IdArchivo: string;
  ArchivoTemp: any;
  ArchivoTempName: string;
  Subtotal: number;
  Total: number | string;
  Iva: number;
  ErrorDeCartera: boolean;
  hash: string;
  UsuarioErrorCarteraSelect: DropListOption;
  IdPPPedido: string;
  IdArchivoCorreoRecibido: string;
  CatClasificacionCorreoRecibidoReferenciaTemp: DropListOption;
  ClasificacionCorreoRecibido: string;
  CatClasificacionCorreoRecibidoReferencia: CatClasificacionCorreoRecibidoReferenciaCustom[];
  CorreoRecibidoClienteReferencia: CorreoRecibidoClienteReferenciaCustom[];
  CorreoRecibidoComentarios: CorreoRecibidoComentarioCustom[];
}

export interface CorreoRecibidoClienteReferenciaCustom extends CorreoRecibidoClienteReferencia {
  PrefijoComentario: string;
  Comentario: string;
  ClasificacionCorreoRecibido: string;
  Archivo: File;
  ArchivoNombre: string;
  IdArchivo: string;
  IdPPPedidoOrignial: string;
}

export interface CatClasificacionCorreoRecibidoCustom extends CatClasificacionCorreoRecibido {
  CatClasificacionCorreoRecibidoReferencia: CatClasificacionCorreoRecibidoReferencia[];
}

export interface CatClasificacionCorreoRecibidoReferenciaCustom
  extends CatClasificacionCorreoRecibidoReferencia,
    DropListOption {
  IsSelected: boolean;
  Referencia: string;
}

export interface CorreoRecibidoComentarioCustom extends CorreoRecibidoComentario {
  Archivo?: File;
  ArchivoNombre?: string;
  hash?: string;
}

export interface ReclassifiedMail {
  selectedMail?: CorreoRecibidoCustom;
  classifications?: CorreoRecibidoClienteCustom[];
  classificationsToDelete?: CorreoRecibidoClienteCustom[];
  commentsFiles?: FilesCustom;
  referencesFiles?: FilesCustom;
  referencesLinkedFiles?: any[];
  comments?: any[];
  references?: any[];
}

export interface FilesCustom {
  files?: FileCustom[];
  urlUploads?: UrlSubirArchivo[];
  tempUploads?: any[];
  minIOResponse?: any[];
}

export interface FileCustom {
  IdCorreoRecibidoCliente?: string;
  IdCatClasificacionCorreoRecibido?: string;
  IdCatClasificacionCorreoRecibidoReferencia?: string;
  file?: File;
  IdArchivoCorreoRecibido?: string;
  hash: string;
  IdArchivo: string;
  urlUploads?: UrlSubirArchivo;
}

export interface SelectedMail {
  CorreoRecibido?: CorreoRecibido;
  catClasificacionCorreoRecibido?: CatClasificacionCorreoRecibido[];
  CorreoRecibidoCliente?: CorreoRecibidoCliente[];
  ArchivoCorreoRecibido?: ArchivoCorreoRecibido[];
  clientsWithSameMail?: Array<DropListOption>;
  selectedClientToDrop?: DropListOption;
}

export interface VCorreoClienteCustom extends VCorreoRecibidoObj {
  Index: number;
  isSelected: boolean;
}

export interface ArchivoCustom extends Archivo {
  IdArchivoCorreoRecibido: string;
  isLinked: boolean;
  active: boolean;
  Url: string;
}

export interface OCPendientesAjusteCustom {
  OCPending: number;
  OCPendingList: PpPedidoCustom[];
  info: IFilters;
  isLoading: boolean;
  needsToReload: boolean;
}

export interface PpPedidoCustom extends PpPedido {
  Url?: string;
  active?: boolean;
  isLinked?: boolean;
  FileKey?: string;
}
