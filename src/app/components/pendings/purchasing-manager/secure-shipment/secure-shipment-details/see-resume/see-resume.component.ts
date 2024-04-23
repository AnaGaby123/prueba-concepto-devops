import {Component, Renderer2} from '@angular/core';
import {DEFAULT_DATE} from '@appUtil/common.protocols';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {CalendarDay} from '@appModels/calendario/calendar';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-secure-shipment-see-resume',
  templateUrl: './see-resume.component.html',
  styleUrls: ['./see-resume.component.scss'],
})
export class SeeResumeComponent {
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;
  date = DEFAULT_DATE;

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

  goToLinkedItem(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.secureShipment.secureShipment,
      appRoutes.secureShipment.details,
      appRoutes.secureShipment.associateItems,
    ]);
  }
}
