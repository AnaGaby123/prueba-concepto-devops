/*Core imports*/
import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

/*Selectors imports */
import {
  attendInvestigationDetailsSelectors,
  attendInvestigationSelectors,
} from '@appSelectors/pendings/attend-investigation';
import {
  attendInvestigationActions,
  attendInvestigationAddProductActions,
} from '@appActions/pendings/attend-investigation';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-attend-investigation',
  templateUrl: './attend-investigation.component.html',
  styleUrls: ['./attend-investigation.component.scss'],
})
export class AttendInvestigationComponent {
  isDetails$: Observable<boolean> = this.store.select(
    attendInvestigationSelectors.selectDetailsMode,
  );
  title$: Observable<string> = this.store.select(attendInvestigationSelectors.selectTitle);
  saveValidator$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.saveButtonValidator,
  );
  isAddProduct$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.selectIsAddProduct,
  );

  constructor(private store: Store<AppState>, private location: Location) {}

  async goBack(): Promise<void> {
    this.location.back();

    const detailsMode = await lastValueFrom(
      this.store.pipe(select(attendInvestigationSelectors.selectDetailsMode), take(1)),
    );
    const isAddProduct = await lastValueFrom(
      this.store.pipe(select(attendInvestigationDetailsSelectors.selectIsAddProduct), take(1)),
    );

    if (detailsMode && !isAddProduct) {
      this.store.dispatch(
        attendInvestigationActions.SET_DETAILS_MODE({
          detailsMode: false,
        }),
      );
    } else {
      this.store.dispatch(attendInvestigationAddProductActions.SET_IS_ADD_PRODUCT({value: false}));
    }
  }

  saveData(): void {
    this.store.dispatch(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_LOAD());
  }

  cancelAdd(): void {
    this.store.dispatch(attendInvestigationAddProductActions.SHOW_CONFIRM_DIALOG());
  }
}
