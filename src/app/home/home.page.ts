import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsTeamsPage } from '../modal/modals/ms-teams.page';
import { IpconfigPage } from './../modal/ipconfig/ipconfig.page';
import { Observable, of, Subscription } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { GlobalConstants } from './../global-constants';
import { DomSanitizer } from '@angular/platform-browser';
import { CleandataService } from "../services/cleandata.service";
import { CurrentIpPortService } from "../services/current-ip-port.service";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/xml',
    'Authorization': 'jwt-token'
  })
};
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  theRunningApps = [];
  theRunningApps2 = [];
  appsSingular = [];
  appsMultiple = [];
  theRunningAppsSorted = [];
  currentModal = null;
  randTest = []
  dataReturned = []
  thumbnail: any;
  currMachine: any;

  constructor(private currentIPPORT: CurrentIpPortService, private cleanData: CleandataService, private sanitizer: DomSanitizer, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }
  isAllowedAppName(appName) {
    return this.globals.APPS_ALLOWED_APPS.includes(appName) == true
  }
  isAllowedApp(appName) {
    if (this.globals.APPS_ALLOWED_APPS.includes(appName.appName) == true) {
      this.presentModal(appName, 'true', MsTeamsPage)
    } else {
      this.doFocusWindow(appName)
    }
  }
  doPresentIPModal() {
    this.presentModal(null, null, IpconfigPage)
  }
  async presentModal(event, trusted, type) {
    var options
    if (type.name == 'MsTeamsPage') {
      options = {
        component: type,
        cssClass: 'my-custom-class',
        componentProps: {
          'app': event.path
        }
      }
      this.doFocusWindow(event)
    }
    if (type.name == 'IpconfigPage') {
      options = {
        component: IpconfigPage,
        cssClass: 'my-custom-class'
      }
    }
    localStorage.setItem('currentAppID', JSON.stringify(event));
    this.globals.CURRENT_MODAL = await this.modalController.create(
      options
    );
    this.globals.CURRENT_MODAL.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data.dismissed == 'leaveTeamsCall' || dataReturned.data.dismissed == 'updatedIpPort') {
        this.globals.API_DELAY_CALL = true;
        this.currentIPPORT.subscription = this.currentIPPORT.getAsyncData().subscribe(u => (this.currMachine = u));
        console.log(this.currMachine)
        this.cleanData.cleanUpData();
      }
    });
    this.currentModal = this.globals.CURRENT_MODAL;
    return await this.globals.CURRENT_MODAL.present();
  }
  doFocusWindow(params) {
    this.apiService.doSetWindowFocus(params).subscribe((data: any) => {
    })
  }
  getRunningProcesses() {
    this.cleanData.cleanUpData()
  }
  ngOnInit() {
    this.currentIPPORT.subscription = this.currentIPPORT.getAsyncData().subscribe(u => (this.currMachine = u));
  }

}
