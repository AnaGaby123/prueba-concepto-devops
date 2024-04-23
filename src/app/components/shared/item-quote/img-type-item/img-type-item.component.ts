/* Core Imports */
import {Component, Input} from '@angular/core';
import {QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {ColumnImgTypeItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-img-type-item',
  templateUrl: './img-type-item.component.html',
  styleUrls: ['./img-type-item.component.scss'],
})
export class ImgTypeItemComponent {
  @Input() columnImgTypeItem: ColumnImgTypeItem = null;
  readonly typeItem = QuotationItemTypes;
}
