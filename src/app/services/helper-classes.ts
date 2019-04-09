export class Message {
    public content: string;
    public sender: string;
    public status: string;

    constructor (sender: string, content: string) {
        this.content = content;
        this.sender = sender;
        this.status = 'SENDING';
    }
}

export class Participant {
    public email: string;
    public name: string;

    constructor (email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}

export class Chat {
    public messages: Array <Message>;
    public participants: Array <Participant>;

    constructor (messages: Array <Message> , participants: Array <Participant>) {
        this.messages = messages;
        this.participants = participants;
    }

}