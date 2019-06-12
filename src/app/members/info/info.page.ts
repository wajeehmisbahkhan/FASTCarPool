import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Section, User, CourseUser, Course, CourseDetails } from 'src/app/services/helper-classes';

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
  }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      address: [this.address, Validators.required],
      courses: this.formBuilder.array([this.addCourseGroup()])
    });
  }

  // Map
  goToMap(e) {
    e.preventDefault();
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
    return courseGroup;
  }

  courseSelected(index: number): boolean {
    return this.coursesArray.controls[index].get('name').value;
  }

  getSections(index: number): Array<Section> {
    // Get section
    const course = this.coursesArray.controls[index].get('name').value as CourseDetails;
    return course.sections;
  }

  async createUser() {
    // Make place in database
    try {
      // Default stuff
      this.db.userData = new User;
      // Home Address
      this.db.userData.setHome(this.address, this.lat, this.lng);
      // Courses
      this.selectedCoursesUser.forEach(courseUser => {
        this.db.userData.addCourse(courseUser);
      });
      // Important for adding as rider
      await this.db.getPickups();
      await this.db.createNewUser(this.user.displayName, this.user.email);
      this.router.navigate(['members', 'dashboard', this.lat, this.lng]);
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

  // Locally selected courses - Converted to user
  get selectedCoursesUser(): Array<CourseUser> {
    const coursesUser = [];
    this.coursesArray.controls.forEach(control => {
      const course = control.get('name').value; // Course
      const section = control.get('section').value; // Section
      if (section) {
        const courseUser = new CourseUser(course, section);
        coursesUser.push(courseUser);
      }
    });
    return coursesUser;
  }

}
