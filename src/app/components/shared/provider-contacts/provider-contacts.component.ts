import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {isEmpty} from 'lodash-es';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

@Component({
  selector: 'app-provider-contacts',
  templateUrl: './provider-contacts.component.html',
  styleUrls: ['./provider-contacts.component.scss'],
})
export class ProviderContactsComponent implements OnChanges {
  @Input() availableCredit: string;
  @Input() backGroundColor: string;
  @Input() contactList: Array<DropListOption> = [];
  @Input() selectedContact: IProviderContact;
  @Output() emitResponse: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  @Input() padding = '0px';
  @Input() showAdditionalData = true;
  @Input() showContactData = true;
  @Input() sizeGeneralData = '0px';
  @Input() src: string = 'assets/Images/clientes/logo_proquifa_hover.svg';
  @Input() typeContact: string = 'Datos Contacto';
  lodashIsEmpty = isEmpty;
  selectedContactDropList: DropListOption;

  setContactProviderSelected(value: DropListOption): void {
    this.emitResponse.emit(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes.selectedContact &&
      changes.selectedContact.currentValue &&
      changes.selectedContact.currentValue.IdContactoProveedor !==
        changes.selectedContact.previousValue?.IdContactoProveedor
    ) {
      this.loadData();
    }
  }

  loadData(): void {
    this.selectedContactDropList = {
      value: this.selectedContact?.IdContactoProveedor,
      label: this.selectedContact?.fullName,
    };
  }
}
