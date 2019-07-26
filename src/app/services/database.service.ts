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
        this.userLink = userLink;
        // Add to users
        if (this.userData.isDriver) {
          this.arrayUnion('app/users', 'drivers', this.userLink);
          // Add to FAST location by default
          this.addDriver(this.fast);
        } else {
          this.arrayUnion('app/users', 'riders', this.userLink);
          // Add to FAST location by default
          this.addRider(this.fast);
        }
        resolve();
      });
    })) // TODO: Decide where to display errors
    .catch(this.alertService.error.bind(this.alertService));
  }

  // Dashboard
  getUserData(email: string) {
    if (this.usable)
    return new Promise(async (resolve, reject) => {
      this.getLiveDoc(`users/${email}`).subscribe(doc => {
        // If data does not exist - first time registration
        if (!doc.payload.data()) {
          reject({
            code: 601,
            message: 'Registration is incomplete'
          });
          return;
        }
        // Copying all data
        this.userData = new UserData
        (doc.payload.data()['isDriver'], doc.payload.data()['home'],
          doc.payload.data()['schedule'], doc.payload.data()['car']);
        // Status
        this.userData.status = doc.payload.data()['status'];
        // this.userData.rate.oneway = doc.data().rate.oneway;
        // Chats
        this.userData.chats = doc.payload.data()['chats'];
        // Set theme according to user data
        this.theme.setTheme(this.userData.isDriver);
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

  loadPickups() {
    return new Promise(async (resolve, reject) => {
      try {
        const pickups = await this.getDoc('app/pickups');
        this.pickups = pickups.data()['locations'];
        // For quick reference
        this.fast = this.pickups[0];
        resolve();
      } catch (err) { reject(err); }
    });
  }

  loadLivePickups() {
    return new Promise((resolve, reject) => {
      if (this.usable) {
        const liveSub = this.getLiveDoc('app/pickups').subscribe(pickups => {
          this.pickups = pickups.payload.data()['locations'];
          // For quick reference
          this.fast = this.pickups[0];
          resolve();
        });
        this.subscriptions.push(liveSub);
    } else
      reject(this.outdatedError);
    });
  }

  addDriver(pickup: Location) {
    // Add locally
    if (this.usable) {
      pickup.drivers.push(this.userLink);
    }
    // Update in database
    return this.updateDoc('app/pickups', {locations: this.pickups});
  }

  removeDriver(pickup: Location) {
    // Remove locally
    if (this.usable) {
      pickup.drivers = pickup.drivers.filter( driver => driver.email !== this.userLink.email );
    }
    // Update in database
    return this.updateDoc('app/pickups', {locations: this.pickups});
  }

  addRider(pickup: Location) {
    // Add locally
    if (this.usable) {
      pickup.riders.push(this.userLink);
    }
    // Update in database
    return this.updateDoc('app/pickups', {locations: this.pickups});
  }

  removeRider(pickup: Location) {
      // Remove locally
      if (this.usable) {
        pickup.riders = pickup.riders.filter( rider => rider.email !== this.userLink.email );
      }
      // Update in database
      return this.updateDoc('app/pickups', {locations: this.pickups});
  }
  // Profile
  updateUserData(newUserData: UserData) {
    return this.alertService.load('Updating your profile...',
    // Resolving this promise will complete the updating phase
    new Promise(async (resolve, reject) => {
      // Update online
      try {
        await this.updateDoc(`users/${this.userLink.email}`, newUserData);
        // If driver changed
        if (this.userData.isDriver !== newUserData.isDriver) {
          // Set theme according to new user data
          this.theme.setTheme(newUserData.isDriver);
          if (newUserData.isDriver) {
            // Add to drivers and remove from riders
            this.arrayUnion('app/users', 'drivers', this.userLink).catch(reject);
            this.arrayRemove('app/users', 'riders', this.userLink).catch(reject);
            // Remove 'as rider' from all pickups
            const doc = await this.getDoc('app/pickups');
            const pickups: Array<Location> = doc.data().locations;
            pickups.forEach(pickup => {
              pickup.riders = pickup.riders.filter((rider) => rider.email !== this.userLink.email );
            });
            this.updateDoc('app/pickups', {locations: pickups});
            // Add to FAST as driver by default
            this.addDriver(this.fast);
          } else {
            // Remove from drivers and add to riders
            this.arrayRemove('app/users', 'drivers', this.userLink);
            this.arrayUnion('app/users', 'riders', this.userLink);
            // Remove 'as driver' from all pickups
            const doc = await this.getDoc('app/pickups');
            const pickups: Array<Location> = doc.data().locations;
            pickups.forEach(pickup => {
              pickup.drivers = pickup.drivers.filter((driver) => driver.email !== this.userLink.email );
            });
            this.updateDoc('app/pickups', { locations: pickups });
            // Add to FAST as rider by default
            this.addRider(this.fast);
          }
        }
        // Update user data - deep copy
        this.userData = JSON.parse(JSON.stringify(newUserData));
        // Set locally
        this.storage.set('userData', JSON.stringify(this.userData));
        resolve();
      } catch (err) { reject(err); };
    })
    .then(this.alertService.notice.bind(this.alertService, 'Profile updated Successfully'))
    .catch(this.alertService.error.bind(this.alertService))
    );
  }

  // View
  getUserView(user: UserLink) {
    this.alertService.load(`Loading ${user.name}'s Profile`,
    new Promise(async (resolve, reject) => {
      try {
        const doc = await this.getDoc(`users/${user.email}`);
        // Copy to view user
        this.viewUser = new ViewUser(
          new UserData(doc.data().isDriver, null, // Address not needed
          doc.data().schedule, doc.data().car), user
        );
        // Status
        this.viewUser.status = doc.data().status;
        // this.viewUser.rate.oneway = doc.data().rate.oneway;
        resolve();
      } catch (err) { reject(err); }
    })
    );
  }

  // User
  async deleteAccount(email: string) {
    // Get data first
    const userDoc = await this.getDoc('app/users');
    const userDataDoc = await this.getDoc(`users/${email}`);
    const isDriver = userDataDoc.data().isDriver;
    await this.removeUserFromPickups(email, isDriver);
    if (isDriver) {
      // Remove from app/users
      let drivers: Array<UserLink> = userDoc.data().drivers;
      drivers = drivers.filter(driver => driver.email === email);
      await this.updateDoc('app/users', { drivers });
    } else {
      // Remove from app/users
      let riders: Array<UserLink> = userDoc.data().riders;
      riders = riders.filter(rider => rider.email !== email);
      await this.updateDoc('app/users', { riders });
    }
    // Finally remove user data
    return this.deleteDoc(`users/${email}`);
  }

  // Pickups
  async removeUserFromPickups(email: string, isDriver: boolean) {
    const pickupDoc = await this.getDoc('app/pickups');
    const locations: Array<Location> = pickupDoc.data().locations;
    if (isDriver) {
      // Remove from app/pickups -> locations
      locations.forEach(pickup => {
        pickup.drivers = pickup.drivers.filter(driver => driver.email !== email);
      });
    } else {
      // Remove from app/pickups -> locations
      locations.forEach(pickup => {
        pickup.riders = pickup.riders.filter(rider => rider.email !== email);
      });
    }
    return this.updateDoc('app/pickups', { locations });
  }


  // General Methods
  getCollection(path: string, options?: firebase.firestore.GetOptions) {
    if (this.usable)
      return new Promise<firebase.firestore.QuerySnapshot>((resolve, reject) =>
        this.db.collection(path).get(options).subscribe(doc => resolve(doc), reject)
      );
    throw this.outdatedError;
  }

  createDoc(path: string, data: Object) {
    if (this.usable)
      return this.db.collection(path).add(JSON.parse(JSON.stringify(data)));
    throw this.outdatedError;
  }

  getDoc(path: string, options?: firebase.firestore.GetOptions) {
    if (this.usable)
      return new Promise<firebase.firestore.DocumentSnapshot>((resolve, reject) =>
        this.db.doc(path).get(options).subscribe(doc => resolve(doc), reject)
      );
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

  deleteDoc(path: string) {
    if (this.usable)
      return this.db.doc(path).delete();
    throw this.outdatedError;
  }

  arrayUnion(path: string, field: string, element: any) {
    const updated = {};
    updated[field] = firestore.FieldValue.arrayUnion(JSON.parse(JSON.stringify(element)));
    if (this.usable)
      return this.db.doc(path).update(updated);
    throw this.outdatedError;
  }

  arrayRemove(path: string, field: string, element: any) {
    const updated = {};
    updated[field] = firestore.FieldValue.arrayRemove(JSON.parse(JSON.stringify(element)));
    if (this.usable)
      return this.db.doc(path).update(updated);
    throw this.outdatedError;
  }

  logout() {
    this.userData = null;
    this.userLink = null;
    this.viewUser = null;
    this.pickups = null;
    this.storage.remove('userData');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
