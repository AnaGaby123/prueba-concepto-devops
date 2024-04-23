import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {CalendarDay} from '@appModels/calendario/calendar';
import {selectNonWorkingDays} from '@appSelectors/utils/utils.selectors';

@Component({
  selector: 'app-item-training',
  templateUrl: './item-training.component.html',
  styleUrls: ['./item-training.component.scss'],
})
export class ItemTrainingComponent {
  @Input() isBackOrder: boolean;
  @Input() isNotMarketable: boolean;
  @Input() product: ProductSearchResult;
  @Input() currency: string;
  @Input() family: string;
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(selectNonWorkingDays);

  constructor(private store: Store<AppState>, private route: Router) {}
}
