(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "./src/app/members/profile/profile.module.ts":
/*!***************************************************!*\
  !*** ./src/app/members/profile/profile.module.ts ***!
  \***************************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/members/profile/profile.page.ts");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");








var routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]
    }
];
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());



/***/ }),

/***/ "./src/app/members/profile/profile.page.html":
/*!***************************************************!*\
  !*** ./src/app/members/profile/profile.page.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>My Profile</ion-title>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content padding>\r\n  <form #profileForm=\"ngForm\" (submit)=\"updateProfile($event)\">\r\n    <ion-item>\r\n      <ion-label for=\"toggle-switch\" position=\"fixed\">You are a:</ion-label>\r\n      <toggle-switch name=\"isDriver\" [(ngModel)]=\"localCopy.isDriver\" [onText]=\"'Driver'\" [offText]=\"'Rider'\"></toggle-switch>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Status</ion-label>\r\n      <ion-input name=\"status\" [placeholder]=\"'Cool Status'\" [(ngModel)]=\"localCopy.status\" required></ion-input>\r\n    </ion-item>\r\n    <div class=\"ion-text-center\">\r\n      <p>Your Schedule (First Class Start & Last Class End)</p>\r\n    </div>\r\n    <ion-item *ngFor=\"let day of localCopy.schedule; index as i\">\r\n      <ion-label>{{ day.name }}</ion-label>\r\n      <ion-input name=\"arrival-{{i}}\" [placeholder]=\"'Arrival'\" [(ngModel)]=\"localCopy.schedule[i].arrival\" required max></ion-input>\r\n      <ion-input name=\"departure-{{i}}\" [placeholder]=\"'Departure'\" [(ngModel)]=\"localCopy.schedule[i].departure\" required></ion-input>\r\n    </ion-item>\r\n    <div *ngIf=\"localCopy.isDriver\">\r\n    <div class=\"ion-text-center\">\r\n      <p>Your Car Details</p>\r\n    </div>\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Capacity</ion-label>\r\n      <ion-input name=\"capacity\" [placeholder]=\"'Max Capacity'\" [(ngModel)]=\"localCopy.car.capacity\" [required]=\"localCopy.isDriver\"></ion-input>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Filled</ion-label>\r\n      <ion-input name=\"filled\" [placeholder]=\"'Number of Current Riders'\" [(ngModel)]=\"localCopy.car.filled\" [required]=\"localCopy.isDriver\"></ion-input>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Description</ion-label>\r\n      <ion-input name=\"description\" [placeholder]=\"'Eg: Black Toyota Corolla 2009 GLI'\" [(ngModel)]=\"localCopy.car.description\" [required]=\"localCopy.isDriver\"></ion-input>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Price</ion-label>\r\n      <ion-input type=\"number\" name=\"price\" [placeholder]=\"'Charges for a one way trip'\" [(ngModel)]=\"localCopy.rate.oneway\" [required]=\"localCopy.isDriver\"></ion-input>\r\n    </ion-item>\r\n    </div>\r\n    <ion-button expand=\"block\" type=\"submit\" [disabled]=\"profileForm.invalid || !valueChanged()\">Update</ion-button>\r\n  </form>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/members/profile/profile.page.scss":
/*!***************************************************!*\
  !*** ./src/app/members/profile/profile.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "agm-map {\n  width: 300px;\n  height: 300px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9wcm9maWxlL0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXG1lbWJlcnNcXHByb2ZpbGVcXHByb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBWTtFQUNaLGFBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL21lbWJlcnMvcHJvZmlsZS9wcm9maWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFnbS1tYXAge1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/members/profile/profile.page.ts":
/*!*************************************************!*\
  !*** ./src/app/members/profile/profile.page.ts ***!
  \*************************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_database_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/database.service */ "./src/app/services/database.service.ts");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/alert.service */ "./src/app/services/alert.service.ts");
/* harmony import */ var src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/helper-classes */ "./src/app/services/helper-classes.ts");





var ProfilePage = /** @class */ (function () {
    function ProfilePage(db, alertService) {
        this.db = db;
        this.alertService = alertService;
        // Will be used to detect changes in input
        this.localCopy = new src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_4__["User"];
        // Make a local deep copy - simple assignment will make a shallow copy
        this.localCopy = JSON.parse(JSON.stringify(this.db.userData));
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.valueChanged = function () {
        // Data loaded into local copy
        if (this.localCopy)
            return JSON.stringify(this.localCopy) !== JSON.stringify(this.db.userData);
        return false;
    };
    ProfilePage.prototype.updateProfile = function (e) {
        e.preventDefault();
        this.db.updateUserData(this.localCopy);
    };
    ProfilePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.page.html */ "./src/app/members/profile/profile.page.html"),
            styles: [__webpack_require__(/*! ./profile.page.scss */ "./src/app/members/profile/profile.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_database_service__WEBPACK_IMPORTED_MODULE_2__["DatabaseService"],
            src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"]])
    ], ProfilePage);
    return ProfilePage;
}());



/***/ })

}]);
//# sourceMappingURL=profile-profile-module.js.map