import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {Observable} from 'rxjs';
import {
  ITrademarkFamilyChange,
  IVTrademarkDetail,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {VMarcaFamiliaDetalle} from 'api-catalogos';

@Component({
  selector: 'app-associated-trademark-item',
  templateUrl: './associated-trademark-item.component.html',
  styleUrls: ['./associated-trademark-item.component.scss'],
})
export class AssociatedTrademarkItemComponent {
  @Input() editMode = false;
  @Input() enableEdit = false;
  @Input() index: number;
  @Input() item: IVTrademarkDetail;
  @Input() selectedProviderId: string;
  @Output() deleteTrademarkClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() trademarkFamilyChange: EventEmitter<ITrademarkFamilyChange> = new EventEmitter();
  @Output() changeMainProviderChange: EventEmitter<ITrademarkFamilyChange> = new EventEmitter();

  viewType$: Observable<string> = this.store.select(selectViewType);

  constructor(private store: Store<AppState>) {}

  handleChangeMainProviderChange(data: ITrademarkFamilyChange): void {
    this.changeMainProviderChange.emit(data);
  }

  handleDeleteTrademarkClickClick(): void {
    this.deleteTrademarkClick.emit(this.item.IdMarca);
  }

  handleTrackByTrademark(index: number, item: VMarcaFamiliaDetalle): string {
    return item.IdMarcaFamilia;
  }

  handleTrademarkFamilyChange(value: ITrademarkFamilyChange): void {
    this.trademarkFamilyChange.emit(value);
  }
}
