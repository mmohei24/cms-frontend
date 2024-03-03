import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class BreadcrumbService {
  private fullPath!: BehaviorSubject<string[]>;
  constructor(private _LocationStrategy: LocationStrategy) {
    this.fullPath = new BehaviorSubject<string[]>([]);
  }

  ngOnInit() {
    this.fullPath.next(this._LocationStrategy.path().split('/'));
  }

  changeCurrentPath() {
    this.fullPath.next(this._LocationStrategy.path().split('/'));
  }

  getCurrentPath(): Observable<any> {
    this.fullPath.next(this._LocationStrategy.path().split('/'));
    return this.fullPath;
  }
}
