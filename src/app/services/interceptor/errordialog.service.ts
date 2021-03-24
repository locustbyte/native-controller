import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ErrorDialogComponent } from './errordialog.component';

@Injectable()
export class ErrorDialogService {
    currentModal = null;
    public isDialogOpen: Boolean = false;
    constructor(public modalController: ModalController) { }
    async openDialog() {
        const modal = await this.modalController.create({
            component: ErrorDialogComponent,
            cssClass: 'my-custom-class'
        });
        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                // if (dataReturned.data.dismissed == true) {
                //   this.dataReturned = dataReturned.data;
                //   this.appsSingular = []
                //   this.appsMultiple = []
                //   this.getRunningProcesses()
                // }
                //alert('Modal Sent Data :'+ dataReturned);
            }
        });
        return await modal.present();
        this.currentModal = modal;
    }
    // openDialog(data): any {
    //     if (this.isDialogOpen) {
    //         return false;
    //     }
    //     this.isDialogOpen = true;
    //     const dialogref = this.presentIPModal()


    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.isDialogOpen = false;
    //         let animal;
    //         animal = result;
    //     });
    // }
}