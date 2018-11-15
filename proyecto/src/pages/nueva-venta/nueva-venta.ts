import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-nueva-venta',
  templateUrl: 'nueva-venta.html',
})
export class NuevaVentaPage {
  public ventaform: FormGroup;
  public fecha: string;
  public numerodeventa: number;
  public actual = new Date();
  public clientes: any;
  public fechaactual: string = this.actual.toISOString();
  public productos: any;
  public ids: any;


  public ventasespecificas: any = [];
  public prodid: any = [];
  public cantidad: any = [];


  public total: any;
  public subtotal: any;



  public añoactual: number = this.actual.getFullYear();
  public mesactual: number = this.actual.getUTCMonth();
  public diaactual: number = this.actual.getUTCDate();
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public formbuilder: FormBuilder) {
    this.ventaform = this.formbuilder.group({
      NumeroVenta: ['', Validators.required],
      Cliente: ['', Validators.required],
      fecha: ['', Validators.required],
      total: ['', Validators.required],
      meses: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaVentaPage');
    this.getnumventa();
    this.getclientes();
    this.getproductos();
    this.total = 0;
  }
  getproductos() {
    this.database.getallproductos().then((data: any) => {
      console.log(data);
      this.productos = data;
    }, (error) => {
      console.log(error);
    })
  }
  getclientes() {
    this.database.getallclientes().then((data: any) => {
      console.log(data);
      this.clientes = data;
    }, (error) => {
      console.log(error);
    })

  }
  getnumventa() {
    this.database.getnumventa().then((data) => {
      console.log(data);
      this.ids = data;
      this.numerodeventa = this.ids[0].idGeneral;
      if (this.numerodeventa == null) {
        this.numerodeventa = 1;
      } else {
        this.numerodeventa++;
      }
      console.log(this.numerodeventa);
    }, (error) => {
      console.log(error);
    });
  }
  Add() {
    this.ventasespecificas.push({ 'value': '' });
    console.log(this.ventasespecificas);
    this.cantidad.push({ 'cantidad': 0 });
    this.prodid.push({ 'id': 0 });
    console.log(this.cantidad);
    console.log(this.prodid);
  }
  remove() {
    this.ventasespecificas.splice(this.ventasespecificas.length - 1, 1);
    this.cantidad.splice(this.cantidad.length - 1, 1);
    this.prodid.splice(this.cantidad.length - 1, 1);
  }
  createventa() {
    //crear venta general
    if (this.diaactual < 10) {
      this.fecha = this.añoactual + "-" + (this.mesactual + 1) + "-0" + this.diaactual;
    } else {
      this.fecha = this.añoactual + "-" + (this.mesactual + 1) + "-" + this.diaactual;
    }
    if (this.ventaform.value.meses == 0) {
      //venta general de contado
      console.log(this.fecha, this.total, 0, this.ventaform.value.Cliente, 0);

      this.database.createventageneral(this.fecha, this.total, 0, this.ventaform.value.Cliente, 0).then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    } else {
      //venta general a meses
      //console.log(this.fecha, this.total, 1, this.ventaform.value.Cliente, this.ventaform.value.meses);
      this.database.createventageneral(this.fecha, this.total, 1, this.ventaform.value.Cliente, this.ventaform.value.meses).then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    }

    //crear ventas especificas
    var ip: number;
    var cp: number;
    for (let i in this.ventasespecificas) {

      ip = this.prodid[i].id;
      cp = this.cantidad[i].cantidad;
      //console.log(this.numerodeventa, ip, cp);

      this.database.createventaespecifica(this.numerodeventa, ip, cp).then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    }
    //crear un solo pago pendiente
    if(this.ventaform.value.meses == 0 ){
      this.database.createpagopendiente(this.numerodeventa,this.fecha,this.total,"").then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    }
    //crear pagos pendientes si es a meses
    if (this.ventaform.value.meses != 0) {
      console.log("entro");
      var pago: number;
      var mes: number = 1;
      var fecha2 = new Date(this.añoactual + "/" + (this.mesactual + 1) + "/" + this.diaactual);  //fecha actual para calcular futuras
      var fechaf: string; //fecha final que ira en el query
      var añofuturo: number;
      var mesfuturo: number;
      var diafuturo: number;
      console.log(this.ventaform.value.meses);
     if(this.ventaform.value.meses==3){
      pago = this.total / 3;
          while (mes <= 3) {
            
            if(mes==1){
              console.log(this.numerodeventa,this.fecha,pago,"");
              this.database.createpagopendiente(this.numerodeventa,this.fecha,pago,"").then((data) => {
                console.log(data);
              }, (error) => {
                console.log(error);
              });
          }else{
            fecha2.setDate(fecha2.getDate() + (30));
            añofuturo = fecha2.getFullYear();
            mesfuturo = fecha2.getUTCMonth() + 1;
            diafuturo = fecha2.getUTCDate();
            if (diafuturo < 10) {
              fechaf = añofuturo + "-" + (mesfuturo) + "-0" + diafuturo;
            } else {
              fechaf = añofuturo + "-" + (mesfuturo) + "-" + diafuturo;
            }
            console.log(this.numerodeventa,fechaf,pago,"");
            this.database.createpagopendiente(this.numerodeventa,fechaf,pago,"").then((data) => {
              console.log(data);
            }, (error) => {
              console.log(error);
            });
          }
            mes++;
          }
     }
     if(this.ventaform.value.meses==6){
      pago = this.total / 6;
      while (mes <= 6) {
        if(mes==1){
          console.log(this.numerodeventa,this.fecha,pago,"");
          this.database.createpagopendiente(this.numerodeventa,this.fecha,pago,"").then((data) => {
            console.log(data);
          }, (error) => {
            console.log(error);
          });
      }else{
        fecha2.setDate(fecha2.getDate() + (30));
        añofuturo = fecha2.getFullYear();
        mesfuturo = fecha2.getUTCMonth() + 1;
        diafuturo = fecha2.getUTCDate();
        if (diafuturo < 10) {
          fechaf = añofuturo + "-" + (mesfuturo) + "-0" + diafuturo;
        } else {
          fechaf = añofuturo + "-" + (mesfuturo) + "-" + diafuturo;
        }
        console.log(this.numerodeventa,fechaf,pago,"");
        this.database.createpagopendiente(this.numerodeventa,fechaf,pago,"").then((data) => {
          console.log(data);
        }, (error) => {
          console.log(error);
        });
      }
        mes++;
      }
     }
     if(this.ventaform.value.meses==9){
      pago = this.total / 9;
          while (mes <= 9) {
            
            if(mes==1){
              console.log(this.numerodeventa,this.fecha,pago,"");
              this.database.createpagopendiente(this.numerodeventa,this.fecha,pago,"").then((data) => {
                console.log(data);
              }, (error) => {
                console.log(error);
              });
          }else{
            fecha2.setDate(fecha2.getDate() + (30));
            añofuturo = fecha2.getFullYear();
            mesfuturo = fecha2.getUTCMonth() + 1;
            diafuturo = fecha2.getUTCDate();
            if (diafuturo < 10) {
              fechaf = añofuturo + "-" + (mesfuturo) + "-0" + diafuturo;
            } else {
              fechaf = añofuturo + "-" + (mesfuturo) + "-" + diafuturo;
            }
            console.log(this.numerodeventa,fechaf,pago,"");
            this.database.createpagopendiente(this.numerodeventa,fechaf,pago,"").then((data) => {
              console.log(data);
            }, (error) => {
              console.log(error);
            });
          }
            mes++;
          }
     }
    

    }

    console.log("venta creada satifactoriamente");
    this.navCtrl.pop();
  }

  getprecio(productoid: number): number {
    var precio: number;
    for (let i in this.productos) {
      if (productoid == this.productos[i].idProducto) {
        precio = this.productos[i].precio;
      }
    }
    return precio;
  }
  cantidadintroducida() {
    var c: number;
    var ix: number;
    var precio: number;
    var sub: number = 0;

    for (let i in this.ventasespecificas) {
      ix = this.prodid[i].id;
      c = this.cantidad[i].cantidad;
      for (let j in this.productos) {
        //console.log(this.productos[j].idProducto);
        if (this.productos[j].idProducto == ix) {
          precio = this.productos[j].precio;
          //console.log(precio);
          break;
        }
      }
      sub += c * precio;
    }
    this.total = sub;
  }


}
