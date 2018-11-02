import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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
        this.isOpen = true;
        console.log('base de datos creada corretamente');
      }).catch((error) => {
        console.log(error);
      })
    }
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
