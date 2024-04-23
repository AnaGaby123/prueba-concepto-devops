// CORE
import {Component, EventEmitter, Input, Output} from '@angular/core';
// MODELS
import {Levels} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IVClientProductClassification} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-feature-group-item',
  templateUrl: './feature-group-item.component.html',
  styleUrls: ['./feature-group-item.component.scss'],
})
export class FeatureGroupItemComponent {
  @Input() classification: IVClientProductClassification;
  @Output() selectedClassificationChange: EventEmitter<
    IVClientProductClassification
  > = new EventEmitter<IVClientProductClassification>();

  readonly levels = Levels;

  handleSelectedClassificationChange(): void {
    this.selectedClassificationChange.emit(this.classification);
  }
}
