import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditartareaPage } from '../editartarea/editartarea';
import {EdiatarnotificacionPage} from '../ediatarnotificacion/ediatarnotificacion';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-vertareas',
  templateUrl: 'vertareas.html',
})
export class VertareasPage {
  Sactivadas:boolean=true;
  Sdesactivadas:boolean=true;
  Scompletadas:boolean=true;
  listtareasactivadas: any;
  listtareascompletadas: any;
  listtareasdesactivadas: any;
  public actual=new Date();
  public añoactual:number = this.actual.getFullYear();
  public mesactual:number=this.actual.getUTCMonth();
  public diaactual:number=this.actual.getUTCDate();
  public fecha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider) {
    
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter tareasPage');
    this.actualizartareas();
    this.vertareasactivadas();
    this.vertareasdesactivadas();
    this.vertareascompletadas();
  }

  actualizartareas(){
    if(this.diaactual<10){
      this.fecha= this.añoactual+"-"+(this.mesactual+1)+"-0"+this.diaactual;
    }else{
      this.fecha= this.añoactual+"-"+(this.mesactual+1)+"-"+this.diaactual;
    }
    this.database.pasadofechastareas(this.fecha).then((data)=>{
      
    },(error)=>{
      console.log(error);
    });
  }

  vertareasactivadas(){
    this.database.gettareasactivadas().then((data: any)=>{
      console.log(data);
      this.listtareasactivadas= data;
    },(error)=>{
      console.log(error);
    })
  }
  vertareascompletadas(){
    this.database.gettareascompletadas().then((data: any)=>{
      console.log(data);
      this.listtareascompletadas= data;
    },(error)=>{
      console.log(error);
    })
  }
  vertareasdesactivadas(){
    this.database.gettareasdesactivadas().then((data: any)=>{
      console.log(data);
      this.listtareasdesactivadas= data;
    },(error)=>{
      console.log(error);
    })
  }

  editartarea(idTarea){
    this.navCtrl.push(EditartareaPage,{data: idTarea});
  }
  

  editarNotificacion(idTarea){
    this.navCtrl.push(EdiatarnotificacionPage,{data: idTarea});
  }
}
