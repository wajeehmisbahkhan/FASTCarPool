import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';
import { User, UserLink } from './helper-classes';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public userData = new User;

  constructor(
    private db: AngularFirestore,
    private lc: LoadingController) { }

  createNewUser(user: firebase.User) {
    const loading = this.lc.create({
      message: 'Creating your account'
    });
    loading.then(loader => {
      loader.present();
    });
    // Add to users folder - reference by email users/email.get(property)
    this.setDoc(`users/${user.email}`, (new User).toObject()).then(() => {
      this.lc.dismiss(loading);
    });
    // Add to riders list
    this.unionArray('app/users', 'riders', Object.assign({}, new UserLink(user.displayName, user.email)));
  }

  getUserData(email: string) {
    const loading = this.lc.create({
      message: 'Fetching your data...'
    });
    loading.then(loader => {
      loader.present();
    });
    return new Promise(resolve => {
      this.db.doc(`users/${email}`).get().subscribe(doc => {
        // Copying all data
        this.userData.isDriver = doc.data().isDriver;
        this.userData.status = doc.data().status;
        this.userData.schedule = doc.data().schedule;
        this.userData.car = doc.data().car;
        // Rates are special case for now
        this.userData.rate.oneway = doc.data().price;
        // Chats
        this.userData.chats = doc.data().chats;
        this.lc.dismiss(loading);
        resolve(this.userData);
      });
    });
  }

  updateUserData(user: firebase.User, newUserData: User) {
    const loading = this.lc.create({
      message: 'Updating your profile...'
    });
    loading.then(loader => {
      loader.present();
    });
    return new Promise(resolve => {
      this.updateDoc(`users/${user.email}`, newUserData).then(() => {
        // If driver changed
        if (this.userData.isDriver !== newUserData.isDriver) {
          if (newUserData.isDriver) {
            // Add to drivers and remove from riders
            this.unionArray('app/users', 'drivers', Object.assign({}, new UserLink(user.displayName, user.email)));
            this.arrayRemove('app/users', 'riders', Object.assign({}, new UserLink(user.displayName, user.email)));
          } else {
            // Remove from drivers and add to riders
            this.arrayRemove('app/users', 'drivers', Object.assign({}, new UserLink(user.displayName, user.email)));
            this.unionArray('app/users', 'riders', Object.assign({}, new UserLink(user.displayName, user.email)));
          }
        }
        // Update user data
        this.userData = JSON.parse(JSON.stringify(newUserData));
        this.lc.dismiss(loading);
        resolve();
      });
    });
  }

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
