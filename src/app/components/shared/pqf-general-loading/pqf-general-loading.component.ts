import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'pqf-general-loading',
  templateUrl: './pqf-general-loading.component.html',
  styleUrls: ['./pqf-general-loading.component.scss'],
})
export class PqfGeneralLoadingComponent implements AfterViewInit {
  @ViewChild('containerElement') containerElement: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.renderer.selectRootElement(this.containerElement).nativeElement, // DOCS:  ID del elemento HTML donde deseas mostrar la animación
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/loader-animation.json', // DOCS: Ruta al archivo JSON de la animación
    });
  }
}
