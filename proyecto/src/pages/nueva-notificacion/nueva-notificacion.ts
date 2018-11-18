import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,AlertController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-nueva-notificacion',
  templateUrl: 'nueva-notificacion.html',
})

export class NuevaNotificacionPage {
  public Notificacioneslistas: any;
  public notificacionforma: FormGroup;
  public tareasactivas: any;
  public actual = new Date();
  public añoactual: number = this.actual.getFullYear();
  public mesactual: number = this.actual.getUTCMonth();
  public diaactual: number = this.actual.getUTCDate();
  public hora: number = this.actual.getHours();
  public minutos: number = this.actual.getMinutes();
  public now: string = "" + this.hora + ":" + this.minutos;
  public fecha: string;
  public fechaactual: string = this.actual.toISOString();


  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public formbuilder: FormBuilder, public lN: LocalNotifications, public plat: Platform,public alerta:AlertController) {
    this.notificacionforma = this.formbuilder.group({
      titulotarea: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaNotificacionPage');
    this.gettareas();
  }

  gettareas() {
    this.database.gettareasactivadassinnotificacion().then((data: any) => {
      console.log(data);
      this.tareasactivas = data;
    }, (error) => {
      console.log(error);
    })
  }
  showAlertcreado() {
    const alert = this.alerta.create({
      title: 'Notificacion Agregada',
      subTitle: 'Una nueva notificacion a sido creada y agregada',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }
  
  crearnotificacion() {
    var horacons: string = this.notificacionforma.value.hora;
    var horaseparada: string[] = horacons.split(":");
    var hora: number = Number(horaseparada[0]);
    var minutos: number = Number(horaseparada[1]);
    var fecha: string = this.notificacionforma.value.fecha;
    var fechaseparada: string[] = fecha.split("-");
    var año: number = Number(fechaseparada[0]);
    var mes: number = Number(fechaseparada[1]);
    var dia: number = Number(fechaseparada[2]);

    this.database.createnotificacion(this.notificacionforma.value.titulotarea, this.notificacionforma.value.fecha, this.notificacionforma.value.hora, this.notificacionforma.value.descripcion).then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.database.agregarnotificacionatarea(this.notificacionforma.value.titulotarea).then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    //crear la local notification
    this.plat.ready().then(() => {
      this.lN.schedule({
        id: this.notificacionforma.value.titulotarea,
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
    this.showAlertcreado();
  }
}
