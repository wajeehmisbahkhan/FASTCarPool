import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
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

  value: boolean;

  constructor() { }

  onChange = (checked: boolean) => {
    this.value = checked;
  }
  onTouched: () => void;
  disabled: boolean;

  ngOnInit() {
    document.querySelector('.onoffswitch-inner').setAttribute('data-on', this.onText);
    document.querySelector('.onoffswitch-inner').setAttribute('data-off', this.offText);
  }

  writeValue(value: any): void {
    this.value = value ? value : false;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // // TODO: Find purpose of these
  // onChange: any = () => {
  //   this.checked = !this.checked;
  //   console.log(this.checked);
  // }
  // onTouch: any = (): boolean => {
  //   this.checked = document.querySelector('#myonoffswitch').hasAttribute('checked');
  //   return this.checked;
  // }

  // // this method sets the value programmatically
  // writeValue(checked: boolean) {
  //   this.checked = checked;
  // }
  // // upon UI element value changes, this method gets triggered
  // registerOnChange(fn: any) {
  //   console.log(fn);
    
  //   this.onChange = fn;
  // }
  // // upon touching the element, this method gets triggered
  // registerOnTouched(fn: any) {
  //   this.onTouch = fn;
  // }

  // switchToggle () {
  //   this.checked = !this.checked;
  // }


}
