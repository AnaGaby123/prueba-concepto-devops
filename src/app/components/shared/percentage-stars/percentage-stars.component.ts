import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-percentage-stars',
  templateUrl: './percentage-stars.component.html',
  styleUrls: ['./percentage-stars.component.scss'],
})
export class PercentageStarsComponent implements OnInit {
  @Input() percentage = 0;
  @Input() sizeImgStar = 26;
  starOne = 0;
  starTwo = 0;
  starThree = 0;
  starFour = 0;
  starFive = 0;

  ngOnInit(): void {
    this.onResize();
  }

  onResize(): void {
    this.setValuesStars();
  }

  @HostListener('window:resize')
  setValuesStars(): void {
    if (this.percentage > 0 && this.percentage <= 20) {
      if (this.percentage === 20) {
        this.starOne = this.sizeImgStar;
      } else {
        this.starOne = (this.sizeImgStar * (this.percentage * 100)) / 20 / 100;
      }
    } else if (this.percentage > 20 && this.percentage <= 40) {
      this.starOne = this.sizeImgStar;
      if (this.percentage === 40) {
        this.starTwo = this.sizeImgStar;
      } else {
        const equivalent = this.percentage - 20;
        this.starTwo = (this.sizeImgStar * (equivalent * 100)) / 20 / 100;
      }
    } else if (this.percentage > 40 && this.percentage <= 60) {
      this.starOne = this.sizeImgStar;
      this.starTwo = this.sizeImgStar;
      if (this.percentage === 60) {
        this.starThree = this.sizeImgStar;
      } else {
        const equivalent = this.percentage - 40;
        this.starThree = (this.sizeImgStar * (equivalent * 100)) / 20 / 100;
      }
    } else if (this.percentage > 60 && this.percentage <= 80) {
      this.starOne = this.sizeImgStar;
      this.starTwo = this.sizeImgStar;
      this.starThree = this.sizeImgStar;
      if (this.percentage === 80) {
        this.starFour = this.sizeImgStar;
      } else {
        const equivalent = this.percentage - 60;
        this.starFour = (this.sizeImgStar * (equivalent * 100)) / 20 / 100;
      }
    } else if (this.percentage > 80 && this.percentage <= 100) {
      this.starOne = this.sizeImgStar;
      this.starTwo = this.sizeImgStar;
      this.starThree = this.sizeImgStar;
      this.starFour = this.sizeImgStar;
      if (this.percentage === 100) {
        this.starFive = this.sizeImgStar;
      } else {
        const equivalent = this.percentage - 80;
        this.starFive = (this.sizeImgStar * (equivalent * 100)) / 20 / 100;
      }
    }
  }
}
