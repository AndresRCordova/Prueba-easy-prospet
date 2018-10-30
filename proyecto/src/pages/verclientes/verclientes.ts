import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditarclientePage } from '../editarcliente/editarcliente'
import { VerventasPage } from '../verventas/verventas';

/**
 * Generated class for the VerclientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verclientes',
  templateUrl: 'verclientes.html',
})
export class VerclientesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerclientesPage');
  }

  verclientes(){

  }
  verprospectos(){
    
  }

  editarcliente(){
    this.navCtrl.push(EditarclientePage);
  }
  verventas(){
    this.navCtrl.push(VerventasPage);
  }

}
