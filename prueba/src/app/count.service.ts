import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private count = 0;
  private countSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.count);
  count$: Observable<number> = this.countSubject.asObservable();


  sumar() {
    this.countSubject.next(++this.count);
  }


  constructor() { }
}
