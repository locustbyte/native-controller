import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentIpPortService {
  currentIP: string;
  currentPort: string;
  subscription: Subscription;
  currMachine: any;
  constructor() {
    this.subscription = this.getAsyncData().subscribe(u => (this.currMachine = u));
  }

  getAsyncData() {
    return of({
      currIP: localStorage.getItem("currentIpAddress"),
      currPORT: localStorage.getItem("currentPortAddress")
    })
  }


}
