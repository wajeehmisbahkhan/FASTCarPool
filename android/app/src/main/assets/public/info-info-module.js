(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["info-info-module"],{

/***/ "./src/app/members/info/info.module.ts":
/*!*********************************************!*\
  !*** ./src/app/members/info/info.module.ts ***!
  \*********************************************/
/*! exports provided: InfoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoPageModule", function() { return InfoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _info_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./info.page */ "./src/app/members/info/info.page.ts");
/* harmony import */ var _map_map_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./map/map.component */ "./src/app/members/info/map/map.component.ts");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");









var routes = [
    {
        path: '',
        component: _info_page__WEBPACK_IMPORTED_MODULE_6__["InfoPage"]
    },
    {
        path: ':address/:lat/:lng',
        component: _info_page__WEBPACK_IMPORTED_MODULE_6__["InfoPage"]
    },
    {
        path: 'map/temp/:lat/:lng',
        component: _map_map_component__WEBPACK_IMPORTED_MODULE_7__["MapComponent"]
    }
];
var InfoPageModule = /** @class */ (function () {
    function InfoPageModule() {
    }
    InfoPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ],
            declarations: [_info_page__WEBPACK_IMPORTED_MODULE_6__["InfoPage"], _map_map_component__WEBPACK_IMPORTED_MODULE_7__["MapComponent"]]
        })
    ], InfoPageModule);
    return InfoPageModule;
}());



/***/ }),

/***/ "./src/app/members/info/info.page.html":
/*!*********************************************!*\
  !*** ./src/app/members/info/info.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Welcome, {{ this.user.displayName }}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<!-- <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\r\n  <!-- Ionic 4 bug: Custom validators must be styled like this -->\r\n  <!--<ion-item [class.ion-invalid]=\"email.hasError('emailExists')\">\r\n    <ion-label position=\"floating\">Email</ion-label>\r\n    <ion-input type=\"email\" formControlName=\"email\">\r\n      <!-- Show spinner when checking mail -->\r\n    <!--  <ion-spinner *ngIf=\"email.status==='PENDING'\" color=\"primary\"></ion-spinner>\r\n    </ion-input>\r\n  </ion-item>\r\n  <!-- Email Errors -->\r\n  <!--<div class=\"error-message\" *ngIf=\"!this.authService.validate(this.loginForm, 'email', this.error)\">\r\n    <span class=\"ion-margin-start\">\r\n      {{error.email}}\r\n      <!-- If no such email exists - Pass email if clicked-->\r\n    <!--  <a (click)=\"authService.passingEmail = email.value\"\r\n      routerLink=\"../register/\" routerDirection=\"forward\" *ngIf=\"error.email.indexOf('No') >= 0\">Sign Up!</a>\r\n    </span>\r\n  </div>\r\n  <ion-item>\r\n    <ion-label position=\"floating\">Password</ion-label>\r\n    <ion-input type=\"password\" formControlName=\"password\"></ion-input>\r\n  </ion-item>\r\n  <div class=\"error-message\" *ngIf=\"!this.authService.validate(this.loginForm, 'password', this.error) || loginFailed\">\r\n    <span class=\"ion-margin-start\">\r\n      <!-- If invalid password -->\r\n    <!--  <span *ngIf=\"this.loginFailed; else passwordError\">\r\n        Password is invalid. <a (click)=\"resetPassword()\">Forgot Password?</a>\r\n      </span>\r\n      <ng-template #passwordError>\r\n        {{error.password}}\r\n      </ng-template>\r\n    </span>\r\n  </div>\r\n  <ion-button margin-top type=\"submit\" [disabled]=\"!loginForm.valid\" expand=\"block\">\r\n    Login\r\n    <ion-spinner *ngIf=\"logging\" color=\"white\"></ion-spinner>\r\n  </ion-button>\r\n  <ion-item>\r\n    <p>Not registered? <a routerLink=\"../register/\" routerDirection=\"forward\">Create an account!</a></p>\r\n  </ion-item>\r\n</form> -->\r\n\r\n\r\n<ion-content>\r\n  <ion-item>\r\n    <ion-text class=\"ion-padding ion-text-center\">\r\n      In order for you to have the best experience, we will require\r\n      you to input some of your information below:\r\n    </ion-text>\r\n  </ion-item>\r\n  <form [formGroup]=\"infoForm\" (ngSubmit)=\"createUser()\">\r\n  <!-- Address -->\r\n  <ion-item>\r\n    <ion-label position=\"floating\">Your Home Address</ion-label>\r\n    <ion-input autocomplete=\"off\" placeholder=\"This will not be displayed publicly...\"\r\n    formControlName=\"address\" (click)=\"goToMap($event)\"></ion-input>\r\n  </ion-item>\r\n  <!-- Courses -->\r\n  <div id=\"courses\">\r\n  <ion-item>\r\n  <ion-label class=\"ion-padding ion-text-center\">Your Courses: </ion-label>\r\n  </ion-item>\r\n  <!-- Listed -->\r\n  <div formArrayName=\"courses\">\r\n    <ion-item class=\"courses-options\" *ngFor=\"let course of coursesArray.controls; let i = index\"\r\n    [formGroupName]=\"i\">\r\n    <ion-select #courseSelection formControlName=\"name\" [placeholder]=\"'Course'\">\r\n      <ion-label>Course</ion-label>\r\n      <ion-select-option *ngFor=\"let courseDetails of coursesDetails\" [value]=\"courseDetails\">\r\n        {{ courseDetails.name }}\r\n      </ion-select-option>\r\n    </ion-select>\r\n    <ion-select formControlName=\"section\" [placeholder]=\"'Section'\">\r\n      <ion-label>Section</ion-label>\r\n      <!-- Only read if option is selected -->\r\n      <div *ngIf=\"courseSelected(i); else selectCourse\">\r\n      <ion-select-option *ngFor=\"let section of getSections(i)\" [value]=\"section\">\r\n        {{ section.code }}\r\n      </ion-select-option>\r\n      </div>\r\n      <ng-template #selectCourse>\r\n        <ion-select-option>Select a Course</ion-select-option>\r\n      </ng-template>\r\n    </ion-select>\r\n    <ion-icon class=\"absolute-vertical-center\" *ngIf=\"i > 0\" (click)=\"removeCourse(i)\" name=\"remove-circle\"></ion-icon>\r\n    </ion-item>\r\n  </div>\r\n  <!-- Add More Courses -->\r\n  <ion-item>\r\n  <ion-icon (click)=\"addCourse()\" name=\"add-circle\"></ion-icon>\r\n  </ion-item>\r\n  </div>\r\n\r\n  <ion-button expand=\"block\" type=\"submit\" [disabled]=\"infoForm.invalid\">Submit</ion-button>\r\n  </form>\r\n  \r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/members/info/info.page.scss":
/*!*********************************************!*\
  !*** ./src/app/members/info/info.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.error-message {\n  padding-top: 0.5em;\n  color: red; }\n  div.error-message a {\n    color: var(--ion-color-primary);\n    -webkit-text-decoration-style: none;\n            text-decoration-style: none; }\n  .courses-options ion-select:first-child {\n  max-width: 100%;\n  width: 65%; }\n  .courses-options ion-select:nth-child(2) {\n  width: 30%; }\n  .courses-options ion-icon {\n  right: 2px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9pbmZvL0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXG1lbWJlcnNcXGluZm9cXGluZm8ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQWtCO0VBQ2xCLFVBQVUsRUFBQTtFQUZkO0lBSVEsK0JBQStCO0lBQy9CLG1DQUEyQjtZQUEzQiwyQkFBMkIsRUFBQTtFQUduQztFQUVRLGVBQWU7RUFDZixVQUFVLEVBQUE7RUFIbEI7RUFNUSxVQUFVLEVBQUE7RUFObEI7RUFTUSxVQUFVLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tZW1iZXJzL2luZm8vaW5mby5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkaXYuZXJyb3ItbWVzc2FnZSB7XHJcbiAgICBwYWRkaW5nLXRvcDogMC41ZW07XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gICAgYSB7XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgICAgICB0ZXh0LWRlY29yYXRpb24tc3R5bGU6IG5vbmU7XHJcbiAgICB9XHJcbn1cclxuLmNvdXJzZXMtb3B0aW9ucyB7XHJcbiAgICBpb24tc2VsZWN0OmZpcnN0LWNoaWxkIHtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgd2lkdGg6IDY1JTtcclxuICAgIH1cclxuICAgIGlvbi1zZWxlY3Q6bnRoLWNoaWxkKDIpIHtcclxuICAgICAgICB3aWR0aDogMzAlO1xyXG4gICAgfVxyXG4gICAgaW9uLWljb24ge1xyXG4gICAgICAgIHJpZ2h0OiAycHg7XHJcbiAgICB9XHJcbn1cclxuLy8gaW9uLWlucHV0LCBpb24tYnV0dG9uIHtcclxuLy8gICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuLy8gICAgIGlvbi1zcGlubmVyIHtcclxuLy8gICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbi8vICAgICAgICAgcmlnaHQ6IDFlbTtcclxuLy8gICAgIH1cclxuLy8gfSJdfQ== */"

/***/ }),

/***/ "./src/app/members/info/info.page.ts":
/*!*******************************************!*\
  !*** ./src/app/members/info/info.page.ts ***!
  \*******************************************/
/*! exports provided: InfoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoPage", function() { return InfoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var src_app_services_database_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/database.service */ "./src/app/services/database.service.ts");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/alert.service */ "./src/app/services/alert.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/helper-classes */ "./src/app/services/helper-classes.ts");








var InfoPage = /** @class */ (function () {
    function InfoPage(authService, db, alertService, formBuilder, router, route) {
        var _this = this;
        this.authService = authService;
        this.db = db;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        // Default Address
        this.route.paramMap.subscribe(function (params) {
            if (params.has('address')) {
                _this.address = params.get('address');
                _this.lat = parseFloat(params.get('lat'));
                _this.lng = parseFloat(params.get('lng'));
            }
            else {
                _this.address = '';
                _this.lat = 0;
                _this.lng = 0;
            }
        });
    }
    InfoPage.prototype.ngOnInit = function () {
        this.infoForm = this.formBuilder.group({
            address: [this.address, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            courses: this.formBuilder.array([this.addCourseGroup()])
        });
    };
    // Map
    InfoPage.prototype.goToMap = function (e) {
        e.preventDefault();
        this.router.navigate(['members', 'info', 'map', 'temp', this.lat, this.lng]);
    };
    // Course
    InfoPage.prototype.addCourse = function () {
        this.coursesArray.push(this.addCourseGroup());
    };
    InfoPage.prototype.removeCourse = function (index) {
        this.coursesArray.removeAt(index);
    };
    // Helper for course creation
    InfoPage.prototype.addCourseGroup = function () {
        var courseGroup = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            section: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]
        });
        return courseGroup;
    };
    InfoPage.prototype.courseSelected = function (index) {
        return this.coursesArray.controls[index].get('name').value;
    };
    InfoPage.prototype.getSections = function (index) {
        // Get section
        var course = this.coursesArray.controls[index].get('name').value;
        return course.sections;
    };
    InfoPage.prototype.createUser = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // Default stuff
                        this.db.userData = new src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_7__["User"];
                        // Home Address
                        this.db.userData.setHome(this.address, this.lat, this.lng);
                        // Courses
                        this.selectedCoursesUser.forEach(function (courseUser) {
                            _this.db.userData.addCourse(courseUser);
                        });
                        // Important for adding as rider
                        return [4 /*yield*/, this.db.getPickups()];
                    case 1:
                        // Important for adding as rider
                        _a.sent();
                        return [4 /*yield*/, this.db.createNewUser(this.user.displayName, this.user.email)];
                    case 2:
                        _a.sent();
                        this.router.navigate(['members', 'dashboard']);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.alertService.error(err_1);
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(InfoPage.prototype, "user", {
        get: function () {
            return this.authService.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoPage.prototype, "coursesArray", {
        // Collection of courses in form
        get: function () {
            return this.infoForm.get('courses');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoPage.prototype, "coursesDetails", {
        // Course details loaded from database
        get: function () {
            return this.db.coursesDetails;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoPage.prototype, "selectedCoursesUser", {
        // Locally selected courses - Converted to user
        get: function () {
            var coursesUser = [];
            this.coursesArray.controls.forEach(function (control) {
                var course = control.get('name').value; // Course
                var section = control.get('section').value; // Section
                if (section) {
                    var courseUser = new src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_7__["CourseUser"](course, section);
                    coursesUser.push(courseUser);
                }
            });
            return coursesUser;
        },
        enumerable: true,
        configurable: true
    });
    InfoPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'info',
            template: __webpack_require__(/*! ./info.page.html */ "./src/app/members/info/info.page.html"),
            styles: [__webpack_require__(/*! ./info.page.scss */ "./src/app/members/info/info.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"],
            src_app_services_database_service__WEBPACK_IMPORTED_MODULE_3__["DatabaseService"],
            src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], InfoPage);
    return InfoPage;
}());



/***/ }),

/***/ "./src/app/members/info/map/map.component.html":
/*!*****************************************************!*\
  !*** ./src/app/members/info/map/map.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\r\n  <ion-searchbar #search></ion-searchbar>\r\n  <google-map (screenDragged)=\"updateMarkerPosition($event)\" #map></google-map>\r\n  <div class=\"address-controls\">\r\n    <ion-button size=\"medium\" expand=\"block\" (click)=\"confirmAddress()\">Confirm Address</ion-button>\r\n    <ion-button size=\"medium\" expand=\"block\" (click)=\"goBack()\">Cancel</ion-button>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/members/info/map/map.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/members/info/map/map.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-searchbar, div.address-controls {\n  position: absolute;\n  z-index: 9999; }\n\ndiv.address-controls {\n  bottom: 10vh;\n  width: 100%;\n  text-align: center; }\n\ndiv.address-controls ion-button {\n    display: inline-block;\n    -webkit-margin-end: 5vw;\n            margin-inline-end: 5vw; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9pbmZvL21hcC9DOlxcVXNlcnNcXE1vc2h1XFxEZXNrdG9wXFxDYXJwb29sXFxDYXJwb29sL3NyY1xcYXBwXFxtZW1iZXJzXFxpbmZvXFxtYXBcXG1hcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFrQjtFQUNsQixhQUFhLEVBQUE7O0FBRWpCO0VBQ0ksWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0IsRUFBQTs7QUFIdEI7SUFLUSxxQkFBcUI7SUFDckIsdUJBQXNCO1lBQXRCLHNCQUFzQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWVtYmVycy9pbmZvL21hcC9tYXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tc2VhcmNoYmFyLCBkaXYuYWRkcmVzcy1jb250cm9scyB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB6LWluZGV4OiA5OTk5O1xyXG59XHJcbmRpdi5hZGRyZXNzLWNvbnRyb2xzIHtcclxuICAgIGJvdHRvbTogMTB2aDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgaW9uLWJ1dHRvbiB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIG1hcmdpbi1pbmxpbmUtZW5kOiA1dnc7XHJcbiAgICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/members/info/map/map.component.ts":
/*!***************************************************!*\
  !*** ./src/app/members/info/map/map.component.ts ***!
  \***************************************************/
/*! exports provided: MapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapComponent", function() { return MapComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var MapComponent = /** @class */ (function () {
    function MapComponent(route, router, location) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.location = location;
        // Marker animation
        this.markerLifted = false;
        this.markerLiftHeight = 0.00025;
        this.route.paramMap.subscribe(function (params) {
            _this.lat = parseFloat(params.get('lat'));
            _this.lng = parseFloat(params.get('lng'));
        });
    }
    MapComponent.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var searchElement, autocomplete;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.search.setFocus();
                        // If position not set
                        if (this.lat === 0 && this.lng === 0)
                            this.map.getCurrentLocation().then(this.initMap.bind(this));
                        else
                            this.initMap({
                                coords: {
                                    latitude: this.lat,
                                    longitude: this.lng
                                }
                            });
                        return [4 /*yield*/, this.search.getInputElement()];
                    case 1:
                        searchElement = _a.sent();
                        autocomplete = new google.maps.places.Autocomplete(searchElement, {
                            types: ['address']
                        });
                        autocomplete.addListener('place_changed', function () {
                            var place = autocomplete.getPlace();
                            // verify result
                            if (place.geometry === undefined || place.geometry === null) {
                                return;
                            }
                            _this.search.value = place.name;
                            // go to lat and lng
                            _this.goToLocation(place.geometry.location.lat(), place.geometry.location.lng());
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MapComponent.prototype.goToLocation = function (lat, lng) {
        // Update marker
        var mainMarker = this.map.getMarker(0);
        mainMarker.setPosition({
            lat: lat,
            lng: lng
        });
        // Update map
        this.map.setLatLng(lat, lng);
    };
    MapComponent.prototype.initMap = function (resp) {
        var _this = this;
        // Map coords will update once when map location is enabled
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        var mapOptions = {
            center: new google.maps.LatLng(this.lat, this.lng),
            zoom: 16,
            maxZoom: 16,
            minZoom: 16,
            disableDefaultUI: true,
            clickableIcons: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map.initMap(mapOptions);
        // Add marker for live location
        this.map.addMarker(new google.maps.LatLng(this.lat, this.lng));
        // Main marker up and down animation
        this.map.addEventListener('mousedown', function () {
            if (!_this.markerLifted) {
                var mainMarker = _this.map.getMarker(0);
                mainMarker.setPosition({
                    lat: mainMarker.getPosition().lat() + _this.markerLiftHeight,
                    lng: mainMarker.getPosition().lng()
                });
                _this.markerLifted = true;
            }
        });
        this.map.addEventListener('mouseup', function () {
            if (_this.markerLifted) {
                var mainMarker = _this.map.getMarker(0);
                mainMarker.setPosition({
                    lat: mainMarker.getPosition().lat() - _this.markerLiftHeight,
                    lng: mainMarker.getPosition().lng()
                });
                _this.markerLifted = false;
            }
        });
    };
    // Update main marker according to center of map
    MapComponent.prototype.updateMarkerPosition = function (position) {
        var mainMarker = this.map.getMarker(0);
        mainMarker.setPosition({
            lat: position[0] + this.markerLiftHeight,
            lng: position[1]
        });
        this.lat = position[0];
        this.lng = position[1];
    };
    // Confirm Location
    MapComponent.prototype.confirmAddress = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var address;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.map.getAddress(this.lat, this.lng)];
                    case 1:
                        address = _a.sent();
                        this.router.navigate(['members', 'info', address, this.lat, this.lng]);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Cancel
    MapComponent.prototype.goBack = function () {
        this.location.back();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MapComponent.prototype, "map", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('search'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonSearchbar"])
    ], MapComponent.prototype, "search", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], MapComponent.prototype, "lat", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], MapComponent.prototype, "lng", void 0);
    MapComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'map',
            template: __webpack_require__(/*! ./map.component.html */ "./src/app/members/info/map/map.component.html"),
            styles: [__webpack_require__(/*! ./map.component.scss */ "./src/app/members/info/map/map.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], MapComponent);
    return MapComponent;
}());



/***/ })

}]);
//# sourceMappingURL=info-info-module.js.map