import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiService } from "../../services/api.service";
import { GlobalConstants } from '../../global-constants';
import { CurrentIpPortService } from "../../services/current-ip-port.service";
import { CleandataService } from "../../services/cleandata.service";
import { CurrentlyViewingService } from "../../services/currently-viewing.service";
@Component({
  selector: 'app-ms-teams',
  templateUrl: './ms-teams.page.html',
  styleUrls: ['./ms-teams.page.scss'],
})
export class MsTeamsPage implements OnInit {
  mic = localStorage.getItem("teamsMic");;
  camera = localStorage.getItem("teamsCamera");
  hand = localStorage.getItem("teamsHand");
  netflixPlay = localStorage.getItem("netflixPlay");
  commandData = {
    appId: '',
    windowId: '',
    command: ''
  };
  commandDataSend = {};
  specificAppData = {};
  specificAppWindowData = [];
  currStateVar: any;
  currState: any;
  dismissedState: any;
  @Input() app: number;
  constructor(public currViewCheck: CurrentlyViewingService, private cleanData: CleandataService, public currentIPPORT: CurrentIpPortService, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }
  dismiss() {
    console.log(this.currState)
    if (this.currState.slideshow == 'true') {
      this.ppSlideshowStop();
    } else {
      this.modalController.dismiss({
        'dismissed': true,
        'state': this.dismissedState
      })
    }

  }

  setCurrentAppLocalStorage(lsName, data) {
    localStorage.setItem(lsName, JSON.stringify(data));
  }
  getCurrentAppLocalStorage(lsName) {

    return JSON.parse(localStorage.getItem(lsName))
  }
  // Get window specific data
  getSpecificApp(app) {
    console.log(app)
    if (app.appType == 'single') {
      this.currViewCheck.checkCurrentlyViewing(app, 'single')
    }
    if (app.appType == 'multiple') {
      this.currViewCheck.checkCurrentlyViewing(app, 'multiple')
    }


    if (this.getCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID) == null) {
      this.setCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID, app)
      this.currState = this.getCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID)
    } else {
      this.currState = this.getCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID)
    }


    this.currentIPPORT.setViewingNow(app);
    this.globals.APPS_AVAILABLE_SINGULAR.forEach((key, value) => {

      if (key[0].appName == app.appName) {
        this.specificAppData = key[0]
        console.log(this.specificAppData)

        key[0].currentlyViewing = true

        this.globals.APP_CURRENTLY_VIEWING = key[0]
      }
    });
    this.globals.APPS_AVAILABLE_MULTIPLE.forEach((key, value) => {
      if (key[0].appName == app.appName) {
        this.specificAppData = key[0];
        console.log(this.specificAppData)
        this.globals.APP_CURRENTLY_VIEWING = key[0]
      }
    });

  }
  doExecuteCommand(params) {
    this.apiService.executeCommand(params).subscribe((data: any[]) => {
    })
  }
  //Teams
  leaveMeeting() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Leave"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  switchMic() {
    if (this.currState.mic == "false" || !this.currState.mic) {
      this.currState.mic = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.mic = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Mute Unmute mic"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  switchCamera() {

    if (this.currState.camera == "false" || !this.currState.camera) {
      this.currState.camera = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.camera = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Camera"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  switchHand() {
    if (this.currState.hand == "false" || !this.currState.hand) {
      this.currState.hand = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.hand = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Raise"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  //Powerpoint
  ppPlayFromStart() {
    this.globals.API_DELAY_CALL = true
    this.cleanData.cleanUpData('PPSlideShow')
    if (this.currState.slideshow == "false" || !this.currState.slideshow) {
      this.currState.slideshow = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.slideshow = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "PlayFromStart"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppSlideNext() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Slide-Next"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppSlidePrev() {
    var myOpt = this.currState;
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Slide-Prev"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppSlideshowStop() {
    this.globals.API_DELAY_CALL = true
    this.cleanData.cleanUpData('PPSlideShowEnd')
    this.currState.slideshow = "false"
    this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)


    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Presentation-Ends"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppPlayFromCurrentSlide() {
    this.globals.API_DELAY_CALL = true
    this.cleanData.cleanUpData('PPSlideShow')
    if (this.currState.slideshow == "false" || !this.currState.slideshow) {
      this.currState.slideshow = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.slideshow = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }

    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "PlayFromCurrentSlide"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppPrint() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Print"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppSave() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Save"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppNewSlide() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "NewSlide"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ppDuplicateSlide() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "DuplicateSlide"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  //Netflix
  netflixRewind() {
    if (this.currState.hand == "false" || !this.currState.hand) {
      this.currState.hand = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.hand = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Rewind10"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  netflixPause() {
    if (localStorage.getItem("netflixPlay") == "false") {
      localStorage.setItem("netflixPlay", "true")
      this.netflixPlay = "true"
    } else {
      localStorage.setItem("netflixPlay", "false")
      this.netflixPlay = "false"
    };
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "PlayPause"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  netflixStop() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Stop"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  // Spotify
  spotifyShuffle() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Shuffle"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  spotifyPlay() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Play"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  spotifyStop() {
    this.commandDataSend = {
      appID: this.currState.appID,
      windowsID: JSON.parse(localStorage.getItem('currentlyViewedWindow')),
      appCommand: "Stop"
    }
    this.doExecuteCommand(this.commandDataSend);
  }
  ngOnInit() {

    if (!localStorage.getItem("teamsHand") == true) {
      localStorage.setItem("teamsHand", "false")
      this.hand = "false"
    }
    if (!localStorage.getItem("teamsCamera") == true) {
      localStorage.setItem("teamsCamera", "false")
      this.camera = "false"
    }
    if (!localStorage.getItem("teamsMic") == true) {
      localStorage.setItem("teamsMic", "false")
      this.mic = "false"
    }
    if (!localStorage.getItem("netflixPlay") == true) {
      localStorage.setItem("netflixPlay", "false")
      this.netflixPlay = "false"
    }
    this.commandData = JSON.parse(localStorage.getItem('currentAppID'));
    // Initial call to get running apps
    this.getSpecificApp(this.commandData)
  }
}
