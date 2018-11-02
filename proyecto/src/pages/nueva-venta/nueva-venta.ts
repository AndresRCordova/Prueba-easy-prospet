import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NuevaVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-venta',
  templateUrl: 'nueva-venta.html',
})
export class NuevaVentaPage {
  public venta_numero :any;
  public venta_cliente : any;
  public venta_fecha : any;
  public venta_productos: any=[];
  public venta_cantidad: any=[];
  public venta_total: any;
  public venta_tipopago: any;
  public venta_meses: any;

  
  public anArray:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaVentaPage');
  }
  Add(){
    this.anArray.push({'value':''});
  }

  remove(){
    this.anArray.splice(this.anArray.length-1,1);
  }
  contruirquery(){
    if(this.venta_tipopago==0){
      this.venta_meses=0;
    }
    console.log(this.venta_cliente,this.venta_fecha,this.venta_total,this.venta_tipopago,this.venta_meses);
  }


}
