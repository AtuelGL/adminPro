import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countTree().then(
    () => console.log('end'),
    )
    .catch(error => console.error('error in promise', error));
  }

  ngOnInit(): void {
  }

  countTree(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let cont = 0;
      const interv = setInterval( () => {
        cont += 1;
        if (cont === 3) {
          resolve( true );
          clearInterval(interv);
        }
      }, 1000 );
    });
  }

}
