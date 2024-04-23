import {Component, Input, OnInit} from '@angular/core';
import {IClientContact} from '@appModels/shared/shared.models';

@Component({
  selector: 'app-client-contact-bars-collapse',
  templateUrl: './client-contact-bars-collapse.component.html',
  styleUrls: ['./client-contact-bars-collapse.component.scss'],
})
export class ClientContactBarsCollapseComponent implements OnInit {
  @Input() contact: IClientContact;
  @Input() currency: string;
  @Input() currentDate: Date;
  @Input() currentYear: number;
  @Input() efficiency: number;
  @Input() fundamentalObjectiveUSD: number;
  @Input() percentage: number;
  @Input() showBar: boolean = true;
  @Input() showCollapse: boolean = false;
  @Input() showContact: boolean = true;
  @Input() totalQuotedUSD: number;
  imgArrow = './assets/Images/arrows/flecha_mostrar_abajo.svg';
  constructor() {}
  isCollapse = false;
  ngOnInit(): void {}

  collapseInfo() {
    this.isCollapse = !this.isCollapse;
  }
}
