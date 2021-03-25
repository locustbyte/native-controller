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
  public cleanUpData() {
    this.globals.APPS_AVAILABLE_SINGULAR = [];
    this.globals.APPS_AVAILABLE_MULTIPLE = [];
    this.globals.LOADING = true;
    this.getAllowedApps();
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
        this.globals.LOADING = false;
      }, 0);
    })
  }
}
