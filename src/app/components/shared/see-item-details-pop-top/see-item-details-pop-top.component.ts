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
import {InputValidators, RegexValidators} from '@appHelpers/shared/shared.helpers';
import {SeeItemDetailsPopTop} from '@appModels/see-details-item-pop/see-item-details-pop.models';
import {buildStringFamily} from '@appUtil/strings';
import {ProductsTypes} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-see-item-details-pop-top',
  templateUrl: './see-item-details-pop-top.component.html',
  styleUrls: ['./see-item-details-pop-top.component.scss'],
})
export class SeeItemDetailsPopTopComponent implements OnInit, AfterViewInit {
  @Input() seeItemDetailsPopTop: SeeItemDetailsPopTop;
  @ViewChild('imgTypePresentation') imgTypePresentation: ElementRef;
  @ViewChild('imgBrand') imgBrand: ElementRef;
  @ViewChild('imgAvailability') imgAvailability: ElementRef;
  @ViewChild('imgTypeItem') imgTypeItem: ElementRef;

  readonly inputValidators = InputValidators;
  readonly productType = ProductsTypes;
  readonly validator = RegexValidators;
  readonly defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  familyString: string;

  errorImageNativeElementTypePresentation = false;
  errorImageNativeElementBrand = false;
  errorImageNativeElementAvailability = false;
  errorImageNativeElementImageTypeItem = false;

  imageNativeElementTypePresentation;
  imageNativeElementBrand;
  imageNativeElementAvailability;
  imageNativeElementTypeItem;

  //DOCS: Banderas para validar que información mostrar por cada tipo de producto
  isPublication = false;
  isLabware = false;
  isTraining = false;
  isMedicalDevice = false;
  isChemistOrBiologic = false;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.cdr.detectChanges();
    this.familyString = this.buildStringFamily(
      this.seeItemDetailsPopTop?.type,
      this.seeItemDetailsPopTop?.subtype,
      this.seeItemDetailsPopTop?.control,
    );
    this.isPublication = this.familyString === this.productType.publications;
    this.isLabware = this.familyString === this.productType.labware;
    this.isTraining =
      this.familyString === this.productType.training ||
      this.familyString === this.productType.trainings;
    this.isMedicalDevice = this.familyString === this.productType.medicalDevice;
    this.isChemistOrBiologic =
      this.familyString !== this.productType.publications &&
      this.familyString !== this.productType.labware &&
      this.familyString !== this.productType.training &&
      this.familyString !== this.productType.trainings &&
      this.familyString !== this.productType.medicalDevice;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElementTypePresentation = this.renderer.selectRootElement(
      this.imgTypePresentation,
    ).nativeElement;
    this.imageNativeElementBrand = this.renderer.selectRootElement(this.imgBrand).nativeElement;
    this.imageNativeElementAvailability = this.renderer.selectRootElement(
      this.imgAvailability,
    ).nativeElement;
    this.imageNativeElementTypeItem = this.renderer.selectRootElement(
      this.imgTypeItem,
    ).nativeElement;
  }

  setImageTypePresentation(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElementTypePresentation) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElementTypePresentation = false;
    return this.defaultImageSource;
  }

  errorImageTypePresentation(): void {
    if (!this.errorImageNativeElementTypePresentation) {
      this.renderer.setAttribute(
        this.imageNativeElementTypePresentation,
        'src',
        this.defaultImageSource,
      );
      this.errorImageNativeElementTypePresentation = true;
    }
    this.setImageTypePresentation();
  }

  setImageBrand(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElementBrand) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElementBrand = false;
    return this.defaultImageSource;
  }

  errorImageBrand(): void {
    if (!this.errorImageNativeElementBrand) {
      this.renderer.setAttribute(this.imageNativeElementBrand, 'src', this.defaultImageSource);
      this.errorImageNativeElementBrand = true;
    }
    this.setImageBrand();
  }

  setImageAvailability(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElementAvailability) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElementAvailability = false;
    return this.defaultImageSource;
  }

  errorImageAvailability(): void {
    if (!this.errorImageNativeElementAvailability) {
      this.renderer.setAttribute(
        this.imageNativeElementAvailability,
        'src',
        this.defaultImageSource,
      );
      this.errorImageNativeElementAvailability = true;
    }
    this.setImageAvailability();
  }

  setImageTypeItem(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElementImageTypeItem) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElementImageTypeItem = false;
    return this.defaultImageSource;
  }

  errorImageTypeItem(): void {
    if (!this.errorImageNativeElementImageTypeItem) {
      this.renderer.setAttribute(this.imageNativeElementTypeItem, 'src', this.defaultImageSource);
      this.errorImageNativeElementImageTypeItem = true;
    }
    this.setImageTypeItem();
  }

  buildStringFamily(type: string, subtype: string, control: string): string {
    return buildStringFamily(type, subtype, control, ' ·  ');
  }
}
