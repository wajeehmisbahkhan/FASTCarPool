import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Participant } from 'src/app/services/helper-classes';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  user: firebase.User;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public cs: ChatService
    ) {
      this.user = authService.user;
    }

  ngOnInit() { }

  emptyInbox() {
    return this.cs.chatList.length === 0;
  }
  
  getLastSender(sender: number, participants: Array<Participant>): string {
    let lastSender: string;
    // If sender is user
    if (participants[sender].email === this.user.email)
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

  goToChat(e) {
    const id = e.currentTarget.attributes['data-chat-id'].value;
    this.router.navigate(['members', 'messages', 'chat', id]);
  }

}
