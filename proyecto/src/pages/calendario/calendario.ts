import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
  eventSource=[];
  selectedDate=new Date();
  viewTitle:string;

  calendar={
    mode:'month',
    currentDate:this.selectedDate,
    locale:'en-GB',
  }



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }
  onviewtitlechanged(title){
    this.viewTitle=title;
  }

}
