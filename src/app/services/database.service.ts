import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  createNewUser(email: string) {
    // Add to users folder - reference by email users/email.get(property)
    this.db.collection('users').doc(email).set({
        chats: [],
        driver: false,
        status: 'Hey there! I\'m using FAST CarPool.',
        home: {
            lat: 24.8607,
            lng: 67.0011
        },
        location: { // Last seen
            lat: 24.8607,
            lng: 67.0011
        },
        schedule: {
            // 8 slots every day
            monday: [null, null, null, null, null, null, null, null],
            tuesday: [null, null, null, null, null, null, null, null],
            wednesday: [null, null, null, null, null, null, null, null],
            thursday: [null, null, null, null, null, null, null, null],
            friday: [null, null, null, null, null, null, null, null]
        },
        car: {
            capacity: 0,
            riders: 0,
            description: ''
        },
        price: {
            oneway: 50,
            daily: 100,
            weekly: 500,
            semester: 8000
        }
    });
  }

  getCollection(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection(path).get(options);
  }

  getDoc(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.DocumentSnapshot> {
    return this.db.doc(path).get(options);
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
    updated[field] = firebase.firestore.FieldValue.arrayUnion(element);
    this.db.doc(path).update(updated);
  }

}
