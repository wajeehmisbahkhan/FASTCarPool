import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Day } from 'src/app/services/helper-classes';

@Component({
  selector: 'schedule-input',
  templateUrl: './schedule-input.component.html',
  styleUrls: ['./schedule-input.component.scss'],
})
export class ScheduleInputComponent implements OnInit {

  @Input() schedule: Array<Day>;
  // Output signal when hour changes
  // Naming convention allows for two way data binding
  // Youtube: https://youtu.be/YPWT5ybPz_Y
  @Output()
  scheduleChange = new EventEmitter<Array<Day>>();

  arrivalHours: Array<Array<number>>;
  departureHours: Array<Array<number>>;

  constructor() {
    this.arrivalHours = [];
    this.departureHours = [];
    for (let i = 0; i < 5; i++) {
      this.arrivalHours.push([8, 9, 10, 11, 12, 13, 14, 15]);
      this.departureHours.push([9, 10, 11, 12, 13, 14, 15, 16]);
    }
  }

  ngOnInit() {}

  updatedArrivalHours(event, index: number) {
    const arrivalHour: string = event.target.value;
    // Reset maximum arrival hours slider
    const arrival = parseInt(arrivalHour, 10); // Assume 10
    // From 10 - 16 = 6 (2-7 index required)
    // If more than current hours cut off extra index
    if (16 - arrival < this.departureHours[index].length)
      this.departureHours[index] = this.departureHours[index].slice(arrival - this.departureHours[index][0] + 1);
    else // Else add 8 - departure
      while (this.departureHours[index].length < 16 - arrival)
        this.departureHours[index].unshift(this.departureHours[index][0] - 1);
    // Reset and emit schedule
    this.schedule[index].arrival = arrivalHour;
    this.scheduleChange.emit(this.schedule);
  }

  updatedDepartureHours(event, index: number) {
    const departureHour: string = event.target.value;
    // Reset maximum arrival hours slider
    const departure = parseInt(departureHour, 10); // Assume 14
    // From 8 - 14 = 6 (0-5 index required)
    // If less than current hours cut off extra index
    if (departure - 8 < this.arrivalHours[index].length)
      this.arrivalHours[index] = this.arrivalHours[index].slice(0, departure - 8);
    else // Else add cutoff - 14
      while (this.arrivalHours[index].length < departure - 8)
        this.arrivalHours[index].push(this.arrivalHours[index].length + departure - 8);
    // Reset and emit schedule
    this.schedule[index].departure = departureHour;
    this.scheduleChange.emit(this.schedule);
  }

}
