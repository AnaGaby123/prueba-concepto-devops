import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {logisticConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/logistic-configuration';
import {IFamilyLogisticConfiguration} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

@Component({
  selector: 'app-logistic-configuration-list-item',
  templateUrl: './logistic-configuration-list-item.component.html',
  styleUrls: ['./logistic-configuration-list-item.component.scss'],
})
export class LogisticConfigurationListItemComponent implements OnInit {
  @Input() item: IFamilyLogisticConfiguration;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  selectItem(selectedFamily: IFamilyLogisticConfiguration): void {
    this.store.dispatch(
      logisticConfigurationDetailsActions.SET_FAMILY_ITEM_METHODS({family: selectedFamily}),
    );
  }
}
