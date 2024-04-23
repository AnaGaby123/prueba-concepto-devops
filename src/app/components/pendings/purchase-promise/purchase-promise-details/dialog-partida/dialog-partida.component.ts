import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-partida',
  templateUrl: './dialog-partida.component.html',
  styleUrls: ['./dialog-partida.component.scss'],
})
export class DialogPartidaComponent {
  constructor(private dialog: MatDialogRef<DialogPartidaComponent>) {}

  close(): void {
    this.dialog.close();
  }
}
