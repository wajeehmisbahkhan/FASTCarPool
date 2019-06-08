import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  infoForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      address: ['This will not be displayed publicly...', Validators.required],
      courses: this.formBuilder.array([this.addCourseGroup()])
    });
    this.infoForm.get('address').disable();
  }

  // Map
  goToMap(e) {
    const currentLocation = e.value;
    this.router.navigate(['members', 'info', 'map', currentLocation]);
  }

  // Course
  addCourse() {
    this.coursesArray.push(this.addCourseGroup());
  }

  removeCourse(index: number) {
    this.coursesArray.removeAt(index);
  }

  // Helper for course creation
  addCourseGroup() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      section: ['', Validators.required]
    });
  }

  async createUser() {
    // Make place in database
    try {
      await this.db.createNewUser(this.user.displayName, this.user.email);
    } catch (err) {
      this.alertService.error(err);
      return;
    }
  }

  get user() {
    return this.authService.user;
  }

  get coursesArray(): FormArray {
    return this.infoForm.get('courses') as FormArray;
  }

}
