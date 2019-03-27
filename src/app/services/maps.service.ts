import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private geolocation: Geolocation) { }

  getCurrentLocation() {
    return this.geolocation.getCurrentPosition();
  }

  getLiveLocation() {
    return this.geolocation.watchPosition();
  }

}
