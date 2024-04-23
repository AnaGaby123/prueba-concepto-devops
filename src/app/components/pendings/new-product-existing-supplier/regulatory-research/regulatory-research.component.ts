import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {regulatoryResearchSelectors} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import {regulatoryResearchActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-regulatory-research',
  templateUrl: './regulatory-research.component.html',
  styleUrls: ['./regulatory-research.component.scss'],
})
export class RegulatoryResearchComponent implements OnInit {
  isInDetails$: Observable<boolean> = this.store.select(
    regulatoryResearchSelectors.selectIsInDetails,
  );
  title$: Observable<string> = this.store.select(regulatoryResearchSelectors.selectTitle);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  goBack() {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.regulatoryResearch.regulatoryResearch,
      appRoutes.regulatoryResearch.dashboard,
    ]);
    this.store.dispatch(regulatoryResearchActions.SET_IS_IN_DETAILS({isInDetails: false}));
    this.store.dispatch(regulatoryResearchActions.SET_ALLOW_TO_DETAILS({allowToDetails: false}));
  }
}
