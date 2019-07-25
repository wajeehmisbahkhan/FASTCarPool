import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})

// Supports two way binding [(switchStatus)]
// For boolean switchOn?
export class ToggleSwitchComponent {

  @Input() onText: string;
  @Input() offText: string;

  // Output signal for value change
  @Input() switchStatus: boolean;
  @Output()
  switchStatusChange = new EventEmitter<boolean>();

  constructor() {}

  flip() {
    this.switchStatus = !this.switchStatus;
    this.switchStatusChange.emit(this.switchStatus);
  }


}
