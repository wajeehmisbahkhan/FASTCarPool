import { Injectable, OnDestroy } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { firestore } from 'firebase/app';
import { UserData, UserLink, Users, Location, ViewUser } from './helper-classes';
import { AlertService } from './alert.service';
import { ThemeService } from './theme.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnDestroy {

  public users: Users = new Users;
  // User data - in 3 forms like i dont even
  public userData: UserData;
  public userLink: UserLink;
  public viewUser: ViewUser;

  // App data
  pickups: Array<Location>;
  usable: boolean; // Set to true by app at init if local version matches firebase version

  // Live subscriptions
  subscriptions: Array<Subscription> = [];

  // Easy reference
  fast: Location;
  outdatedError = {
    code: 405,
    message: 'Your app version seems to be out of date. Make sure you have the latest version.'
  };

  constructor(
    private db: AngularFirestore,
    public theme: ThemeService,
    private alertService: AlertService,
    private storage: Storage
    ) {
      this.usable = true;
      this.fast = new Location(24.8568991, 67.2646838, 'FAST NUCES');
    }


  // Specific Methods

  // Registration
  createNewUser(userData: UserData, userLink: UserLink) {
    return this.alertService.load('Creating your account...', new Promise(resolve => {
      this.userData = userData;
      // Set theme to rider
      this.theme.setTheme(userData.isDriver);
      // Add to users folder - reference by email users/email.get(property)
      this.setDoc(`users/${userLink.email}`, this.userData).then(() => {
        // Save default user data locally
        this.storage.set('userData', JSON.stringify(userData));
        // Add to riders list
        this.userLink = userLink;
        this.unionArray('app/users', 'riders', this.userLink);
        // Add to FAST location by default
        // FAST will always be at index 0 in the db and locally
        this.addRider(this.fast, 0);
        resolve();
      });
    })) // TODO: Decide where to display errors
    .catch(this.alertService.error.bind(this.alertService));
  }

  // Dashboard
  getUserData(email: string) {
    if (this.usable)
    return new Promise(async (resolve, reject) => {
      const dataSubscription = this.db.doc(`users/${email}`).get().subscribe(doc => {
        // If data does not exist - first time registration
        if (!doc.data()) {
          reject({
            code: 601,
            message: 'Registration is incomplete'
          });
          return;
        }
        // Copying all data
        this.userData = new UserData
        (doc.data().isDriver, doc.data().home,
          doc.data().schedule, doc.data().car);
        // Status
        this.userData.status = doc.data().status;
        // this.userData.rate.oneway = doc.data().rate.oneway;
        // Chats
        this.userData.chats = doc.data().chats;
        // this.userData.rate.oneway = doc.data().rate.oneway;
        // Chats
        this.userData.chats = doc.data().chats;
        // Set theme according to user data
        this.theme.setTheme(this.userData.isDriver);
        dataSubscription.unsubscribe();
        // Store all locally
        this.storage.set('userData', JSON.stringify(this.userData));
        resolve();
      }, reject);
    });
    throw this.outdatedError;
  }

  getLocalUserData() {
    return this.storage.get('userData');
  }

  getPickups() {
    return new Promise((resolve, reject) => {
      this.getDoc('app/pickups').subscribe(pickups => {
        this.pickups = pickups.data()['locations'];
        resolve();
      }, reject);
    });
  }

  getLivePickups(): Observable<Array<Location>> {
    return new Observable(observer => {
      if (this.usable) {
        const liveSub = this.getLiveDoc('app/pickups').subscribe(pickups => {
          this.pickups = pickups.payload.data()['locations'];
          observer.next(this.pickups);
        });
        this.subscriptions.push(liveSub);
    } else
      observer.error(this.outdatedError);
    });
  }

  addDriver(pickup: Location, index: number) {
    // Add locally
    if (this.usable) {
      pickup.drivers.push(this.userLink);
      this.pickups[index] = pickup;
    }
    // Update in database
    return this.updateDoc('app/pickups', {locations: this.pickups});
  }

  removeDriver(pickup: Location, index: number) {
    // Remove locally
    if (this.usable) {
      pickup.drivers = pickup.drivers.filter( driver => driver.email !== this.userLink.email );
      this.pickups[index] = pickup;
    }
    // Update in database
    return this.updateDoc('app/pickups', {locations: this.pickups});
  }

  addRider(pickup: Location, index: number) {
    // Add locally
    if (this.usable) {
      pickup.riders.push(this.userLink);
      this.pickups[index] = pickup;
    }
    // Update in database
    return this.updateDoc('app/pickups', {locations: this.pickups});
  }

  removeRider(pickup: Location, index: number) {
      // Remove locally
      if (this.usable) {
        pickup.riders = pickup.riders.filter( rider => rider.email !== this.userLink.email );
        this.pickups[index] = pickup;
      }
      // Update in database
      return this.updateDoc('app/pickups', {locations: this.pickups});
  }
  // Profile
  updateUserData(newUserData: UserData) {
    return this.alertService.load('Updating your profile...',
    // Resolving this promise will complete the updating phase
    new Promise((resolve, reject) => {
      this.updateDoc(`users/${this.userLink.email}`, newUserData).then(() => {
        // If driver changed
        if (this.userData.isDriver !== newUserData.isDriver) {
          // Set theme according to new user data
          this.theme.setTheme(newUserData.isDriver);
          if (newUserData.isDriver) {
            // Add to drivers and remove from riders
            this.unionArray('app/users', 'drivers', this.userLink).catch(reject);
            this.arrayRemove('app/users', 'riders', this.userLink).catch(reject);
            // Remove 'as rider' from all pickups
            const riderSub = this.getDoc('app/pickups').subscribe(doc => {
              riderSub.unsubscribe();
              const pickups: Array<Location> = doc.data().locations;
              pickups.forEach(pickup => {
                pickup.riders = pickup.riders.filter((rider) => rider.email !== this.userLink.email );
              });
              this.updateDoc('app/pickups', {locations: pickups});
              // Add to FAST as driver by default
              this.addDriver(this.fast, 0);
            });
          } else {
            // Remove from drivers and add to riders
            this.arrayRemove('app/users', 'drivers', this.userLink);
            this.unionArray('app/users', 'riders', this.userLink);
            // Remove 'as driver' from all pickups
            const driverSub = this.getDoc('app/pickups').subscribe(doc => {
              driverSub.unsubscribe();
              const pickups: Array<Location> = doc.data().locations;
              pickups.forEach(pickup => {
                pickup.drivers = pickup.drivers.filter((driver) => driver.email !== this.userLink.email );
              });
              this.updateDoc('app/pickups', { locations: pickups});
              // Add to FAST as rider by default
              this.addRider(this.fast, 0);
            });
          }
        }
        // Update user data - deep copy
        this.userData = JSON.parse(JSON.stringify(newUserData));
        // Set locally
        this.storage.set('userData', JSON.stringify(this.userData));
        resolve();
      }).catch(reject);
    })
    .then(this.alertService.notice.bind(this.alertService, 'Profile updated Successfully'))
    .catch(this.alertService.error.bind(this.alertService))
    );
  }

  // View
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
        // this.viewUser.rate.oneway = doc.data().rate.oneway;
        resolve();
      });
    })
    );
  }

  // General Methods
  getCollection(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.QuerySnapshot> {
    if (this.usable)
      return this.db.collection(path).get(options);
    throw this.outdatedError;
  }

  createDoc(path: string, data: Object) {
    if (this.usable)
      return this.db.collection(path).add(data);
    throw this.outdatedError;
  }

  getDoc(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.DocumentSnapshot> {
    if (this.usable)
      return this.db.doc(path).get(options);
    throw this.outdatedError;
  }

  getLiveDoc(path: string) {
    if (this.usable)
      return this.db.doc(path).snapshotChanges();
    throw this.outdatedError;
  }

  setDoc(path: string, data: Object, options?: firebase.firestore.SetOptions) {
    if (this.usable)
      return this.db.doc(path).set(JSON.parse(JSON.stringify(data)), options);
      throw this.outdatedError;
  }

  updateDoc(path: string, data: Object) {
    if (this.usable)
      return this.db.doc(path).update(JSON.parse(JSON.stringify(data)));
    throw this.outdatedError;
  }

  unionArray(path: string, field: string, element: any) {
    const updated = {};
    updated[field] = firestore.FieldValue.arrayUnion(JSON.parse(JSON.stringify(element)));
    if (this.usable)
      return this.db.doc(path).update(updated);
    throw this.outdatedError;
  }

  arrayRemove(path: string, field: string, element: any) {
    const updated = {};
    updated[field] = firestore.FieldValue.arrayRemove(element);
    if (this.usable)
      return this.db.doc(path).update(updated);
    throw this.outdatedError;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
