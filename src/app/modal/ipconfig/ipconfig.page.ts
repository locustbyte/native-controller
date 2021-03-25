import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'app-ipconfig',
  templateUrl: './ipconfig.page.html',
  styleUrls: ['./ipconfig.page.scss'],
})
export class IpconfigPage implements OnInit {

  currentIpAddress: string;
  currentPortAddress: string;
  previousSettingsExist: boolean;

  constructor(public modalController: ModalController, public globals: GlobalConstants) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })

  }

  setPreviousIPPORT() {
    this.globals.REST_API_IP = localStorage.getItem("currentIpAddress");
    this.globals.REST_API_PORT = localStorage.getItem("currentPortAddress");
  }
  updateIpPort() {


    localStorage.setItem("currentIpAddress", this.currentIpAddress)
    localStorage.setItem("currentPortAddress", this.currentPortAddress)
    this.globals.REST_API_IP = this.currentIpAddress;
    this.globals.REST_API_PORT = this.currentPortAddress;
    if (this.currentPortAddress == undefined || this.currentPortAddress == '') {
      this.globals.REST_API_SERVER = "http://" + localStorage.getItem("currentIpAddress") + "/api/system";
    } else {
      this.globals.REST_API_SERVER = "http://" + localStorage.getItem("currentIpAddress") + ":" + localStorage.getItem("currentPortAddress") + "/api/system";
    }
    this.dismiss();
  }





  ngOnInit() {
    this.currentIpAddress = localStorage.getItem("currentIpAddress");
    this.currentPortAddress = localStorage.getItem("currentPortAddress");

    if (this.currentIpAddress) {
      alert('mjb')
      this.previousSettingsExist = true
    }


  }

}
