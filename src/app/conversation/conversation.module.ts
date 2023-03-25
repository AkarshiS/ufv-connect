import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationPageRoutingModule } from './conversation-routing.module';

import { ConversationPage } from './conversation.page';
import { ChatBoxComponent } from '../components/chat-box/chat-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationPageRoutingModule
  ],
  declarations: [ConversationPage, ChatBoxComponent]
})
export class ConversationPageModule {}
