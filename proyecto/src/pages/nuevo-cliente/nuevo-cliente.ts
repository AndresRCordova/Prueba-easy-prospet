import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NuevoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-cliente',
  templateUrl: 'nuevo-cliente.html',
})
export class NuevoClientePage {
  public cliente_nombre: any;
  public cliente_ap: any;
  public cliente_am: any;
  public cliente_correo: any;
  public cliente_telefono: any;
  public cliente_estatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoClientePage');
  }
  crearquery(){
    
  }

}
