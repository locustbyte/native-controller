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
  currState: any;
  @Input() app: number;
  constructor(public currViewCheck: CurrentlyViewingService, private cleanData: CleandataService, public currentIPPORT: CurrentIpPortService, public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  setCurrentAppLocalStorage(lsName, data) {
    localStorage.setItem(lsName, JSON.stringify(data));
  }
  getCurrentAppLocalStorage(lsName) {
    console.log(lsName)
    return JSON.parse(localStorage.getItem(lsName))
  }
  // Get window specific data
  getSpecificApp(app) {
    if (app.appType == 'single') {
      this.currViewCheck.checkCurrentlyViewing(app, 'single')
    }
    if (app.appType == 'multiple') {
      this.currViewCheck.checkCurrentlyViewing(app, 'multiple')
    }
    console.log(app)

    if (this.getCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID) == null) {
      this.setCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID, app)
      this.currState = this.getCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID)
    } else {
      this.currState = this.getCurrentAppLocalStorage('appID' + app.appID + '-' + app.windowsID)
    }

    //this.setCurrentAppLocalStorage('appID' + app.appID, app)
    this.currentIPPORT.setViewingNow(app);
    this.globals.APPS_AVAILABLE_SINGULAR.forEach((key, value) => {
      // key[0].currentlyViewing = false
      if (key[0].appName == app.appName) {
        this.specificAppData = key[0]
        // console.log(this.specificAppData)
        key[0].currentlyViewing = true
        //console.log(this.globals.APPS_AVAILABLE_SINGULAR)
        this.globals.APP_CURRENTLY_VIEWING = key[0]
      }
    });
    this.globals.APPS_AVAILABLE_MULTIPLE.forEach((key, value) => {
      if (key[0].appName == app.appName) {
        this.specificAppData = key[0];
        this.globals.APP_CURRENTLY_VIEWING = key[0]
      }
    });

    //this.cleanData.callAppsApi()
    // this.specificAppWindowData.push(this.getCurrentAppLocalStorage('appID' + app.appID))
    // console.log(this.specificAppWindowData)
  }
  doExecuteCommand(params) {
    this.apiService.executeCommand(params).subscribe((data: any[]) => {
    })
  }
  //Teams
  leaveMeeting() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Leave"
    }
    myOpt.appCommand = "Leave"
    this.doExecuteCommand(myOpt);
  }
  switchMic() {
    if (this.currState.mic == "false" || !this.currState.mic) {
      this.currState.mic = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.mic = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Mute Unmute mic"
    }
    myOpt.appCommand = "Mute Unmute mic"
    this.doExecuteCommand(myOpt);
  }
  switchCamera() {
    console.log(this.currState)
    if (this.currState.camera == "false" || !this.currState.camera) {
      this.currState.camera = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.camera = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Camera"
    }
    myOpt.appCommand = "Camera"
    this.doExecuteCommand(myOpt);
  }
  switchHand() {
    if (this.currState.hand == "false" || !this.currState.hand) {
      this.currState.hand = "true"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    } else {
      this.currState.hand = "false"
      this.setCurrentAppLocalStorage('appID' + this.currState.appID + '-' + this.currState.windowsID, this.currState)
    }
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Raise"
    }
    myOpt.appCommand = "Raise"
    this.doExecuteCommand(myOpt);
  }
  //Powerpoint
  ppPlayFromStart() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "PlayFromStart"
    }
    myOpt.appCommand = "PlayFromStart"
    this.doExecuteCommand(myOpt);
  }
  ppPlayFromCurrentSlide() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "PlayFromCurrentSlide"
    }
    myOpt.appCommand = "PlayFromCurrentSlide"
    this.doExecuteCommand(myOpt);
  }
  ppPrint() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Print"
    }
    myOpt.appCommand = "Print"
    this.doExecuteCommand(myOpt);
  }
  ppSave() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Save"
    }
    myOpt.appCommand = "Save"
    this.doExecuteCommand(myOpt);
  }
  ppNewSlide() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "NewSlide"
    }
    myOpt.appCommand = "NewSlide"
    this.doExecuteCommand(myOpt);
  }
  ppDuplicateSlide() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "DuplicateSlide"
    }
    myOpt.appCommand = "DuplicateSlide"
    this.doExecuteCommand(myOpt);
  }
  //Netflix
  netflixRewind() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Rewind10"
    }
    myOpt.appCommand = "Rewind10"
    this.doExecuteCommand(myOpt);
  }
  netflixPause() {
    if (localStorage.getItem("netflixPlay") == "false") {
      localStorage.setItem("netflixPlay", "true")
      this.netflixPlay = "true"
    } else {
      localStorage.setItem("netflixPlay", "false")
      this.netflixPlay = "false"
    };
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "PlayPause"
    }
    myOpt.appCommand = "PlayPause"
    this.doExecuteCommand(myOpt);
  }
  netflixStop() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Stop"
    }
    myOpt.appCommand = "Stop"
    this.doExecuteCommand(myOpt);
  }
  // Spotify
  spotifyShuffle() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Shuffle"
    }
    myOpt.appCommand = "Shuffle"
    this.doExecuteCommand(myOpt);
  }
  spotifyPlay() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Play"
    }
    myOpt.appCommand = "Play"
    this.doExecuteCommand(myOpt);
  }
  spotifyStop() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Stop"
    }
    myOpt.appCommand = "Stop"
    this.doExecuteCommand(myOpt);
  }
  ngOnInit() {
    // localStorage.removeItem("teamsHand")
    // localStorage.removeItem("teamsCamera")
    // localStorage.removeItem("teamsMic")
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
