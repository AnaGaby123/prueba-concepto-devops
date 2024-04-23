import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IInvoice} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {collectionMonitoringDetailsSelectors} from '@appSelectors/pendings/charges/collection-monitoring';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {VFacturaClienteCalendarioTotales} from 'api-finanzas';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.scss'],
})
export class AddCommentsComponent {
  @Input() selectedClient: VFacturaClienteCalendarioTotales;
  @Input() viewType: string;
  @Output() emitButton: EventEmitter<{value; comments}> = new EventEmitter<{
    value;
    comments;
  }>();
  selectedInvoices$: Observable<Array<IInvoice>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedInvoices,
  );
  selectedInvoicesAmount$: Observable<number> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedInvoicesAmount,
  );
  comments: string;

  constructor(private store: Store<AppState>) {}

  setComment(comments: string): void {
    this.comments = comments;
  }

  save(value: boolean): void {
    this.emitButton.emit({value, comments: this.comments});
  }
}
