// CORE
import {Component, OnInit} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {attendInvestigationSelectors} from '@appSelectors/pendings/attend-investigation';
import {attendInvestigationDetailsActions} from '@appActions/pendings/attend-investigation';

@Component({
  selector: 'app-attend-investigation-details',
  templateUrl: './attend-investigation-details.component.html',
  styleUrls: ['./attend-investigation-details.component.scss'],
})
export class AttendInvestigationDetailsComponent implements OnInit {
  isDetails$: Observable<boolean> = this.store.select(
    attendInvestigationSelectors.selectDetailsMode,
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(
      attendInvestigationDetailsActions.FETCH_TAB_OPTIONS_LOAD({fetchList: true}),
    );
    this.store.dispatch(attendInvestigationDetailsActions.SET_ACTUAL_PROVIDER());
  }
}
