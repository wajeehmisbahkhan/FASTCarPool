import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info.page';
import { MapComponent } from './map/map.component';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';

const routes: Routes = [
  {
    path: '',
    component: InfoPage
  },
  {
    path: ':address/:lat/:lng',
    component: InfoPage
  },
  {
    path: 'map/temp/:lat/:lng',
    component: MapComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InfoPage, GoogleMapComponent, MapComponent]
})
export class InfoPageModule {}
