/* Core Imports */
import {Component, Input, OnInit} from '@angular/core';
import {ColumnTotalValue} from '@appModels/table/internal-sales-item';
import {getObjectPercentagePriceList} from '@appUtil/math';
import {ProductsTypes} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-total-value-item',
  templateUrl: './total-value-item.component.html',
  styleUrls: ['./total-value-item.component.scss'],
})
export class TotalValueItemComponent implements OnInit {
  @Input() columnTotalValue: ColumnTotalValue;
  percentage: [number, boolean];
  readonly productsTypes = ProductsTypes;
  ngOnInit() {
    if (this.columnTotalValue?.value && this.columnTotalValue?.listPrice) {
      // TODO: Cuando se adopte en todas las pantallas mandar el numero de piezas quitar esta asignación
      const pieces = this.columnTotalValue.pieces || 1;
      const result = getObjectPercentagePriceList(
        Number(this.columnTotalValue?.value) / pieces,
        this.columnTotalValue?.listPrice,
      );
      this.percentage = [result.percentage, result.isNegative];
    }
  }
}
