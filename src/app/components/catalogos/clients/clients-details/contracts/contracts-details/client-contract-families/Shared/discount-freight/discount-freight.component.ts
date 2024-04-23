import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IConfContratoCliente} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';

@Component({
  selector: 'app-discount-freight',
  templateUrl: './discount-freight.component.html',
  styleUrls: ['./discount-freight.component.scss'],
})
export class DiscountFreightComponent implements OnInit {
  @Input() actualConfiguration: IConfContratoCliente;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() isMexican: boolean;
  @Input() viewType: string;
  @Output() openConfig: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
