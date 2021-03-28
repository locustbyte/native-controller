import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';


@Injectable({
  providedIn: 'root'
})
export class CurrentlyViewingService {

  appSingular = this.globals.APPS_AVAILABLE_SINGULAR;
  appMultiple = this.globals.APPS_AVAILABLE_MULTIPLE;
  theAppData = this.globals.APPS_STORED_DATA_SET;
  theAppDataRemodelled = [];
  rawApps = [];
  constructor(public globals: GlobalConstants) {

  }

  findNestedObj(entireObj, keyToFind, valToFind) {
    console.log(entireObj)
    console.log(keyToFind)
    console.log(valToFind)
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    return foundObj;
  };

  jiggleArray(theData) {

    console.log('hit')
    var currentViewedAppID = JSON.parse(localStorage.getItem("currentlyViewedApp"))
    var currentViewedAppWindowID = JSON.parse(localStorage.getItem("currentlyViewedWindow"))
    // Remodelled


    setTimeout(() => {
      var myData = this.globals.APPS_AVAILABLE_SINGULAR
      this.theAppData = this.globals.APPS_AVAILABLE_SINGULAR

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

      var theVal = this.findNestedObj(myData, 'id', currentViewedAppID);
      theVal.windows[0].currentView = true;
      console.log(theVal)


    }, 2000);



  }
  public checkCurrentlyViewing(appData) {
    localStorage.setItem("currentlyViewedApp", appData.appID)
    localStorage.setItem("currentlyViewedWindow", appData.windowsID)
    console.log(appData.appID)
    console.log(appData.windowsID)

    console.log("below")
    // console.log(this.globals.APPS_STORED_DATA_SET)
    console.log(this.globals.APPS_AVAILABLE_SINGULAR)
    // console.log(this.globals.APPS_AVAILABLE_MULTIPLE)
    this.jiggleArray(this.globals.APPS_AVAILABLE_SINGULAR);
    console.log("above")
  }
}
