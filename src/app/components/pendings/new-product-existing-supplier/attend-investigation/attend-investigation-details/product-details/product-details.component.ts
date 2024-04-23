import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {attendInvestigationAddProductActions} from '@appActions/pendings/attend-investigation';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {Location} from '@angular/common';
import {GET_CAT_MONEDA_LOAD} from '@appActions/catalogs/catalogos.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private location: Location) {}

  saveValidator$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.saveButtonValidator,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  viewTypes = AppViewTypes;

  ngOnInit() {
    this.store.dispatch(GET_CAT_MONEDA_LOAD());
  }

  ngOnDestroy() {
    this.store.dispatch(attendInvestigationAddProductActions.RESTORE_PRODUCT_DETAILS());
  }
}
