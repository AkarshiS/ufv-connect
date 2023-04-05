import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { CalendarComponent, CalendarMode  } from 'ionic2-calendar';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Firestore } from '@angular/fire/firestore';
//import { Firestore } from 'firebase/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { threadId } from 'worker_threads';
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  providers: [NavParams]
})
//export class EventPage implements OnInit { 
  export class EventPage{

  @ViewChild('new_event') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;

credentials: FormGroup;
open_new_event = false;
eventSource = [];
isToday: boolean;
selectedDay = new Date();

NewEvent = {
  title:'',
  startTime: '',
  endTime:'',
};

minDate = new Date().toISOString();

calendar: any = {
  // mode: 'month',
  mode: 'month',// as CalendarMode,
   currentDate: new Date(),
 };

constructor(
  public navCtrl: NavController,
  private db: AngularFirestore,
  ) { 

    this.db.collection(`events`).snapshotChanges().subscribe((colSnap) => {
      this.eventSource = [];
      colSnap.forEach((snap) => {
        const event: any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        console.log('event startTime:' + event.startTime);
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
      });
    });
  }
  today() {
    this.calendar.currentDate = new Date();
  }

  onCurrentDateChanged(event: Date) {
    console.log("current date change: " + event);
  }

// ngOnInit() {
//   this.resetEvent();
//   }


  addEvent() {
    //const start = this.selectedDate;//this.NewEvent.startTime;//this.NewEvent.startTime;// new Date(this.NewEvent.startTime);//this.NewEvent.startTime; //
    const start = this.NewEvent.startTime;
    const end = this.NewEvent.endTime;//this.NewEvent.endTime;//this.NewEvent.endTime;//new Date(this.NewEvent.endTime);//this.NewEvent.endTime; //
    //end.setMinutes(end.getMinutes() + 60);

    // event object created to include semi-random title
    const event = {
      title: this.NewEvent.title,//"Event #" + start.getMinutes(),this.NewEvent.title,
      startTime: new Date(start),//this.NewEvent.startTime,
      endTime: new Date(end),//this.NewEvent.endTime,
      allDay: false,
    };
    console.log(event);

    this.db.collection("events").add(event);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  
 theTitle: string ="";
// theStart: string ="";
// theEnd: string ="";
currentMonth: string;
// allEvents = [];

viewTitle: string;
date: string;
type: 'string';
selectedDate = new Date();

@ViewChild(CalendarComponent) myCal: CalendarComponent;

myData = [
  {
    title: "test",
 //   description: "test description",
    startTime: new Date(2023, 4,4,4,4,4),
    endTime: new Date(2023,4,4,4,4,4)
  }
]

// onViewTitleChanged(title: string){
//   this.currentMonth = title;
// }

newEvent(){
  this.open_new_event = true;
}

onWillDismiss(event: any) {}

cancel() {
  this.modal.dismiss();
  this.open_new_event = false;
}


addNewEvent(){
  var events = [];
  let start = this.selectedDate;
  let end = this.selectedDate;
  end.setMinutes(end.getMinutes()+60);
 // let startDay = this.selectedDate;
 let event = {
  //title:'Event # - ' +start.getMinutes(),
  title: this.theTitle,
  startTime: start,     //this.theStart,
  endTime:  end,    //this.theEnd,
  allDay: false,
};
 events.push(event);
 //this.theEvent.push(event);
  
  this.eventSource = events;
 //this.eventSource.push(event);
  console.log(this.eventSource);  
  //this.db.collection(`events`).add(event);
  
 // this.apiService.setDocument(`events/${event.title}`, event);
  }

/*createRandomEvents() {
  var events=[];
  for(var i=0;i<50;i+=1){
    var date=new Date();
    var eventType=Math.floor(Math.random()*2);
    var startDay=Math.floor(Math.random()*90)-45;
    var endDay=Math.floor(Math.random()*2)+startDay;
    var startTime;
    var endTime;
    if(eventType===0){
      startTime=new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate() +startDay
        )
      );
      if(endDay===startDay){
        endDay+=1;
      }
      endTime = new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate()+endDay
        )
      );
      events.push({
        title: 'All Day - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: true,
      });
    } else {
      var startMinute = Math.floor(Math.random()*24*60);
      var endMinute = Math.floor(Math.random()*180);+startMinute;
      startTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()+startDay,
        0,
        date.getMinutes()+startMinute
      );
      endTime=new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + endDay,
        0,
        date.getMinutes()+endMinute
      );
      events.push({
        title: 'Event - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: false,
      });
    }
  }
  this.eventSource = events;
 // this.router.navigate(['/','event']);
} */

next() {
  this.myCal.slideNext();
}
back() {
  this.myCal.slidePrev();
}

 onViewTitleChanged(title) {
   this.viewTitle = title;
 }

removeEvents() {
  this.eventSource = [];
}

optionsMulti: CalendarComponentOptions = {
  pickMode: 'multi'
};
dateRange: { from: string; to: string; };

  
optionsRange: CalendarComponentOptions = {
   pickMode: 'range'
};

onChange($event) {
  console.log($event);
}

onTimeSelected(ev){
  console.log('Selected Time:' + ev.selectedTime+', hasEvents ' +
  (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ', +ev.disabled);
  this.selectedDate = ev.selectedTime; 
  console.log(this.selectedDate);
}

/*
onEventSelected(event){
  console.log('Event selected: ' + event.startTime+'-'+event.endTime+','+event.title);
} */
/*
onCurrentDateChanged(event: Date){
  console.log('current date change: ' + event);
}*/

onRangeChanged(ev){
  console.log('range changed: startTime: ' + ev.startTime + ', endTime ' + ev.endTime);
}


} 


