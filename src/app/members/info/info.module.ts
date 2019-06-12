import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info.page';
import { MapComponent } from './map/map.component';
import { SharedModule } from 'src/app/components/shared.module';

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
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InfoPage, MapComponent]
})
export class InfoPageModule {}
