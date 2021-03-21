import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiService } from "../../services/api.service";
import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'app-ms-teams',
  templateUrl: './ms-teams.page.html',
  styleUrls: ['./ms-teams.page.scss'],
})
export class MsTeamsPage implements OnInit {

  mic = localStorage.getItem("teamsMic");;
  camera = localStorage.getItem("teamsCamera");
  hand = localStorage.getItem("teamsHand");
  commandData = {
    appId: '',
    windowId: '',
    command: ''
  };
  commandDataSend = {};
  specificAppData = {};
  @Input() app: number;

  constructor(public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService, public globals: GlobalConstants) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }



  // Get window specific data
  getSpecificApp(app) {
    this.apiService.getSpecificAppDetail(app).subscribe((data: any[]) => {
      this.specificAppData = data;
    })
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
    if (localStorage.getItem("teamsMic") == "false") {
      localStorage.setItem("teamsMic", "true")
      this.mic = "true"
    } else {
      localStorage.setItem("teamsMic", "false")
      this.mic = "false"
    }
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    // this.mic = !this.mic;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Mute Unmute mic"
    }
    myOpt.appCommand = "Mute Unmute mic"
    this.doExecuteCommand(myOpt);
  }
  switchCamera() {
    if (localStorage.getItem("teamsCamera") == "false") {
      localStorage.setItem("teamsCamera", "true")
      this.camera = "true"
    } else {
      localStorage.setItem("teamsCamera", "false")
      this.camera = "false"
    }
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    // this.camera = !this.camera;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Camera"
    }
    myOpt.appCommand = "Camera"
    this.doExecuteCommand(myOpt);
  }
  switchHand() {
    if (localStorage.getItem("teamsHand") == "false" || !localStorage.getItem("teamsHand")) {
      localStorage.setItem("teamsHand", "true")
      this.hand = "true"
    } else {
      localStorage.setItem("teamsHand", "false")
      this.hand = "false"
    }
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    // this.hand = !this.hand;
    // this.hand = true
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

    this.commandData = JSON.parse(localStorage.getItem('currentAppID'));
    // Initial call to get running apps
    this.getSpecificApp(this.commandData)
  }

}
