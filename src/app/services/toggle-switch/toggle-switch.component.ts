import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleSwitchComponent),
            multi: true
    }
  ]
})

export class ToggleSwitchComponent implements ControlValueAccessor, OnInit {

  @Input() onText: string;
  @Input() offText: string;
  checked = true;

  constructor() { }

  ngOnInit() {
    document.querySelector('.onoffswitch-inner').setAttribute('data-on', this.onText);
    document.querySelector('.onoffswitch-inner').setAttribute('data-off', this.offText);
  }

  onChange: any = (): boolean => {
    this.checked = !this.checked;
    return this.checked;
  }
  onTouch: any = (): boolean => {
    this.checked = document.querySelector('#myonoffswitch').hasAttribute('checked');
    return this.checked;
  }

  // this method sets the value programmatically
  writeValue(checked: boolean) {
    this.checked = checked;
  }
  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

}
