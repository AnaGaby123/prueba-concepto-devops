import {Component, Input} from '@angular/core';
import {IMessageHistory} from '@appModels/shared-components/message-history';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.scss'],
})
export class MessageHistoryComponent {
  @Input() messages: Array<IMessageHistory> = [];

  constructor() {}

  handleTrackById(index: number, item: IMessageHistory): string {
    return item.idMessage;
  }
}
