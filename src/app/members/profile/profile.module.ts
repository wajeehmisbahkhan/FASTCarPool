import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ToggleSwitchComponent } from '../../services/toggle-switch/toggle-switch.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.apiKey
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage, ToggleSwitchComponent]
})
export class ProfilePageModule {}
