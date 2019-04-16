import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessagesPage } from './messages.page';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessagesPage, ChatComponent]
})
export class MessagesPageModule {}
