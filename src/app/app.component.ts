import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsTeamsPage } from './modal/ms-teams/ms-teams.page';
import { IpconfigPage } from './modal/ipconfig/ipconfig.page';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "./services/api.service";
import { GlobalConstants } from './global-constants';
import { DomSanitizer } from '@angular/platform-browser';


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
  allowedApps = [
    "TEAMS", "Netflix", "Powerpoint", "Spotify", "NOTEPAD", "APPLICATIONFRAMEHOST"
  ]
  preStripArr = [];
  theAppData = []

  constructor(private sanitizer: DomSanitizer, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }

  isAllowedAppName(appName) {
    return this.allowedApps.includes(appName) == true
  }
  getRunningProcesses() {
    this.globals.LOADING = true
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
      console.log(this.globals.APPS_AVAILABLE_SINGULAR)
      console.log(this.globals.APPS_AVAILABLE_MULTIPLE)
      console.log(this.globals.LOADING)

      setTimeout(() => {
        this.globals.LOADING = false;
      }, 0);



      // 
      // this.getItems(this.theRunningApps2, "Microsoft Teams")
    })
  }
  grabUserIpAddress() {
    this.httpClient.get("assets/ipAddress.json").subscribe(data => {
      this.globals.REST_API_IP = data[0].ip
      this.globals.REST_API_PORT = data[0].port
    })
  }
  ngOnInit() {
    if (localStorage.getItem("currentIpAddress")) {
      this.globals.REST_API_IP = localStorage.getItem("currentIpAddress")
    }
    if (localStorage.getItem("currentPortAddress")) {
      this.globals.REST_API_PORT = localStorage.getItem("currentPortAddress")
    }
    //


    this.grabUserIpAddress();
    this.getRunningProcesses();

    //}, 1000);

  }

}
