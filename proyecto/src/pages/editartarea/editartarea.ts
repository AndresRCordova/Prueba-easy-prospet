import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the EditartareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editartarea',
  templateUrl: 'editartarea.html',
})
export class EditartareaPage {
  private iddeTarea:number;
  public tareaform: FormGroup;

  public titulo:string;
  public fecha_creacion:string;
  public fecha_inicio:string;
  public fecha_fin:string;
  public descripcion:string;
  public activado:number;


  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,private formBuilder: FormBuilder ) {
  this.iddeTarea=this.navParams.get('data');
  console.log(this.iddeTarea);
  this.tareaform = this.formBuilder.group({
    titulo: ['', Validators.required],
    fecha_creacion: ['', Validators.required],
    fecha_inicio: ['', Validators.required],
    fecha_fin: ['', Validators.required],
    descripcion: ['', Validators.required],
    activado:['', Validators.required]
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditartareaPage');
    this.getatarea();
  }
  getatarea(){
    this.database.getatarea(this.iddeTarea).then((pro: any)=>{
      console.log(pro);
      this.titulo=pro[0].titulo;
      this.fecha_creacion=pro[0].fecha_creacion;
      this.fecha_inicio=pro[0].fecha_inicio;
      this.fecha_fin=pro[0].fecha_fin;
      this.descripcion=pro[0].descripcion;
      this.activado=pro[0].activado;
    },(error)=>{
      console.log(error);
    });
  }
  deletetarea(){
    this.database.deletetarea(this.iddeTarea).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }
  actualizartarea(){
      console.log(this.iddeTarea,this.titulo,this.fecha_creacion,this.fecha_inicio,this.fecha_fin,this.descripcion,this.tareaform.value.activado);
      this.database.updtarea(this.iddeTarea,this.tareaform.value.titulo,this.fecha_creacion,this.tareaform.value.fecha_inicio,this.tareaform.value.fecha_fin,this.tareaform.value.descripcion,this.tareaform.value.activado).then((data)=>{
        console.log(data);
      },(error)=>{
        console.log(error);
      });
    
    
    this.navCtrl.pop();
  }

}
