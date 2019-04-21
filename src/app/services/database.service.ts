import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';
import { User } from './helper-classes';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  createNewUser(email: string) {
    // Add to users folder - reference by email users/email.get(property)
    this.setDoc(`users/${email}`, (new User).toObject());
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
