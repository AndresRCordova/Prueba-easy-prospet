import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarclientePage } from './editarcliente';

@NgModule({
  declarations: [
    EditarclientePage,
  ],
  imports: [
    IonicPageModule.forChild(EditarclientePage),
  ],
})
export class EditarclientePageModule {}
