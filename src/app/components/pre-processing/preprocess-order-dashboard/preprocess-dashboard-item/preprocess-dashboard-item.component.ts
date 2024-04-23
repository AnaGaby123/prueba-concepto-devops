import {Component, Input, OnInit} from '@angular/core';

//Models
import {IListItemForPreProcessing} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

@Component({
  selector: 'app-preprocess-dashboard-item',
  templateUrl: './preprocess-dashboard-item.component.html',
  styleUrls: ['./preprocess-dashboard-item.component.scss'],
})
export class PreprocessDashboardItemComponent implements OnInit {
  @Input() preprocessItem: IListItemForPreProcessing;
  @Input() tabSelected: ITabOption;

  constructor() {}

  ngOnInit(): void {}
}
