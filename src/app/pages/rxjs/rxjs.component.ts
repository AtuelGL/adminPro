import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {
    const obs = new Observable( observer => {
      let cont = 0;
      let interv = setInterval(() => {
        cont += 1;
        observer.next(cont);
        observer.error('Auxilio!');
        if ( cont === 3 ){
          clearInterval(interv);
          observer.complete();
        }
        if ( cont === 2 ){
          observer.error('Auxilio!');
        }
      }, 1000 );
    });

    obs.pipe(
        retry()
    )
    .subscribe(
      numb => console.log('Subs', numb ),
      err => console.error('error in observer', err),
      () => console.log('observer end')
    );

  }

  ngOnInit(): void {
  }

}
