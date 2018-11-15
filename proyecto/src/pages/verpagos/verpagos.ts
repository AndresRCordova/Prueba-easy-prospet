import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-verpagos',
  templateUrl: 'verpagos.html',
})
export class VerpagosPage {
  public idgeneral:number;
  public pagospendientes:any;
  public pagospagados:any;
  public vacio=[];
  public vppendientes:boolean=true;
  public vppagado:boolean=true;
  public terminada:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider) {
    this.idgeneral=this.navParams.get('data');
    console.log(this.idgeneral);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerpagosPage');
    this.getpagospendientes();
    this.getpagospagados();
  }

  getpagospendientes(){
    this.database.getpagospendientesdeunaventa(this.idgeneral).then((pro: any)=>{
      if(pro[0].idGeneral==-1){
        this.terminada=true;
        console.log(this.terminada);
      }else{
       this.pagospendientes=pro;
       console.log(this.pagospendientes);
      }
      console.log(pro);
      },(error)=>{
        console.log(error);
      });
    }
  getpagospagados(){
    this.database.getpagospagadosdeunaventa(this.idgeneral).then((pro: any)=>{
      this.pagospagados=pro;
      console.log(this.pagospagados);
     },(error)=>{
       console.log(error);
     });
  }
  realizarpago(idpago:number,idgeneral:number){
    this.database.realizarpago(idpago,idgeneral).then((pro: any)=>{
      console.log(pro);
     },(error)=>{
       console.log(error);
     });
     
     this.getpagospendientes();
     this.getpagospagados();
  }
  terminarventa(){
    this.database.terminarventa(this.idgeneral).then((pro: any)=>{
      console.log(pro);
     },(error)=>{
       console.log(error);
     });
     this.navCtrl.pop();
  }
}
