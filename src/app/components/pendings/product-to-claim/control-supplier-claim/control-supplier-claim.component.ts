/*Core imports*/
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Location} from '@angular/common';

/*Imports selectors*/
import {controlSupplierClaimSelectors} from '@appSelectors/pendings/product-to-claim/control-supplier-claim';

@Component({
  selector: 'app-control-supplier-claim',
  templateUrl: './control-supplier-claim.component.html',
  styleUrls: ['./control-supplier-claim.component.scss'],
})
export class ControlSupplierClaimComponent {
  isDetails$: Observable<boolean> = this.store.select(
    controlSupplierClaimSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(controlSupplierClaimSelectors.selectTitle);

  constructor(private store: Store<AppState>, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
