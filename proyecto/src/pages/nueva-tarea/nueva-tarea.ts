import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-nueva-tarea',
  templateUrl: 'nueva-tarea.html',
})
export class NuevaTareaPage {
  public tareaform : FormGroup;
  public actual=new Date();
  public añoactual:number = this.actual.getFullYear();
  public mesactual:number=this.actual.getUTCMonth();
  public diaactual:number=this.actual.getUTCDate();
  public fecha: string;
  public fechaactual:string=this.actual.toISOString();
  public activado:boolean=true;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider,private formBuilder: FormBuilder,private alerta:AlertController) {
    this.tareaform = this.formBuilder.group({
      titulo: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      descripcion: ['', Validators.required],
      activado:['', Validators.required]
    });
  }

  showAlert() {
    const alert = this.alerta.create({
      title: 'Tarea agregada!',
      subTitle: 'Una nueva tarea a sido creada y agregada',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaTareaPage');
  }

  createtarea(){
    if(this.diaactual<10){
      this.fecha= this.añoactual+"-"+(this.mesactual+1)+"-0"+this.diaactual;
    }else{
      this.fecha= this.añoactual+"-"+(this.mesactual+1)+"-"+this.diaactual;
    }

    if(this.activado){
      console.log(this.tareaform.value.titulo,this.fecha,this.tareaform.value.fecha_inicio,this.tareaform.value.fecha_fin,this.tareaform.value.descripcion,1,0);
    this.database.createtarea(this.tareaform.value.titulo,this.fecha,this.tareaform.value.fecha_inicio,this.tareaform.value.fecha_fin,this.tareaform.value.descripcion,1,0).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.showAlert();
  }else{
    console.log(this.tareaform.value.titulo,this.fecha,this.tareaform.value.fecha_inicio,this.tareaform.value.fecha_fin,this.tareaform.value.descripcion,0,0);
    this.database.createtarea(this.tareaform.value.titulo,this.fecha,this.tareaform.value.fecha_inicio,this.tareaform.value.fecha_fin,this.tareaform.value.descripcion,0,0).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
//lanzar alerta de creacion de tarea
    this.showAlert();
  }
}
}
