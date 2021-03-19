import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsTeamsPage } from './../modal/ms-teams/ms-teams.page';
import { IpconfigPage } from './../modal/ipconfig/ipconfig.page';
import { Observable } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { GlobalConstants } from './../global-constants';

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

  constructor(public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }


  runningProcessesObservable: Observable<RunningProcesses[]>;




  async presentIPModal() {
    console.log(event)
    const modal = await this.modalController.create({
      component: IpconfigPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
    this.currentModal = modal;
  }
  async presentModal(event) {
    localStorage.setItem('currentAppID', JSON.stringify(event));
    const modal = await this.modalController.create({
      component: MsTeamsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'app': event.path
      }
    });
    return await modal.present();
    this.currentModal = modal;
  }

  getSnapshot(id) {
    this.apiService.getSnapshot(4128).subscribe((data: any[]) => {
      console.log(data);

    })
  }


  doFocusWindow(params) {
    // this.apiService.doSetWindowFocus(params).subscribe((data: any[]) => {
    //   console.log(data)
    // })
  }
  getRunningProcesses() {
    this.apiService.getAppsRunning().subscribe((data: any[]) => {
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
          this.appsMultiple.push(value)
          console.log(value[0].windows.length)
        }
        if (value[0].windows.length == 1) {
          this.appsSingular.push(value)
        }
      });

      console.log(this.appsSingular)
      console.log(this.appsMultiple)

      this.theRunningApps2 = this.appsMultiple

      // console.log(this.theRunningApps2)
      // this.getItems(this.theRunningApps2, "Microsoft Teams")
    })
  }


  ngOnInit() {
    this.getRunningProcesses();
  }


}
