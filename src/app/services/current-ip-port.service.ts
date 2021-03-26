import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from "rxjs";
import { GlobalConstants } from './../global-constants';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrentIpPortService {
  private routerInfo: BehaviorSubject<object>;
  currentViewingApp: BehaviorSubject<object>;
  currentIP: string;
  currentPort: string;
  subscription: Subscription;
  subscriptionApiError: Subscription;
  currMachine: any;
  apiError = this.globals.API_ERROR;
  constructor(public globals: GlobalConstants) {
    this.routerInfo = new BehaviorSubject<object>({ "active": false });
    this.currentViewingApp = new BehaviorSubject<object>({})
    this.subscription = this.getAsyncData().subscribe(u => (this.currMachine = u));
    this.subscriptionApiError = this.checkIfApiError(this.globals.API_ERROR).subscribe(u => u);
  }
  getViewingNow(): Observable<object> {
    return this.currentViewingApp.asObservable();
  }
  setViewingNow(newValue): void {
    this.currentViewingApp.next(newValue);
  }

  getValue(): Observable<object> {
    return this.routerInfo.asObservable();
  }
  setValue(newValue): void {
    this.routerInfo.next(newValue);
  }
  checkIfApiError(errorFlag) {
    return of({
      active: errorFlag.active,
      type: errorFlag.type
    })
  }
  getAsyncData() {
    return of({
      currIP: localStorage.getItem("currentIpAddress"),
      currPORT: localStorage.getItem("currentPortAddress")
    })
  }
}
