import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { getApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Capacitor } from '@capacitor/core';
import { indexedDBLocalPersistence, initializeAuth } from '@firebase/auth';
//import { AngularFireModule } from '@angular/fire'

@NgModule({
  declarations: [AppComponent],
  imports: [
    FirestoreModule,
    AngularFirestoreModule,
    //CalendarModule,
    AngularFireModule,
    //NgCalendarModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, FormsModule, ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
     /*{
      if (Capacitor.isNativePlatform()){
        return initializeAuth(getApp(),{
          persistence: indexedDBLocalPersistence
        })
      } else {
        return getAuth()
      }
    }) */ 
    provideFirestore(() => getFirestore())
  ],
 
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
