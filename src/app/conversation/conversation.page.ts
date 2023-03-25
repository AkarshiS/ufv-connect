import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

name: string = 'Sender';
message: string;
isLoading = false;
currentUserId =1;
chats = [
  {id:1, sender:1, message: 'hi'},
  {id:2, sender:2, message: 'hello '}
]

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {}

}
