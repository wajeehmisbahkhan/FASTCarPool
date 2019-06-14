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
    this.addCarDetails('capacity', 'number', 'Max Capacity');
    this.addCarDetails('filled', 'number', 'Number of Current Riders');
    this.addCarDetails('description', 'string', 'Eg: Black Toyota Corolla 2009 GLI');
    this.addCarDetails('price', 'number', 'Charges for a one way trip');
  }

  ngOnInit() {}

  addCarDetails(name: string, type: string, placeholder: string) {
    this.carDetails.push({
      name: name,
      type: type,
      placeholder: placeholder
    });
  }

  changeCarDetails(event, name) {
    const value = event.target.value;
    this.car[name] = value;
    this.carChange.emit(this.car);
  }

}
