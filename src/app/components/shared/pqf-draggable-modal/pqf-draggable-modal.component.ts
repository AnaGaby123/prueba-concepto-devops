import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

enum Events {
  default = 0,
  resize = 1,
  move = 2,
}

@Component({
  selector: 'pqf-draggable-modal',
  templateUrl: './pqf-draggable-modal.component.html',
  styleUrls: ['./pqf-draggable-modal.component.scss'],
})
export class PqfDraggableModalComponent implements AfterViewInit {
  @ViewChild('draggable') public draggable: ElementRef;
  @Input() titleHeader = 'PROQUIFA NET';
  @Input() isLoading = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  top = 100;
  left = 100;
  status: Events = Events.default;
  width = 883;
  height = 783;
  marginExtra = 5; // DOCS: MARGEN EXTRA PARA QUE NO SE DESBORDE DEL CORE CONTAINER
  mouse: {x: number; y: number};
  mouseClick: {x: number; y: number; left: number; top: number};
  boxPosition: {left: number; top: number};
  containerPos: {left: number; top: number; right: number; bottom: number};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadDraggable();
    this.loadContainer();
    this.loadCenter();
    this.cdr.detectChanges();
  }

  getParent(): HTMLElement {
    return document.getElementById('coreContainer');
  }

  getDraggable(): HTMLElement {
    return this.draggable.nativeElement;
  }

  loadDraggable(): void {
    const {left, top} = this.getDraggable()?.getBoundingClientRect();
    this.boxPosition = {left, top};
  }

  loadContainer(): void {
    const left = this.boxPosition.left;
    const top = this.boxPosition.top - this.top;
    const right = left + 600;
    const bottom = top + 450;
    this.containerPos = {left, top, right, bottom};
  }

  // DOCS: CARGA EL DRAGGABLE EN EL CENTRO DE LA PANTALLA
  loadCenter(): void {
    const parent = this.getParent();
    const draggable = this.getDraggable();

    this.left = (parent?.offsetWidth - draggable?.offsetWidth) / 2;
    this.top = (parent?.offsetHeight - draggable?.offsetHeight) / 2;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouse = {x: event.clientX, y: event.clientY};

    if (this.status === Events.resize) {
      this.resize();
    } else if (this.status === Events.move) {
      this.move();
    } else {
      this.loadDraggable();
    }
  }

  // DOCS: DETECTA SI EL TAMAÑO DE LA PANTALLA A CAMBIADO Y CENTRA EL DRAGGABLE A LA NUEVA DIMENSIÓN
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.loadCenter();
  }

  setEvent(event: MouseEvent, status: number): void {
    if (this.status === Events.resize) {
      event.stopPropagation();
    } else {
      this.mouseClick = {x: event.clientX, y: event.clientY, left: this.left, top: this.top};
      this.loadDraggable();
    }
    this.status = status;
  }

  resize(): void {
    this.width = Number(this.mouse.x > this.boxPosition.left)
      ? this.mouse.x - this.boxPosition.left >= 500 && this.mouse.x - this.boxPosition.left <= 950
        ? this.mouse.x - this.boxPosition.left
        : this.width
      : 500;
    this.height = Number(this.mouse.y > this.boxPosition.top)
      ? this.mouse.y - this.boxPosition.top >= 500 && this.mouse.y - this.boxPosition.top <= 895
        ? this.mouse.y - this.boxPosition.top
        : this.height
      : 500;
  }

  move(): void {
    if (this.mouseClick && this.mouse) {
      this.left = this.getWidthMarginPixels(
        this.mouseClick.left + (this.mouse.x - this.mouseClick.x),
      );
      this.top = this.getHeightMarginPixels(
        this.mouseClick.top + (this.mouse.y - this.mouseClick.y),
      );
    }
  }

  // DOCS: OBTIENE LOS PIXELES DEL WIDTH DEPENDIENDO SI LLEGA AL LÍMITE DE LA PANTALLA
  getHeightMarginPixels(pixels: number): number {
    if (pixels <= 0) {
      return this.marginExtra;
    } else if (pixels >= this.getParent()?.clientHeight - this.height) {
      return this.getParent()?.clientHeight - this.height - this.marginExtra;
    } else {
      return pixels - this.marginExtra;
    }
  }

  // DOCS: OBTIENE LOS PIXELES DEL HEIGHT DEPENDIENDO SI LLEGA AL LÍMITE DE LA PANTALLA
  getWidthMarginPixels(pixels: number): number {
    if (pixels <= 0) {
      return this.marginExtra;
    } else if (pixels >= this.getParent()?.clientWidth - this.width) {
      return this.getParent()?.clientWidth - this.width - this.marginExtra;
    } else {
      return pixels - this.marginExtra;
    }
  }

  onclose(): void {
    this.closeModal.emit(false);
  }
}
