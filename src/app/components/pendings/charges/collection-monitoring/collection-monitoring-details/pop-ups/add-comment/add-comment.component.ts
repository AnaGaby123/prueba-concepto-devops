import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IInvoice} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {VFacturaClienteCalendarioTotales} from 'api-finanzas';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Input() invoice: IInvoice;
  @Input() selectedClient: VFacturaClienteCalendarioTotales;
  @Input() viewType: string;
  @Output() emitButton: EventEmitter<{value; invoice}> = new EventEmitter<{
    value;
    invoice;
  }>();
  @Output() commentOutput: EventEmitter<string> = new EventEmitter<string>();

  comments: string;

  setComment(comments: string): void {
    this.invoice = {...this.invoice, comments};
  }

  save(value: boolean): void {
    this.emitButton.emit({value, invoice: this.invoice});
  }
}
