import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NuevoClientePage } from '../pages/nuevo-cliente/nuevo-cliente';
import { NuevaTareaPage } from '../pages/nueva-tarea/nueva-tarea';
import { NuevaNotificacionPage } from '../pages/nueva-notificacion/nueva-notificacion';
import { CalendarioPage } from '../pages/calendario/calendario';
import { VerclientesPage } from '../pages/verclientes/verclientes';
import { VertareasPage } from '../pages/vertareas/vertareas';
import { VerventasPage } from '../pages/verventas/verventas';
import { EditarclientePage } from '../pages/editarcliente/editarcliente';
import { EditartareaPage }  from '../pages/editartarea/editartarea';
import { VentasespecificasPage } from '../pages/ventasespecificas/ventasespecificas';
import { RegistrarpagoPage } from '../pages/registrarpago/registrarpago';
import { EdiatarnotificacionPage } from '../pages/ediatarnotificacion/ediatarnotificacion';
import {NuevaVentaPage} from '../pages/nueva-venta/nueva-venta';
import {VerpagosPage} from '../pages/verpagos/verpagos';
import {VerproductoPage} from '../pages/verproducto/verproducto';
import {EditarproductoPage} from '../pages/editarproducto/editarproducto';
import {NuevoproductoPage} from '../pages/nuevoproducto/nuevoproducto';
import { SQLite} from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NuevoClientePage,
    NuevaTareaPage,
    NuevaNotificacionPage,
    CalendarioPage,
    VerclientesPage,
    VertareasPage,
    VerventasPage,
    EditarclientePage,
    EditartareaPage,
    VentasespecificasPage,
    RegistrarpagoPage,
    EdiatarnotificacionPage,
    NuevaVentaPage,
    VerpagosPage,
    VerproductoPage,
    EditarproductoPage,
    NuevoproductoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NuevoClientePage,
    NuevaTareaPage,
    NuevaNotificacionPage,
    CalendarioPage,
    VerclientesPage,
    VertareasPage,
    VerventasPage,
    EditarclientePage,
    EditartareaPage,
    VentasespecificasPage,
    RegistrarpagoPage,
    EdiatarnotificacionPage,
    NuevaVentaPage,
    VerpagosPage,
    VerproductoPage,
    EditarproductoPage,
    NuevoproductoPage
      ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
