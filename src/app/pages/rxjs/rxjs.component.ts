import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {
    this.subscription = this.returnObs()
    .subscribe(
    numb => console.log('Subs', numb ),
    err => console.error('error in observer', err),
    () => console.log('observer end')
  );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  returnObs(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let cont = 0;
      const interv = setInterval(() => {
        cont ++;
        const exit = {
          value: cont
        };
        observer.next(exit);
        // if ( cont === 3 ){
        //   clearInterval(interv);
        //   observer.complete();
        // }
        // if ( cont === 2 ){
        //   // clearInterval(interv);
        //   observer.error('Error!');
        // }
      }, 1000 );

    }).pipe(
      map ( resp => resp.value ),
      filter( ( resp, index) => {
        if ( (resp % 2) === 1 ){
          return true;
        } else{
          return false;
        }
      })
    );
  }
}
