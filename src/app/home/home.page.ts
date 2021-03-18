import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsTeamsPage } from './../modal/ms-teams/ms-teams.page';
import { IpconfigPage } from './../modal/ipconfig/ipconfig.page';
import { Observable } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

class RunningProcesses {
  id: number;
  name: string;
  processStartName: string;
  title: string;


}
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
  ttTestObj = [
    [
      {
        "id": 5004,
        "appName": "Notepad",
        "isUwp": false,
        "name": "NOTEPAD",
        "processStartName": "C:\\Windows\\system32\\notepad.exe",
        "title": "Untitled - Notepad",
        "screen": null,
        "windowTitles": [
          "Untitled - Notepad"
        ],
        "windows": [
          {
            "id": "1114658",
            "title": "Untitled - Notepad"
          }
        ],
        "commands": null
      },
      {
        "id": 5136,
        "appName": "Notepad",
        "isUwp": false,
        "name": "NOTEPAD",
        "processStartName": "C:\\Windows\\system32\\notepad.exe",
        "title": "tango - Notepad",
        "screen": null,
        "windowTitles": [
          "tango - Notepad"
        ],
        "windows": [
          {
            "id": "8913924",
            "title": "tango - Notepad"
          }
        ],
        "commands": null
      },
      {
        "id": 6184,
        "appName": "Notepad",
        "isUwp": false,
        "name": "NOTEPAD",
        "processStartName": "C:\\Windows\\system32\\notepad.exe",
        "title": "commands.json - Notepad",
        "screen": null,
        "windowTitles": [
          "commands.json - Notepad"
        ],
        "windows": [
          {
            "id": "2492450",
            "title": "commands.json - Notepad"
          }
        ],
        "commands": null
      }
    ],
    [
      {
        "id": 572,
        "appName": "Microsoft® Windows® Operating System",
        "isUwp": true,
        "name": "APPLICATIONFRAMEHOST",
        "processStartName": "C:\\Windows\\system32\\ApplicationFrameHost.exe",
        "title": "Settings",
        "screen": null,
        "windowTitles": [
          "Settings"
        ],
        "windows": [
          {
            "id": "3868020",
            "title": "Settings"
          }
        ],
        "commands": [
          {
            "name": "PlayPause",
            "description": "Play/Pause",
            "keys": [
              {
                "key": {
                  "isControl": false,
                  "isShift": false,
                  "isAlt": false,
                  "value": "SPACE",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          },
          {
            "name": "Rewind10",
            "description": "Rewind 10 seconds",
            "keys": [
              {
                "key": {
                  "isControl": false,
                  "isShift": false,
                  "isAlt": false,
                  "value": "LEFT",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          },
          {
            "name": "Stop",
            "description": "Stop",
            "keys": [
              {
                "key": {
                  "isControl": false,
                  "isShift": false,
                  "isAlt": false,
                  "value": "BACK",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          },
          {
            "name": "Leave",
            "description": "Leave meeting",
            "keys": [
              {
                "key": {
                  "isControl": true,
                  "isShift": true,
                  "isAlt": false,
                  "value": "B",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          }
        ]
      }
    ],
    [
      {
        "id": 1080,
        "appName": "Microsoft Edge",
        "isUwp": false,
        "name": "MSEDGE",
        "processStartName": "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        "title": "Swagger UI and 2 more pages - Profile 1 - Microsoft​ Edge",
        "screen": null,
        "windowTitles": [
          "Swagger UI and 2 more pages - Profile 1 - Microsoft​ Edge"
        ],
        "windows": [
          {
            "id": "1180754",
            "title": "Swagger UI and 2 more pages - Profile 1 - Microsoft​ Edge"
          }
        ],
        "commands": null
      }
    ],
    [
      {
        "id": 5752,
        "appName": "Broker.Web.API",
        "isUwp": false,
        "name": "BROKER.WEB.API",
        "processStartName": "C:\\publish2\\Broker.Web.API.exe",
        "title": "C:\\publish2\\Broker.Web.API.exe",
        "screen": null,
        "windowTitles": [],
        "windows": [],
        "commands": null
      }
    ],
    [
      {
        "id": 6548,
        "appName": "Microsoft Teams",
        "isUwp": false,
        "name": "TEAMS",
        "processStartName": "C:\\Users\\Administrator\\AppData\\Local\\Microsoft\\Teams\\current\\Teams.exe",
        "title": "Armandtan | Microsoft Teams",
        "screen": null,
        "windowTitles": [
          "Armandtan | Microsoft Teams",
          "Armandtan | Microsoft Teams"
        ],
        "windows": [
          {
            "id": "3607350",
            "title": "Armandtan | Microsoft Teams"
          },
          {
            "id": "1311460",
            "title": "Armandtan | Microsoft Teams"
          }
        ],
        "commands": [
          {
            "name": "Raise",
            "description": "Raise / Lower hand",
            "keys": [
              {
                "key": {
                  "isControl": true,
                  "isShift": true,
                  "isAlt": false,
                  "value": "K",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          },
          {
            "name": "Mute Unmute mic",
            "description": "Mic",
            "keys": [
              {
                "key": {
                  "isControl": true,
                  "isShift": true,
                  "isAlt": false,
                  "value": "M",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          },
          {
            "name": "Camera",
            "description": "Hide / Show camera",
            "keys": [
              {
                "key": {
                  "isControl": true,
                  "isShift": true,
                  "isAlt": false,
                  "value": "O",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          },
          {
            "name": "Leave",
            "description": "Leave meeting",
            "keys": [
              {
                "key": {
                  "isControl": true,
                  "isShift": true,
                  "isAlt": false,
                  "value": "B",
                  "timer": 0,
                  "isTimer": false
                }
              }
            ]
          }
        ]
      }
    ]
  ]

  constructor(public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService) { }


  runningProcessesObservable: Observable<RunningProcesses[]>;

  getItems(array, string) {
    console.log(this.theRunningAppsSorted)
    return array.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  }



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

  doExecuteCommand() {
    this.apiService.executeCommand(4128).subscribe((data: any[]) => {
      console.log(data);
    })
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
        console.log(value[0].windows.length)
        if (value[0].windows.length > 1) {
          this.appsMultiple.push(value)
        }
        if (value[0].windows.length == 1) {
          this.appsSingular.push(value)
        }
      });

      console.log(this.appsSingular)
      console.log(this.appsMultiple)

      this.theRunningApps2 = this.appsMultiple

      console.log(this.theRunningApps2)
      // this.getItems(this.theRunningApps2, "Microsoft Teams")
    })
  }


  ngOnInit() {
    this.getRunningProcesses();
  }


}
