import {Component, OnInit} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Observable} from 'rxjs';
import {QueryResultVCampana, VMarca, VProducto} from 'api-catalogos';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {campaignsProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';
import {campaingsProviderActions} from '@appActions/forms/providers';
import {debounce, isEmpty} from 'lodash-es';
import {IVCampana} from '@appModels/store/forms/providers/providers-details/provider-form-step-3-campaign.model';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-see-campaigns',
  templateUrl: './see-campaigns.component.html',
  styleUrls: ['./see-campaigns.component.scss'],
})
export class SeeCampaignsComponent implements OnInit {
  campaignTabOptions$: Observable<Array<ITabOption>> = this.store.select(
    campaignsProviderSelectors.selectCampaignTabOptions,
  );
  selectedCampaignTabOption$: Observable<ITabOption> = this.store.select(
    campaignsProviderSelectors.selectedCampaignTabOption,
  );
  modeEdit$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  campaignList$: Observable<QueryResultVCampana> = this.store.select(
    campaignsProviderSelectors.campaigns,
  );
  itemsRelated$: Observable<Array<VProducto | any | VMarca>> = this.store.select(
    campaignsProviderSelectors.selectItemsRelated,
  );
  itemsRelatedProductsSum$: Observable<number> = this.store.select(
    campaignsProviderSelectors.selectItemsRelatedProductsSum,
  );
  apiStatusItemsRelated$: Observable<number> = this.store.select(
    campaignsProviderSelectors.apiStatusItemsRelated,
  );
  apiStatusCampaign$: Observable<number> = this.store.select(
    campaignsProviderSelectors.apiStatusCampaing,
  );
  searchTermCampaign$: Observable<string> = this.store.select(
    campaignsProviderSelectors.searchTermCampaign,
  );
  selectedCampaign$: Observable<IVCampana> = this.store.select(
    campaignsProviderSelectors.selectedCampaign,
  );
  selectQueryInfo$: Observable<any> = this.store.select(campaignsProviderSelectors.selectQueryInfo);

  lodashIsEmpty = isEmpty;
  relatedItems: Array<VProducto | any | VMarca> = [];
  productsSum;

  campaignList: Array<IVCampana> = [];
  handleKeySearch = debounce((data) => this.searchTermHandler(data), DEFAULT_TIME_DEBOUNCE_SEARCH);
  searchConfiguration = 'Nombre Campaña';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(catalogsActions.GET_CAT_TIPO_CAMPANA_LOAD());
    this.store.dispatch(
      campaingsProviderActions.GET_CAPAIGNS_LOAD({
        active: true,
        isFirstPage: true,
      }),
    );
  }

  searchTermHandler(data: string): void {
    this.store.dispatch(
      campaingsProviderActions.SET_SEARCH_TERM_CAMPAIGN({
        searchTerm: data,
      }),
    );
  }

  selectedTabOptionChange(selectedCampaignTabOption: ITabOption): void {
    this.store.dispatch(
      campaingsProviderActions.SET_SELECTED_TAB_OPTION({
        selectedCampaignTabOption,
      }),
    );
  }

  addCampaingHandler(): void {
    this.store.dispatch(
      campaingsProviderActions.SET_ADD_CAMPAING({
        addCampaing: true,
      }),
    );
  }

  editCampaignHandler(event: MouseEvent, campaign: IVCampana): void {
    event.stopPropagation();
    if (campaign.needsToReload) {
      this.campaignIndexSelectedHandler(campaign.IdCampana, 'edit');
    } else {
      this.store.dispatch(campaingsProviderActions.CAMPAIGN_EDIT({campaign}));
    }
  }

  deleteCampaignHandler(campaign: IVCampana, event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(
      campaingsProviderActions.ADD_CAMPAIGN_LIST_DELETE({
        campaign,
      }),
    );
  }

  campaignIndexSelectedHandler(campaignId: string, event?: string): void {
    this.store.dispatch(campaingsProviderActions.SET_SELECTED_CAMPAIGN({campaignId, event}));
  }

  fetchMoreCampaigns(event) {
    this.store.dispatch(campaingsProviderActions.FETCH_MORE_CAMPAIGNS({event}));
  }
}
