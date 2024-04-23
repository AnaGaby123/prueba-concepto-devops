import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

/*Selectors Import*/
import {
  controlMaterialDeliveryDetailsSelectors,
  controlMaterialDeliverySelectors,
} from '@appSelectors/pendings/imports-phs/control-material-delivery';
/*Actions Imports*/
import {controlMaterialDeliveryActions} from '@appActions/pendings/imports-phs/control-material-delivery';

@Component({
  selector: 'app-control-material-delivery',
  templateUrl: './control-material-delivery.component.html',
  styleUrls: ['./control-material-delivery.component.scss'],
})
export class ControlMaterialDeliveryComponent {
  isDetails$: Observable<boolean> = this.store.select(
    controlMaterialDeliverySelectors.selectIsDetails,
  );
  nameAgent$: Observable<string> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectNameAgent,
  );
  title$: Observable<string> = this.store.select(controlMaterialDeliverySelectors.selectTitle);

  constructor(private store: Store, private router: Router, private location: Location) {}

  goBack(): void {
    this.store.dispatch(controlMaterialDeliveryActions.SET_IS_DETAILS({isDetails: false}));
    this.location.back();
  }
}
