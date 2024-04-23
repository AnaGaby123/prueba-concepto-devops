import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {IDataMail} from '@appModels/correo/correo';
import {filter, find, forEach, isEmpty, map as _map, replace, trim} from 'lodash-es';

import {validator} from '@appUtil/strings';

@Component({
  selector: 'app-pop-up-send-email',
  templateUrl: './pop-up-send-email.component.html',
  styleUrls: ['./pop-up-send-email.component.scss'],
})
export class PopUpSendEmailComponent implements OnInit {
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  @Input() width = '795px';
  @Input() height = '460px';
  @Input() titleHeader = 'PROQUIFANET';
  @Input() mailList: Array<IDropListMulti> = []; // Almacena los contactos destinatarios
  @Input() activeContacts = false;
  @Input() contacts: Array<IDropListMulti> = [];
  @Input() comments: Array<string> = [];
  @Input() comment: string = '';
  @Input() subject = null;
  @Input() activeSaveSubject = false;
  @Input() validateOnlyContact = true;
  @Input() hasMultipleComments = false;
  @Input() innerHTMLTemplate = false;
  @Input() isEditAddressEmail = false; //D0CS: HACER EL CORREO PRINCIPAL EDITABLE
  @Output() emitResponse: EventEmitter<IDataMail> = new EventEmitter<IDataMail>();
  @Input() additionalText = '';
  carbonCopy: Array<string> = [];
  mailListAux: Array<IDropListMulti> = [];
  lodashFind = find;
  activeErrorEmail = false;
  currentEmail = '';
  inputNativeElement;
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.mailListAux = [...this.mailList];
    this.contacts = _map(this.contacts, (contact: IDropListMulti) =>
      !isEmpty(find(this.mailListAux, ['value', contact.value]))
        ? {
            ...contact,
            isSelected: true,
          }
        : {
            ...contact,
          },
    );
    if (this.isEditAddressEmail) {
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

  addComments(comment: string): void {
    this.comment = comment?.trim();
  }

  pushEmail(item: IDropListMulti): void {
    this.addEmail(item);
  }

  addEmail(item: IDropListMulti): void {
    if (!item.isSelected) {
      const validate = filter(this.mailListAux, (o) => o.value === item.value);
      if (validate.length < 1) {
        this.mailListAux.push(item);
        this.contacts = _map(this.contacts, (contact) =>
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
      this.contacts = _map(this.contacts, (contact) =>
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

  emitBtn(value: boolean): void {
    let data: IDataMail = null;
    if (value) {
      const emails: Array<string> = [];
      forEach(this.mailListAux, (email) => {
        const mail = find(email.labels, ['isShow', true])?.label;
        if (mail) {
          emails.push(mail);
        }
      });
      data = {
        to: emails,
        carbonCopy: this.carbonCopy,
        subject: this.subject,
        additionalComments: this.comment,
        activeSend: value,
      };

      //DOCS: Se emite unicamente un correo principal cuando el correo es editable
      if (this.isEditAddressEmail) {
        data = {
          ...data,
          to: [this.currentEmail],
        };
      }
    }

    this.emitResponse.emit(data);
  }

  //DOCS: METDDOS PARA VALIDAR EL CORREO PRINCIPAL CUANDO ES EDITABLE

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
}
