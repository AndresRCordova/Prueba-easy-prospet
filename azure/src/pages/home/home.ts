import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NuevoproductoPage } from '../nuevoproducto/nuevoproducto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  nuevoproducto(){

    this.navCtrl.push(NuevoproductoPage);
  }
}
