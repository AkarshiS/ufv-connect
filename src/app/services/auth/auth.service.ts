/*
import { Injectable } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;

  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ) { }

  async login(email: string, password: string): Promise<any>{
    try{
      const response = await signInWithEmailAndPassword(this.fireAuth, email, password);
      console.log(response);
      if(response.user){
        this.setUserData(response.user.uid);
      }

    }catch(e){
      throw(e);
    }
  }

  getId(){
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }

  setUserData(uid) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max-min+1)+min);
  }

  async register(formValue){
    try{
      const registeredUser = await createUserWithEmailAndPassword(this.fireAuth, formValue.email, formValue.password);
      const data = {
        email: formValue.email,
        name: formValue.username,
        uid: registeredUser.user.uid,
        photo: 'https://i.pravatar.cc/' + this.randomIntFromInterval(200, 400)
      };
      //await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
      await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
      const userData = {
        id: registeredUser.user.uid
      };
      return userData;
    } catch(e){
      throw(e);
    }
  }

  async resetPassword(email: string){
    try{
      await sendPasswordResetEmail(this.fireAuth, email);
    } catch(e) {
      throw(e);
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      this._uid.next(null);
      return true;
    } catch(e) {
      throw(e);
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, user => {
        console.log('auth user: ', user);
        resolve(user)
      });
    });
  }

  async getUserData(id) {
   // return (await (this.apiService.collection('users').doc(id).get().toPromise())).data();

  const docSnap: any = await this.apiService.getDocById(`users/${id}`);
      if(docSnap?.exists()){
        return docSnap.data();
      } else{
        throw('This document does not exist');
      }
  }


} */

import { Injectable } from '@angular/core';
import {
  getAuth,
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
  user,
  onAuthStateChanged
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
  //currentUser: import("@angular/fire/auth").User;
  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;
	
  constructor(
    private auth: Auth,
    private apiService: ApiService) {}

  async login({ email, password }) {
		try {
			//const response = await signInWithEmailAndPassword(this.auth, email, password);
      const user = await signInWithEmailAndPassword(this.auth, email, password);
     // console.log(response);
      if(user.user){
        this.setUserData(user.user.uid);
      }
			return user;
		} catch (e) {
  		return null;
		}
	}


  randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max-min+1)+min);
  }

  getId(){
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }

  setUserData(uid) {
    this._uid.next(uid);
  }

	async register({ username, email, password }) {
		try {
			const registeredUser = await createUserWithEmailAndPassword(this.auth, email, password);
			console.log('registered user: ', registeredUser);
      const data = {
        email: email,
        name: username,
        uid:  registeredUser.user.uid,
       photo: 'https://i.pravatar.cc/' + this.randomIntFromInterval(200, 400)
      };
      await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
      const userData = {
        id: registeredUser.user.uid
      }
      return userData;
      //return user;
		} catch (e) {
			return e;
		}
	}

  async newEvent({Title, startTime, endTime}){
    const data = {
      start: startTime,
      end: endTime,
      title: Title,
    };
   // console.log('event data: ', data);
   await this.apiService.setDocument(`events/${Title}`, data);
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, user => {
        console.log('auth user: ', user);
        resolve(user)
      });
    });
  }

  async getUserData(id) {
    // return (await (this.apiService.collection('users').doc(id).get().toPromise())).data();
   const docSnap: any = await this.apiService.getDocById(`users/${id}`);
       if(docSnap?.exists()){
         return docSnap.data();
       } else{
         throw('This document does not exist');
       }
   }

	logout() {
		return signOut(this.auth);
	}


}
