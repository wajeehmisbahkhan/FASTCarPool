import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {

  password: string;

  constructor(
    private poc: PopoverController
  ) { }

  ngOnInit() {}

  confirmPassword() {
    this.poc.dismiss({
      password: this.password
    });
  }

  cancel() {
    this.poc.dismiss();
  }

}
