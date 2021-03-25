import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsTeamsPage } from '../modal/modals/ms-teams.page';
import { IpconfigPage } from './../modal/ipconfig/ipconfig.page';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { GlobalConstants } from './../global-constants';
import { DomSanitizer } from '@angular/platform-browser';
import { CleandataService } from "../services/cleandata.service";



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

  currentIP: string;
  currentPort: string;

  constructor(private cleanData: CleandataService, private sanitizer: DomSanitizer, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }


  isAllowedAppName(appName) {
    return this.globals.APPS_ALLOWED_APPS.includes(appName) == true
  }
  isAllowedApp(appName) {
    console.log(appName)

    if (this.globals.APPS_ALLOWED_APPS.includes(appName.appName) == true) {
      this.presentModal(appName, 'true')
    } else {
      this.doFocusWindow(appName)
    }
  }
  async presentIPModal() {
    const modal = await this.modalController.create({
      component: IpconfigPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.globals.LOADING = true
      if (dataReturned !== null) {
        if (dataReturned.data.dismissed == true) {
          this.dataReturned = dataReturned.data;
          this.appsSingular = []
          this.appsMultiple = []
          this.getRunningProcesses()
        }
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    return await modal.present();
    this.currentModal = modal;
  }
  async presentModal(event, trusted) {

    this.doFocusWindow(event)
    localStorage.setItem('currentAppID', JSON.stringify(event));
    const modal = await this.modalController.create({
      component: MsTeamsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'app': event.path
      }
    });
    modal.onDidDismiss().then((dataReturned) => {

      if (dataReturned !== null) {
        if (dataReturned.data.dismissed == true) {
          this.dataReturned = dataReturned.data;
          // Should think about syncing the new app list here
          // this.appsSingular = []
          // this.appsMultiple = []
          // this.getRunningProcesses()
        }
      }
    });
    return await modal.present();
    this.currentModal = modal;
    //this.doFocusWindow(event)
  }

  shallShowModal(params) {
    if (params.appName == 'Microsoft Teams' || params.appName == 'Netflix' || params.appName == 'Powerpoint' || params.appName == 'Spotify') {
      this.presentModal(params, false)
    } else {

      this.doFocusWindow(params)
    }


  }


  getSnapshot(params) {
    this.apiService.getSnapshot(params)
      .subscribe((baseImage: any) => {

        alert(JSON.stringify(baseImage));
        let objectURL = 'data:image/jpeg;base64,' + baseImage.image;

        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      });
  }


  doFocusWindow(params) {


    this.apiService.doSetWindowFocus(params).subscribe((data: any) => {



    })
  }
  getRunningProcesses() {
    this.cleanData.cleanUpData()
  }


  ngOnInit() {

    if (localStorage.getItem("currentIpAddress")) {
      this.currentIP = localStorage.getItem("currentIpAddress")
    } else {
      this.currentIP = this.globals.REST_API_IP
    }
    if (localStorage.getItem("currentPortAddress")) {
      this.currentPort = localStorage.getItem("currentPortAddress")
    } else {
      this.currentPort = this.globals.REST_API_PORT
    }

  }


}
