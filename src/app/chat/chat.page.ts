import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;
  segment = 'chats';
  open_new_chat = false;
  users = [
    {id: 1, name: 'Test One', photo: 'https://i.pravatar.cc/385'},
    {id: 2, name: 'Test Two', photo: 'https://i.pravatar.cc/325'}
  ];
  chatRooms = [
    {id: 1, name: 'Test One', photo: 'https://i.pravatar.cc/385'},
    {id: 2, name: 'Test Two', photo: 'https://i.pravatar.cc/325'}
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.popover.dismiss();
  }

  onSegmentChanged(event: any) {
    console.log(event);
  }

  newChat(){
    this.open_new_chat = true;
  }

  onWillDismiss(event: any) {}

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  startChat(item){

  }

  getChat(item){
    this.router.navigate(['/','chat','chats',item?.id])
  }
}