import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {isEmpty} from 'lodash-es';

export interface IReferenceFormEdit {
  value: boolean;
  reference: string;
}
@Component({
  selector: 'app-reference-form-edit',
  templateUrl: './reference-form-edit.component.html',
  styleUrls: ['./reference-form-edit.component.scss'],
})
export class ReferenceFormEditComponent {
  @Input() reference: string = '';
  @Output() handleAction: EventEmitter<IReferenceFormEdit> = new EventEmitter<IReferenceFormEdit>();

  readonly inputValidators = InputValidators;
  inputError = false;
  lodashIsEmpty = isEmpty;
  constructor() {}

  handleEmitAction(value: boolean) {
    this.handleAction.emit({
      value,
      reference: this.reference,
    });
  }
}
