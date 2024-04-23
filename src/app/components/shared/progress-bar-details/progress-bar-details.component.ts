import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar-details',
  templateUrl: './progress-bar-details.component.html',
  styleUrls: ['./progress-bar-details.component.scss'],
})
export class ProgressBarDetailsComponent implements OnInit {
  @Input() showCollapse: boolean = false;
  @Input() currency: string;
  @Input() percentage: number;
  @Input() totalQuotedUSD: number;
  @Input() fundamentalObjectiveUSD: number;
  @Input() currentYear: number;
  @Input() efficiency: number;
  @Input() currentDate: Date;

  isCollapse = false;

  constructor() {}

  ngOnInit(): void {}

  collapse(): void {
    this.isCollapse = !this.isCollapse;
  }
}
