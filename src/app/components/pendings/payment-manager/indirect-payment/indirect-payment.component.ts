import {ChangeDetectorRef, Component} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {indirectPaymentSelectors} from '@appSelectors/pendings/payment-manager';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';

@Component({
  selector: 'app-indirect-payment',
  templateUrl: './indirect-payment.component.html',
  styleUrls: ['./indirect-payment.component.scss'],
})
export class IndirectPaymentComponent {
  title$: Observable<string> = this.store.select(indirectPaymentSelectors.selectTitle);
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  seeResumeMode = false;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  readXML(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const xmlData: string = (evt as any).target.result;
      };
      reader.readAsText(file);
    }
  }

  changeSeeResumeMode(value: boolean): void {
    this.seeResumeMode = value;
  }
}
