/*Core imports*/
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/*Selectos imports */
import {uploadReceiptSelectors} from '@appSelectors/pendings/imports-phs/upload-receipt';

@Component({
  selector: 'app-upload-receipt',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss'],
})
export class UploadReceiptComponent {
  isDetails$: Observable<boolean> = this.store.select(uploadReceiptSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(uploadReceiptSelectors.selectTitle);

  constructor(private store: Store) {}
}
