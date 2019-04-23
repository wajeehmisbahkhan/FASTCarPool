import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessagesPage } from './messages.page';
import { ChatComponent } from './chat/chat.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  },
  {
    path: 'chat/:id',
    component: ChatComponent
  },
  {
    path: 'new',
    component: NewComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessagesPage, ChatComponent, NewComponent]
})
export class MessagesPageModule {}
