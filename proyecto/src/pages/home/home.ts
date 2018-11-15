import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NuevoClientePage } from '../nuevo-cliente/nuevo-cliente';
import { NuevaTareaPage } from '../nueva-tarea/nueva-tarea';
import { NuevaNotificacionPage } from '../nueva-notificacion/nueva-notificacion';
import { CalendarioPage } from '../calendario/calendario';
import { VerclientesPage } from '../verclientes/verclientes';
import { VertareasPage } from '../vertareas/vertareas';
import { VerventasPage } from '../verventas/verventas';
import {NuevaVentaPage} from '../nueva-venta/nueva-venta';
import {VerpagosPage} from '../verpagos/verpagos';
import {VerproductoPage} from '../verproducto/verproducto';
import {NuevoproductoPage} from '../nuevoproducto/nuevoproducto'
import { DatabaseProvider } from '../../providers/database/database';
import { RegistrarpagoPage } from '../registrarpago/registrarpago';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private database: DatabaseProvider) {
  }
   nuevocliente(){
    this.navCtrl.push(NuevoClientePage);
  }
  nuevatarea(){
    this.navCtrl.push(NuevaTareaPage);
  }
  nuevanotificacion(){
    this.navCtrl.push(NuevaNotificacionPage);
  }
  calendario(){
    this.navCtrl.push(CalendarioPage);
  }
  vercliente(){
    this.navCtrl.push(VerclientesPage);
  }
  vertarea(){
    this.navCtrl.push(VertareasPage);
  }
  verventa(){
    this.navCtrl.push(VerventasPage);
  }
  nuevaventa(){
    this.navCtrl.push(NuevaVentaPage);
  }
  verpagos(){
    this.navCtrl.push(RegistrarpagoPage);
  }
  nuevoproducto(){
    this.navCtrl.push(NuevoproductoPage);
  }
  verproductos(){
    this.navCtrl.push(VerproductoPage);
  }
}
 