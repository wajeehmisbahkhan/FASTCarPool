export class Message {
    public content: string;
    // TODO: Make sender a user
    public sender: number; // -1 for sample messages
    public status: string;
    // TODO: Sent time

    constructor (sender: number, content: string) {
        this.content = content;
        this.sender = sender;
        this.status = 'SENDING';
    }
}

export class SampleMessage extends Message {

    public lastSender: string;
    constructor(lastSender: string, content: string) {
        super(-1, content);
        this.lastSender = lastSender;
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
    public id: string; // For document id

    public messages: Array <Message>;
    public participants: Array <Participant>;
    public title: string;

    constructor (id: string, messages?: Array <Message>, participants?: Array <Participant>, title?: string) {
        this.id = id;
        this.messages = messages;
        this.participants = participants;
        this.title = title;
    }

}

export class Coordinate {
    public lng: number;
    public lat: number;

    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }
}

export class Location extends Coordinate {
    public name: string;
    constructor(lat: number, lng: number, name = 'Unnamed') {
        super(lat, lng);
        this.name = name;
    }
}
