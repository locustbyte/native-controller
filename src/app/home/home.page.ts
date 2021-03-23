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

  currentIP: string;
  currentPort: string;
  allowedApps = [
    "Microsoft Teams", "TEAMS", "Netflix", "Powerpoint", "Spotify", "NOTEPAD", "APPLICATIONFRAMEHOST"
  ]
  preStripArr = [];
  theAppData = []



  constructor(private sanitizer: DomSanitizer, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }


  runningProcessesObservable: Observable<RunningProcesses[]>;
  isAllowedAppName(appName) {

    return this.allowedApps.includes(appName) == true
  }
  isAllowedApp(appName) {

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
    this.globals.APPS_AVAILABLE_SINGULAR = [];
    this.globals.APPS_AVAILABLE_MULTIPLE = [];
    this.apiService.getAppsRunning().subscribe((data: any[]) => {
      this.preStripArr = data;


      for (const [i, v] of this.preStripArr.entries()) {

        var allowed = this.isAllowedAppName(v.name)

        if (v.name == "APPLICATIONFRAMEHOST") {
          for (const [ii, vv] of v.windowTitles.entries()) {

            var allowed = this.isAllowedAppName(vv)

            if (allowed === true) {
              v.title = vv
              v.appName = vv
              v.name = vv.toUpperCase()
              v.switched = true

              v.windowTitles = [];
              var [windowTitleTemp] = [vv]
              v.windowTitles = ([windowTitleTemp])

              v.windows = [v.windows[ii]];
              this.theAppData.push(v)
            }
          }
        } else {
          if (allowed === true) {
            this.theAppData.push(v)
          }
        }



      }




      let group = this.theAppData.reduce((r, a) => {
        //
        // 
        r[a.name] = [...r[a.name] || [], a];
        return r;
      }, {});

      const objectArray = Object.entries(group)



      objectArray.forEach(([key, value]) => {
        if (value[0].windows.length > 1) {
          this.globals.APPS_AVAILABLE_MULTIPLE.push(value)
        }
        if (value[0].windows.length == 1) {
          this.globals.APPS_AVAILABLE_SINGULAR.push(value)
        }
      });






      // 
      // this.getItems(this.theRunningApps2, "Microsoft Teams")
    })
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
