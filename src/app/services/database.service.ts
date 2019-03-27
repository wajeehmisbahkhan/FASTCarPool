import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  createNewUser(email: string) {
    // Add to users folder - reference by email users/email.get(property)
    this.db.collection('users').doc(email).set({
        chats: [],
        user: 'Rider',
        status: 'Hey there! I am using FASTUber.',
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

  get(path: string, options?: firebase.firestore.GetOptions): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection(path).get(options);
  }


}
