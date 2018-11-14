import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-ventasespecificas',
  templateUrl: 'ventasespecificas.html',
})
export class VentasespecificasPage {
  public idgenarl:number;
  public ventas:any;
  public productos:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,) {
    this.idgenarl=this.navParams.get('data');
    console.log(this.idgenarl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VentasespecificasPage');
    this.gettareasespecificas();
    this.getproductos();
  }


  getnombreproducto(idproducto:number):string{
    var nombre:string;
      for(let i in this.productos){
        if(idproducto==this.productos[i].idProducto){
          nombre=this.productos[i].nombre;
        }
      }
    return nombre;
  }
  getproductos(){
  this.database.getallproductos().then((pro: any)=>{
     this.productos=pro;
     console.log(this.ventas);
    },(error)=>{
      console.log(error);
    });
  }
  gettareasespecificas(){
    this.database.getventasespecificas(this.idgenarl).then((pro: any)=>{
     this.ventas=pro;
     console.log(this.ventas);
    },(error)=>{
      console.log(error);
    });
  }

}
