import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleDeleteModalService {

  constructor() { }

  private toggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  toggle() {
    this.toggler.next(!this.toggler.value);
  }

  getToggleValue(): Observable<Boolean> {
    return this.toggler;
  }
}
