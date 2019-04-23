import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';
import { User, UserLink, Users, Location, ViewUser } from './helper-classes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public users: Users = new Users;
  public userData = new User;
  public viewUser = new ViewUser;

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
    return this.alertService.load('Fetching your data...',
    // Resolving this promise will complete the loading phase
    new Promise(resolve => {
      this.db.doc(`users/${email}`).get().subscribe(doc => {
        // Copying all data
        this.userData.isDriver = doc.data().isDriver;
        this.userData.status = doc.data().status;
        this.userData.schedule = doc.data().schedule;
        this.userData.car = doc.data().car;
        this.userData.rate.oneway = doc.data().rate.oneway;
        // Chats
        this.userData.chats = doc.data().chats;
        resolve(this.userData);
      });
    })
    );
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
            this.getDoc('app/pickups').subscribe(doc => {
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
            this.getDoc('app/pickups').subscribe(doc => {
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
    this.getLiveDoc('app/users').subscribe(doc => {
      this.users.drivers = doc.payload.data()['drivers'];
      this.users.riders = doc.payload.data()['riders'];
    });
  }

  getUserView(user: UserLink) {
    this.alertService.load(`Loading ${user.name}'s Profile`,
    new Promise(resolve =>
      this.getDoc(`users/${user.email}`).subscribe(doc => {
        // Copy to view user
        this.viewUser.name = user.name;
        this.viewUser.email = user.email;
        this.viewUser.isDriver = doc.data().isDriver;
        this.viewUser.status = doc.data().status;
        this.viewUser.schedule = doc.data().schedule;
        this.viewUser.car = doc.data().car;
        this.viewUser.rate.oneway = doc.data().rate.oneway;
        resolve();
      })
    )
    );
  }


  // General Methods
  getCollection(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection(path).get(options);
  }

  createDoc(data: Object) {
    return this.db.collection('chats').add(data);
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
    this.db.doc(path).update(updated);
  }

  arrayRemove(path: string, field: string, element: any) {
    const updated = {};
    updated[field] = firestore.FieldValue.arrayRemove(element);
    this.db.doc(path).update(updated);
  }

}
