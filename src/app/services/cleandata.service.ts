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
  public callAppsApi() {
    this.globals.APPS_AVAILABLE_SINGULAR = [];
    this.globals.APPS_AVAILABLE_MULTIPLE = [];
    var currentViewedAppID = JSON.parse(localStorage.getItem("currentlyViewedApp"))
    var currentViewedAppWindowID = JSON.parse(localStorage.getItem("currentlyViewedWindow"))
    console.log(currentViewedAppID)
    console.log(currentViewedAppWindowID)
    this.apiService.getAppsRunning().subscribe((data: any[]) => {
      this.globals.LOADING = false;
      this.globals.LOADINGDATA = true;
      this.preStripArr = [];
      this.theAppData = [];
      this.preStripArr = data;
      this.globals.APP_RAW_DATA = data;
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
        this.globals.APP_RAW_DATA = this.theAppData;
      }
      console.log(this.theAppData)

      // Remodelled
      this.theAppDataRemodelled = [];
      for (const [appKey, appValue] of Object.entries(this.theAppData)) {
        if (appValue.windows.length > 1) {
          if (appValue.id == currentViewedAppID) {
            for (const [appWindowKey, appWindowValue] of Object.entries(appValue.windows)) {
              if (appWindowValue["id"] == currentViewedAppWindowID) {
                console.log('double match')
                console.log(appValue.windows[appWindowKey])
                appValue.windows[appWindowKey].currentView = true
              }
            }
          }
          this.theAppDataRemodelled.push(appValue)
        }
        if (appValue.windows.length == 1) {
          if (appValue.id == currentViewedAppID) {
            if (appValue.windows[0].id == currentViewedAppWindowID) {
              appValue.windows[0].currentView = true
            }
          }
          this.theAppDataRemodelled.push(appValue)
        }
      }
      this.globals.APPS_STORED_DATA_SET = this.theAppDataRemodelled;
      console.log(this.theAppDataRemodelled)

      // Reduce to make Singular and Multiple arrays
      let group = this.theAppDataRemodelled.reduce((r, a) => {
        r[a.name] = [...r[a.name] || [], a];
        return r;
      }, {});
      const objectArray = Object.entries(group)
      objectArray.forEach(([key, value]) => {
        console.log(value[0].id)
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
  public cleanUpData() {
    this.getAllowedApps();
    if (this.globals.API_DELAY_CALL == true) {
      this.globals.LOADING = true;
      setTimeout(() => {
        this.callAppsApi()
      }, 1000);
    } else {
      this.callAppsApi()
    }
  }
}
