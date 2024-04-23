/* Core Imports */
import {Component, HostListener, OnInit} from '@angular/core';

/* Models Imports */
import {IFile} from '@appModels/files/files.models';

/* Store Imports */
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

/* Common Imports */
import {RESPONSIVE_MENU_WIDTH_LIMIT, VIEW_IPAD, VIEW_MACBOOKAIR} from '@appUtil/common.protocols';

/* Actions Imports */
import {registerArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Selectors Imports */
import {registerArrivalDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';

@Component({
  selector: 'app-open-package',
  templateUrl: './open-package.component.html',
  styleUrls: ['./open-package.component.scss'],
})
export class OpenPackageComponent implements OnInit {
  imagesLoaded$: Observable<Array<IFile>> = this.store.select(
    registerArrivalDetailsSelectors.selectImagesLoaded,
  );
  viewType: string;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  async saveArrayImages(images: Array<IFile>): Promise<void> {
    this.store.dispatch(
      registerArrivalDetailsActions.SET_ARRAY_IMAGES({
        packageImages: images,
      }),
    );
  }
}
