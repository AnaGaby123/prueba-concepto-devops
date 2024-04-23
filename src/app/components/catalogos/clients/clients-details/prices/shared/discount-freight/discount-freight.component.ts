// Core
import {Component, EventEmitter, Input, Output} from '@angular/core';
// Models
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

// Actions

@Component({
  selector: ' app-discount-freight',
  templateUrl: './discount-freight.component.html',
  styleUrls: ['./discount-freight.component.scss'],
})
export class DiscountFreightComponent {
  @Input() actualConfiguration: IConfClient;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  @Input() isMexican: boolean;
  @Output() openConfig: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
