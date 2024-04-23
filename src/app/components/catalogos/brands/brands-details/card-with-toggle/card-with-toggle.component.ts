import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IBrandItemConfig} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';
import {brandFormDetailsAction} from '@appActions/forms/brand-form';

@Component({
  selector: 'app-card-with-toggle',
  templateUrl: './card-with-toggle.component.html',
  styleUrls: ['./card-with-toggle.component.scss'],
})
export class CardWithToggleComponent implements OnInit {
  @Input() item: IBrandItemConfig;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  handleCheckItem(item: IBrandItemConfig, value: boolean) {
    this.store.dispatch(brandFormDetailsAction.HANDLE_CHECK_ITEM({item, value}));
  }
}
