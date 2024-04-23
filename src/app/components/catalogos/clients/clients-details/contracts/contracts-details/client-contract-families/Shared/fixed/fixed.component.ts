import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IConfContratoCliente} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';

@Component({
  selector: 'app-fixed',
  templateUrl: './fixed.component.html',
  styleUrls: ['./fixed.component.scss'],
})
export class FixedComponent implements OnInit {
  @Input() actualConfiguration: IConfContratoCliente;
  @Input() enableEdit: boolean;
  @Input() isMexican: boolean;
  @Output() emitInputValue: EventEmitter<string> = new EventEmitter<string>();
  readonly fields = OfferFields;
  readonly inputValidators = InputValidators;

  constructor() {}

  ngOnInit(): void {}

  handleInputChange(value: string): void {
    this.emitInputValue.emit(value);
  }
}
