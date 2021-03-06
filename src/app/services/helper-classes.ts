// DASHBOARD
// Quick User Reference (name + email)
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
    // Always follow format HH:mm (12:42)
    public arrival: string;
    public departure: string;
    constructor(name: string, arrival: string, departure: string) {
        this.name = name;
        this.arrival = arrival;
        this.departure = departure;
    }
}
export class Address {
    address: string;
    position: Coordinate;
    constructor(address: string, lat: number, lng: number) {
        this.address = address;
        this.position = new Coordinate(lat, lng);
    }
}
export class Car {
    // TODO?: Number Plate & Color
    capacity: number;
    filled: number;
    description: string;
    // TODO: Replace price with rate
    price: number;
    constructor() {
        this.capacity = null;
        this.filled = null;
        this.description = '';
        this.price = null;
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
// For storing db related user data

export class UserData {
    chats: Array<String>;
    isDriver: boolean;
    status: string;
    schedule: Array<Day>;
    home: Address;
    // Driver specific
    car: Car;
    // rate: Rate;
    constructor(isDriver: boolean, home: Address, schedule: Array<Day>, car: Car) {
        this.isDriver = isDriver;
        this.home = home;
        this.schedule = schedule;
        // May default to null
        this.car = car;
        // Default Stuff
        this.chats = [];
        this.status = 'Hey there! I\'m using FAST CarPool.';
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
// UserLink + UserData
export class ViewUser extends UserData {
    public name: string;
    public email: string;
    constructor(userData: UserData, userLink: UserLink) {
        super(userData.isDriver, userData.home, userData.schedule, userData.car);
        this.name = userLink.name;
        this.email = userLink.email;
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

// Driver & Rider

class Vehicle {
    name: string;    // Details
    fare: number;
    filled: Array<Array<number>>;
    capacity: number;
    constructor() {
        this.filled = [[4, 4, 4, 4, 4], [4, 4, 4, 4, 4]];
        // for (let i = 0; i < 2; i++) {
        //     for (let j = 0; j < 5; j++) {
        //         this.filled[i][j] = 4;
        //     }
        // }
        this.capacity = 4;
    }
}

export class Driver {

    // name, section, batch registration details num etc
    // location
    // fare and stuff in a vehicle object
    name: string;
    timetable: Array<Array<number>>;
    flexibility: Array <number>; // abstracted from drivers class with relevant stuff only
    vehicle: Vehicle;
    matchScore: number;
    exactScore: number;
    dayScore: number;
    total: number;


    constructor(name: string, timetable: Array<Array<number>>, flexibility: Array<number>) {
        this.timetable = timetable;
        this.flexibility = flexibility;
        // for (let i = 0; i < 2; i++) {
        //     for (let j = 0; j < 5; j++) {
        //         this.timetable[i][j] = timetable[i][j];
        //     }
        //     this.flexibility[i] = flexibility[i];
        // }
        // Default
        this.name = name;
        this.matchScore = 0;
        this.exactScore = 0;
        this.dayScore = 0;
        this.vehicle = new Vehicle();
    }

    print(x: boolean) {
        console.log(`Driver Name: ${name}`);
        if (x) return;
        console.log(`${this.matchScore}`);
        console.log(`${this.exactScore}`);
        console.log(`${this.dayScore}`);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                console.log(`${this.timetable[i][j]}`);
            }
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                console.log(this.vehicle.filled[i][j]);
            }
        }

    }
    calculateTotalScore() {
        this.total = this.matchScore * 1000 + this.dayScore * 100 + this.exactScore;
    }
}

// Rider

export class Rider {
    // Name, section, batch registration details num location
    name: string;   // name given by parents
    driveMap: Array<Array <Array <Driver>>>; // 2D Array of vector of
                // drivers, each vector is for one trip
    timetable: Array<Array<number>>; // 2x5 array arrival & dept
    flexibility: Array<number>; // 0th arrival 1st dept
    trips: number;
    constructor(name: string, timetable: Array<Array<number>>, flexibility: Array<number>) {
        this.timetable = timetable;
        this.flexibility = flexibility;
        // 2.5.X
        this.driveMap = [[[], [], [], [], []], [[], [], [], [], []]];
        // for (let i = 0; i < 2; i++) {
        //     for (let j = 0; j < 5; j++) {
        //         this.timetable[i] = [];
        //         this.timetable[i][j] = timetable[i][j];
        //     }
        //     this.flexibility[i] = flexibility[i];
        // }
        this.name = name;
        this.trips = 0;
    }

    print() {
        console.log(`Rider Name: ${name}`);
        for (let i = 0; i < 5; i++) {
            // Day
            console.log(`DAY ${i + 1}`);
            for (let j = 0; j < 2; j++) {
                // Trip
                console.log(`TRIP ${j}`);
                const drs: Array<Driver> = this.driveMap[j][i];
                if (drs.length === 0 ) console.log(` No Driver! `);
                for (let k = 0; k < drs.length; k++) {
                    drs[k].print(true);
                }
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                console.log(`${this.timetable[i][j]} `);
            }
        }

    }
}
