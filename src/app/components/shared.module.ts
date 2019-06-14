import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { ScheduleInputComponent } from './schedule-input/schedule-input.component';
import { IonicModule } from '@ionic/angular';
import { CarDetailsInputComponent } from './car-details-input/car-details-input.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    GoogleMapComponent,
    ToggleSwitchComponent,
    ScheduleInputComponent,
    CarDetailsInputComponent
  ],
  exports: [
    GoogleMapComponent,
    ToggleSwitchComponent,
    ScheduleInputComponent,
    CarDetailsInputComponent
  ]
})
export class SharedModule { }
