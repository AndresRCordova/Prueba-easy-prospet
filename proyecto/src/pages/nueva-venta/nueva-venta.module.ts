import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaVentaPage } from './nueva-venta';

@NgModule({
  declarations: [
    NuevaVentaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaVentaPage),
  ],
})
export class NuevaVentaPageModule {}
