import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditarproductoPage } from '../editarproducto/editarproducto';
import { DatabaseProvider } from '../../providers/database/database';

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
   listproductos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad VerproductoPage');
    this.getallproductos();
  }
  

  editarproducto(idproducto:number){
    this.navCtrl.push(EditarproductoPage,{data: idproducto});
  }
  getallproductos(){
    this.database.getallproductos().then((data: any)=>{
      console.log(data);
      this.listproductos= data;
    },(error)=>{
      console.log(error);
    })
  }
  


}
