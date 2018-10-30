import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditartareaPage } from '../editartarea/editartarea';
import {EdiatarnotificacionPage} from '../ediatarnotificacion/ediatarnotificacion';

/**
 * Generated class for the VertareasPage page.  
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vertareas',
  templateUrl: 'vertareas.html',
})
export class VertareasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VertareasPage');
  }

  editartarea(){
    this.navCtrl.push(EditartareaPage);
  }
  editarNotificacion(){
    this.navCtrl.push(EdiatarnotificacionPage);
  }
}
