import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { Participant, Chat, Message } from 'src/app/services/helper-classes';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(
    private router: Router,
    public cs: ChatService
    ) { }

  ngOnInit() { }

  emptyInbox() {
    return this.cs.chatList.length === 0;
  }

  getLastSender(sender: number, participants: Array<Participant>): string {
    let lastSender: string;
    // If sender is user
    if (participants[sender].email === this.cs.user.email)
      lastSender = 'You';
    else
      // Convert email into name - loop through all participants for match
      participants.forEach(participant => {
        if (participants[sender].email === participant.email) {
          lastSender = participant.name;
        }
      });
    return lastSender;
  }

  getTime(message: Message): string {
    const date = new Date(message.time);
    let time = '';
    const now = new Date();
    // If today
    if (date.getDate() === now.getDate()
    && date.getMonth() === now.getMonth()
    && date.getFullYear() === now.getFullYear())
      if (date.getMinutes() < 10)
        time += `${date.getHours()}:0${date.getMinutes()}`;
      else
        time += `${date.getHours()}:${date.getMinutes()}`;
    // If this year
    else if (date.getFullYear() === now.getFullYear())
      time += `${date.getDate()}/${date.getMonth()}`;
    else
      time += `${date.getFullYear()}`;
    return time;
  }

  // TODO: Get number of unread messages
  unreadMessages(): string {
    return null;
  }

  getSortedChats(): Array<Chat> {
    return this.cs.chats.sort((a, b) => {
      // Sort by last time for last sent message
      return a.messages[a.messages.length - 1].time
           - b.messages[b.messages.length - 1].time;
    }) // Reverse
    .reverse();
  }

  goToChat(e) {
    const id = e.currentTarget.attributes['data-chat-id'].value;
    this.router.navigate(['members', 'messages', 'chat', id]);
  }

}
