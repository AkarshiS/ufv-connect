import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FormGroup } from '@angular/forms';
import { stringify } from 'querystring';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  credentials: FormGroup;
  Data: string;
  email = this.authService.getEmail();
  name = this.authService.getName();

  profile: any;
  profileName: any;

  @ViewChild('see_profile') modal: ModalController;
  open_see_profile = false;
  profileIMG: any;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    private db: AngularFirestore,
    private su: SignupPage

  ) { 
   
  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("Auth user", user);
      console.log("ID:", this.authService.getId());
      if(user){
        const result = this.db.doc(`/users/${this.authService.getId()}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe(profile => {
          console.log("profile: ", profile);
          this.profileName = profile['name'];
          this.profileIMG = profile['photo'];

        })
      }
    })
  }

  eventClick() {
    this.router.navigateByUrl('/event', { replaceUrl: true });
  }

  chatClick() {
    this.router.navigateByUrl('/chat', { replaceUrl: true });
  }

  onWillDismiss(event: any) {}
  cancel() {
    this.modal.dismiss();
    this.open_see_profile = false;
  }
  seeProfile(){
    this.open_see_profile = true;
    console.log("email: ",this.email)
    console.log("name: ", this.name)
  }

  // get email() {
	// 	return LoginPage.credentials.get('email');
	// }

  // async login() {
	// 	const user = await this.authService.login(this.credentials.value);
	// }
}
