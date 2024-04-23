import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-items-count-bar',
  templateUrl: './items-count-bar.component.html',
  styleUrls: ['./items-count-bar.component.scss'],
})
export class ItemsCountBarComponent implements AfterViewInit, DoCheck {
  @Input() progress = 0; // items procesados
  @Input() progressColor = '#94ba13'; // Color de barra procesados
  @Input() missingColor = '#eceef0'; // Color barra no procesados
  @Input() totalItems = 0; // total de items (equivale al 100%)
  @Input() progressMessage = ''; // Mensaje en barra procesados
  @Input() missingMessage = ''; // Mensaje en barra no procesados
  @ViewChild('progressElement') progressElement: ElementRef;
  @ViewChild('missingElement') missingElement: ElementRef;
  progressLabel: number;
  progressDiv: number;
  missingLabel: number;
  missingDiv: number;
  showProgressTooltip = false;
  showMissingTooltip = false;

  constructor(private renderer: Renderer2) {}

  ngDoCheck(): void {
    if (this.progressLabel && this.progressDiv) {
      this.checkWidth();
    }
  }

  ngAfterViewInit(): void {
    this.checkWidth();
  }

  checkWidth(): void {
    this.progressLabel = this.renderer.selectRootElement(
      this.progressElement,
    ).nativeElement.children[0].offsetWidth;
    this.progressDiv = this.renderer.selectRootElement(
      this.progressElement,
    ).nativeElement.offsetWidth;
    this.missingLabel = this.renderer.selectRootElement(
      this.missingElement,
    ).nativeElement.children[0].offsetWidth;
    this.missingDiv = this.renderer.selectRootElement(
      this.missingElement,
    ).nativeElement.offsetWidth;
    this.showProgressTooltip = this.progressLabel + 10 >= this.progressDiv;
    this.showMissingTooltip = this.missingLabel + 10 >= this.missingDiv;
  }
}
