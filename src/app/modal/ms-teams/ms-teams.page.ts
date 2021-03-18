import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-ms-teams',
  templateUrl: './ms-teams.page.html',
  styleUrls: ['./ms-teams.page.scss'],
})
export class MsTeamsPage implements OnInit {

  mic = false;
  camera = false;
  hand = false;
  commandData = {
    appId: '',
    windowId: '',
    command: ''
  };
  commandDataSend = {};
  specificAppData = {};
  @Input() app: number;

  constructor(public modalController: ModalController, private httpClient: HttpClient, private apiService: ApiService) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
  getSpecificApp(app) {
    console.log(app)
    this.apiService.getSpecificAppDetail(app).subscribe((data: any[]) => {
      console.log(data);
      this.specificAppData = data;
    })
  }
  doExecuteCommand(params) {
    this.apiService.executeCommand(params).subscribe((data: any[]) => {
      console.log(data);
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
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  switchMic() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    console.log(this.mic)
    this.mic = !this.mic;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Mute Unmute mic"
    }
    myOpt.appCommand = "Mute Unmute mic"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  switchCamera() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    console.log(this.camera)
    this.camera = !this.camera;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Camera"
    }
    myOpt.appCommand = "Camera"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  switchHand() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Raise"
    }
    myOpt.appCommand = "Raise"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }

  //Powerpoint
  ppPlayFromStart() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "PlayFromStart"
    }
    myOpt.appCommand = "PlayFromStart"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  ppPlayFromCurrentSlide() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "PlayFromCurrentSlide"
    }
    myOpt.appCommand = "PlayFromCurrentSlide"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  ppPrint() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Print"
    }
    myOpt.appCommand = "Print"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  ppSave() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Save"
    }
    myOpt.appCommand = "Save"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  ppNewSlide() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "NewSlide"
    }
    myOpt.appCommand = "NewSlide"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  ppDuplicateSlide() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "DuplicateSlide"
    }
    myOpt.appCommand = "DuplicateSlide"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }

  //Netflix
  netflixRewind() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Rewind10"
    }
    myOpt.appCommand = "Rewind10"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  netflixPause() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "PlayPause"
    }
    myOpt.appCommand = "PlayPause"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }
  netflixStop() {
    var myOpt = JSON.parse(localStorage.getItem('currentAppID'));
    this.hand = !this.hand;
    this.commandDataSend = {
      appId: this.commandData.appId,
      windowId: this.commandData.windowId,
      command: "Stop"
    }
    myOpt.appCommand = "Stop"
    console.log(myOpt)
    this.doExecuteCommand(myOpt);
  }



  ngOnInit() {
    this.commandData = JSON.parse(localStorage.getItem('currentAppID'));
    console.log(JSON.parse(localStorage.getItem('currentAppID')))
    this.getSpecificApp(this.commandData)
  }

}
