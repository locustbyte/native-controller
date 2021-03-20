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

  constructor(public modalController: ModalController, public globals: GlobalConstants) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })

  }


  setIp(ip) {
    console.log(ip);
    this.currentIpAddress = ip
    this.globals.REST_API_IP = ip;
    this.globals.REST_API_SERVER = "https://" + ip + ":5000/api/system/";
  }

  onIpUpdate(ip) {
    this.globals.REST_API_IP = ip;
    this.globals.REST_API_SERVER = "https://" + ip + ":5000/api/system/";
  }



  ngOnInit() {
    console.log(this.globals.REST_API_IP)
    this.currentIpAddress = this.globals.REST_API_IP;
    console.log(this.globals.REST_API_SERVER)
  }

}
