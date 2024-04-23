import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pop-up-alert',
  templateUrl: './pop-up-alert.component.html',
  styleUrls: ['./pop-up-alert.component.scss'],
})
export class PopUpAlertComponent implements OnChanges {
  @Output() confirmacion: EventEmitter<any> = new EventEmitter<any>();
  @Input() textInitial = 'Error';
  @Input() textInter = 'Error';
  @Input() textFinal = 'Error';
  @Input() activarBoton = true;
  @Input() time = 1500;
  @Input() highlightColor = '#008894';
  @ViewChild('pop')
  pop: ElementRef;

  ngOnChanges(): void {
    if (!this.activarBoton) {
      setTimeout(() => {
        this.close(true);
      }, this.time);
    }
  }

  close(status: boolean): void {
    this.pop.nativeElement.style.display = 'none';
    this.confirmacion.emit(status);
  }
}
