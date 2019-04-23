import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Participant } from 'src/app/services/helper-classes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  messageText: string;

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private cs: ChatService,
    private router: Router
  ) { }

  ngOnInit() {}

  sendMessage() {
    const sender = new Participant(this.authService.user.email, this.authService.user.displayName);
    const receiver = new Participant(this.db.viewUser.email, this.db.viewUser.name);
    // Create chat and redirect to it
    this.cs.createChat(sender, receiver, this.messageText).then(id => this.router.navigate(['members', 'messages', 'chat', id]));
  }

}
