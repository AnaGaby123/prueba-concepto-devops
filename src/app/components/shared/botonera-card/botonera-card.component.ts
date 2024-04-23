import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Family} from '@appModels/catalogos/offerSegmentation/offerSegmentation';

@Component({
  selector: 'app-botonera-card',
  templateUrl: './botonera-card.component.html',
  styleUrls: ['./botonera-card.component.scss'],
})
export class BotoneraCardComponent {
  @Input() lista: Family[] = [];
  @Input() conIndice: boolean = false;
  @Input() textoCantidad: string;
  @Input() selectedPos = '';
  @Output() event: EventEmitter<any> = new EventEmitter<any>();
  indiceBorder = -1;

  billingMethod(boton: Family, index: number): void {
    this.event.emit(boton);
  }
}
