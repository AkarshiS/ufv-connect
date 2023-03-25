import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';
import { ConversationPage } from '../conversation/conversation.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  },
  {
    path: 'chats/: id',
   // loadChildren: () => import('./chat.module').then( m => m.ChatPageModule)
   component: ConversationPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
