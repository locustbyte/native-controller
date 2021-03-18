import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ipconfig',
  templateUrl: './ipconfig.page.html',
  styleUrls: ['./ipconfig.page.scss'],
})
export class IpconfigPage implements OnInit {

  constructor(public modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })

  }

  ngOnInit() {
  }

}
