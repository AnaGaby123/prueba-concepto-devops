import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ENUM_TYPE_POP} from '@appUtil/common.protocols';

@Component({
  selector: 'app-pqf-pop-up-dialog',
  templateUrl: './pqf-pop-up-dialog.component.html',
  styleUrls: ['./pqf-pop-up-dialog.component.scss'],
})
export class PqfPopUpDialogComponent implements OnInit {
  constructor(
    private dialog: MatDialogRef<PqfPopUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      activeButtons: boolean; // DOCS Activa los botones del pop
      text: string; // DOCS Texto a mostrar en el pop
      secondText: string; // DOCS Texto a mostrar texto secundario en el pop
      textPrimaryButton: string; // DOCS Texto del botón primario
      textSecondaryButton: string; // DOCS Texto del botón secundario
      titleHeader: string; // DOCS Texto de titulo del pop
      typePop: string; // DOCS Tipo de pop warning/success/error
      widthButton: 'sm' | 'md' | 'lg' | 'xl'; //DOCS : Tamaño de los botones
    },
  ) {
    this.data.textPrimaryButton = this.data?.textPrimaryButton ?? 'Guardar';
    this.data.textSecondaryButton = this.data?.textSecondaryButton ?? 'Salir';
    this.data.titleHeader = this.data?.titleHeader ?? 'PROQUIFA NET';
    this.data.typePop = this.data?.typePop ?? ENUM_TYPE_POP.warning;
    this.data.widthButton = this.data.widthButton ?? 'sm';
  }

  ngOnInit(): void {}

  getCheckImage(): string {
    return this.data?.typePop === ENUM_TYPE_POP.success
      ? 'assets/Images/components-src/pop-up/success.svg'
      : this.data?.typePop === ENUM_TYPE_POP.warning
      ? 'assets/Images/components-src/pop-up/alert.svg'
      : '';
  }

  getTypePopStyles(): {warning: boolean; success: boolean; error: boolean} {
    return {
      warning: this.data?.typePop === ENUM_TYPE_POP.warning,
      success: this.data?.typePop === ENUM_TYPE_POP.success,
      error: this.data?.typePop === ENUM_TYPE_POP.error,
    };
  }

  onClose(type: string, value: boolean): void {
    this.dialog.close({type, value});
  }
}
