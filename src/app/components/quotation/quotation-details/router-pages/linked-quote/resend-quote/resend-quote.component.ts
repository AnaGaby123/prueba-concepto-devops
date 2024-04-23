/* Core Imports */
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
import {filter, find, replace, trim} from 'lodash-es';

import {Store} from '@ngrx/store';

/* Actions Imports */
import {SET_STATUS_CONTACTS} from '@appActions/quotation/quotation-details/quotation-details.actions';

/* Models Imports */
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {IDataMail, initialDataEmail} from '@appModels/correo/correo';

/* Tools Imports */
import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {maxLengthTextArea} from '@appHelpers/shared/shared.helpers';
import {validator} from '@appUtil/strings';

@Component({
  selector: 'app-resend-quote',
  templateUrl: './resend-quote.component.html',
  styleUrls: ['./resend-quote.component.scss'],
})
export class ResendQuoteComponent implements OnInit {
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  @Input() contacts: IDropListMulti[] = [];
  @Input() folio = '';
  @Input() titleHeader = 'REENVIO DE COTIZACIÓN';
  @Input() sender = 'REENVIO DE COTIZACIÓN';
  @Input() activeSaveSubject = false;
  @Output() emitCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitSend: EventEmitter<IDataMail> = new EventEmitter<IDataMail>();
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  maxLengthTextArea = maxLengthTextArea;

  width = '795px';
  height = '460px';
  mailList: IDropListMulti[] = [];
  dataMail: IDataMail = initialDataEmail();
  activeError = false;
  currentEmail = '';
  inputNativeElement;
  constructor(private store: Store, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.dataMail.subject = `Cotización ${this.folio}`;

    const contactFind = find(
      this.contacts,
      (o: IDropListMulti) => o.labels[2].label === this.sender,
    );

    if (contactFind) {
      this.mailList.push(contactFind);
    } else {
      this.mailList.push(this.contacts[0]);
    }
    this.getEmailAddressMain();
  }

  getEmailAddressMain() {
    this.mailList?.forEach((mail: IDropListMulti) => {
      this.currentEmail = find(mail?.labels, (label) => label?.label === this.sender)?.label;
    });

    if (this.currentEmail === undefined) {
      this.currentEmail = this.mailList[0]?.labels[2]?.label;
    }
  }

  addEmail(item: IDropListMulti): void {
    const add = !item.isSelected;
    if (add) {
      const validate = filter(this.dataMail.carbonCopy, (o) => o === item.labels[2].label);
      if (validate.length < 1) {
        this.dataMail.carbonCopy.push(item.labels[2].label);
      }
    } else {
      this.dataMail.carbonCopy = filter(
        this.dataMail.carbonCopy,
        (o) => o !== item.labels[2].label,
      );
    }
    this.store.dispatch(SET_STATUS_CONTACTS({contact: item}));
  }

  addCarbonCopy(value: Array<string>): void {
    this.dataMail.carbonCopy = value;
  }

  deletedItem(value: string): void {
    const isInContact = find(this.contacts, (o: IDropListMulti) => o.labels[2].label === value);
    if (isInContact) {
      this.store.dispatch(SET_STATUS_CONTACTS({contact: isInContact}));
    }
  }

  addComments(comment: string): void {
    this.dataMail.additionalComments = comment?.trim();
  }

  emitBtn(value: boolean): void {
    this.dataMail.to = [] as Array<string>;
    this.dataMail.to.push(this.currentEmail);
    if (value) {
      this.emitSend.emit(this.dataMail);
    } else {
      this.emitCancel.emit(false);
    }
  }

  //DOCS: METDDOS PARA VALIDAR EL CORREO PRINCIPAL
  onBlur(): void {
    this.handleValidate(false);
  }

  onEnter(): void {
    this.inputNativeElement = this.renderer.selectRootElement(this.inputElement.nativeElement);
    this.inputNativeElement.blur();
  }

  validate(value: string): void {
    if (this.activeError) {
      this.activeError = !validator.email.test(value);
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
    this.activeError = !validator.email.test(this.currentEmail) || this.currentEmail === '';
    if (!this.activeError && this.currentEmail) {
      this.inputNativeElement = this.renderer.selectRootElement(this.inputElement.nativeElement);
    }
  }
}
