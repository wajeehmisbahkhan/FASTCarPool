import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/services/helper-classes';

@Component({
  selector: 'info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  infoForm: FormGroup;

  // For address
  lat: number;
  lng: number;
  address: string;

  // For Courses
  selectedIndexes: Array<number>;

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Default Address
    this.route.paramMap.subscribe(params => {
      if (params.has('address')) {
        this.address = params.get('address');
        this.lat = parseFloat(params.get('lat'));
        this.lng = parseFloat(params.get('lng'));
      } else {
        this.address = '';
        this.lat = 0;
        this.lng = 0;
      }
    });
    // Default Courses/Sections
    this.selectedIndexes = [];
  }

  ngOnInit() {
    let initialAddress = this.address;
    if (!this.address)
      initialAddress = 'This will not be displayed publicly...';
    this.infoForm = this.formBuilder.group({
      address: [initialAddress, Validators.required],
      courses: this.formBuilder.array([this.addCourseGroup()])
    });
    this.infoForm.get('address').disable();
  }

  // Map
  goToMap() {
    this.router.navigate(['members', 'info', 'map', 'temp', this.lat, this.lng]);
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
    const courseGroup = this.formBuilder.group({
      name: ['', Validators.required],
      section: ['', Validators.required]
    });
    // Disable section by default
    courseGroup.get('section').disable();
    return courseGroup;
  }

  courseSelected(index: number): boolean {
    return this.coursesArray.controls[index].get('name').value;
  }

  getSections(index: number): Array<Section> {
    // Enable Section selection
    this.coursesArray.controls[index].get('section').enable();
    // Get section
    const courseName = this.coursesArray.controls[index].get('name').value;
    // Find match and return
    const courseDetailIndex = this.db.coursesDetails.findIndex(courseDetail => courseDetail.name.trim() === courseName.trim());
    if (courseDetailIndex >= 0)
      return this.db.coursesDetails[courseDetailIndex].sections;
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

  // Collection of courses in form
  get coursesArray(): FormArray {
    return this.infoForm.get('courses') as FormArray;
  }

  // Course details loaded from database
  get coursesDetails() {
    return this.db.coursesDetails;
  }

}
