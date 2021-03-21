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
  theRunningAppsSorted = [];

  constructor(private sanitizer: DomSanitizer, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }

  getRunningProcesses() {
    this.apiService.getAppsRunning().subscribe((data: any[]) => {
      console.log(data)
      let group = data.reduce((r, a) => {
        console.log("a", a);
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
    this.getRunningProcesses();
  }

}
