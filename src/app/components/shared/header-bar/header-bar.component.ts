// TODO: El contenedor para este componente, debe especificarla altura.

/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent {
  @Input() activeBack = true;
  @Input() imageSource = ''; // Docs: Nombre de la imagen a colocar en el lado superior derecho
  @Input() name = '';
  @Input() title = '';
  @Input() tooltipText = '';
  @Output() goBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageActionClick: EventEmitter<any> = new EventEmitter<any>(); // Docs: Output para que al hacer click sobre la imagen emita

  handleGoBack(): void {
    if (this.activeBack) {
      this.goBack.emit();
    }
  }

  executeActionClick(): void {
    this.imageActionClick.emit();
  }
}
