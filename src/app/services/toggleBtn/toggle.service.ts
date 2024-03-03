import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  constructor() { }

  private toggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  toggle() {
    this.toggler.next(!this.toggler.value);
    console.log(this.toggler.value);
  }

  getToggleValue(): BehaviorSubject<Boolean> {
    return this.toggler;
  }
}
