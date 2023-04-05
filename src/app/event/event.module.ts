import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { NgCalendarModule } from 'ionic2-calendar';
//import { CalendarModule } from 'ion2-calendar';
//import { CalModalPage } from '../cal-modal/cal-modal.page';
//import { CalModalPageModule } from '../cal-modal/cal-modal.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule,
    NgCalendarModule,
  //  CalendarModule,
   // CalModalPageModule,
    ReactiveFormsModule
  ],
  declarations: [EventPage]
})
export class EventPageModule {}
