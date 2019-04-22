import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';
import { User, UserLink } from './helper-classes';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public userData: User;

  constructor(private db: AngularFirestore) { }

  createNewUser(email: string) {
    // Add to users folder - reference by email users/email.get(property)
    this.setDoc(`users/${email}`, (new User).toObject());
  }

  getUserData(email: string) {
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
        resolve(this.userData);
      });
    });
  }

  updateUserData(user: firebase.User, newUserData: User) {
    return new Promise(resolve => {
      this.updateDoc(`users/${user.email}`, newUserData.toObject());
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
        // Update user data
        this.userData = JSON.parse(JSON.stringify(newUserData));
        resolve();
      }
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
    this.db.doc(path).set(data, options);
  }

  updateDoc(path: string, data: Object) {
    this.db.doc(path).update(data);
  }

  // TODO: Test
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
