import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { stringify } from 'querystring';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
//import { imageData } from '../upload-image/upload-image.page';
export interface imageData{
  fileName: string;
  filePath: string;
  size: string;
  //percentage: number;
  }

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


  fileName: string;
  fileSize: string;
  isLoading: boolean;
  isLoaded: boolean;
  imageUpload: AngularFireUploadTask;
  imagefile: Observable<imageData[]>;
private imageCollection: AngularFirestoreCollection<imageData>;   
  percentage: Observable<number>;
  snapshot: Observable<unknown>;
  FileImageUpload: Observable<any>;

  @ViewChild('see_profile') modal: ModalController;
  open_see_profile = false;
  profileIMG: any;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    private db: AngularFirestore,
    private su: SignupPage,
    private storage: AngularFireStorage ,

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



  async uploadImageFire(event){

    // const load = await this.loading.create({
     //  spinner: 'crescent',
     //});
    // load.present();
 
     const file = event.target.files;
     console.log(file);
     var fileName = file[0];
     console.log(fileName);
     
     if(fileName.type.split('/')[0] !=="image" ){
       console.error("not image");
       return;
     }
    // this.isLoading = true;
    // this.isLoaded=false;
 
     const path= `images/${new Date().getTime()}_${fileName.name}`;
     var fileRef = this.storage.ref(path);
     
     this.imageUpload = this.storage.upload(path,fileName);
     console.log("image uploaded to firebase storage");
    // this.loading.dismiss();
     
     this.percentage = this.imageUpload.percentageChanges();
     
     this.imageUpload.then( res=>{
       var imagefile = res.task.snapshot.ref.getDownloadURL();
       imagefile.then( downloadableUrl =>{
         console.log("URL", downloadableUrl);
         console.log("PATH: ", this.authService.getId);
         const result = this.db.doc(`/users/${this.authService.getId()}`);
         result.update({
           photo: downloadableUrl
         })
       })
     })
     
   /*  = this.imageUpload.snapshotChanges().pipe(
       finalize( ()=>{
         this.FileImageUpload = fileRef.getDownloadURL();
         this.FileImageUpload.subscribe( response=>{
           this.addImageToDB({
             fileName: fileName.name,
             filePath: response,
             size: this.fileSize
           })
           this.isLoading = false;
           this.isLoaded=true;
 
         })
       })
     )*/
   }
}
