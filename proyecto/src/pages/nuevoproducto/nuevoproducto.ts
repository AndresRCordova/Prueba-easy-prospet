import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the NuevoproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevoproducto',
  templateUrl: 'nuevoproducto.html',
})
export class NuevoproductoPage {
  public producto_nombre: string;
  public producto_precio: number;
  public producto_descripcion: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoproductoPage');
  }

  createproduto(){
    console.log(this.producto_nombre+this.producto_precio+this.producto_descripcion);
    this.database.createProducto(this.producto_nombre,this.producto_precio,this.producto_descripcion).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }

  
}
