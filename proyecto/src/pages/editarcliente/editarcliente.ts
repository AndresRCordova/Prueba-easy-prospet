import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-editarcliente',
  templateUrl: 'editarcliente.html',
})
export class EditarclientePage {
  iddelcliente:number;
  clienteform: FormGroup;
  nombre:string;
  appaterno:string;
  apmaterno:string;
  correo:string;
  telefono: number;
  estatus: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,private formBuilder: FormBuilder,public alertCtrl: AlertController) {
    this.iddelcliente=this.navParams.get('data');
    this.clienteform = this.formBuilder.group({
      nombre: ['', Validators.required],
      appaterno: ['', Validators.required],
      apmaterno: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      estatus: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad EditarclientePage'+this.iddelcliente);
    this.getacliente();
  }
  getacliente(){

      this.database.getuncliente(this.iddelcliente).then((pro: any)=>{
        console.log(pro);
        this.nombre=pro[0].nombre;
        this.appaterno=pro[0].paterno;
        this.apmaterno=pro[0].materno;
        this.correo=pro[0].correo;
        this.telefono=pro[0].telefono;
        this.estatus=pro[0].estatus;
      },(error)=>{
        console.log(error);
      })
    
  }
  actualizarcliente(){
    this.database.updCliente(this.iddelcliente,this.clienteform.value.nombre,this.clienteform.value.appaterno,this.clienteform.value.apmaterno,this.clienteform.value.correo,this.clienteform.value.telefono,this.clienteform.value.estatus).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }
  deletecliente(){
    this.database.deleteCliente(this.iddelcliente).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }
  showConfirmedit() {
    const confirm = this.alertCtrl.create({
      title: '¿Seguro de editar este cliente?',
      message: 'El cliente sera editado',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            this.actualizarcliente();
          }
        }
      ]
    });
    confirm.present();
  }
  showConfirmedelete() {
    const confirm = this.alertCtrl.create({
      title: '¿Seguro de Borrar este cliente?',
      message: 'El cliente sera borrado',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            this.deletecliente();
          }
        }
      ]
    });
    confirm.present();
  }
}
