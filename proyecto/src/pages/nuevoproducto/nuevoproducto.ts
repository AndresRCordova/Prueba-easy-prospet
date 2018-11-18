import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the NuevoproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevoproducto',
  templateUrl: 'nuevoproducto.html',
})
export class NuevoproductoPage {

  public productoform : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider,private formBuilder: FormBuilder,public alerta:AlertController) {
    this.productoform = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: [''],
    });
  }
  showAlertcreado() {
    const alert = this.alerta.create({
      title: 'Producto Agregado',
      subTitle: 'Un nuevo Producto a sido creado y agregado',
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
    console.log('ionViewDidLoad NuevoproductoPage');
    
  }

  
  createproduto(){
    this.database.createProducto(this.productoform.value.nombre,this.productoform.value.precio,this.productoform.value.descripcion).then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    });
    this.showAlertcreado();
  }

  
}
