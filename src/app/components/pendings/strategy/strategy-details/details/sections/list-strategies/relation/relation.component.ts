import {Component, DoCheck, HostListener, OnInit} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPositionsPopUp} from '@appModels/popUp/pop-up.model';
import {RESPONSIVE_MENU_WIDTH_LIMIT} from '@appUtil/common.protocols';
import {isEqual} from 'lodash-es';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss'],
})
export class RelationComponent implements OnInit, DoCheck {
  itemsClosing = [
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
    {
      Index: 1,
      CAT: 58590,
    },
  ];
  itemsClosingScroll: any = [];
  doughnutChartData = {
    values: [15, 34],
    labels: ['Abiertas', 'Cerradas'],
  };
  doughnutChartOptionDetails = [
    {label: 'Abiertas', value: 15},
    {label: 'Cerradas', value: 34},
  ];
  doughnutChartOptionDetailsHover: any = [
    {label: 'Abiertas', value: 15},
    {label: 'Cerradas', value: 34},
  ];
  colors = ['#f3b23f', '#1c5393'];
  filters = [
    {value: 1, label: 'Más Antiguas'},
    {value: 2, label: 'Más Recientes'},
  ];
  filterSelected: any = {value: 1, label: 'Más Antiguas'};
  viewType: string;
  popUpIsOpen = false;
  dataPopUp: {top: string; left: string};
  positionsPopUp: IPositionsPopUp;
  trianglePosition: 'down' | 'left';
  target: any = null;
  dataTarget: any;
  count = 0;

  ngOnInit(): void {
    this.onResize();
  }

  ngDoCheck(): void {
    this.callToFunction();
  }

  setOrder(orderType: DropListOption): void {
    this.filterSelected = orderType;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType = window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? 'iPad' : 'macBookAir';
    this.setPositionsPopUps();
  }

  callToFunction(): void {
    this.sendInititalData(this.target);
  }

  setPositionsPopUps(): void {
    if (this.viewType === 'iPad') {
      this.positionsPopUp = {bottom: '-7px', left: '40px'};
      this.trianglePosition = 'down';
    } else {
      this.positionsPopUp = {bottom: '50%', left: '-7px'};
      this.trianglePosition = 'left';
    }
  }

  closePopUp(): void {
    this.popUpIsOpen = false;
  }

  sendInititalData(target: HTMLImageElement) {
    this.target = target;
    if (this.target) {
      const {bottom, height, left, right, top, width, x, y} = this.target.getBoundingClientRect();
      const dataTargetCurrent = {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      };
      if (!isEqual(dataTargetCurrent, this.dataTarget)) {
        this.dataTarget = {...dataTargetCurrent};
        this.count = 0;
      } else {
        this.count++;
        if (this.count >= 2) {
          this.count = 0;
          const dataPopUp: DOMRect = this.dataTarget;
          this.dataTarget.width !== 0 ? (this.popUpIsOpen = true) : (this.popUpIsOpen = false);
          let popUpTop;
          let popUpLeft;

          if (this.viewType === 'iPad') {
            popUpTop = dataPopUp.top - 351 - 15;
            popUpLeft = dataPopUp.left;
          } else {
            popUpTop = dataPopUp.top - 603 / 2 + 17;
            popUpLeft = dataPopUp.left + width + 15;
          }

          this.dataPopUp = {
            top: `${popUpTop}px`,
            left: `${popUpLeft}px`,
          };
        }
      }
    }
  }
}
