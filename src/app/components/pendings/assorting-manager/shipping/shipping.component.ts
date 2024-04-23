import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {shippingSelectors} from '@appSelectors/pendings/assorting-manager/shipping';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent {
  title$: Observable<string> = this.store.select(shippingSelectors.selectTitle);
  isDetails$: Observable<boolean> = this.store.select(shippingSelectors.selectIsDetails);

  constructor(private store: Store<AppState>, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
