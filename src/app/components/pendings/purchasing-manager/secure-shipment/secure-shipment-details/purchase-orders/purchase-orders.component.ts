import {Component, Renderer2} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {CONFIRM_DISPATCH, DEFAULT_DATE} from '@appUtil/common.protocols';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {Router} from '@angular/router';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-secure-shipment-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss'],
})
export class PurchaseOrdersComponent {
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private router: Router,
  ) {}

  arrayAux: Array<ITabOption> = [
    {label: 'Todos', id: '1', activeSubtitle: true, labelSubtitle: '60 pzas'},
    {label: '3 + días', id: '1', activeSubtitle: true, labelSubtitle: '60 pzas'},
    {label: '3 días', id: '1', activeSubtitle: true, labelSubtitle: '60 pzas'},
    {label: '2 días', id: '1', activeSubtitle: true, labelSubtitle: '60 pzas'},
    {label: '1 día', id: '1', activeSubtitle: true, labelSubtitle: '60 pzas'},
  ];
  confirmDispatch = CONFIRM_DISPATCH;
  readonly appViewTypes = AppViewTypes;
  date = DEFAULT_DATE;

  seeResume(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.secureShipment.secureShipment,
      appRoutes.secureShipment.details,
      appRoutes.secureShipment.seeResume,
    ]);
  }
}
