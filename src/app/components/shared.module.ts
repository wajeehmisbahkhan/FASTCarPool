import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    GoogleMapComponent,
    ToggleSwitchComponent
  ],
  exports: [
    GoogleMapComponent,
    ToggleSwitchComponent
  ]
})
export class SharedModule { }
