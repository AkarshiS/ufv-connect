import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { ModalController, Platform } from '@ionic/angular';
import { indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('log_out') modal: ModalController;

  open_log_out = false;

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private authService: AuthService,
		private router: Router,
    
  ){
    
  }



  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

  logOut(){
    this.open_log_out = true;
  }

  cancel() {
    this.modal.dismiss();
    this.open_log_out = false;
  }

  onWillDismiss(event: any) {}


}
