import { Component, OnInit} from '@angular/core';
import { Message, Participant } from 'src/app/services/helper-classes';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  // Chat related
  id: string;
  // Message to send
  messageText: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute
  ) {
    this.messageText = '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Assign id
      this.id = params.get('id');
      // For seen-ing messages
      this.seenMessages();
      // For new messages
      this.cs.receivedMessage.subscribe(this.seenMessages);
    });
  }

  get chat() {
    if (this.id) {
      return this.cs.getChat(this.id);
    } else return null;
  }

  getParticipant(sender: number): Participant {
    return this.chat.participants[sender];
  }

  seenMessages() {
    if (this.chat) {
    // Get messages up till last seen
    const unseenMessages = [];
    for (let i = this.chat.messages.length - 1; i >= 0; i--) {
      // Stop if own message or seen message
      if (this.userIsSender(this.chat.messages[i])
      ||  this.chat.messages[i].status === 'SEEN')
        break;
      unseenMessages.push(this.chat.messages[i]);
    }
    this.cs.seenMessages(unseenMessages, this.chat);
    }
  }

  // getTime(message: Message): string {
  //   const date = new Date(message.time);
  //   let time: string;
  //   if (date.getMinutes() < 10)
  //     time = `${date.getHours()}:0${date.getMinutes()}, `;
  //   else
  //     time = `${date.getHours()}:${date.getMinutes()}, `;
  //   const now = new Date();
  //   // If today
  //   if (date.getDate() === now.getDate()
  //   && date.getMonth() === now.getMonth()
  //   && date.getFullYear() === now.getFullYear())
  //     time += 'Today';
  //   // If this year
  //   else if (date.getFullYear() === now.getFullYear())
  //     time += `${date.getDate()}/${date.getMonth()}`;
  //   else
  //     time += `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  //   return time;
  // }

  submit() {
    if (!this.messageText.trim()) {
      // TODO: Empty msg
      return;
    }

    this.cs.sendMessage(this.chat.id, this.messageText);

    // Reset
    this.messageText = '';
  }

  userIsSender(message: Message): boolean {
    return this.getParticipant(message.sender).email === this.cs.user.email;
  }

}
