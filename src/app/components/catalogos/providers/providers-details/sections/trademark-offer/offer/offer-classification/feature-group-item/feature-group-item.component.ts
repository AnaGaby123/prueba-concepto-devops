import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  IVProviderProductClassification,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

@Component({
  selector: 'app-feature-group-item',
  templateUrl: './feature-group-item.component.html',
  styleUrls: ['./feature-group-item.component.scss'],
})
export class FeatureGroupItemComponent {
  @Input() classification: IVProviderProductClassification;
  @Output() selectedClassificationChange: EventEmitter<
    IVProviderProductClassification
  > = new EventEmitter<IVProviderProductClassification>();

  readonly levels = Levels;

  handleSelectedClassificationChange(): void {
    this.selectedClassificationChange.emit(this.classification);
  }
}
