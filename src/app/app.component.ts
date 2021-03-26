import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "./services/api.service";
import { CleandataService } from "./services/cleandata.service";
import { GlobalConstants } from './global-constants';
import { CurrentIpPortService } from "./services/current-ip-port.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  theRunningApps = [];
  theRunningApps2 = [];
  appsSingular = [];
  appsMultiple = [];
  userNetwork: any;
  userIP: [];
  userPort: [];
  currMachine: any;
  apiError: object;
  constructor(private currentIPPORT: CurrentIpPortService, private cleanData: CleandataService, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }
  isAllowedAppName(appName) {
    return this.globals.APPS_ALLOWED_APPS.includes(appName) == true
  }
  getRunningProcesses() {
    this.cleanData.cleanUpData()
  }
  grabUserIpAddress() {
    this.httpClient.get("assets/ipAddress.json").subscribe(data => {
      this.globals.REST_API_IP = data[0].ip
      this.globals.REST_API_PORT = data[0].port
      if (!localStorage.getItem("currentIpAddress")) {
        localStorage.setItem("currentIpAddress", this.globals.REST_API_IP);
      }
      if (!localStorage.getItem("currentPortAddress")) {
        localStorage.setItem("currentPortAddress", this.globals.REST_API_PORT);
      }
      this.currentIPPORT.subscription = this.currentIPPORT.getAsyncData().subscribe(u => (this.currMachine = u));
    })
  }
  ngOnInit() {
    this.currentIPPORT.subscriptionApiError = this.currentIPPORT.checkIfApiError(this.globals.API_ERROR).subscribe(u => (this.apiError = u));
    if (localStorage.getItem("currentIpAddress")) {
      this.globals.REST_API_IP = localStorage.getItem("currentIpAddress")
    }
    if (localStorage.getItem("currentPortAddress")) {
      this.globals.REST_API_PORT = localStorage.getItem("currentPortAddress")
    }
    this.grabUserIpAddress();
    this.getRunningProcesses();
  }
}
