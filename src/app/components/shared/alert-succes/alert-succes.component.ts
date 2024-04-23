import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-alert-succes',
  templateUrl: './alert-succes.component.html',
  styleUrls: ['./alert-succes.component.scss'],
})
export class AlertSuccesComponent implements OnInit {
  @Input() height = '360px';
  @Input() width = '620px';
  @Input() text = '';
  @Input() successText = '';
  @Input() extraText = '';
  @Output() confirmation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('pop') pop: ElementRef;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.close(true);
    }, 3000);
  }

  close(status: boolean): void {
    this.pop.nativeElement.style.display = 'none';
    this.confirmation.emit(status);
  }
}
