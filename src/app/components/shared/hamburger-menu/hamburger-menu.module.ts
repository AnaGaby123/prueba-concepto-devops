import {NgModule} from '@angular/core';
import {HamburgerMenuComponent} from '@appComponents/shared/hamburger-menu/hamburger-menu.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [HamburgerMenuComponent],
  declarations: [HamburgerMenuComponent],
})
export class HamburgerMenuModule {}
