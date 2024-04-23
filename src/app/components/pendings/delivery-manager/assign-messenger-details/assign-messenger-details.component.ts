import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {forEach} from 'lodash-es';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

interface PackingLists {
  id: number;
  client: string;
  zone: string;
  dir: string;
  fee: string;
  clientDate: string;
  events: number;
  amount: number;
  assignedTo: number;
}

interface Messengers {
  id?: number;
  name: string;
  zone: string;
  rute: number;
  totalClients: number;
  totalEvents: number;
  totalAmount: number;
  assigned?: Array<PackingLists>;
}

@Component({
  selector: 'app-assign-messenger-details',
  templateUrl: './assign-messenger-details.component.html',
  styleUrls: ['./assign-messenger-details.component.scss'],
})
export class AssignMessengerDetailsComponent implements OnInit {
  items = [];
  activePopUp: boolean;
  color: any[] = [];
  messengersIndex: string[] = [];
  packingList: Array<PackingLists> = [
    {
      id: 1,
      client: 'BEST',
      zone: 'SUR',
      dir: 'BILBAO NO. 281',
      fee: '15/12/21',
      clientDate: '09:00-14:30 hrs · 09:00-14:30 hrs',
      events: 2,
      amount: 456,
      assignedTo: 0,
    },
    {
      id: 2,
      client: 'MEDIX',
      zone: 'NORTE',
      dir: 'BILBAO NO. 281',
      fee: '15/12/21',
      clientDate: '09:00-14:30 hrs · 09:00-14:30 hrs',
      events: 1,
      amount: 654,
      assignedTo: 0,
    },
    {
      id: 3,
      client: 'NOVAG',
      zone: 'SUR',
      dir: 'BILBAO NO. 281',
      fee: '15/12/21',
      clientDate: '09:00-14:30 hrs · 09:00-14:30 hrs',
      events: 4,
      amount: 654,
      assignedTo: 0,
    },
  ];
  totalClients = this.packingList.length;
  totalEvents = this.packingList.length;
  totalAmount = 0;
  value = 0;
  messengers: Array<Messengers> = [
    {
      id: 0,
      name: 'Sin Asignar',
      zone: 'SUR, TOLUCA',
      rute: 0,
      totalClients: this.totalClients,
      totalEvents: this.totalEvents,
      totalAmount: this.totalAmount,
      assigned: [this.packingList[0], this.packingList[1], this.packingList[2]],
    },
    {
      id: 1,
      name: 'Luis David Torres Martinez',
      zone: 'TOLUCA',
      rute: 0,
      totalClients: 0,
      totalEvents: 0,
      totalAmount: 0,
      assigned: [],
    },
    {
      id: 2,
      name: 'Guadalupe Sanchez Vasquez',
      zone: 'GUERRERO',
      rute: 0,
      totalClients: 0,
      totalEvents: 0,
      totalAmount: 0,
      assigned: [],
    },
  ];

  plItems: Array<PackingLists> = [];
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  constructor(private store: Store<AppState>) {
    this.activePopUp = false;
  }

  ngOnInit(): void {
    this.color = [
      '#C1272D',
      '#0098DA',
      '#0838DD',
      '#EF63A0',
      '#900280',
      '#417505',
      '#91CA52',
      '#FF7404',
      '#FC187B',
    ];
    forEach(this.messengers, (content) => {
      this.messengersIndex.push('id' + content.id);
    });
  }

  selected(index: number): void {
    if (index === 0) {
      this.plItems = this.messengers[0].assigned;
      this.value = 0;
    } else {
      this.plItems = this.messengers[index].assigned;
      this.value = index;
    }
  }

  noReturnPredicate(): boolean {
    return false;
  }

  dropItem(event: CdkDragDrop<PackingLists[]>): void {
    // Detectar el evento (que entre aqui)
    const id = event.container.id;
    const separator = id.split('d');
    const messengerId = +separator[1];
    const origin = event.previousContainer.data[messengerId].assignedTo;
    const destiny = messengerId;
    // const id: number = +separator[1];
    this.messengers[destiny].assigned.push(event.previousContainer.data[origin]);
    this.messengers[origin].assigned.splice(0, 1);
  }
}
