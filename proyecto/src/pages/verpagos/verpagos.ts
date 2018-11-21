import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-verpagos',
  templateUrl: 'verpagos.html',
})
export class VerpagosPage {
  public restante:number;
  public idgeneral:number;
  public pagospendientes:any;
  public pagospagados:any;
  public venta:any;
  public vacio=[];
  public tot:number;
 public subt:number=0;
  public vppendientes:boolean=true;
  public vppagado:boolean=true;
  public terminada:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: DatabaseProvider,private alerta: AlertController) {
    this.idgeneral=this.navParams.get('data');
    
  }

  ionViewDidLoad() {
    this.getpagospendientes();
    this.getpagospagados();
    this.getventa();
  }
  ionViewDidEnter(){
    this.calcularrestante();
  }

  getpagospendientes(){
    this.database.getpagospendientesdeunaventa(this.idgeneral).then((pro: any)=>{
      if(pro[0].idGeneral==-1){
        this.terminada=true;
      }else{
       this.pagospendientes=pro;
      }
      },(error)=>{
      });
    }
  getpagospagados(){
    this.database.getpagospagadosdeunaventa(this.idgeneral).then((pro: any)=>{
      this.pagospagados=pro;
      //console.log(this.pagospagados);
     },(error)=>{
       //console.log(error);
     });
  }
  getventa(){
    this.database.getaventa(this.idgeneral).then((pro: any)=>{
      this.venta=pro;
     },(error)=>{
     });
  }
  calcularrestante(){
    this.tot=(this.venta[0].total);
    for(let i in this.pagospagados ){
      this.subt+=this.pagospagados[i].importe;

    }
    this.restante=this.tot-this.subt;
    if(this.restante<=0){
      this.terminada=true;
    }
    
  }
  showAlert() {
    const alert = this.alerta.create({
      title: 'Pago invalido!',
      subTitle: 'El importe es mayor al restante!',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertf() {
    var mensage="Este es el ultimo pago \n debe liquidar el restante! $"+this.restante;
    const alert = this.alerta.create({
      title: 'Pago invalido!',
      subTitle: mensage,
      buttons: ['OK']
    });
    alert.present();
  }
  realizarpago(idpago:number,idgeneral:number,importe:number){
    if(importe>this.restante){
      this.showAlert();
    }else if(this.pagospendientes.length==1 && importe<this.restante){
      this.showAlertf();
    }else{
    this.database.realizarpago(idpago,idgeneral,importe).then((pro: any)=>{
     // console.log(pro);
     },(error)=>{
      // console.log(error);
     });
     
    var pr=(this.pagospendientes.length-1);
    console.log("Pagos restantes: "+pr);
    console.log("Importe restante: "+this.restante);

    var newimp=(this.restante-importe)/pr;
    console.log("nuevo importe mensual: "+newimp);
    this.database.updatepagos(idgeneral,newimp).then((pro: any)=>{
      console.log(pro);
     },(error)=>{
       console.log(error);
     });
     this.navCtrl.pop();
    }
  }
  terminarventa(){
    this.database.terminarventa(this.idgeneral).then((pro: any)=>{
      console.log(pro);
     },(error)=>{
       console.log(error);
     });
     this.showAlertterminarventa();
     this.navCtrl.pop();
     
  }
  showAlertRealizarPago(idpago:number,idgeneral:number) {
  var mensage="Ingrese el Importe del pago,\nRestan: $"+this.restante;
    const prompt = this.alerta.create({
      title: 'Registrar pago',
      message: mensage,
      inputs: [
        {
          name: 'Importe',
          placeholder: 'Importe',
          type: "number"
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Pagar',
          handler: data => {
            console.log('Saved clicked');
           this.realizarpago(idpago,idgeneral,data.Importe);

          }
        }
      ]
    });
    prompt.present();
  }
  showAlertterminarventa() {
    const alert = this.alerta.create({
      title: 'Venta terminada',
      subTitle: 'La venta a sido terminada con exito',
      buttons: [{
        text: 'Ok',
        handler: () => {
        }
      }]
    });
    alert.present();
  }
}
