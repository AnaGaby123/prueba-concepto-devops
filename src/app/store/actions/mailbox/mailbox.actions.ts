import {createAction, props} from '@ngrx/store';
import {
  CatClasificacionCorreoRecibidoReferencia,
  Cliente,
  CorreoRecibido,
  CorreoRecibidoCliente,
  CorreoRecibidoClienteReferencia,
  CorreoRecibidoContenido,
  CorreosClientesTotales,
  ParametroGeneradorProcesoMailBot,
} from 'api-catalogos';
import {
  ArchivoCustom,
  CorreoRecibidoClienteCustom,
  CorreoRecibidoCustom,
  PpPedidoCustom,
} from '@appModels/store/mailbox/mailbox.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Mailbox';
const typeApi = 'MailboxApi';

// TODO: Acciones para obtener el estado inicial del componente
export const GET_MAILBOX_CLASSIFICATIONS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox clasifications success'),
  props<{classifications: any[]; IdCorreoRecibido: string}>(),
);
export const GET_MAILBOX_CLASSIFICATIONS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox clasifications failed'),
);
export const GET_MAILBOX_CLASSIFICATIONS_REFERENCES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox clasifications references success'),
  props<{
    referenceClassifications: CatClasificacionCorreoRecibidoReferencia[];
  }>(),
);
export const GET_MAILBOX_CLASSIFICATIONS_REFERENCES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox clasifications references failed'),
);
export const CLEAN_ALL_MAILBOX_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean All Mail Box State'),
);
// TODO: Acciones para obtener la lista de correos
export const GET_MAILBOX_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Mailbox list load'),
  props<{isFirstPage: boolean}>(),
);
export const GET_MAILBOX_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox list success'),
  props<{mails: any[]}>(),
);
export const GET_MAILBOX_LIST_LENGHT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox list lenght success'),
  props<{totalResults: number}>(),
);
export const GET_MAILBOX_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox list failed'),
);
export const GET_MAILBOX_LIST_NULL = createAction(
  buildingStringActionType(typeReducer, 'Get Mailbox list null'),
);

// TODO: Acciones para obtener la información de un correo
export const GET_SELECTED_MAIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get selected mail load'),
  props<{mailId: string}>(),
);
export const FIND_CLIENTS_WITH_SAME_MAIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'find clients with same mail load'),
  props<{IdCorreoRecibido: string}>(),
);
export const FIND_CLIENTS_WITH_SAME_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Find clients with same mail success'),
  props<{clients: Array<DropListOption>}>(),
);
export const GET_SELECTED_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get selected mail success'),
  props<{mail: CorreoRecibido}>(),
);
export const SET_VIEWED_MAIL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set viewed mail load'),
);
export const SET_VIEWED_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set viewed mail success'),
  props<{mail: CorreoRecibidoCustom}>(),
);
export const GET_SELECTED_MAIL_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get selected mail failed'),
);
export const GET_MAIL_CONTENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get mail content success'),
  props<{CorreoRecibidoCont: CorreoRecibidoContenido}>(),
);
export const GET_MAIL_CONTENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get mail content failed'),
);
export const GET_MAIL_CLIENT_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get mail client-mail success'),
  props<{CorreoRecibidoCliente: CorreoRecibidoCliente}>(),
);
export const GET_MAIL_CLIENT_MAIL_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get mail client-mail failed'),
);
export const GET_MAIL_CLIENT_MAIL_REFERENCE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get mail client-mail-reference success'),
  props<{CorreoRecibidoClienteReferencia: CorreoRecibidoClienteReferencia}>(),
);
export const GET_MAIL_CLIENT_MAIL_REFERENCE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get mail client-mail-reference failed'),
);
export const GET_MAIL_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get mail client success'),
  props<{IdCorreoRecibido: string; Cliente: Cliente}>(),
);
export const GET_MAIL_CLIENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get mail client failed'),
);
export const GET_MAIL_FILES_ARRAY_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get mail files array failed'),
);
export const GET_MAIL_FILES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get mail files success'),
  props<{Archivo: ArchivoCustom; IdArchivoCorreoRecibido: string}>(),
);
export const GET_MAIL_FILES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get mail files failed'),
);
export const GET_SELECTED_FULL_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get selected full mail success'),
  props<{mail: CorreoRecibidoCustom}>(),
);
export const GET_URL_TO_DOWNLOAD_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get url to download mail file load'),
  props<{IdArchivo: string}>(),
);
export const GET_URL_TO_DOWNLOAD_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get url to download mail file success'),
  props<{IdArchivo: string; Url: string}>(),
);
export const GET_URL_TO_DOWNLOAD_FILE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get url to download mail file failed'),
);
export const GET_CLIENT_OC_PENDING_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get total of OC pending load'),
  props<{IdCliente: string}>(),
);
export const GET_CLIENT_OC_PENDING_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get total of OC pending success'),
  props<{OCPending: number}>(),
);
export const GET_CLIENT_OC_PENDING_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get total of OC pending failed'),
);
export const GET_LIST_CLIENT_OC_PENDING_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get list of OC pending load'),
);
export const GET_LIST_CLIENT_OC_PENDING_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get list of OC pending success'),
  props<{OCPendingList: PpPedidoCustom[]}>(),
);
export const GET_LIST_CLIENT_OC_PENDING_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get list of OC pending failed'),
);
export const GET_URL_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get url file load'),
  props<{IdArchivo: string; IdPPPedido?: string; fileType: string}>(),
);
export const GET_URL_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get url file success'),
  props<{IdArchivo: string; Url: string}>(),
);
export const GET_URL_FILE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get url file failed'),
);
export const GET_URL_OC_PENDING_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get url oc pending success'),
  props<{IdArchivo: string; FileKey?: string; Url: string}>(),
);
export const SET_OC_CLIENT_LINKED = createAction(
  buildingStringActionType(typeReducer, 'Set OC client linked'),
);
export const QUIT_URLS_OF_FILES_OCPENDING = createAction(
  buildingStringActionType(typeReducer, 'Quit all the urls'),
);
export const GET_USER_ERROR_CARTERA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get users error de cartera load'),
);
export const GET_USER_ERROR_CARTERA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get users error de cartera success'),
  props<{usersWalletError: DropListOption[]}>(),
);
export const GET_USER_ERROR_CARTERA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get users error de cartera failed'),
);

// TODO: Acciones para reclasificar el correo
export const SAVE_RECLASSIFIED_MAIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save reclassified mail load'),
);
export const SAVE_RECLASSIFIED_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save reclassified mail success'),
);
export const SAVE_RECLASSIFIED_MAIL_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save reclassified mail failed'),
);
export const DELETE_CLIENT_RECEIVED_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete client received mail success'),
);
export const DELETE_CLIENT_RECEIVED_MAIL_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Delete client received mail failed'),
);
export const SAVE_RECLASSIFIED_MAIL_COMMENTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save reclassified mail comments success'),
);
export const SAVE_RECLASSIFIED_MAIL_COMMENTS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save reclassified mail comments failed'),
);
export const DELETE_MAIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Delete mailbox mail load'),
  props<{spam: boolean}>(),
);
export const SHOW_DELETE_MAIL_POP = createAction(
  buildingStringActionType(typeReducer, 'show delete mail pop'),
  props<{value: boolean}>(),
);
export const DELETE_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Delete mailbox mail success'),
);
export const DELETE_MAIL_FAILED = createAction(
  buildingStringActionType(typeApi, 'Delete mailbox mail failed'),
);

// TODO: Acciones para manejar el Store
export const SET_MAILBOX_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox title'),
  props<{title: string}>(),
);
export const SET_MAILBOX_NAME = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox name'),
  props<{name: string}>(),
);
export const SET_MAILBOX_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox backup'),
);
export const SET_ORDER_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox order value'),
  props<{orderValue: DropListOption}>(),
);
export const SET_CURRENT_PAGE = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox current page'),
  props<{currentPage: number}>(),
);
export const SET_MAILBOX_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox search term'),
  props<{searchTerm: string}>(),
);
export const SET_MAIL_IS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set mail is selected'),
  props<{mailIsSelected: boolean}>(),
);
export const SET_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set is loading'),
  props<{isLoading: number}>(),
);
export const SET_IS_MESSAGE_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set is message loading'),
  props<{isMessageLoading: boolean}>(),
);
export const SET_EMAIL_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set email selected'),
  props<{idEmail}>(),
);
export const SET_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set needs to reload'),
  props<{needsToReload: boolean}>(),
);
export const SET_LINK_MAIL_ACTIVATE = createAction(
  buildingStringActionType(typeReducer, 'Set link mail is active'),
  props<{linkMailActive: boolean}>(),
);
export const SET_MAIL_READ_BY_ROL = createAction(
  buildingStringActionType(typeReducer, 'Set mail read by rol'),
  props<{IdCorreoRecibido: string; Functions: string[]}>(),
);
export const SET_MAIL_READ_BY_ROL_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set mail read by rol failed'),
);
export const GET_SELECTED_MAIL_NULL = createAction(
  buildingStringActionType(typeReducer, 'Get selected mail null'),
);
export const SET_MAILBOX_WALLET_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox wallet error'),
  props<{IdCatClasificacionCorreoRecibido: string; value: boolean}>(),
);
export const SET_MAILBOX_USER_WALLET_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox user wallet error'),
  props<{IdCatClasificacionCorreoRecibido: string; user: DropListOption}>(),
);
export const SET_MAILBOX_CLASSIFICATION = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox classification'),
  props<{IdCatClasificacionCorreoRecibido: string; value: boolean}>(),
);
export const SET_MAILBOX_CLASSIFICATION_DEFAULT_IS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox classification default is selected'),
  props<{value: boolean}>(),
);
export const BLOCK_CLASSIFICATIONS_EDITION = createAction(
  buildingStringActionType(typeReducer, 'Block classification edition'),
  props<{value: boolean}>(),
);
export const QUIT_ALL_MAILBOX_CLASSIFICATION = createAction(
  buildingStringActionType(typeReducer, 'Quit all mailbox classification'),
);
export const SET_MAILBOX_CLASSIFICATION_COMMENTS = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox comments classification'),
  props<{
    IdCatClasificacionCorreoRecibido: string;
    Comentario: string;
    NombreArchivo?: string;
    IsUnique?: boolean;
  }>(),
);
export const QUIT_MAILBOX_CLASSIFICATION_COMMENTS = createAction(
  buildingStringActionType(typeReducer, 'Quit mailbox comments classification'),
  props<{IdCatClasificacionCorreoRecibido: string; Index: number}>(),
);
export const QUIT_MAILBOX_TEMP_FILE = createAction(
  buildingStringActionType(typeReducer, 'Quit mailbox comments classification'),
  props<{IdCatClasificacionCorreoRecibido: string}>(),
);
export const SET_MAILBOX_CLASSIFICATION_TEMP_COMMENTS = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox temp comments classification'),
  props<{IdCatClasificacionCorreoRecibido: string; Comentario: string}>(),
);
export const SET_MAILBOX_CLASSIFICATION_TOTAL = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox total classification'),
  props<{IdCatClasificacionCorreoRecibido: string; subtotal: number}>(),
);
export const SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox temp reference classification'),
  props<{
    IdCatClasificacionCorreoRecibido: string;
    CatClasificacionCorreoRecibidoReferencia: DropListOption;
  }>(),
);
export const SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE_COMMENTS = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox temp reference comments classification'),
  props<{IdCatClasificacionCorreoRecibido: string; Comentario: string}>(),
);
export const SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE_ID_PPPEDIDO = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox temp reference IdPPPedido classification'),
  props<{IdCatClasificacionCorreoRecibido: string; IdPPPedido: string}>(),
);
export const SET_MAILBOX_CLASSIFICATION_REFERENCE_SELECT = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox reference select classification'),
  props<{
    referenciaSelect: any;
  }>(),
);
export const QUIT_MAILBOX_CLASSIFICATION_REFERENCE_SELECT = createAction(
  buildingStringActionType(typeReducer, 'Quit mailbox reference select classification'),
  props<{
    IdCatClasificacionCorreoRecibido: string;
    IdArchivo?: string;
    IdPPPedidoOriginal?: string;
    Index?: number;
  }>(),
);
export const SET_MAILBOX_TO_DELETE = createAction(
  buildingStringActionType(typeReducer, 'Set mailbox to delete'),
  props<{CorreoRecibidoClienteCustom: CorreoRecibidoClienteCustom}>(),
);
export const QUIT_MAILBOX_TO_DELETE = createAction(
  buildingStringActionType(typeReducer, 'Quit mailbox to delete'),
  props<{CorreoRecibidoClienteCustom: CorreoRecibidoClienteCustom}>(),
);
export const SET_TEMP_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set temp file'),
  props<{IdCatClasificacionCorreoRecibido: string; file: File; hash: string}>(),
);
export const SET_TEMP_FILE_NAME = createAction(
  buildingStringActionType(typeReducer, 'Set temp filename'),
  props<{
    IdCatClasificacionCorreoRecibido: string;
    IdArchivo: string;
    IdArchivoCorreoRecibido: string;
    filename: string;
  }>(),
);
export const CATCH_MAIL_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Catch Mailbox error'),
  props<{error: any}>(),
);
export const SET_CARD_FILE_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set card file active'),
  props<{IdArchivo: string}>(),
);
export const SET_CARD_OC_PENDING_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set card OC pending active'),
  props<{IdPPPedido: string}>(),
);
export const SET_CARD_FILES_OC_INACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set card files & oc inactive'),
);
export const SET_OC_PENDING_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set OC pending needs to reload'),
  props<{needsToReload: boolean}>(),
);
export const SET_FILE_OC_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set file or OC is loading'),
  props<{fileType: string; value: boolean}>(),
);
export const SET_FILE_OC_IS_PREVIEW = createAction(
  buildingStringActionType(typeReducer, 'Set file or OC is preview'),
  props<{fileType: string; value: boolean}>(),
);
export const SET_FILE_OC_IS_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set file or OC is active'),
  props<{fileType: string; value: boolean}>(),
);
export const SET_FILE_OC_MESSAGE = createAction(
  buildingStringActionType(typeReducer, 'Set file or OC message'),
  props<{fileType: string; message: string}>(),
);
export const SET_OC_LIST_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set OC Pending list is loading'),
  props<{isLoading: boolean}>(),
);
export const SET_OC_LIST_CURRENT_PAGE = createAction(
  buildingStringActionType(typeReducer, 'Set OC Pending list current page'),
  props<{currentPage: number}>(),
);
export const SET_LOAD_TOTAL_FOOTER = createAction(
  buildingStringActionType(typeReducer, ' Set Load Totals Footer'),
);

export const SET_SUCCESS_TOTAL_FOOTER = createAction(
  buildingStringActionType(typeReducer, ' Set Success Totals Footer'),
  props<{totalFooter: CorreosClientesTotales}>(),
);
export const CLEAN_STATE = createAction(buildingStringActionType(typeReducer, 'Clean state'));

export const SEND_MAIL_LOAD = createAction(buildingStringActionType(typeApi, 'Send mail load'));
export const PROCESS_MAIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Process mail load'),
  props<{processMailObj: ParametroGeneradorProcesoMailBot}>(),
);
export const HANDLE_SELECTED_DROP_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Handle selected drop client'),
  props<{selectedClientToDrop: DropListOption}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'View file load'),
  props<{IdArchivo: string; ext: string}>(),
);
