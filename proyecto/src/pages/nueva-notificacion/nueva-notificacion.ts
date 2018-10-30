import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NuevaNotificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-notificacion',
  templateUrl: 'nueva-notificacion.html',
})
export class NuevaNotificacionPage {

  public alarma_tarea: any;
  public alarma_fecha: any;
  public alarma_hora: any;
  public alarma_descripcion: any;
  public alarma_activado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaNotificacionPage');
  }

  crearquery(){

  }
}
