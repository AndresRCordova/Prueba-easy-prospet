import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the EditarproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editarproducto',
  templateUrl: 'editarproducto.html',
})
export class EditarproductoPage {
  private iddelproducto: number;
  public producto: any;
  public producto_nombre: string;
  public producto_precio: number;
  public producto_descripcion: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider) {
    this.iddelproducto=this.navParams.get('data');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad EditarproductoPage'+this.iddelproducto);
    this.getaproducto();
  }

  getaproducto(){
    this.database.getoneproducto(this.iddelproducto).then((data: any)=>{
      console.log(data);
      this.producto= data;
    },(error)=>{
      console.log(error);
    })
  }
  deleteproduto(){
    this.database.deleteProducto(this.iddelproducto).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }


}
