import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {filter, find, forEach, isEmpty, map as _map, replace, trim} from 'lodash-es';
import {IDataMail, IMailDialogData, IMailDialogDataChildren} from '@appModels/correo/correo';
import {validator} from '@appUtil/strings';
import {SET_STATUS_CONTACTS} from '@appActions/quotation/quotation-details/quotation-details.actions';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {EmailDialogService} from '@appServices/email-dialog/email-dialog.service';

@Component({
  selector: 'app-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.scss'],
})
export class SendEmailDialogComponent implements OnInit {
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  carbonCopy: Array<string> = [];
  mailListAux: Array<IDropListMulti> = [];
  lodashFind = find;
  activeErrorEmail = false;
  currentEmail = '';
  inputNativeElement;
  lodashIsEmpty = isEmpty;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<SendEmailDialogComponent>,
    private renderer: Renderer2,
    private emailDialogService: EmailDialogService,
    @Inject(MAT_DIALOG_DATA)
    public data: IMailDialogData,
  ) {
    this.data.width = this.data.width || '795px';
    this.data.height = this.data.height || '460px';
    this.data.activeContacts = false;
    this.data.notesOptional = this.data.notesOptional || false;

    if (this.data?.folio) {
      this.data.subject = `Cotización ${this.data?.folio}`;
    }
    if (this.data?.hasInnerHTMLTemplate) {
      // DOCS: ESCUCHA LOS DATOS QUE EL COMPONENTE HIJO MANDA SÓLO SI HAY CONTENIDO ADICIONAL
      this.emailDialogService.getData$().subscribe((dataChildren: IMailDialogDataChildren) => {
        this.data.comment = dataChildren?.notes?.trim()?.length >= 3 ? dataChildren?.notes : null;
      });
    }
    if (this.data?.childrenContent) {
      this.emailDialogService.setData(this.data?.childrenContent);
    }
  }
  commentValidator(comment: string): boolean {
    return comment?.length > 2 || this.data.notesOptional;
  }

  ngOnInit() {
    this.mailListAux = this.data ? this.data?.mailList : [];
    this.data.contacts = this.data?.contacts
      ? _map(this.data?.contacts, (contact: IDropListMulti) =>
          !isEmpty(find(this.mailListAux, ['value', contact.value]))
            ? {
                ...contact,
                isSelected: true,
              }
            : {
                ...contact,
              },
        )
      : [];
    if (this.data?.isEditAddressEmail) {
      this.getEmailAddressMain();
    }
  }

  getEmailAddressMain() {
    this.mailListAux?.forEach((mail: IDropListMulti) => {
      this.currentEmail = find(mail.labels, ['isShow', true])?.label;
    });
  }

  addCarbonCopy(value: Array<string>): void {
    this.carbonCopy = value;
  }

  deletedItem(value: string): void {
    this.checkContact(this.data.contacts, {email: value});
    const isInContact = find(
      this.data.contacts,
      (o: IDropListMulti) => o.labels[2].label === value,
    );
    if (isInContact) {
      this.store.dispatch(SET_STATUS_CONTACTS({contact: isInContact}));
    }
  }

  addComments(comment: string): void {
    this.data.comment = comment !== '' ? comment?.trim() : null;
  }

  pushEmail(item: IDropListMulti): void {
    this.addEmail(item);
  }

  addCcEmail(item: IDropListMulti): void {
    const add = !item.isSelected;

    this.checkContact(this.data.contacts, {item});

    if (add) {
      const validate = filter(this.carbonCopy, (o) => o === item.labels[2].label);
      if (validate?.length < 1) {
        this.carbonCopy.push(item.labels[2].label);
      }
    } else {
      this.carbonCopy = filter(this.carbonCopy, (o) => o !== item.labels[2].label);
    }
    this.store.dispatch(SET_STATUS_CONTACTS({contact: item}));
  }

  addEmail(item: IDropListMulti): void {
    if (!item.isSelected) {
      const validate = filter(this.mailListAux, (o) => o.value === item.value);
      if (validate?.length < 1) {
        this.mailListAux.push(item);
        this.data.contacts = _map(this.data.contacts, (contact) =>
          contact.value === item.value
            ? {
                ...contact,
                isSelected: true,
              }
            : {
                ...contact,
              },
        );
      }
    } else {
      this.mailListAux = filter(this.mailListAux, (o) => o.value !== item.value);
      this.data.contacts = _map(this.data.contacts, (contact) =>
        contact.value === item.value
          ? {
              ...contact,
              isSelected: false,
            }
          : {
              ...contact,
            },
      );
    }
  }

  onClose(value: boolean): void {
    let data: IDataMail = null;
    if (value) {
      const emails: string[] = [];
      forEach(this.mailListAux, (email) => {
        const mail = find(email.labels, ['isShow', true])?.label;
        if (mail) {
          emails.push(mail);
        }
      });
      data = {
        to: emails,
        carbonCopy: this.carbonCopy,
        subject: this.data?.subject,
        additionalComments: this.data?.comment ?? null,
        activeSend: value,
      };

      //DOCS: Se emite unicamente un correo principal cuando el correo es editable
      if (this.data?.isEditAddressEmail) {
        data = {
          ...data,
          to: [this.currentEmail],
        };
      }
    }

    this.dialog.close(data);
  }

  //DOCS: MÉTODOS PARA VALIDAR EL CORREO PRINCIPAL CUANDO ES EDITABLE

  onBlur(): void {
    this.handleValidate(false);
  }

  onEnter(): void {
    this.inputNativeElement = this.renderer.selectRootElement(this.inputElement.nativeElement);
    this.inputNativeElement.blur();
  }

  validate(value: string): void {
    if (this.activeErrorEmail) {
      this.activeErrorEmail = !validator.email.test(value);
    }
  }

  onKeyPress(event: {which: number; preventDefault: () => void}): void {
    const key = String.fromCharCode(event.which);
    if (key === ' ' || key === ',' || key === ';') {
      setTimeout(() => {
        this.handleValidate(true);
      }, 500);
    }
  }

  handleValidate(clean: boolean): void {
    this.currentEmail = trim(this.currentEmail);
    if (clean) {
      this.currentEmail = replace(replace(this.currentEmail, ';', ''), ',', '');
    }
    this.activeErrorEmail = !validator.email.test(this.currentEmail) || this.currentEmail === '';
    if (!this.activeErrorEmail && this.currentEmail) {
      this.inputNativeElement = this.renderer.selectRootElement(this.inputElement.nativeElement);
    }
  }

  // DOCS: MARCA/DESMARCA EL CHECK DE LOS CONTACTOS SELECCIONADOS
  checkContact(
    contacts: IDropListMulti[],
    optional?: {
      item?: IDropListMulti;
      email?: string;
    },
  ): void {
    if (optional?.email) {
      // DOCS: ACCEDE CUANDO app-multiple-emails-input EMITE EL CORREO COMO STRING
      this.data.contacts = _map(contacts, (contact) => {
        if (contact?.labels?.[2]?.label === optional?.email) {
          return {...contact, isSelected: !contact?.isSelected};
        } else {
          return {...contact};
        }
      });
    } else {
      // DOCS: ACCEDE CUANDO app-drop-list-contact EMITE EL ITEM DEL CORREO
      this.data.contacts = _map(contacts, (contact: IDropListMulti) => {
        if (contact?.value === optional?.item?.value) {
          return {...contact, isSelected: !contact?.isSelected};
        } else {
          return {...contact};
        }
      });
    }
  }
}
