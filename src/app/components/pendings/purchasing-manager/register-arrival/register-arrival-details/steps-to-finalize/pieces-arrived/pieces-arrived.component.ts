/* Core Imports */
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

/* Actions Imports */
import {registerArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Selectors Imports */
import {registerArrivalDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';

/* Models Imports */
import {
  IProvidersPiecesArrived,
  ITotalsPiecesArrived,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.models';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-pieces-arrived',
  templateUrl: './pieces-arrived.component.html',
  styleUrls: ['./pieces-arrived.component.scss'],
})
export class PiecesArrivedComponent implements OnInit {
  readonly inputValidators = InputValidators;
  isLoadingProvidersWithItems$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectIsLoadingProvidersWithItems,
  );
  providersWithItems$: Observable<Array<IProvidersPiecesArrived>> = this.store.select(
    registerArrivalDetailsSelectors.selectProvidersWithItems,
  );
  totals$: Observable<ITotalsPiecesArrived> = this.store.select(
    registerArrivalDetailsSelectors.selectTotals,
  );
  listProvidersScrollItems: Array<IProvidersPiecesArrived> = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(registerArrivalDetailsActions.FETCH_STEP_ARRIVED_PIECES_DATA_LOAD());
  }

  handleOpenProvider(IdOcPackingList: string): void {
    this.store.dispatch(registerArrivalDetailsActions.SET_PROVIDER_IS_OPEN({IdOcPackingList}));
  }

  setPiecesArrived(pieces: string, IdOcPackingList: string): void {
    this.store.dispatch(
      registerArrivalDetailsActions.SET_PIECES_ARRIVED_PROVIDER({
        pieces: pieces ? parseInt(pieces, 10) : 0,
        IdOcPackingList,
      }),
    );
  }

  calculatePiecesMissing(piecesToArrived: number, piecesArrived: number): number | string {
    return piecesToArrived > piecesArrived ? `-${piecesToArrived - piecesArrived}` : 0;
  }

  calculatePiecesSurplus(piecesToArrived: number, piecesArrived: number): number | string {
    return piecesArrived > piecesToArrived ? `+${piecesArrived - piecesToArrived}` : 0;
  }

  handleTrackBy(index: number, provider: IProvidersPiecesArrived): string {
    return provider.IdProveedor;
  }
}
