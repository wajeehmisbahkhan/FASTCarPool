import { Component, forwardRef, Input } from '@angular/core';
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

export class ToggleSwitchComponent implements ControlValueAccessor {

  @Input() onText: string;
  @Input() offText: string;

  private _value = false;

  onChange: any = () => { };
  onTouched: any = () => { };


  constructor() {}

  get value(): boolean {
    return this._value;
  }

  set value(value: boolean) {
    this._value = value;
  }

  registerOnChange(fn) {
    this.onChange = (obj) => fn(obj);
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  switch() {
    this.value = !this.value;
    this.onChange(this.value);
    // console.log(this.value);
  }


}
