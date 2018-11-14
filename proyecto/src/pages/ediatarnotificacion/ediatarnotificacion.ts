import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications';
@IonicPage()
@Component({
  selector: 'page-ediatarnotificacion',
  templateUrl: 'ediatarnotificacion.html',
})
export class EdiatarnotificacionPage {
  public idTarea: any;
  public notificacionforma: FormGroup;
  public ttarea: any;

  public fechaN: any;
  public horaN: any;
  public descripcionN: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public formbuilder: FormBuilder, public lN: LocalNotifications, public plat: Platform) {
    this.idTarea = this.navParams.get('data');
    this.notificacionforma = this.formbuilder.group({
      titulotarea: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdiatarnotificacionPage');
    this.gettitulotarea();
    this.getdatosnotificacion();
    this.plat.ready().then(() => {
      this.lN.getAll().then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    });
  }
  gettitulotarea() {
    this.database.gettitulotarea(this.idTarea).then((pro: any) => {
      console.log(pro);
      this.ttarea = pro[0].titulo;
    }, (error) => {
      console.log(error);
    })
  }

  getdatosnotificacion() {
    this.database.getanotificacion(this.idTarea).then((pro: any) => {
      console.log(pro);
      this.fechaN = pro[0].fecha_notificacion;
      this.horaN = pro[0].hora_notificacion;
      this.descripcionN = pro[0].descripcion;
    }, (error) => {
      console.log(error);
    })
  }

  deleteNotificacion() {
    this.database.quitarnotificacionatarea(this.idTarea);
    this.database.deletenotificacion(this.idTarea);
    this.plat.ready().then(() => {
      this.lN.cancel({
        id:this.idTarea
      });
    });
    this.navCtrl.pop();
  }

  actualizanotificacion() {
    var horacons: string = this.notificacionforma.value.hora;
    var horaseparada: string[] = horacons.split(":");
    var hora: number = Number(horaseparada[0]);
    var minutos: number = Number(horaseparada[1]);
    var fecha: string = this.notificacionforma.value.fecha;
    var fechaseparada: string[] = fecha.split("-");
    var año: number = Number(fechaseparada[0]);
    var mes: number = Number(fechaseparada[1]);
    var dia: number = Number(fechaseparada[2]);

    this.database.updNotificacion(this.idTarea, this.notificacionforma.value.fecha, this.notificacionforma.value.hora, this.notificacionforma.value.descripcion).then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    //crear la local notification
    this.plat.ready().then(() => {
      this.lN.schedule({
        id: this.idTarea,
        title: "Easy Prospect",
        text: this.notificacionforma.value.descripcion,
        trigger: { at: new Date(año, (mes - 1), dia, hora, minutos, 0, 0) },
      });
      this.lN.getAll().then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    });
    this.navCtrl.pop();
  }
}
