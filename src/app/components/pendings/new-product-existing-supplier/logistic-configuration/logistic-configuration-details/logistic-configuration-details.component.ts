import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {logisticConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/logistic-configuration';
import {Store} from '@ngrx/store';

import {IFamilyLogisticConfiguration} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

@Component({
  selector: 'app-logistic-configuration-details',
  templateUrl: './logistic-configuration-details.component.html',
  styleUrls: ['./logistic-configuration-details.component.scss'],
})
export class LogisticConfigurationDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  configurationLogisticSelected$: Observable<IFamilyLogisticConfiguration> = this.store.select(
    logisticConfigurationDetailsSelectors.selectLogisticConfigurationSelected,
  );

  apiStatusDetails$: Observable<number> = this.store.select(
    logisticConfigurationDetailsSelectors.selectApiStatusDetails,
  );
  configurationLogisticList$: Observable<Array<IFamilyLogisticConfiguration>> = this.store.select(
    logisticConfigurationDetailsSelectors.selectLogisticConfigurationList,
  );

  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;

  constructor(private cdr: ChangeDetectorRef, private store: Store, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElement = false;
    return this.defaultImageSource;
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }
}
