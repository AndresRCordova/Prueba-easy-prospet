import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  public db: SQLiteObject;
  private isOpen: boolean;


  constructor(public http: Http, public storage: SQLite) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: 'easydb.db', location: 'default' }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS producto(idProducto INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,precio NUMERIC,descripcion TEXT);", []);
        console.log('tabla producto creada corretamente');
        db.executeSql("CREATE TABLE IF NOT EXISTS Clientes(idCliente INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT NOT NULL,paterno TEXT NOT NULL,materno TEXT NOT NULL,correo TEXT NOT NULL,telefono TEXT NOT NULL,estatus INTEGER NOT NULL);",[]);
        console.log('tabla de clientes creada correctamente');
        db.executeSql("CREATE TABLE IF NOT EXISTS Tareas(idTarea INTEGER PRIMARY KEY AUTOINCREMENT,titulo TEXT NOT NULL,fecha_creacion DATE NOT NULL,fecha_inicio DATE NOT NULL,fecha_fin DATE NOT NULL,descripcion TEXT NOT NULL,activado INTEGER NOT NULL,alerta INTEGER NOT NULL);",[]);
        console.log('tabla de tareas creada correctamente');
        db.executeSql("CREATE TABLE IF NOT EXISTS Notificaciones(idNotificacion INTEGER PRIMARY KEY AUTOINCREMENT,idTarea INTEGER NOT NULL,fecha_notificacion DATE NOT NULL,hora_notificacion TIME NOT NULL,descripcion TEXT NOT NULL);",[]);
        console.log('tabla de tareas creada correctamente');
        db.executeSql("CREATE TABLE IF NOT EXISTS Venta_General(idGeneral INTEGER PRIMARY KEY AUTOINCREMENT,fecha DATE NOT NULL,total REAL NOT NULL,idTipoPago INTEGER NOT NULL,idCliente INTEGER NOT NULL,meses INTEGER NOT NULL,completada INTEGER NOT NULL);",[]);
        console.log('tabla de Ventas generales creada correctamente');
        db.executeSql("CREATE TABLE IF NOT EXISTS Venta_Especifica(idEspecifica INTEGER PRIMARY KEY AUTOINCREMENT,idGeneral INTEGER ,idProducto INTEGER NOT NULL,cantidad INTEGER NOT NULL);",[]);
        console.log('tabla de Ventas especificas creada correctamente');
        db.executeSql("CREATE TABLE IF NOT EXISTS Pagos(idPago INTEGER PRIMARY KEY AUTOINCREMENT,idGeneral INTEGER NOT NULL,fecha_pago DATE NOT NULL,importe REAL NOT NULL,descripcion TEXT NOT NULL,pagado INTEGER NOT NULL);",[]);
        console.log('tabla de pagos creada correctamente');
        this.isOpen = true;
        console.log('base de datos creada corretamente');
      }).catch((error) => {
        console.log(error);
      })
    }
  }
  getventamesesdeuncliente(idCliente:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_General where idTipoPago=1 AND completada=0 AND idCliente=?",[idCliente]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              fecha: data.rows.item(i).fecha,
              total: data.rows.item(i).total,
              idCliente: data.rows.item(i).idCliente,
              meses: data.rows.item(i).meses,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getventacontadodeuncliente(idCliente:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_General where idTipoPago=0 AND completada=0 AND idCliente=?",[idCliente]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              fecha: data.rows.item(i).fecha,
              total: data.rows.item(i).total,
              idCliente: data.rows.item(i).idCliente,
              meses: data.rows.item(i).meses,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getventaterminadasdeuncliente(idCliente:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_General where completada=1 AND idCliente=?",[idCliente]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              fecha: data.rows.item(i).fecha,
              total: data.rows.item(i).total,
              idCliente: data.rows.item(i).idCliente,
              meses: data.rows.item(i).meses,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }

  realizarpago(idpago:number,idventa:number) {
    return new Promise((resolve, reject) => {
      let sql = "update Pagos set pagado=1 where Pagos.idPago=? AND Pagos.idGeneral=? ";
      this.db.executeSql(sql,[idpago,idventa]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  terminarventa(idventa:number) {
    return new Promise((resolve, reject) => {
      let sql = "update Venta_General set completada=1 where Venta_General.idGeneral=? ";
      this.db.executeSql(sql,[idventa]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  getpagospendientesdeunaventa(idventa:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Pagos where idGeneral=? AND pagado=0",[idventa]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              idPago: data.rows.item(i).idPago,
              fecha_pago: data.rows.item(i).fecha_pago,
              importe: data.rows.item(i).importe,
            });
          }
        }
        else{
          arrayproductos.push({
            idGeneral: -1,
          });
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getpagospagadosdeunaventa(idventa:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Pagos where idGeneral=? AND pagado=1",[idventa]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              idPago: data.rows.item(i).idPago,
              fecha_pago: data.rows.item(i).fecha_pago,
              importe: data.rows.item(i).importe,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getpagospendientes(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Pagos where pagado=0 ORDER BY DATE(fecha_pago) ASC",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              idPago: data.rows.item(i).idPago,
              fecha_pago: data.rows.item(i).fecha_pago,
              importe: data.rows.item(i).importe,
            });
          }
        }
        else{
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getpagospagados(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Pagos where pagado=1 ORDER BY DATE(fecha_pago) ASC",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              idPago: data.rows.item(i).idPago,
              fecha_pago: data.rows.item(i).fecha_pago,
              importe: data.rows.item(i).importe,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  createpago(idGeneral:number,fecha_pago:string,importe:number,descripcion:string){
    return new Promise((resolve, reject) => {
      let sql = "insert into Pagos (idGeneral,fecha_pago,importe,descripcion,pagado) values (?,?,?,?,1)";
      this.db.executeSql(sql, [idGeneral,fecha_pago,importe,descripcion]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  createpagopendiente(idGeneral:number,fecha_pago:string,importe:number,descripcion:string){
    return new Promise((resolve, reject) => {
      let sql = "insert into Pagos (idGeneral,fecha_pago,importe,descripcion,pagado) values (?,?,?,?,0)";
      this.db.executeSql(sql, [idGeneral,fecha_pago,importe,descripcion]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  createventageneral(fecha:string,total:number,idTipoPago:number,idCliente:number,meses:number){
    return new Promise((resolve, reject) => {
      let sql = "insert into Venta_General (fecha,total,idTipoPago,idCliente,meses,completada) values (?,?,?,?,?,0)";
      this.db.executeSql(sql, [fecha,total,idTipoPago,idCliente,meses]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  getventameses(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_General where idTipoPago=1 AND completada=0",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              fecha: data.rows.item(i).fecha,
              total: data.rows.item(i).total,
              idCliente: data.rows.item(i).idCliente,
              meses: data.rows.item(i).meses,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getventacontado(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_General where idTipoPago=0 AND completada=0",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              fecha: data.rows.item(i).fecha,
              total: data.rows.item(i).total,
              idCliente: data.rows.item(i).idCliente,
              meses: data.rows.item(i).meses,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getventaterminadas(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_General where completada=1",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              fecha: data.rows.item(i).fecha,
              total: data.rows.item(i).total,
              idCliente: data.rows.item(i).idCliente,
              meses: data.rows.item(i).meses,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getaventa(idGeneral:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_General where idGeneral=?",[idGeneral]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
              fecha: data.rows.item(i).fecha,
              total: data.rows.item(i).total,
              idCliente: data.rows.item(i).idCliente,
              meses: data.rows.item(i).meses,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  createventaespecifica(idGeneral:number,idProducto:number,cantidad:number){
    return new Promise((resolve, reject) => {
      let sql = "insert into Venta_Especifica (idGeneral,idProducto,cantidad) values (?,?,?)";
      this.db.executeSql(sql, [idGeneral,idProducto,cantidad]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  getventasespecificas(idGeneral:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Venta_Especifica where idGeneral=?",[idGeneral]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idProducto: data.rows.item(i).idProducto,
              cantidad: data.rows.item(i).cantidad,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getallclientes(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Clientes",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idCliente: data.rows.item(i).idCliente,
              nombre: data.rows.item(i).nombre,
              paterno: data.rows.item(i).paterno,
              materno: data.rows.item(i).materno,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getnumventa(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select MAX(idGeneral) as idGeneral from Venta_General",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idGeneral: data.rows.item(i).idGeneral,
            });
          }
        }
        else{
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }

  getanotificacion(id:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Notificaciones where idTarea=?",[id]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              fecha_notificacion: data.rows.item(i).fecha_notificacion,
              hora_notificacion: data.rows.item(i).hora_notificacion,
              descripcion: data.rows.item(i).descripcion,
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }

  createnotificacion(idTarea:number,fecha_notificacion:string,hora_notificacion:string,descripcion:string){
    return new Promise((resolve, reject) => {
      let sql = "insert into Notificaciones (idTarea,fecha_notificacion,hora_notificacion,descripcion) values (?,?,?,?)";
      this.db.executeSql(sql, [idTarea,fecha_notificacion,hora_notificacion,descripcion]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  updNotificacion(idTarea:number,fecha_notificacion:string,hora_notificacion:string,descripcion:string) {
    return new Promise((resolve, reject) => {
      let sql = "update Notificaciones set fecha_notificacion=?,hora_notificacion=?,descripcion=? where Notificaciones.idTarea=?";
      this.db.executeSql(sql,[fecha_notificacion,hora_notificacion,descripcion,idTarea]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  agregarnotificacionatarea(idTarea){
    return new Promise((resolve, reject) => {
      let sql = "update Tareas set alerta=1 where Tareas.idTarea=?";
      this.db.executeSql(sql, [idTarea]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  quitarnotificacionatarea(idTarea){
    return new Promise((resolve, reject) => {
      let sql = "update Tareas set alerta=0 where Tareas.idTarea=?";
      this.db.executeSql(sql, [idTarea]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  deletenotificacion(iddetarea: number) {
    return new Promise((resolve, reject) => {
      let sql = "delete from Notificaciones where Notificaciones.idTarea=?";
      this.db.executeSql(sql,[iddetarea]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  
  getatarea(id:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Tareas where idTarea=?",[id]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idTarea: data.rows.item(i).idTarea,
              titulo: data.rows.item(i).titulo,
              fecha_creacion: data.rows.item(i).fecha_creacion,
              fecha_inicio: data.rows.item(i).fecha_inicio,
              fecha_fin: data.rows.item(i).fecha_fin,
              descripcion: data.rows.item(i).descripcion,
              activado: data.rows.item(i).activado
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  deletetarea(iddetarea: number) {
    return new Promise((resolve, reject) => {
      let sql = "delete from Tareas where Tareas.idTarea=?";
      this.db.executeSql(sql,[iddetarea]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  createtarea(titulo:string,fecha_creacion:string,fecha_inicio:string,fecha_fin:string,descripcion:string,activado:number,alerta:number){
    return new Promise((resolve, reject) => {
      let sql = "insert into Tareas (titulo,fecha_creacion,fecha_inicio,fecha_fin,descripcion,activado,alerta) values (?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [titulo,fecha_creacion,fecha_inicio,fecha_fin,descripcion,activado,alerta]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  updtarea(iddetarea: number,titulo:string,fecha_creacion:string,fecha_inicio:string,fecha_fin:string,descripcion:string,activado:number) {
    return new Promise((resolve, reject) => {
      let sql = "update Tareas set titulo=?,fecha_creacion=?,fecha_inicio=?,fecha_fin=?,descripcion=?,activado=? where Tareas.idTarea=?";
      this.db.executeSql(sql,[titulo,fecha_creacion,fecha_inicio,fecha_fin,descripcion,activado,iddetarea]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  gettareasactivadas(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Tareas where activado==1",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idTarea: data.rows.item(i).idTarea,
              titulo: data.rows.item(i).titulo,
              fecha_creacion: data.rows.item(i).fecha_creacion,
              fecha_inicio: data.rows.item(i).fecha_inicio,
              fecha_fin: data.rows.item(i).fecha_fin,
              descripcion: data.rows.item(i).descripcion,
              activado: data.rows.item(i).activado,
              alerta: data.rows.item(i).alerta
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  gettareascompletadas(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Tareas where activado==2",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idTarea: data.rows.item(i).idTarea,
              titulo: data.rows.item(i).titulo,
              fecha_creacion: data.rows.item(i).fecha_creacion,
              fecha_inicio: data.rows.item(i).fecha_inicio,
              fecha_fin: data.rows.item(i).fecha_fin,
              descripcion: data.rows.item(i).descripcion,
              activado: data.rows.item(i).activado,
              alerta: data.rows.item(i).alerta
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  gettareasactivadassinnotificacion(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Tareas where activado==1 AND alerta==0 ",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idTarea: data.rows.item(i).idTarea,
              titulo: data.rows.item(i).titulo,
              fecha_creacion: data.rows.item(i).fecha_creacion,
              fecha_inicio: data.rows.item(i).fecha_inicio,
              fecha_fin: data.rows.item(i).fecha_fin,
              descripcion: data.rows.item(i).descripcion,
              activado: data.rows.item(i).activado,
              alerta: data.rows.item(i).alerta
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }

  gettitulotarea(idTarea:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select titulo from Tareas where idTarea==?",[idTarea]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              titulo: data.rows.item(i).titulo
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  gettareasdesactivadas(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Tareas where activado==0",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idTarea: data.rows.item(i).idTarea,
              titulo: data.rows.item(i).titulo,
              fecha_creacion: data.rows.item(i).fecha_creacion,
              fecha_inicio: data.rows.item(i).fecha_inicio,
              fecha_fin: data.rows.item(i).fecha_fin,
              descripcion: data.rows.item(i).descripcion,
              activado: data.rows.item(i).activado,
              alerta: data.rows.item(i).alerta
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  pasadofechastareas(fecha:string) {
    return new Promise((resolve, reject) => {
      let sql = "update Tareas set activado=0 where Tareas.fecha_fin<? AND activado==1";
      this.db.executeSql(sql,[fecha]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  createcliente(nombre:string,paterno:string,materno:string,email:string,telefono:number,idStatus:number){
    return new Promise((resolve, reject) => {
      let sql = "insert into Clientes (nombre,paterno,materno,correo,telefono,estatus) values (?,?,?,?,?,?)";
      this.db.executeSql(sql, [nombre,paterno,materno,email,telefono,idStatus]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  getclientes(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Clientes where estatus=0",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idCliente: data.rows.item(i).idCliente,
              nombre: data.rows.item(i).nombre,
              paterno: data.rows.item(i).paterno,
              materno: data.rows.item(i).materno,
              correo: data.rows.item(i).correo,
              telefono: data.rows.item(i).telefono,
              estatus: data.rows.item(i).estatus
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
 
  getcorreoclientes(correo:string){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select correo from Clientes where Clientes.correo=?",[correo]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              correo: data.rows.item(i).correo,
            });
          }
        }else{
          arrayproductos.push({
            correo: -1
          })
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  deleteCliente(iddelcliente: number) {
    return new Promise((resolve, reject) => {
      let sql = "delete from Clientes where Clientes.idCliente=?";
      this.db.executeSql(sql,[iddelcliente]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  updCliente(idcliente:number,nombre:string,paterno:string,materno:string,email:string,telefono:number,idStatus:number) {
    return new Promise((resolve, reject) => {
      let sql = "update Clientes set nombre=?,paterno=?,materno=?,correo=?,telefono=?,estatus=? where Clientes.idCliente=?";
      this.db.executeSql(sql,[nombre,paterno,materno,email,telefono,idStatus,idcliente]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  getuncliente(id:number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Clientes where idCliente=?",[id]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idCliente: data.rows.item(i).idCliente,
              nombre: data.rows.item(i).nombre,
              paterno: data.rows.item(i).paterno,
              materno: data.rows.item(i).materno,
              correo: data.rows.item(i).correo,
              telefono: data.rows.item(i).telefono,
              estatus: data.rows.item(i).estatus
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getprospectos(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Clientes where estatus!=0 ",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idCliente: data.rows.item(i).idCliente,
              nombre: data.rows.item(i).nombre,
              paterno: data.rows.item(i).paterno,
              materno: data.rows.item(i).materno,
              correo: data.rows.item(i).correo,
              telefono: data.rows.item(i).telefono,
              estatus: data.rows.item(i).estatus
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  createtipostatus(id:number,descripcion:string){
    return new Promise((resolve, reject) => {
      let sql = "insert into Status (idStatus,descripcion) values (?,?)";
      this.db.executeSql(sql, [id, descripcion]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  createtipopago(id: number,descripcion:string){
    return new Promise((resolve, reject) => {
      let sql = "insert into Tipo_Pago (idTipoPago,descripcion) values (?,?)";
      this.db.executeSql(sql, [id, descripcion]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  
  createProducto(nombre: string, precio: number, descripcion: string) {
    return new Promise((resolve, reject) => {
      let sql = "insert into producto (nombre,precio,descripcion) values (?,?,?)";
      this.db.executeSql(sql, [nombre, precio, descripcion]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  deleteProducto(iddelproducto: number) {
    return new Promise((resolve, reject) => {
      let sql = "delete from producto where producto.idProducto=?";
      this.db.executeSql(sql,[iddelproducto]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  updProducto(iddelproducto: number,nombre:string,precio:number,descripcion:String) {
    return new Promise((resolve, reject) => {
      let sql = "update producto set precio=?,nombre=?,descripcion=? where producto.idProducto=?";
      this.db.executeSql(sql,[precio,nombre,descripcion,iddelproducto]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getallproductos(){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Producto",[]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idProducto: data.rows.item(i).idProducto,
              nombre: data.rows.item(i).nombre,
              precio: data.rows.item(i).precio,
              descripcion: data.rows.item(i).descripcion
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  getoneproducto(iddelproducto: number){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("select * from Producto where producto.idProducto=?",[iddelproducto]).then((data)=>{
        let arrayproductos=[];
        if(data.rows.length>0){
          for(var i =0; i<data.rows.length;i++){
            arrayproductos.push({
              idProducto: data.rows.item(i).idProducto,
              nombre: data.rows.item(i).nombre,
              precio: data.rows.item(i).precio,
              descripcion: data.rows.item(i).descripcion
            });
          }
        }
        resolve(arrayproductos);
      },(error)=>{
        reject(error);
      });
    });
  }
  

}
