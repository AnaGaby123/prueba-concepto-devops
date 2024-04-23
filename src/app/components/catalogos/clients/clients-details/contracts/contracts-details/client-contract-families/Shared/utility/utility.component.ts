import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss'],
})
export class UtilityComponent {
  @Input() actualConfiguration;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  @Output() emitInputValue: EventEmitter<string> = new EventEmitter<string>();
  readonly inputValidators = InputValidators;
  readonly fields = OfferFields;

  constructor() {}

  handleInputChange(value: string): void {
    this.emitInputValue.emit(value);
  }
}
