import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsTeamsPage } from './../modal/ms-teams/ms-teams.page';
import { IpconfigPage } from './../modal/ipconfig/ipconfig.page';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { GlobalConstants } from './../global-constants';
import { DomSanitizer } from '@angular/platform-browser';


class RunningProcesses {
  id: number;
  name: string;
  processStartName: string;
  title: string;
}


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
  allowedApps = [
    "Microsoft Teams", "Netflix", "Powerpoint", "Spotify"
  ]
  testLip = [
    { ID: "valiue" },
    { ID: "valiue" }, { ID: "valiuedfdfg" }
  ]



  constructor(private sanitizer: DomSanitizer, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }


  runningProcessesObservable: Observable<RunningProcesses[]>;
  isAllowedAppName(appName) {
    console.log(this.allowedApps.includes(appName) == true)
    return this.allowedApps.includes(appName) == true 
  }
  isAllowedApp(appName) {
    console.log(appName)
    console.log(this.allowedApps.includes(appName.appName))
    if (this.allowedApps.includes(appName.appName) == true) {
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
      console.log(dataReturned.data.dismissed)
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
      console.log(dataReturned.data.dismissed)
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
      console.log("no commands")
      this.doFocusWindow(params)
    }


  }


  getSnapshot(params) {
    this.apiService.getSnapshot(params)
      .subscribe((baseImage: any) => {
        console.log(baseImage)
        alert(JSON.stringify(baseImage));
        let objectURL = 'data:image/jpeg;base64,' + baseImage.image;

        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      });
  }


  doFocusWindow(params) {
    console.log(params)

    this.apiService.doSetWindowFocus(params).subscribe((baseImage: any) => {
      console.log(baseImage)

      let objectURL = 'data:image/jpeg;base64,' + baseImage.image;

      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

    })
  }
  getRunningProcesses() {
    this.apiService.getAppsRunning().subscribe((data: any[]) => {
      console.log(data)
      let group = data.reduce((r, a) => {
        // console.log("a", a);
        // console.log('r', r);
        r[a.name] = [...r[a.name] || [], a];
        return r;
      }, {});

      const objectArray = Object.entries(group)

      //console.log(objectArray)

      objectArray.forEach(([key, value]) => {
        if (value[0].windows.length > 1) {
          this.globals.APPS_AVAILABLE_MULTIPLE.push(value)
          console.log(value[0].windows.length)
        }
        if (value[0].windows.length == 1) {
          this.globals.APPS_AVAILABLE_SINGULAR.push(value)
        }
      });

      console.log(this.globals.APPS_AVAILABLE_SINGULAR)
      console.log(this.globals.APPS_AVAILABLE_MULTIPLE)

      this.theRunningApps2 = this.appsMultiple

      // console.log(this.theRunningApps2)
      // this.getItems(this.theRunningApps2, "Microsoft Teams")
    })
  }


  ngOnInit() {

  }


}
