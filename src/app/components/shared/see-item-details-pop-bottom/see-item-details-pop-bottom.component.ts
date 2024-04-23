import {ChangeDetectorRef, Component, Input, Renderer2} from '@angular/core';
import {SeeItemDetailsPopBottom} from '@appModels/see-details-item-pop/see-item-details-pop.models';

@Component({
  selector: 'app-see-item-details-pop-bottom',
  templateUrl: './see-item-details-pop-bottom.component.html',
  styleUrls: ['./see-item-details-pop-bottom.component.scss'],
})
export class SeeItemDetailsPopBottomComponent {
  @Input() seeItemDetailsPopBottom: SeeItemDetailsPopBottom;
  @Input() index: number;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}
}
