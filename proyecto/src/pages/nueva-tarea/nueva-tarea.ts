import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NuevaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-tarea',
  templateUrl: 'nueva-tarea.html',
})
export class NuevaTareaPage {
  public tarea_nombre : any;
  public tarea_fechaini : any;
  public tarea_fechafin : any;
  public tarea_descripcion : any;
  public tarea_estado : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaTareaPage');
  }

  construirquery(){
  }
}
