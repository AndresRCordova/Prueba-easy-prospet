
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DatabaseServiceProvider {
  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    //Crear La base de datos o cargarla si exitste
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'easyBD.bd',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;

          this.createTables().then(() => {
            //comunicar que esta lista
            this.dbReady.next(true);
          });
        })
    });
  }

  private createTables() {
    return this.database.executeSql('Query SQL de create tables', []).then(() => {
      return this.database.executeSql('Otro query sql de crate',[])
    }).catch((err) => console.log("error detected creating tables", err));
  }

  private isReady() { 
    return new Promise((resolve,reject) =>{
      //if dbready is true,resolve
      if(this.dbReady.getValue()){
        resolve();
      }
      //si es falso esperar hasta que este listo
      else{
        this.dbReady.subscribe((ready)=>{
          if(ready){
            resolve();
          }
        });
      }
    })
  }

  //metodos CRUD
  getlists() { }
  addList(name: string) { }
  getList(id: number) { }
  deletelist(id: number) { }

  getTodosFromList(list) { }


}
