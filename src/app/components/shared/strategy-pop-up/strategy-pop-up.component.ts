import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPositionsPopUp} from '@appModels/popUp/pop-up.model';

@Component({
  selector: 'app-strategy-pop-up',
  templateUrl: './strategy-pop-up.component.html',
  styleUrls: ['./strategy-pop-up.component.scss'],
})
export class StrategyPopUpComponent {
  @Output() closeEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() trianglePosition: 'down' | 'left' | 'top' | 'right' = 'down';
  @Input() positions: IPositionsPopUp = {bottom: '-7px', left: '40px'};
  @Input() closeButtonSize = '20px';
  @Input() closeButtonPosition = '20px';

  closePopUp(): void {
    this.closeEmitter.emit(true);
  }
}
