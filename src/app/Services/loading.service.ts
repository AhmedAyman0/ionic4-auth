import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingCtrl: LoadingController) { }
  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg,
    });
    await loading.present();
  }
  async dismiss(){
    await this.loadingCtrl.dismiss();
  }
}
