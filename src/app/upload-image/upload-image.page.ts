import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
export interface imageData{
fileName: string;
filePath: string;
size: string;
//percentage: number;
}

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {

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
  
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage ,
    private router: Router,
    private loading: LoadingController,
    private authservice: AuthService
    ) { 
      this.isLoading = false;
      this.isLoaded = false;
      this.imageCollection = this.db.collection<imageData>('images');
      this.imagefile = this.imageCollection.valueChanges();
    }

  ngOnInit() {
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
        console.log("PATH: ", this.authservice.getId);
        const result = this.db.doc(`/users/${this.authservice.getId()}`);
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

  nextPage(){
    this.router.navigate(['home']);
  }

}
