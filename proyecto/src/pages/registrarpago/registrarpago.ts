import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the RegistrarpagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-registrarpago',
  templateUrl: 'registrarpago.html',
})
export class RegistrarpagoPage {
  public pagospendientes:any;
  public pagospagados:any;
  public vppendientes:boolean=true;
  public vppagado:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerpagosPage');
    this.getpagospendientes();
    this.getpagospagados();
  }

  getpagospendientes(){
    this.database.getpagospendientes().then((pro: any)=>{
       this.pagospendientes=pro;
       
       console.log(this.pagospendientes);
      
      },(error)=>{
        console.log(error);
      });
    }
  getpagospagados(){
    this.database.getpagospagados().then((pro: any)=>{
      this.pagospagados=pro;
      console.log(this.pagospagados);
     },(error)=>{
       console.log(error);
     });
  }

}
