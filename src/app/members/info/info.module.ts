import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info.page';
import { SharedModule } from 'src/app/components/shared.module';
import { GoogleMapInputComponent } from 'src/app/components/google-map-input/google-map-input.component';

const routes: Routes = [
  {
    path: '',
    component: InfoPage
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
  declarations: [InfoPage],
  entryComponents: [GoogleMapInputComponent]
})
export class InfoPageModule {}
