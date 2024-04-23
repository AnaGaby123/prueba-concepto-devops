import {Component, OnDestroy, OnInit} from '@angular/core';
import {animationAddCampaing} from '@appUtil/animations';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Actions
import {campaingsProviderActions} from '@appActions/forms/providers';

// Selectors
import {campaignsProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-campaing',
  templateUrl: './campaing.component.html',
  styleUrls: ['./campaing.component.scss'],
  animations: animationAddCampaing,
})
export class CampaingComponent implements OnInit, OnDestroy {
  modeEdit$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  addCampaign$: Observable<boolean> = this.store.select(campaignsProviderSelectors.getAddCampaing);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(campaingsProviderActions.CLEAN_CAMPAIGNS_STATE());
  }
}
