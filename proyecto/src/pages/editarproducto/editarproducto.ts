import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,private formBuilder: FormBuilder ) {
    this.iddelproducto=this.navParams.get('data');
    this.productoform = this.formBuilder.group({
      nombre: ['this.productoform.value.nombre', Validators.required],
      precio: ['this.productoform.value.precio', Validators.required],
      descripcion: ['this.productoform.value.descripcion'],
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad EditarproductoPage'+this.iddelproducto);
    this.getaproducto();
  }

  getaproducto(){
    this.database.getoneproducto(this.iddelproducto).then((data: any)=>{
      console.log(data);
      this.productoform.value.nombre=data[0].nombre;
      this.productoform.value.precio=data[0].precio;
      this.productoform.value.descripcion=data[0].descripcion;
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

  }


}
