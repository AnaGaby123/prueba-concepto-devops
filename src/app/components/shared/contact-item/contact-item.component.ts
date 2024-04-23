import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IContactItem} from '@appModels/shared-components/contact-item.models';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss'],
})
export class ContactItemComponent {
  @Input() contact: IContactItem;
  @Input() enableEdit = true;
  @Output() disableContact: EventEmitter<IContactItem> = new EventEmitter<IContactItem>();
  @Output() clickOnContact: EventEmitter<IContactItem> = new EventEmitter<IContactItem>();
  @Output() clickOnPlus: EventEmitter<void> = new EventEmitter<void>();

  handleDisableContact(contact: IContactItem, event): void {
    event.stopPropagation();
    this.disableContact.emit(contact);
  }

  // DOCS: ENVIA EL CONTACTO AL ESTADO PARA EDITARLO
  handleClickOnContact(contact: IContactItem): void {
    this.clickOnContact.emit(contact);
  }

  // DOCS: CIERRA EL POP DE CONTACTO O MANDA EL OBJ DEL CONTACTO AL ESTADO
  handleClickOnPlus(): void {
    this.clickOnPlus.emit();
  }
}
