import { Component, OnInit } from '@angular/core';
//import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

/*
yourImageDataURL: any;
  constructor() { }

  ngOnInit() {
  }
*/
ngOnInit(){

}
/*
private file: File;

constructor(private http: HttpClient){}

onFileChange(fileChangeEvent : any){
  this.file = fileChangeEvent.target.files[0];
}

async submitForm(){
  let formData = new FormData();
  formData.append("photo",this.file,this.file.name);

  this.http.post("http://localhost:3000/upload",formData).subscribe((response) => {
  console.log(response);
});
} */

}
