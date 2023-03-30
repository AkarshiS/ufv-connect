/*
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  isTypePword: boolean = true;
  isLogin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { 
    this.initForm();
  }

  ngOnInit():void {
  }

  initForm(){
    this.form = new FormGroup({
      email: new FormControl('',
      {validators: [Validators.required, Validators.email]}
    ),
    password: new FormControl('',
    {validators: [Validators.required, Validators.minLength(8)]}
    ),
    });
  }
  onChange(){
    this.isTypePword = !this.isTypePword;
  }

  onSubmit() {
    if(!this.form.valid) return;
    console.log(this.form.value);

  }

  login(form) {
    //this.authService.login(form.value.email,form.value.password).then(data => {
      this.authService.login(form.value.email).then(data => {
      console.log(data);
      this.router.navigateByUrl('/')
      form.reset();
    })
  .catch(e=> {
    console.log(e);
    let msg: string = "Please try again.";
    if(e.code == 'auth/user-not-found') msg = 'email not found';
    else if(e.code == 'auth/wrong-password') msg = 'Please enter proper password.';
    this.showAlert(msg);
  });
}
async showAlert(msg) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: msg,
    buttons: ['OK'],
  });

  await alert.present();
  }

}
*/



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	credentials: FormGroup;

	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async register() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.register(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Registration failed', 'Please try again!');
		}
	}

  async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Login failed', 'Please try again!');
		}
	}

	async showAlert(header, message) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}
}


