import {Component} from '@angular/core';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent {
  itemsMonday = [];
  itemsMondayScroll = [];
  itemsTuesday = [];
  itemsTuesdayScroll = [];
  itemsWednesday = [];
  itemsWednesdayScroll = [];
  itemsThursday = [];
  itemsThursdayScroll = [];
  itemsFriday = [];
  itemsFridayScroll = [];
}
