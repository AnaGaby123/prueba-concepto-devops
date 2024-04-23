import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-to-resume-alert',
  templateUrl: './add-item-to-resume-alert.component.html',
  styleUrls: ['./add-item-to-resume-alert.component.scss'],
})
export class AddItemToResumeAlertComponent {
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<AddItemToResumeAlertComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
  ) {}

  onClose() {
    this.dialog.close();
  }
}
