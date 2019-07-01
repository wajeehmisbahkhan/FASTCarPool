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

  @HostListener('document:keyup') handler() {
    // this.flip();
    console.log(`Output:: ToggleSwitchComponent -> @HostListener -> this.switchStatus`, this.switchStatus);
  }

  constructor() {}

  flip() {
    this.switchStatus = !this.switchStatus;
    console.log(`Output:: ToggleSwitchComponent -> flip -> this.switchStatus`, this.switchStatus);
    this.switchStatusChange.emit(this.switchStatus);
  }


}
