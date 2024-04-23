import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrivalDateItemComponent} from '@appComponents/shared/item-quote/arrival-date/arrival-date-item.component';
import {ArrowItemComponent} from '@appComponents/shared/item-quote/arrow-item/arrow-item.component';
import {BrandItemComponent} from '@appComponents/shared/item-quote/brand-item/brand-item.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {ChecksTypeAdjustmentItemComponent} from '@appComponents/shared/item-quote/checks-type-adjustment-item/checks-type-adjustment-item.component';
import {ChecksRedGreenComponent} from '@appComponents/shared/item-quote/checks-red-green-item/checks-red-green.component';
import {CommentsItemComponent} from '@appComponents/shared/item-quote/comments-item/comments-item.component';
import {ConceptItemComponent} from '@appComponents/shared/item-quote/concept-item/concept-item.component';
import {DateLastFollowItemComponent} from '@appComponents/shared/item-quote/date-last-follow-item/date-last-follow-item.component';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DeleteItemComponent} from '@appComponents/shared/item-quote/delete-item/delete-item.component';
import {DeliveryRestrictionsItemComponent} from '@appComponents/shared/item-quote/delivery-restrictions-item/delivery-restrictions-item.component';
import {DeliveryTimeItemComponent} from '@appComponents/shared/item-quote/delivery-time-item/delivery-time-item.component';
import {ImgTypeItemComponent} from '@appComponents/shared/item-quote/img-type-item/img-type-item.component';
import {ImgTypePresentationProductComponent} from '@appComponents/shared/item-quote/img-type-presentation-product/img-type-presentation-product.component';
import {InternalSalesItemComponent} from '@appComponents/shared/item-quote/internal-sales-item.component';
import {LabelNumberItemComponent} from '@appComponents/shared/item-quote/label-number-item/label-number-item.component';
import {NumberItemComponent} from '@appComponents/shared/item-quote/number-item/number-item.component';
import {NumberPiecesItemComponent} from '@appComponents/shared/item-quote/number-pieces-item/number-pieces-item.component';
import {ResearchResponseItemComponent} from '@appComponents/shared/item-quote/research-response-item/research-response-item.component';
import {SeeMoreItemComponent} from '@appComponents/shared/item-quote/see-more-item/see-more-item.component';
import {TotalValueItemComponent} from '@appComponents/shared/item-quote/total-value-item/total-value-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {UnitPriceComponent} from '@appComponents/shared/item-quote/unit-price-item/unit-price.component';
import {ChecksYellowGreenComponent} from '@appComponents/shared/item-quote/check-yellow-green-item/checks-yellow-green.component';
import {CheckNormalItemComponent} from '@appComponents/shared/item-quote/check-normal-item/check-normal-item.component';
import {RadioButtonItemComponent} from '@appComponents/shared/item-quote/radio-button-item/radio-button-item.component';
import {IndicatorStatusItemComponent} from '@appComponents/shared/item-quote/indicator-status-item/indicator-status-item.component';
import {TrashReverseItemComponent} from '@appComponents/shared/item-quote/trash-reverse-setting-item/trash-reverse-item.component';
import {TotalValueQuotationItemComponent} from '@appComponents/shared/item-quote/total-value-quotation-item/total-value-quotation-item.component';
import {TotalValueTrainingItemComponent} from '@appComponents/shared/item-quote/total-value-training-item/total-value-training-item.component';
import {FormsModule} from '@angular/forms';
import {StateItemComponent} from '@appComponents/shared/item-quote/state-item/state-item.component';
import {SeeResumeItemComponent} from '@appComponents/shared/item-quote/see-resume-item/see-resume-item.component';
import {DeliveryTimeSuggestedItemComponent} from '@appComponents/shared/item-quote/delivery-time-suggested-item/delivery-time-suggested-item.component';
import {CancelReasonItemComponent} from '@appComponents/shared/item-quote/cancel-reason-item/cancel-reason-item.component';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {RequestedPriceItemComponent} from '@appComponents/shared/item-quote/requested-price-item/requested-price-item.component';
import {AdjustmentPriceItemComponent} from '@appComponents/shared/item-quote/adjustment-price-item/adjustment-price-item.component';
import {NotesItemComponent} from './notes-item/notes-item.component';

@NgModule({
  declarations: [
    ArrivalDateItemComponent,
    ArrowItemComponent,
    BrandItemComponent,
    ChecksTypeAdjustmentItemComponent,
    ChecksRedGreenComponent,
    CommentsItemComponent,
    ConceptItemComponent,
    DateLastFollowItemComponent,
    DeleteItemComponent,
    DeliveryRestrictionsItemComponent,
    DeliveryTimeItemComponent,
    ImgTypeItemComponent,
    ImgTypePresentationProductComponent,
    InternalSalesItemComponent,
    LabelNumberItemComponent,
    NumberItemComponent,
    NumberPiecesItemComponent,
    ResearchResponseItemComponent,
    TrashReverseItemComponent,
    SeeMoreItemComponent,
    TotalValueItemComponent,
    UnitPriceComponent,
    ChecksYellowGreenComponent,
    CheckNormalItemComponent,
    RadioButtonItemComponent,
    IndicatorStatusItemComponent,
    TotalValueQuotationItemComponent,
    TotalValueTrainingItemComponent,
    StateItemComponent,
    SeeResumeItemComponent,
    DeliveryTimeSuggestedItemComponent,
    CancelReasonItemComponent,
    RequestedPriceItemComponent,
    AdjustmentPriceItemComponent,
    NotesItemComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DateFormatModule,
    CheckBoxModule,
    FormsModule,
    CustomPositionPopUpModule,
  ],
  exports: [
    InternalSalesItemComponent,
    CheckNormalItemComponent,
    ChecksTypeAdjustmentItemComponent,
  ],
})
export class InternalSalesItemModule {}
