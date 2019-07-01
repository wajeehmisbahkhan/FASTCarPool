import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/services/helper-classes';

@Component({
  selector: 'car-details-input',
  templateUrl: './car-details-input.component.html',
  styleUrls: ['./car-details-input.component.scss'],
})
export class CarDetailsInputComponent implements OnInit {

  // Car details for ease in adding
  carDetails = [];

  // Attribute
  @Input() required: boolean;

  // Car
  @Input() car: Car;
  @Output()
  carChange = new EventEmitter<Car>();

  constructor() {
    // Car Details
    this.addCarDetails('capacity', 'number', 'Max Capacity', 1, 10);
    this.addCarDetails('filled', 'number', 'Number of Current Riders', 0, this.carDetails[0].value); // Should be <= max capacity
    this.addCarDetails('description', 'string', 'Eg: Black Toyota Corolla 2009 GLI');
    this.addCarDetails('price', 'number', 'Charges for a one way trip');
  }

  ngOnInit() {}

  addCarDetails(name: string, type: string, placeholder: string, min?: number, max?: number) {
    this.carDetails.push({
      name: name,
      type: type,
      placeholder: placeholder,
      max: max,
      min: min
    });
  }

  changeCarDetails(event, name) {
    const value = event.target.value;
    console.log(this.required);
    console.log(`Output:: CarDetailsInputComponent -> changeCarDetails -> value`, value);
    // For capacity change, change max for filled
    if (name === 'capacity') {
      this.carDetails[1].max = value;
    }
    this.car[name] = value;
    this.carChange.emit(this.car);
  }

}
