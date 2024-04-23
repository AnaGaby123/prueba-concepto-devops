import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ICustomerSummary} from '@appModels/store/general-summary/general-summary.models';
// Selectors
import * as selectors from '@appSelectors/general-summary/general-summary.selectors';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-strategy',
  templateUrl: './pop-up-strategy.component.html',
  styleUrls: ['./pop-up-strategy.component.scss'],
})
export class PopUpStrategyComponent {
  @Output() emitValue: EventEmitter<boolean> = new EventEmitter<boolean>();
  customer$: Observable<ICustomerSummary> = this.store.select(selectors.selectCustomerSelected);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<PopUpStrategyComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customer: ICustomerSummary;
    },
  ) {}

  onClose(value: boolean): void {
    this.dialog.close(value);
  }
}
