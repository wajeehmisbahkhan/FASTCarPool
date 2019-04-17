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