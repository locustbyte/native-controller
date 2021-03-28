import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';
@Injectable({
  providedIn: 'root'
})
export class CurrentlyViewingService {
  appSingular = this.globals.APPS_AVAILABLE_SINGULAR;
  appMultiple = this.globals.APPS_AVAILABLE_MULTIPLE;
  rawApps = [];
  constructor(public globals: GlobalConstants) {
  }
  findNestedObj(entireObj, keyToFind, valToFind) {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    return foundObj;
  };
  clearSingleViewing() {
    var myData = this.globals.APPS_AVAILABLE_SINGULAR
    for (var i = 0; i < myData.length; i++) {
      if (myData[i].length == 1) {
        delete myData[i][0].windows[0].currentView;
      }
      if (myData[i].length > 1) {
        for (var ii = 0; ii < myData[i].length; ii++) {
          delete myData[i][ii].windows[0].currentView;
        }
      }
    }
    return myData;
  }
  clearMultipleViewing() {
    var myDataMultiple = this.globals.APPS_AVAILABLE_MULTIPLE
    for (var i = 0; i < myDataMultiple.length; i++) {
      if (myDataMultiple[i].length == 1) {
        for (var ii = 0; ii < myDataMultiple[i][0].windows.length; ii++) {
          delete myDataMultiple[i][0].windows[ii].currentView;
        }
      }
    }
    return myDataMultiple;
  }
  jiggleArray(type) {
    var currentViewedAppID = JSON.parse(localStorage.getItem("currentlyViewedApp"))
    var currentViewedAppWindowID = JSON.parse(localStorage.getItem("currentlyViewedWindow"))
    if (type == 'single') {
      setTimeout(() => {
        var sData = this.clearSingleViewing();
        this.clearMultipleViewing();
        var theVal = this.findNestedObj(sData, 'id', currentViewedAppID);
        theVal.windows[0].currentView = true;
      }, 0);
    }
    if (type == 'multiple') {
      setTimeout(() => {
        var sData = this.clearMultipleViewing();
        this.clearSingleViewing();
        var theVal = this.findNestedObj(sData, 'id', currentViewedAppID);
        var theWindowVal = this.findNestedObj(theVal.windows, 'id', JSON.stringify(currentViewedAppWindowID));
        theWindowVal.currentView = true;
      }, 0);
    }
  }
  public checkCurrentlyViewing(appData, type) {
    localStorage.setItem("currentlyViewedApp", appData.appID)
    localStorage.setItem("currentlyViewedWindow", appData.windowsID)
    if (type == 'multiple') {
      this.jiggleArray(type);
    }
    if (type == 'single') {
      this.jiggleArray(type);
    }
  }
}
