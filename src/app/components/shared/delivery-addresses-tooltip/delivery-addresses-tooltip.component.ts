import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {VDireccion} from 'api-logistica';
import {isEqual} from 'lodash-es';

import {buildAddressFormat} from '@appUtil/util';

@Component({
  selector: 'app-delivery-addresses-tooltip',
  templateUrl: './delivery-addresses-tooltip.component.html',
  styleUrls: ['./delivery-addresses-tooltip.component.scss'],
})
export class DeliveryAddressesTooltipComponent {
  @Input() deliveriesAddress: VDireccion[] = [];
  @Input() deliverySelected: VDireccion;
  @Output() valueEmitter: EventEmitter<VDireccion> = new EventEmitter<VDireccion>();

  lodashIsEqual = isEqual;
  isTooltipOpen = false;

  constructor(private store: Store, private elementRef: ElementRef) {}

  openTooltip(): void {
    this.isTooltipOpen = !this.isTooltipOpen;
  }

  selectAddress(address: VDireccion): void {
    this.valueEmitter.emit(address);
    this.isTooltipOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event): void {
    if (this.isTooltipOpen) {
      const elementRef = this.elementRef.nativeElement.contains(event?.target);
      if (!elementRef) {
        this.isTooltipOpen = false;
      }
    }
  }
  buildAddressFormat(address: VDireccion) {
    return buildAddressFormat(address);
  }
}
