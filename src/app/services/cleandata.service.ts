import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";
import { CurrentlyViewingService } from "./currently-viewing.service";
@Injectable({
  providedIn: 'root'
})
export class CleandataService {
  preStripArr = [];
  theAppData = [];
  theAppDataRemodelled = [];
  constructor(private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants, private currentlyViewing: CurrentlyViewingService) { }
  isAllowedAppName(appName) {
    return this.globals.APPS_ALLOWED_APPS.includes(appName) == true
  }
  public getAllowedApps() {
    this.httpClient.get("../assets/allowedApps.json").subscribe(data => {
      this.globals.APPS_ALLOWED_APPS = data
    })
  }
  public callAppsApi(mode) {
    this.globals.APPS_AVAILABLE_SINGULAR = [];
    this.globals.APPS_AVAILABLE_MULTIPLE = [];
    var currentViewedAppID = JSON.parse(localStorage.getItem("currentlyViewedApp"))
    var currentViewedAppWindowID = JSON.parse(localStorage.getItem("currentlyViewedWindow"))


    this.apiService.getAppsRunning().subscribe((data: any[]) => {
      this.globals.LOADING = false;
      this.globals.LOADINGDATA = true;
      this.preStripArr = [];
      this.theAppData = [];

      // this.preStripArr = [
      //   {
      //     "id": 3068,
      //     "appName": "PowerPoint",
      //     "isUwp": false,
      //     "name": "POWERPNT",
      //     "processStartName": "C:\\Program Files\\Microsoft Office\\root\\Office16\\POWERPNT.EXE",
      //     "title": "20210324_SIDECAR_PROTOTYPEDEMO - PowerPoint",
      //     "screen": null,
      //     "windowTitles": [
      //       "20210324_SIDECAR_PROTOTYPEDEMO - PowerPoint",
      //       "Final Report 2020 - PowerPoint"
      //     ],
      //     "windows": [
      //       {
      //         "id": "855304",
      //         "title": "20210324_SIDECAR_PROTOTYPEDEMO - PowerPoint"
      //       },
      //       {
      //         "id": "66934",
      //         "title": "Final Report 2020 - PowerPoint"
      //       }
      //     ],
      //     "commands": [
      //       {
      //         "name": "PlayFromStart",
      //         "description": "Play from start",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "F5",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "PlayFromCurrentSlide",
      //         "description": "Play from current slide",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": true,
      //               "isAlt": false,
      //               "value": "F5",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Slide-Next",
      //         "description": "Go forward",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "SPACE",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Slide-Prev",
      //         "description": "Go forward",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "BACK",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Presentation-Ends",
      //         "description": "Ends the current presentation",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "ESCAPE",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Run",
      //         "description": "Runs the current presentation",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "",
      //               "timer": 2000,
      //               "isTimer": true
      //             }
      //           },
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "RIGHT",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           },
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "",
      //               "timer": 2000,
      //               "isTimer": true
      //             }
      //           },
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "RIGHT",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           },
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "",
      //               "timer": 2000,
      //               "isTimer": true
      //             }
      //           },
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "RIGHT",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Print",
      //         "description": "Print",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "P",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Save",
      //         "description": "Save",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "S",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "NewSlide",
      //         "description": "New slide",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "M",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "DuplicateSlide",
      //         "description": "Duplicate slide",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": true,
      //               "isAlt": false,
      //               "value": "D",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "ShowRulers",
      //         "description": "Show rulers",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": true,
      //               "isAlt": true,
      //               "value": "F9",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "id": 11388,
      //     "appName": "Microsoft® Windows® Operating System",
      //     "isUwp": true,
      //     "name": "APPLICATIONFRAMEHOST",
      //     "processStartName": "C:\\WINDOWS\\system32\\ApplicationFrameHost.exe",
      //     "title": "Netflix",
      //     "screen": null,
      //     "windowTitles": [
      //       "Netflix",
      //       "Microsoft Store",
      //       "Mail",
      //       "Calculator",
      //       "Calendar",
      //       "Settings",
      //       ""
      //     ],
      //     "windows": [
      //       {
      //         "id": "198070",
      //         "title": "Netflix"
      //       },
      //       {
      //         "id": "198130",
      //         "title": "Microsoft Store"
      //       },
      //       {
      //         "id": "198898",
      //         "title": "Mail"
      //       },
      //       {
      //         "id": "330074",
      //         "title": "Calculator"
      //       },
      //       {
      //         "id": "199050",
      //         "title": "Calendar"
      //       },
      //       {
      //         "id": "3475716",
      //         "title": "Settings"
      //       }
      //     ],
      //     "commands": [
      //       {
      //         "name": "PlayPause",
      //         "description": "Play/Pause",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "SPACE",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Rewind10",
      //         "description": "Rewind 10 seconds",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "LEFT",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Stop",
      //         "description": "Stop",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": false,
      //               "isShift": false,
      //               "isAlt": false,
      //               "value": "BACK",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Leave",
      //         "description": "Leave meeting",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": true,
      //               "isAlt": false,
      //               "value": "B",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "id": 7628,
      //     "appName": "Microsoft® Windows® Operating System",
      //     "isUwp": false,
      //     "name": "WWAHOST",
      //     "processStartName": "C:\\WINDOWS\\system32\\wwahost.exe",
      //     "title": "Netflix",
      //     "screen": null,
      //     "windowTitles": [
      //       ""
      //     ],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 4984,
      //     "appName": "Windows Store",
      //     "isUwp": false,
      //     "name": "WINSTORE.APP",
      //     "processStartName": "C:\\Program Files\\WindowsApps\\Microsoft.WindowsStore_12011.1001.1.0_x64__8wekyb3d8bbwe\\WinStore.App.exe",
      //     "title": "Microsoft Store",
      //     "screen": null,
      //     "windowTitles": [
      //       ""
      //     ],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 7540,
      //     "appName": "Microsoft Office",
      //     "isUwp": false,
      //     "name": "HXOUTLOOK",
      //     "processStartName": "C:\\Program Files\\WindowsApps\\microsoft.windowscommunicationsapps_16005.13426.20688.0_x64__8wekyb3d8bbwe\\HxOutlook.exe",
      //     "title": "Mail",
      //     "screen": null,
      //     "windowTitles": [
      //       ""
      //     ],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 17092,
      //     "appName": "Microsoft Calculator",
      //     "isUwp": false,
      //     "name": "CALCULATOR",
      //     "processStartName": "C:\\Program Files\\WindowsApps\\Microsoft.WindowsCalculator_10.2101.10.0_x64__8wekyb3d8bbwe\\Calculator.exe",
      //     "title": "Calculator",
      //     "screen": null,
      //     "windowTitles": [
      //       ""
      //     ],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 5264,
      //     "appName": "Microsoft Office",
      //     "isUwp": false,
      //     "name": "HXCALENDARAPPIMM",
      //     "processStartName": "C:\\Program Files\\WindowsApps\\microsoft.windowscommunicationsapps_16005.13426.20688.0_x64__8wekyb3d8bbwe\\HxCalendarAppImm.exe",
      //     "title": "Calendar",
      //     "screen": null,
      //     "windowTitles": [
      //       ""
      //     ],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 16072,
      //     "appName": "Microsoft Teams",
      //     "isUwp": false,
      //     "name": "TEAMS",
      //     "processStartName": "C:\\Users\\stevem\\AppData\\Local\\Microsoft\\Teams\\current\\Teams.exe",
      //     "title": "Meeting with Steve Meadows | Microsoft Teams",
      //     "screen": null,
      //     "windowTitles": [
      //       "Meeting with Steve Meadows | Microsoft Teams"
      //     ],
      //     "windows": [
      //       {
      //         "id": "461290",
      //         "title": "Meeting with Steve Meadows | Microsoft Teams"
      //       }
      //     ],
      //     "commands": [
      //       {
      //         "name": "Raise",
      //         "description": "Raise / Lower hand",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": true,
      //               "isAlt": false,
      //               "value": "K",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Mute Unmute mic",
      //         "description": "Mic",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": true,
      //               "isAlt": false,
      //               "value": "M",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Camera",
      //         "description": "Hide / Show camera",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": true,
      //               "isAlt": false,
      //               "value": "O",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       },
      //       {
      //         "name": "Leave",
      //         "description": "Leave meeting",
      //         "keys": [
      //           {
      //             "key": {
      //               "isControl": true,
      //               "isShift": true,
      //               "isAlt": false,
      //               "value": "B",
      //               "timer": 0,
      //               "isTimer": false
      //             }
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "id": 16036,
      //     "appName": "Broker.Web.API",
      //     "isUwp": false,
      //     "name": "BROKER.WEB.API",
      //     "processStartName": "C:\\Users\\stevem\\Desktop\\Hp Companion\\Broker\\Broker.Web.API.exe",
      //     "title": "Broker",
      //     "screen": null,
      //     "windowTitles": [],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 19900,
      //     "appName": "Apache HTTP Server",
      //     "isUwp": false,
      //     "name": "HTTPD",
      //     "processStartName": "C:\\Users\\stevem\\Desktop\\Hp Companion\\Apache24\\bin\\httpd.exe",
      //     "title": "Apache",
      //     "screen": null,
      //     "windowTitles": [],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 20512,
      //     "appName": "Microsoft® Windows® Operating System",
      //     "isUwp": false,
      //     "name": "SYSTEMSETTINGS",
      //     "processStartName": "C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe",
      //     "title": "Settings",
      //     "screen": null,
      //     "windowTitles": [
      //       ""
      //     ],
      //     "windows": [],
      //     "commands": null
      //   },
      //   {
      //     "id": 21872,
      //     "appName": "Microsoft Edge",
      //     "isUwp": false,
      //     "name": "MSEDGE",
      //     "processStartName": "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      //     "title": "Swagger UI and 2 more pages - Work - Microsoft​ Edge",
      //     "screen": null,
      //     "windowTitles": [
      //       "Swagger UI and 2 more pages - Work - Microsoft​ Edge"
      //     ],
      //     "windows": [
      //       {
      //         "id": "6295440",
      //         "title": "Swagger UI and 2 more pages - Work - Microsoft​ Edge"
      //       }
      //     ],
      //     "commands": null
      //   }
      // ];
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


      // Remodelled
      this.theAppDataRemodelled = [];
      for (const [appKey, appValue] of Object.entries(this.theAppData)) {
        if (appValue.windows.length > 1) {
          if (appValue.id == currentViewedAppID) {
            for (const [appWindowKey, appWindowValue] of Object.entries(appValue.windows)) {
              if (mode == 'PPSlideShow') {
                if (appWindowValue['title'].includes('PowerPoint Slide Show') == true) {
                  appValue.windows[appWindowKey].currentView = true
                  JSON.stringify(localStorage.setItem("currentlyViewedWindow", appValue.windows[appWindowKey].id))
                  currentViewedAppWindowID = JSON.parse(localStorage.getItem("currentlyViewedWindow"))
                } else {
                  appValue.windows[appWindowKey].currentView = false
                }
                this.globals.API_DELAY_CALL = false
              }

              if (mode == 'LoadData') {
                if (appWindowValue["id"] == currentViewedAppWindowID) {


                  appValue.windows[appWindowKey].currentView = true
                }
              }

            }
          }
          this.theAppDataRemodelled.push(appValue)
        }
        if (appValue.windows.length == 1) {
          if (appValue.id == currentViewedAppID) {

            if (mode == 'PPSlideShowEnd') {
              if (appValue.windows[0].title.includes('Welcome to PowerPoint - PowerPoint') == true) {
                appValue.windows[0].currentView = true
                JSON.stringify(localStorage.setItem("currentlyViewedWindow", appValue.windows[0].id))
                currentViewedAppWindowID = JSON.parse(localStorage.getItem("currentlyViewedWindow"))
              } else {
                appValue.windows[0].currentView = false
              }
              this.globals.API_DELAY_CALL = false
            }

            if (appValue.windows[0].id == currentViewedAppWindowID) {
              appValue.windows[0].currentView = true
            }
          }
          this.theAppDataRemodelled.push(appValue)
        }
      }

      // Reduce to make Singular and Multiple arrays
      let group = this.theAppDataRemodelled.reduce((r, a) => {
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
      setTimeout(() => {

        console.log(this.globals.APPS_AVAILABLE_SINGULAR)
        console.log(this.globals.APPS_AVAILABLE_MULTIPLE)

        this.globals.LOADINGDATA = false;
        this.globals.API_DELAY_CALL = false;
      }, 2000);
    })
  }
  public cleanUpData(mode) {
    this.getAllowedApps();
    if (this.globals.API_DELAY_CALL == true) {
      this.globals.LOADING = true;
      setTimeout(() => {
        this.callAppsApi(mode)
      }, 2000);
    } else {
      this.callAppsApi('LoadData')
    }
  }
}
