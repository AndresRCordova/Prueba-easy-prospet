import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaNotificacionPage } from './nueva-notificacion';

@NgModule({
  declarations: [
    NuevaNotificacionPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaNotificacionPage),
  ],
})
export class NuevaNotificacionPageModule {}
