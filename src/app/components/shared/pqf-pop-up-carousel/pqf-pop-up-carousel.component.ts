import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {PqfGenericPopUpComponent} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.component';
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'pqf-pop-up-carousel',
  templateUrl: './pqf-pop-up-carousel.component.html',
  styleUrls: [
    './pqf-pop-up-carousel.component.scss',
    '../pqf-generic-pop-up/pqf-generic-pop-up.component.scss',
  ],
})
export class PqfPopUpCarouselComponent extends PqfGenericPopUpComponent
  implements OnInit, AfterViewInit {
  @Input() subtitle: string = 'Información complementaria'; // Subtitulo del pop
  @Input() paginatorColor: string = '#008894'; // Color del paginado
  @ViewChild('pagesHtmlElement') pagesElement: ElementRef;
  @ViewChild('leftArrow') leftArrow: ElementRef;
  @ViewChild('rightArrow') rightArrow: ElementRef;
  childContentLeftScroll = 0; // Tamaño del contenedor hijo
  currentPage = 1; // Pagina actual
  htmlScrollLeft = 0; // Propiedad scrollLeft del contenedor
  leftArrowElement;
  leftDisable = 'assets/Images/arrows/pqf-left-arrow-disable.svg';
  leftEnable = 'assets/Images/arrows/pqf-left-arrow.svg';
  maxScrollLeft = 0; // Cantidad maxima de px que se puede hacer scroll
  pages = 0; // Numero de paginas que hay
  pagesArray = []; // Arreglo de paginas obtenido de la cantidad de numero de paginas
  pagesNativeElement;
  rightArrowElement;
  rightDisable = 'assets/Images/arrows/pqf-right-arrow-disable.svg';
  rightEnable = 'assets/Images/arrows/pqf-right-arrow.svg';
  scrollInitial = false;
  scrollTimeOut: Timeout;
  widthContent = 599;

  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {}

  // DOCS: Obtiene la cantidad de contenedores que hay
  ngAfterViewInit() {
    this.leftArrowElement = this.renderer.selectRootElement(this.leftArrow).nativeElement;
    this.rightArrowElement = this.renderer.selectRootElement(this.rightArrow).nativeElement;
    this.pagesNativeElement = this.renderer.selectRootElement(this.pagesElement).nativeElement;
    this.pages = this.pagesNativeElement.childElementCount;
    for (let i = 1; i <= this.pages; i++) {
      this.pagesArray.push(i);
    }
    this.maxScrollLeft = this.pagesNativeElement.scrollWidth - this.pagesNativeElement.clientWidth;
    this.childContentLeftScroll = this.maxScrollLeft / this.pages;
    this.getLeftArrow();
    this.getRightArrow();
    this.pagesNativeElement.addEventListener('scroll', () => this.onScroll());
  }

  // DOCS: Escucha el scroll para actualizar la pagina activa
  onScroll() {
    clearTimeout(this.scrollTimeOut);
    this.scrollTimeOut = setTimeout(() => {
      this.htmlScrollLeft = this.pagesNativeElement.scrollLeft;
      const calculatedPage = Math.ceil(this.htmlScrollLeft / this.childContentLeftScroll);
      this.currentPage = calculatedPage === 0 ? calculatedPage + 1 : calculatedPage;
      this.getLeftArrow();
      this.getRightArrow();
    }, 30);
  }

  // DOCS: Obtiene la fecha izquierda segun el caso
  getLeftArrow() {
    if (this.currentPage === 1) {
      this.renderer.setAttribute(this.leftArrowElement, 'src', this.leftDisable);
      this.leftArrowElement.style.cursor = 'default';
    } else {
      this.renderer.setAttribute(this.leftArrowElement, 'src', this.leftEnable);
      this.leftArrowElement.style.cursor = 'pointer';
    }
  }

  // DOCS: Obtiene la flecha derecha segun el caso
  getRightArrow() {
    if (this.currentPage === this.pages) {
      this.renderer.setAttribute(this.rightArrowElement, 'src', this.rightDisable);
      this.rightArrowElement.style.cursor = 'default';
    } else {
      this.renderer.setAttribute(this.rightArrowElement, 'src', this.rightEnable);
      this.rightArrowElement.style.cursor = 'pointer';
    }
  }

  // DOCS: Realiza scroll hacia el contenedor de la izquierda
  scrollLeft() {
    this.scrollInitial = true;
    this.pagesElement.nativeElement.scrollBy(-this.widthContent, 0);
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.getLeftArrow();
    this.getRightArrow();
    setTimeout(() => {
      this.scrollInitial = false;
    }, 500);
  }

  // DOCS: Realiza scroll hacia el contenedor de la derecha
  scrollRight() {
    this.scrollInitial = true;
    this.pagesElement.nativeElement.scrollBy(this.widthContent, 0);
    if (this.currentPage < this.pagesElement.nativeElement.childElementCount) {
      this.currentPage++;
    }
    this.getLeftArrow();
    this.getRightArrow();
    setTimeout(() => {
      this.scrollInitial = false;
    }, 500);
  }

  // DOCS: Cerrar pop
  handleClose(event) {
    this.event.emit(event);
  }
}
