import {Component, Input} from '@angular/core';
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IConfContratoCliente} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  @Input() actualConfiguration: IConfContratoCliente;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  readonly fields = OfferFields;

  constructor() {}
}
