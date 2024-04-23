import {Component, ElementRef, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-drop-down-with-image',
  templateUrl: './drop-down-with-image.component.html',
  styleUrls: ['./drop-down-with-image.component.scss'],
})
export class DropDownWithImageComponent {
  @Input() font = 'Novecento-Bold';
  @Input() title = 'Filtro';
  @Input() isSelected = false;
  @Input() defaultImgSource = 'assets/Images/question-mark.svg';
  @Input() mainImgSource = 'assets/Images/question-mark-ocean.svg';
  @Input() maxHeightOptions = '121px';
  @Input() options: Array<DropListOption>;
  @Input() selectedOption: DropListOption;
  @Input() showTriangle = true;
  @Input() textAlign = 'center';
  @Input() width = '100%';
  @Output() selectOption: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();

  showOptions = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.listen('document', 'click', (event: MouseEvent) => this.handleGlobalClick(event));
  }

  selectItem(selectedOption: DropListOption): void {
    if (selectedOption !== undefined && selectedOption.value !== this.selectedOption?.value) {
      this.selectOption.emit(selectedOption);
    }
    this.handleOpenDropList();
  }

  handleOpenDropList(): void {
    this.showOptions = !this.showOptions;
  }

  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (this.showOptions && !withinElement) {
      this.handleOpenDropList();
    }
  }

  handleTrackByFn(index: number, item: DropListOption): string {
    return item.value;
  }
}
