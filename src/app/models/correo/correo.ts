import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {CorreoEnviado} from 'api-catalogos';
import {ComponentType} from '@angular/cdk/overlay';
import {Language} from '@appModels/store/settings/settings.model';

export class Correo {
  IdCorreoElectronico: string;
  IdDatosPersona: string;
  Correo: string;
  FechaRegistro: string;
  Activo = true;
}

export interface IDataMail {
  to: IDropListMulti[] | string[];
  carbonCopy: Array<string>;
  subject: string;
  additionalComments: string;
  activeSend?: boolean;
}

/**
 * Interface para los datos que recibe el dialog de correo
 * @property {string} width Ancho del dialog '795px'.
 * @property {string} height Alto del dialog '460px'.
 * @property {string} titleHeader Título del dialog.
 * @property {IDropListMulti[]} mailList Lista de direcciones de correo del input de texto.
 * @property {boolean} activeContacts Activa la selección de multiples contactos.
 * @property {IDropListMulti[]} contacts Lista de direcciones de correo en el icono de contacto.
 * @property {string[]} comments Lista de nombres de los archivos adjuntos múltiples
 * @property {string} comment Nombre del archivo adjunto (Solo cuando es uno).
 * @property {string} subject Asunto del correo.
 * @property {boolean} activeSaveSubject Permite editar el asunto.
 * @property {boolean} validateOnlyContact Permite un solo correo como principal.
 * @property {boolean} hasMultipleComments Muestra el nombre de multiples archivos.
 * @property {boolean} hasInnerHTMLTemplate Permite agregar contenido adicional.
 * @property {ComponentType<any>} innerHtml Define contenido adicional en <ng-content></ng-content>
 * @property {boolean} isEditAddressEmail Permite editar el correo principal
 * @property {string} additionalText Texto que se muestra como mensaje arriba del textarea.
 * @property {string} folio Folio de la cotización.
 * @property {string} sender Remitente del correo.
 * @property {Language} currentLanguage Idioma en el que se mostrará el cuerpo del correo.
 * @property {IMailDialogDataChildren} childrenContent Objeto que se enviará al componente hijo.
 */
export interface IMailDialogData extends CorreoEnviado {
  /** Ancho del dialog '795px'.*/
  width?: string;
  /** Alto del dialog '460px'.*/
  height?: string;
  /** Título del dialog.*/
  titleHeader?: string;
  /** Lista de direcciones de correo del input de texto.*/
  mailList?: IDropListMulti[];
  /** Activa la selección de multiples contactos.*/
  activeContacts?: boolean;
  /** Lista de direcciones de correo en el icono de contacto.*/
  contacts?: IDropListMulti[];
  /** Lista de nombres de los archivos adjuntos múltiples*/
  comments?: string[];
  /** Nombre del archivo adjunto (Solo cuando es uno).*/
  comment?: string;
  /** Asunto del correo.*/
  subject?: string;
  /** Permite editar el asunto.*/
  activeSaveSubject?: boolean;
  /** Permite un solo correo como principal.*/
  validateOnlyContact?: boolean;
  /** Muestra el nombre de multiples archivos.*/
  hasMultipleComments?: boolean;
  /** Permite agregar contenido adicional.*/
  hasInnerHTMLTemplate?: boolean;
  /** Define contenido adicional en <ng-content></ng-content>*/
  innerHtml?: ComponentType<any>;
  /** Permite editar el correo principal*/
  isEditAddressEmail?: boolean;
  /** Texto que se muestra como mensaje arriba del textarea.*/
  additionalText?: string;
  /** Folio de la cotización.*/
  folio?: string;
  /** Remitente del correo.*/
  sender?: string;
  /** Idioma en el que se mostrará el cuerpo del correo.*/
  currentLanguage?: Language;
  /** Objeto que se enviará al componente hijo.*/
  childrenContent?: IMailDialogDataChildren;
  /** Indica si las notas son opcionales */
  notesOptional?: boolean;
}

/**
 * Interface para los datos que recibe el dialog de correo desde los componentes importados en <ng-container>.
 * @property {string} notes Notas en módulo Atender investigación técnico comercial.
 * @property {Language} currentLanguage Idioma actual del correo.
 * @property {string} contentTitle Título a mostrar en el contenido del correo.
 * @property {string} contentDescription Descripción a mostrar en el contenido del correo.
 */
export interface IMailDialogDataChildren {
  /** Notas en módulo Atender investigación técnico comercial.*/
  notes?: string;
  /** Idioma actual del correo.*/
  currentLanguage?: Language;
  /** Título a mostrar en el contenido del correo.*/
  contentTitle?: string;
  /** Descripción a mostrar en el contenido del correo.*/
  contentDescription?: string;
}

/**
 * Inicializador de IDataMail
 * */
export const initialDataEmail = (): IDataMail => ({
  to: [],
  carbonCopy: [],
  subject: '',
  additionalComments: '',
});
