import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the NuevoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-cliente',
  templateUrl: 'nuevo-cliente.html',
})
export class NuevoClientePage {
  public clienteform : FormGroup;
  public correos:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,private formBuilder: FormBuilder) {
    this.clienteform = this.formBuilder.group({
      nombre: ['', Validators.required],
      appaterno: ['', Validators.required],
      apmaterno: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
      telefono: ['', Validators.required],
      estatus: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoClientePage');
  }
  createcliente(){
    this.obtenercorreos();
  }

  obtenercorreos(){
    this.database.getcorreoclientes(this.clienteform.value.correo).then((data)=>{
      console.log("Datos Obtenido por el correo");
      console.log(data);
      this.correos=data;
      if(this.correos[0].correo==-1){
        console.log("correos diferentes");
        
      this.database.createcliente(this.clienteform.value.nombre,this.clienteform.value.appaterno,this.clienteform.value.apmaterno,this.clienteform.value.correo,this.clienteform.value.telefono,this.clienteform.value.estatus).then((data)=>{
        console.log(data);
      },(error)=>{
        console.log(error);
      });
      this.navCtrl.pop();
       }else{
      console.log("correos iguales");
    }
    },(error)=>{
      console.log(error);
    });
  }

}