import {Component, Renderer2} from '@angular/core';
import {Observable} from 'rxjs';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {DEFAULT_DATE} from '@appUtil/common.protocols';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {CalendarDay} from '@appModels/calendario/calendar';
import {currentLocaleDateUTCFormatDate} from '@appUtil/dates';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-secure-shipment-associate-items',
  templateUrl: './associate-items.component.html',
  styleUrls: ['./associate-items.component.scss'],
})
export class AssociateItemsComponent {
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;
  dateString = DEFAULT_DATE;
  date = currentLocaleDateUTCFormatDate();

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private router: Router,
  ) {}

  goToDetails(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.secureShipment.secureShipment,
      appRoutes.secureShipment.details,
    ]);
  }
}
