import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit {

  @ViewChild( 'txtProgress' ) txtProgress: ElementRef;

  @Input() legend: string = 'legend';
  @Input() percent: number = 10;

  @Output() changedValue: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange( newValue: number ){

    // let elemHTML: any = document.getElementsByName('percent')[0];

    if (newValue >= 100){
      this.percent = 100;
    }else if ( newValue <= 0 ) {
      this.percent = 0;
    }else {
      this.percent = newValue;
    }
    // elemHTML.value = this.percent;

    this.txtProgress.nativeElement.value = this.percent;
    this.changedValue.emit (this.percent);
  }

  changeValue( value: number ) {

    if ((this.percent >= 95) && (value > 0) ) {
      this.percent = 100;
    }else {
    if ((this.percent <= 5) && (value < 0)) {
      this.percent = 0;
    }else {
    this.percent = this.percent + value;
    }
  }
    this.changedValue.emit (this.percent);
  }


}
