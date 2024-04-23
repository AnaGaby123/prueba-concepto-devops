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
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnChanges {
  @Output() confirmacion: EventEmitter<any> = new EventEmitter<any>();
  @Input() alertaTxt = 'Error';
  @Input() activarBoton = true;
  @Input() onlyButton = false;
  @ViewChild('pop') pop: ElementRef;

  ngOnChanges(): void {
    if (!this.activarBoton && !this.onlyButton) {
      setTimeout(() => {
        this.cerrar(true);
      }, 1500);
    }
  }

  cerrar(status): void {
    this.pop.nativeElement.style.display = 'none';
    this.confirmacion.emit(status);
  }
}
