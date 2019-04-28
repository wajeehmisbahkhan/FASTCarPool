import { Injectable, OnDestroy } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { firestore } from 'firebase/app';
import { User, UserLink, Users, Location, ViewUser } from './helper-classes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnDestroy {

  public users: Users = new Users;
  // User data - in 3 forms like i dont even
  public userData = new User;
  public userLink: UserLink;
  public viewUser = new ViewUser;

  // App data
  pickups: Array<Location>;

  // Live subscriptions
  subscriptions: Array<Subscription> = [];


  constructor(
    private db: AngularFirestore,
    private alertService: AlertService) { }


  // Specific Methods
  createNewUser(user: firebase.User) {
    this.alertService.load('Creating your account',
    // Add to users folder - reference by email users/email.get(property)
    this.setDoc(`users/${user.email}`, (new User).toObject()));

    // Add to riders list
    this.unionArray('app/users', 'riders', Object.assign({}, new UserLink(user.displayName, user.email)));
  }

  getUserData(email: string) {
    return new Promise(resolve => {
      const dataSubscription = this.db.doc(`users/${email}`).get().subscribe(doc => {
        // Copying all data
        this.userData.isDriver = doc.data().isDriver;
        this.userData.status = doc.data().status;
        this.userData.schedule = doc.data().schedule;
        this.userData.car = doc.data().car;
        this.userData.rate.oneway = doc.data().rate.oneway;
        // Chats
        this.userData.chats = doc.data().chats;
        dataSubscription.unsubscribe();
        resolve();
      });
    });
  }

  updateUserData(user: firebase.User, newUserData: User) {
    return this.alertService.load('Updating your profile...',
    // Resolving this promise will complete the updating phase
    new Promise(resolve => {
      this.updateDoc(`users/${user.email}`, newUserData).then(() => {
        // If driver changed
        if (this.userData.isDriver !== newUserData.isDriver) {
          if (newUserData.isDriver) {
            // Add to drivers and remove from riders
            this.unionArray('app/users', 'drivers', Object.assign({}, new UserLink(user.displayName, user.email)));
            this.arrayRemove('app/users', 'riders', Object.assign({}, new UserLink(user.displayName, user.email)));
            // Remove 'as rider' from all pickups
            const riderSub = this.getDoc('app/pickups').subscribe(doc => {
              riderSub.unsubscribe();
              const pickups: Array<Location> = doc.data().locations;
              pickups.forEach(pickup => {
                pickup.riders = pickup.riders.filter((rider) => rider.email !== user.email );
              });
              this.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(pickups))});
            });
          } else {
            // Remove from drivers and add to riders
            this.arrayRemove('app/users', 'drivers', Object.assign({}, new UserLink(user.displayName, user.email)));
            this.unionArray('app/users', 'riders', Object.assign({}, new UserLink(user.displayName, user.email)));
            // Remove 'as driver' from all pickups
            const driverSub = this.getDoc('app/pickups').subscribe(doc => {
              driverSub.unsubscribe();
              const pickups: Array<Location> = doc.data().locations;
              pickups.forEach(pickup => {
                pickup.drivers = pickup.drivers.filter((driver) => driver.email !== user.email );
              });
              this.updateDoc('app/pickups', { locations: JSON.parse(JSON.stringify(pickups))});
            });
          }
        }
        // Update user data
        this.userData = JSON.parse(JSON.stringify(newUserData));
        resolve();
      });
    })
    );
  }

  getUsers() {
    // Keep a live copy of all users in the database
    const liveSub = this.getLiveDoc('app/users').subscribe(doc => {
      this.users.drivers = doc.payload.data()['drivers'];
      this.users.riders = doc.payload.data()['riders'];
    });
    this.subscriptions.push(liveSub);
  }

  getUserView(user: UserLink) {
    this.alertService.load(`Loading ${user.name}'s Profile`,
    new Promise(resolve => {
        const userSub = this.getDoc(`users/${user.email}`).subscribe(doc => {
        userSub.unsubscribe();
        // Copy to view user
        this.viewUser.name = user.name;
        this.viewUser.email = user.email;
        this.viewUser.isDriver = doc.data().isDriver;
        this.viewUser.status = doc.data().status;
        this.viewUser.schedule = doc.data().schedule;
        this.viewUser.car = doc.data().car;
        this.viewUser.rate.oneway = doc.data().rate.oneway;
        resolve();
      });
    })
    );
  }

  // Dashboard
  getPickups() {
    const liveSub = this.getLiveDoc('app/pickups').subscribe(pickups => {
      this.pickups = pickups.payload.data()['locations'];
    });
    this.subscriptions.push(liveSub);
  }

  addDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you pass by ${pickup.name} and can pickup riders from here.\n
    Note: This will allow riders to contact you through this pickup point.`, () => {
      // Add locally
      pickup.drivers.push(this.userLink);
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Adding you as a driver...',
      this.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }


  removeDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of drivers for ${pickup.name}?`, () => {
      // Remove locally
      pickup.drivers = pickup.drivers.filter( (driver) => driver.email !== this.userLink.email );
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Removing from drivers list',
      this.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }

  addRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you can make it to ${pickup.name}.\n
    Note: This will allow drivers passing by to contact you through this pickup point.`, () => {
      // Add locally
      pickup.riders.push(this.userLink);
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Adding as rider...',
      this.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }

  // TODO: Being repeated in database OPTIMIZE
  removeRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of riders for ${pickup.name}?`, () => {
      // Remove locally
      pickup.riders = pickup.riders.filter( (rider) => rider.email !== this.userLink.email );
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Removing from riders list',
      this.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }




  // General Methods
  getCollection(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection(path).get(options);
  }

  createDoc(path: string, data: Object) {
    return this.db.collection(path).add(data);
  }

  getDoc(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.DocumentSnapshot> {
    return this.db.doc(path).get(options);
  }

  getLiveDoc(path: string) {
    return this.db.doc(path).snapshotChanges();
  }

  setDoc(path: string, data: Object, options?: firebase.firestore.SetOptions) {
    return this.db.doc(path).set(data, options);
  }

  updateDoc(path: string, data: Object) {
    return this.db.doc(path).update(data);
  }

  unionArray(path: string, field: string, element: any) {
    const updated = {};
    updated[field] = firestore.FieldValue.arrayUnion(element);
    return this.db.doc(path).update(updated);
  }

  arrayRemove(path: string, field: string, element: any) {
    const updated = {};
    updated[field] = firestore.FieldValue.arrayRemove(element);
    this.db.doc(path).update(updated);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription);
      subscription.unsubscribe();
    });
  }

}
