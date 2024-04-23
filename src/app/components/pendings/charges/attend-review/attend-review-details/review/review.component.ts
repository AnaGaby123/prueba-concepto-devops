import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {debounce} from 'lodash-es';

/*Models Imports*/
import {
  IAddressClient,
  IBills,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
import {IChipFile} from '@appModels/chip-file/chip-file';
import {IUploadFileCustom} from '@appModels/files/files.models';
import {CalendarDay} from '@appModels/calendario/calendar';
/*Selectors Imports*/
import {attendViewDetailsSelectors} from '@appSelectors/pendings/charges/attend-review';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DireccionClienteDetalle} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
/*Actions Imports*/
import {
  attendReviewActions,
  attendReviewDetailsActions,
} from '@appActions/pendings/charges/attend-review';

import {DatosFacturacionClienteDetalle} from 'api-logistica';

import {Router} from '@angular/router';
import {dateFormatISO} from '@appUtil/dates';
import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  typeOfReview;
  selectedBill$: Observable<IBills> = this.store.select(attendViewDetailsSelectors.selectedBill);
  requestApiStatus$: Observable<number> = this.store.select(
    attendViewDetailsSelectors.selectStatusApiFile,
  );
  addressDrop$: Observable<IAddressClient> = this.store.select(
    attendViewDetailsSelectors.selectAddressDrop,
  );
  address$: Observable<DireccionClienteDetalle> = this.store.select(
    attendViewDetailsSelectors.selectAddressClient,
  );
  catPriority$: Observable<Array<DropListOption>> = this.store.select(
    attendViewDetailsSelectors.selectCatPriority,
  );
  selectedPriority$: Observable<DropListOption> = this.store.select(
    attendViewDetailsSelectors.selectPriority,
  );
  selectedOrigin$: Observable<DropListOption> = this.store.select(
    attendViewDetailsSelectors.selectOrigin,
  );
  files$: Observable<Array<IUploadFileCustom>> = this.store.select(
    attendViewDetailsSelectors.selectListFile,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  dataBillOfClient$: Observable<DatosFacturacionClienteDetalle> = this.store.select(
    attendViewDetailsSelectors.selectDataBillOfClient,
  );
  handleKeyComment = debounce(
    (value: string) => this.changeComment(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.typeOfReview = 'fisica';
    this.store.dispatch(attendReviewActions.SET_IS_IN_REBILL_VIEW({isInRebillView: false}));
  }

  changeComment(comment: string): void {
    this.store.dispatch(attendReviewDetailsActions.SET_COMMENT({comment}));
  }

  setPriority(priority: DropListOption): void {
    this.store.dispatch(attendReviewDetailsActions.SET_PRIORITY({priority}));
  }

  addFile(file: File): void {
    const customFile: IUploadFileCustom = {file, name: file.name};
    this.store.dispatch(attendReviewDetailsActions.ADD_FILE({file: customFile}));
  }

  setDate(date): void {
    this.store.dispatch(
      attendReviewDetailsActions.SET_REVIEW_DATE({
        date: dateFormatISO(date),
        dateFormat: date,
      }),
    );
  }

  deleteFile(data: {chipFile: IChipFile; index: number}): void {
    this.store.dispatch(attendReviewDetailsActions.DELETE_FILE({name: data.chipFile.name}));
  }

  rebillView(): void {
    this.store.dispatch(attendReviewActions.SET_IS_IN_REBILL_VIEW({isInRebillView: true}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.attendReview.attendReview,
      appRoutes.attendReview.details,
      appRoutes.rebill.rebill,
    ]);
  }

  saveReview(): void {
    this.store.dispatch(attendReviewDetailsActions.SAVE_SCHEDULE_REVIEW_LOAD());
  }
}
