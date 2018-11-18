import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the EditarproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editarproducto',
  templateUrl: 'editarproducto.html',
})
export class EditarproductoPage {
  private iddelproducto: number;
  public producto: any;
  public productoform : FormGroup;
  public nombre: string;
  public precio: number;
  public descripcion:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,private formBuilder: FormBuilder,public alertCtrl: AlertController) {
    this.iddelproducto=this.navParams.get('data');
    this.productoform = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: [''],
    });
   
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad EditarproductoPage'+this.iddelproducto);
    this.getaproducto();
  }

  getaproducto(){
    this.database.getoneproducto(this.iddelproducto).then((pro: any)=>{
      console.log(pro);
      this.nombre=pro[0].nombre;
      this.precio=pro[0].precio;
      this.descripcion=pro[0].descripcion;
    },(error)=>{
      console.log(error);
    })
  }
  deleteproduto(){
    this.database.deleteProducto(this.iddelproducto).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }
  actualizarproducto(){
    this.database.updProducto(this.iddelproducto,this.productoform.value.nombre,this.productoform.value.precio,this.productoform.value.descripcion).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.pop();
  }
  showConfirmedit() {
    const confirm = this.alertCtrl.create({
      title: '¿Seguro de editar este producto?',
      message: 'El producto sera editado',
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
            this.actualizarproducto();
          }
        }
      ]
    });
    confirm.present();
  }
  showConfirmedelete() {
    const confirm = this.alertCtrl.create({
      title: '¿Seguro de Borrar este producto?',
      message: 'El producto sera borrado',
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
            this.deleteproduto();
          }
        }
      ]
    });
    confirm.present();
  }


}
