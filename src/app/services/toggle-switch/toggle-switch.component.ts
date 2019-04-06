import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
})
export class ToggleSwitchComponent implements OnInit {

  private onText: string;
  private offText: string;

  constructor() { }

  ngOnInit() {
    
  }

}
