import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  ITrademarkFamilyChange,
  IVTrademarkFamilyDetail,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {buildFamilyName} from '@appHelpers/catalogs/providers/trademark.helpers';

@Component({
  selector: 'app-family-item',
  templateUrl: './family-item.component.html',
  styleUrls: ['./family-item.component.scss'],
})
export class FamilyItemComponent implements OnInit {
  @Input() editMode = false;
  @Input() enableEdit = false;
  @Input() family: IVTrademarkFamilyDetail;
  @Input() selectedProviderId: string; // DOCS: Id del proveedor actualmente seleccionado
  @Input() viewType = 'iPad';
  @Output() trademarkFamilyChange: EventEmitter<ITrademarkFamilyChange> = new EventEmitter();
  @Output() changeMainProviderChange: EventEmitter<ITrademarkFamilyChange> = new EventEmitter();

  buildFamilyName;

  constructor(private store: Store<AppState>) {}

  handleTrademarkFamilyChange(value: boolean): void {
    this.trademarkFamilyChange.emit({
      family: this.family,
      value,
    });
  }

  handleChangeMainProviderChange(value: boolean): void {
    this.changeMainProviderChange.emit({
      family: this.family,
      value,
    });
  }

  ngOnInit(): void {
    this.buildFamilyName = buildFamilyName({family: this.family});
  }
}
