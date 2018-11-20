import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the NuevoproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var WindowsAzure: any;
var client:any;
@IonicPage()
@Component({
  selector: 'page-nuevoproducto',
  templateUrl: 'nuevoproducto.html',
})

export class NuevoproductoPage {
  public productoform : FormGroup;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public alerta:AlertController,platform: Platform) {
    this.productoform = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: [''],
    });
    platform.ready().then(() => {
       client = new WindowsAzure.MobileServiceClient("https://easyprospect.azurewebsites.net");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
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
    var newItem = {
      nombre: this.productoform.value.nombre,
      precio: this.productoform.value.precio,
      descripcion: this.productoform.value.descripcion,

  };
  var table = client.getTable('Producto');
  var failure:any;
  table
    .insert(newItem)
    .done(function (insertedItem) {
        var id = insertedItem.id;
    }, failure);
    console.log(failure);

    this.showAlertcreado();
  }

  

}
