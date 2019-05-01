// DASHBOARD
export class UserLink {
    public name: string;
    public email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
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
    public drivers: Array<UserLink>;
    public riders: Array<UserLink>;
    constructor(lat: number, lng: number, name = 'Unnamed') {
        super(lat, lng);
        this.name = name;
        this.drivers = [];
        this.riders = [];
    }

    toObject(): Object {
        // Drivers
        const drivers = [];
        this.drivers.forEach(driver => {
            drivers.push(driver);
        });
        // Riders
        const riders = [];
        this.riders.forEach(driver => {
            riders.push(driver);
        });
        return {
            name: this.name,
            lat: this.lat,
            lng: this.lng,
            drivers: drivers,
            riders: riders
        };
    }
}


// PROFILE
export class Day {
    public name: string;
    // TODO: Completely rewrite later to make this a time picker - do when we have our own time scheduler
    // ALSO keep in mind the returning User object
    public arrival: string;
    public departure: string;
    constructor(name: string, arrival: string, departure: string) {
        this.name = name;
        this.arrival = arrival;
        this.departure = departure;
    }
}
export class Car {
    // TODO?: Number Plate & Color
    capacity: number;
    filled: number;
    description: string;
    constructor() {
        this.capacity = null;
        this.filled = null;
        this.description = '';
    }
}
export class Rate {
    oneway: number;
    // daily: number;
    // weekly: number;
    // semester: number;

    constructor() {
        this.oneway = null;
        // this.daily = this.oneway * 2;
        // this.weekly = this.daily * 5;
        // this.semester = this.weekly * 16;
    }
}

// CHAT
export class Message {
    public content: string;
    public sender: number; // -1 for sample messages
    public status: string;
    public time: number;

    constructor (sender: number, content: string) {
        this.content = content;
        this.sender = sender;
        this.status = 'SENDING';
        this.time = Date.now();
    }
}

export class SampleMessage extends Message {

    public lastSender: string;
    constructor(lastSender: string, content: string) {
        super(-1, content);
        this.lastSender = lastSender;
    }
}

// TODO: Being repeated already UserLink
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

// REGISTRATION
export class User {
    chats: Array<String>;
    isDriver: boolean;
    status: string;
    schedule: Array<Day>;
    // Driver specific
    car: Car;
    rate: Rate;
    constructor() {
        this.chats = [];
        this.isDriver = false;
        this.status = 'Hey there! I\'m using FAST CarPool.';
        // Making default schedule
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.schedule = [];
        dayNames.forEach(day => {
            this.schedule.push(new Day(day, '08:00', '16:00'));
        });
        this.car = new Car;
        this.rate = new Rate;
    }

    toObject(): Object {
        // Convert Schedule
        const schedule = [];
        for (let i = 0; i < 5; i++) {
            const day = this.schedule[i];
            schedule[i] = {
                name: day.name,
                arrival: day.arrival,
                departure: day.departure
            };
        }
        // Convert Car
        const car = {
            capacity: this.car.capacity,
            filled: this.car.filled,
            description: this.car.description
        };
        // Convert rate
        const rate = {
            oneway: this.rate.oneway
        };
        // Convert User
        return {
            chats: this.chats,
            isDriver: this.isDriver,
            status: this.status,
            schedule: schedule,
            car: car,
            rate: rate
        };
    }
}

export class Users {
    drivers: Array<UserLink>;
    riders: Array<UserLink>;

    constructor() {
        this.drivers = [];
        this.riders = [];
    }
}


// VIEW
export class ViewUser extends User {
    public name: string;
    public email: string;
    constructor() {
        super();
        this.name = 'Loading';
        this.email = null;
    }
}

// THEME
export class Theme {
    // Default values
    primary = '#3880ff';
    secondary = '#0cd1e8';
    tertiary = '#7044ff';
    success = '#10dc60';
    warning = '#ffce00';
    danger = '#f04141';
    dark = '#222428';
    medium = '#989aa2';
    light = '#f4f5f8';

    setTheme(
        primary?: string, secondary?: string, tertiary?: string,
        success?: string, warning?: string, danger?: string,
        dark?: string, medium?: string, light?: string
        ) {
            this.primary = primary;
            this.secondary = secondary;
            this.tertiary = tertiary;
            this.success = success;
            this.warning = warning;
            this.danger = danger;
            this.dark = dark;
            this.medium = medium;
            this.light = light;
    }
}
