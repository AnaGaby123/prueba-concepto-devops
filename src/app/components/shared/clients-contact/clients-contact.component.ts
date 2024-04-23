import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {toLower} from 'lodash-es';

import {IClientContact} from '@appModels/shared/shared.models';
import {Store} from '@ngrx/store';
import {getIncomeLevelImage} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-clients-contact',
  templateUrl: './clients-contact.component.html',
  styleUrls: ['./clients-contact.component.scss'],
})
export class ClientsContactComponent implements OnInit, AfterViewInit {
  @Input() contact: IClientContact;
  @Input() isCollapse: boolean = false;
  @Input() showTitles: boolean = true;
  @Input() typeContact: string = 'Datos Contacto';
  @Input() showConfigAddress: boolean = false;
  @ViewChild('imageElement') imageElement: ElementRef;

  lodashTolower = toLower;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;
  isNotCollapsed = false;

  imgArrow = './assets/Images/arrows/flecha_abajo.svg';
  incomeLevelHelper = getIncomeLevelImage;

  constructor(private store: Store, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  errorImage(img: HTMLImageElement): void {
    img.src = this.defaultImageSource;
  }

  collapseInfo() {
    this.isNotCollapsed = !this.isNotCollapsed;
    /*    this.imgArrow = `./assets/Images/arrows/${
      this.isNotCollapsed ? 'flecha_arriba.svg' : 'flecha_abajo.svg'
    }`;*/
  }
}
