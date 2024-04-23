import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: ' app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent {
  @Input() alternativeCheckSource;
  @Input() backGroundCheckColor = '';
  @Input() check = false;
  @Input() checkColor:
    | 'ocean'
    | 'green'
    | 'red'
    | 'yellow'
    | 'dark-red'
    | 'dark-orange'
    | 'dark-green'
    | 'purple' = 'ocean';
  @Input() disabled = false;
  @Input() height = '20px';
  @Input() label = '';
  @Input() secondaryLabel = '';
  @Input() enableEdit = true;
  @Input() fontSize = '14px';
  @Input() fontBold = false;
  @Input() fontColor = '#424242';
  @Input() enabledIconNoSelected = false;
  @Input() enabledIconSelected = true;
  @Input() isMulticolor = false;
  @Input() labelFontStyle;
  @Input() readOnlyCheckImage = 'assets/Images/check.svg';
  @Input() secondaryLabelFontStyle;
  @Input() spanText: '';
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();

  selected(): void {
    if (!this.check) {
      this.event.emit(true);
    } else {
      this.event.emit(false);
    }
  }
}
