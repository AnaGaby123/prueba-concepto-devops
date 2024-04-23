import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {forEach, isEmpty, isEqual} from 'lodash-es';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';

@Component({
  selector: 'app-percentage-bar',
  templateUrl: './percentage-bar.component.html',
  styleUrls: ['./percentage-bar.component.scss'],
})
export class PercentageBarComponent implements OnInit, OnChanges {
  @Input() items: IPercentageBarItems[];
  widthInfo: string;
  total: number;

  ngOnInit(): void {
    this.loadData(this.items);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes.items &&
      !isEqual(changes.items.previousValue, changes.items.currentValue)
    ) {
      this.loadData(changes.items.currentValue);
    }
  }

  loadData(items: IPercentageBarItems[]): void {
    if (!isEmpty(this.items)) {
      this.widthInfo = `${100 / items.length}%`;
    } else {
      this.widthInfo = '100%';
    }

    const convertPercentageToNumber = (percentage: string): number => {
      const result = percentage.split('%');
      return Number(result[0]);
    };

    let totalPercentage = 0;
    forEach(
      items,
      (o: IPercentageBarItems) => (totalPercentage += convertPercentageToNumber(o.percentage)),
    );
    this.total = totalPercentage;
  }
}
