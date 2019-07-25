import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { ScheduleInputComponent } from './schedule-input/schedule-input.component';
import { IonicModule } from '@ionic/angular';
import { CarDetailsInputComponent } from './car-details-input/car-details-input.component';
import { AgmCoreModule, AgmMap } from '@agm/core';
import { environment } from 'src/environments/environment';
import { GoogleMapInputComponent } from './google-map-input/google-map-input.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.apiKey
    }),
  ],
  providers: [
    AgmCoreModule,
    AgmMap
  ],
  declarations: [
    GoogleMapComponent,
    ToggleSwitchComponent,
    ScheduleInputComponent,
    CarDetailsInputComponent,
    GoogleMapInputComponent
  ],
  exports: [
    GoogleMapComponent,
    ToggleSwitchComponent,
    ScheduleInputComponent,
    CarDetailsInputComponent,
    GoogleMapInputComponent
  ]
})
export class SharedModule { }
