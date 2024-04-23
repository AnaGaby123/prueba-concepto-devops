/* Core Imports */
import {Component, Input} from '@angular/core';

/* Models Imports */
import {ILimitLine} from '@appModels/progress-bar/limit-line';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() color = '#4ba92b';
  @Input() percentage = 0;
  @Input() limitLines: Array<ILimitLine> = [];
}
