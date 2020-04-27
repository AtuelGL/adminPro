import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  percent: number = 10;

  constructor() { }

  ngOnInit() {
  }

  changeValue( value: number ) {

    if ((this.percent >= 100) && (value > 0) ) {
      return;
    }
    if ((this.percent <= 0) && (value < 0)) {
      return;
    }
    this.percent = this.percent + value;
  }


}
