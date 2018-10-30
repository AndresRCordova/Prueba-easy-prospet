import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaTareaPage } from './nueva-tarea';

@NgModule({
  declarations: [
    NuevaTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaTareaPage),
  ],
})
export class NuevaTareaPageModule {}
