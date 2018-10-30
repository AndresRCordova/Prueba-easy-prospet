import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditarproductoPage } from '../editarproducto/editarproducto';

/**
 * Generated class for the VerproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verproducto',
  templateUrl: 'verproducto.html',
})
export class VerproductoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerproductoPage');
  }

  editarproducto(){
    this.navCtrl.push(EditarproductoPage);
  }

}
