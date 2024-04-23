/*Core imports*/
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

// Models imports
import {VClienteppPedidoObj} from 'api-logistica';

// Actions imports
import {notProcessedActions} from '@appActions/pendings';

// Selectors imports
import {
  notProcessedDetailsSelectors,
  notProcessedSelectors,
} from '@appSelectors/pendings/not-processed';

// Utils
import {appRoutes} from '@appHelpers/core/app-routes';
import {GET_CAT_MONEDA_LOAD} from '@appActions/catalogs/catalogos.actions';

@Component({
  selector: 'app-not-processed',
  templateUrl: './not-processed.component.html',
  styleUrls: ['./not-processed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotProcessedComponent implements AfterContentChecked, OnInit {
  client$: Observable<VClienteppPedidoObj> = this.store.select(
    notProcessedDetailsSelectors.selectClient,
  );
  isInDetailsView$: Observable<boolean> = this.store.select(
    notProcessedSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(notProcessedSelectors.selectTitle);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_MONEDA_LOAD());
  }

  async goBack(): Promise<void> {
    this.store.dispatch(
      notProcessedActions.notProcessedDetailActions.CLEAN_ALL_NOT_PROCESSED_DETAIL(),
    );
    this.store.dispatch(
      notProcessedActions.notProcessedActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      notProcessedActions.notProcessedActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.notProcessed.notProcessed,
      appRoutes.notProcessed.dashboard,
    ]);
  }
}
