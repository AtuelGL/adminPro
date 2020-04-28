import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './graficoDona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {

  @Input() legend: string = 'Gráfico';
  @Input() labels: [];
  @Input() data: [];
  @Input() type: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
