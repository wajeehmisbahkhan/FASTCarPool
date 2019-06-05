import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgmCoreModule, AgmMap } from '@agm/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.apiKey
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    EmailComposer,
    AgmCoreModule,
    AgmMap
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
