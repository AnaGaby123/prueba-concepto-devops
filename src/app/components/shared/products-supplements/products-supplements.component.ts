import {Component, Input} from '@angular/core';
import {VProductoSuplementario} from 'api-catalogos';

@Component({
  selector: 'app-products-supplements',
  templateUrl: './products-supplements.component.html',
  styleUrls: ['./products-supplements.component.scss'],
})
export class ProductsSupplementsComponent {
  @Input() vProductsSupplements: VProductoSuplementario[];
}
