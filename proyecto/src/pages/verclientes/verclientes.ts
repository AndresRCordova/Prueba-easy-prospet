import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditarclientePage } from '../editarcliente/editarcliente'
import { VerventasPage } from '../verventas/verventas';
import { DatabaseProvider } from '../../providers/database/database';
import { NuevoPagoPage } from '../nuevo-pago/nuevo-pago';


@IonicPage()
@Component({
  selector: 'page-verclientes',
  templateUrl: 'verclientes.html',
})
export class VerclientesPage {
  listclientes: any;
  listprospectos: any;
  Sclientes:boolean=true;
  Sprospectos:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter VerclientesPage');
    this.verclientes();
    this.verprospectos();
  }


  verclientes(){
    this.database.getclientes().then((data: any)=>{
      console.log(data);
      this.listclientes= data;
    },(error)=>{
      console.log(error);
    })
  }
  verprospectos(){
    this.database.getprospectos().then((data: any)=>{
      console.log(data);
      this.listprospectos= data;
    },(error)=>{
      console.log(error);
    })
  }

  editarcliente(idcliente){
    this.navCtrl.push(EditarclientePage,{data: idcliente});
  }
  verventas(idcliente){
    this.navCtrl.push(NuevoPagoPage,{data:idcliente});
  }

  
}
