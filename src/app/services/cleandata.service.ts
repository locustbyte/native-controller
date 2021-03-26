import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";
@Injectable({
  providedIn: 'root'
})
export class CleandataService {
  preStripArr = [];
  theAppData = [];
  constructor(private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }
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
    this.apiService.getAppsRunning().subscribe((data: any[]) => {
      this.globals.LOADING = false;
      this.globals.LOADINGDATA = true;
      this.preStripArr = [];
      this.theAppData = [];
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
