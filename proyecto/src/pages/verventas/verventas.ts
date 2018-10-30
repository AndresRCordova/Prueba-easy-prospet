import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {VentasespecificasPage} from '../ventasespecificas/ventasespecificas';
import {RegistrarpagoPage} from '../registrarpago/registrarpago';
import { VerpagosPage } from '../verpagos/verpagos';

/**
 * Generated class for the VerventasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verventas',
  templateUrl: 'verventas.html',
})
export class VerventasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerventasPage');
  }

  verventasespecificas(){
    this.navCtrl.push(VentasespecificasPage);
  }
  registrarpago(){
    this.navCtrl.push(RegistrarpagoPage);
  }
  verpagos(){
    this.navCtrl.push(VerpagosPage);
  }
}
