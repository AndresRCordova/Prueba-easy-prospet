import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {VentasespecificasPage} from '../ventasespecificas/ventasespecificas';
import {RegistrarpagoPage} from '../registrarpago/registrarpago';
import { VerpagosPage } from '../verpagos/verpagos';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the VerventasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verventas',
  templateUrl: 'verventas.html',
})
export class VerventasPage {
  public Vmeses: boolean=true;
  public Vcontado:boolean=true;
  public Vterminada:boolean=true;
  public listmeses:any;
  public listcontado:any;
  public clientes:any;
  public listterminada:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerventasPage');
    this.verventasmeses();
    this.verventascontado();
    this.verventascompletada();
    this.getclientes();
  }
  ionViewDidEnter() {
    console.log('ionViewDidLoad VerventasPage');
    this.verventasmeses();
    this.verventascontado();
    this.verventascompletada();
    this.getclientes();
  }
  verventasmeses(){
    this.database.getventameses().then((data: any)=>{
      console.log(data);
      this.listmeses= data;
    },(error)=>{
      console.log(error);
    })
  }
  verventascompletada(){
    this.database.getventaterminadas().then((data: any)=>{
      console.log(data);
      this.listterminada= data;
    },(error)=>{
      console.log(error);
    })
  }
  getnombrecliente(idcliente:number):string{
    var nombre:string;
    var paterno:string;
    var materno:string
      for(let i in this.clientes){
        if(idcliente==this.clientes[i].idCliente){
          nombre=this.clientes[i].nombre;
          paterno=this.clientes[i].paterno;
          materno=this.clientes[i].materno;
        }
      }
    return nombre+" "+paterno+" "+materno;
  }
  getclientes(){
    this.database.getallclientes().then((data: any)=>{
      console.log(data);
      this.clientes= data;
    },(error)=>{
      console.log(error);
    })
  }
  verventascontado(){
    this.database.getventacontado().then((data: any)=>{
      console.log(data);
      this.listcontado= data;
    },(error)=>{
      console.log(error);
    })
  }
  
  verventasespecificas(idGeneral){
    this.navCtrl.push(VentasespecificasPage,{data: idGeneral});
  }
  verpagos(idGeneral){
    this.navCtrl.push(VerpagosPage,{data:idGeneral});
  }
}
