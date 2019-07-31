(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["public-register-register-module"],{

/***/ "./src/app/public/register/register.module.ts":
/*!****************************************************!*\
  !*** ./src/app/public/register/register.module.ts ***!
  \****************************************************/
/*! exports provided: RegisterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register.page */ "./src/app/public/register/register.page.ts");







var routes = [
    {
        path: '',
        component: _register_page__WEBPACK_IMPORTED_MODULE_6__["RegisterPage"]
    }
];
var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_register_page__WEBPACK_IMPORTED_MODULE_6__["RegisterPage"]]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());



/***/ }),

/***/ "./src/app/public/register/register.page.html":
/*!****************************************************!*\
  !*** ./src/app/public/register/register.page.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>Register</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content padding>\r\n  <form [formGroup]=\"registerForm\" (ngSubmit)=\"register()\">\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Name</ion-label>\r\n      <ion-input type=\"text\" formControlName=\"name\"></ion-input>\r\n    </ion-item>\r\n    <div class=\"error-message\" *ngIf=\"!this.authService.validate(this.registerForm, 'name', this.error)\">\r\n      <span class=\"ion-margin-start\">\r\n        {{error['name']}}\r\n      </span>\r\n    </div>\r\n    <!--Ionic 4 bug: Custom validators must be styled like this-->\r\n    <ion-item [class.ion-invalid]=\"email.hasError('emailAvailable')\">\r\n      <ion-label position=\"floating\">Email</ion-label>\r\n      <ion-input type=\"email\" formControlName=\"email\">\r\n        <!--Show spinner when checking mail-->\r\n        <ion-spinner *ngIf=\"email.status==='PENDING'\" color=\"primary\"></ion-spinner>\r\n      </ion-input>\r\n    </ion-item>\r\n    <div class=\"error-message\" *ngIf=\"!this.authService.validate(this.registerForm, 'email', this.error)\">\r\n      <span class=\"ion-margin-start\">\r\n          {{error['email']}}\r\n          <a (click)=\"resetPassword()\" *ngIf=\"error['email'].indexOf('Email already') >= 0\">Forgot Password?</a>\r\n      </span>\r\n    </div>\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Password</ion-label>\r\n      <ion-input type=\"password\" formControlName=\"password\"></ion-input>\r\n    </ion-item>\r\n    <div class=\"error-message\" *ngIf=\"!this.authService.validate(this.registerForm, 'password', this.error)\">\r\n      <span class=\"ion-margin-start\">\r\n        {{error['password']}}\r\n      </span>\r\n    </div>\r\n    <!-- TODO: Handle already saved browser credentials -->\r\n    <ion-button margin-top type=\"submit\" [disabled]=\"!registerForm.valid\" expand=\"block\">\r\n      Register\r\n    <ion-spinner *ngIf=\"registering\" color=\"white\"></ion-spinner>\r\n    </ion-button>\r\n    <ion-item>\r\n      <p>Already registered? <a routerLink=\"../login/\" routerDirection=\"backward\">Login!</a></p>\r\n    </ion-item>\r\n  </form>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/public/register/register.page.scss":
/*!****************************************************!*\
  !*** ./src/app/public/register/register.page.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.error-message {\n  padding-top: 0.5em;\n  color: red; }\n  div.error-message a {\n    color: var(--ion-color-primary);\n    -webkit-text-decoration-style: none;\n            text-decoration-style: none; }\n  ion-input, ion-button {\n  position: relative; }\n  ion-input ion-spinner, ion-button ion-spinner {\n    position: absolute;\n    right: 1em; }\n  form {\n  margin-top: 50vh;\n  -webkit-transform: translateY(-75%);\n          transform: translateY(-75%); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHVibGljL3JlZ2lzdGVyL0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXHB1YmxpY1xccmVnaXN0ZXJcXHJlZ2lzdGVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFrQjtFQUNsQixVQUFVLEVBQUE7RUFGZDtJQUlRLCtCQUErQjtJQUMvQixtQ0FBMkI7WUFBM0IsMkJBQTJCLEVBQUE7RUFHbkM7RUFDSSxrQkFBa0IsRUFBQTtFQUR0QjtJQUdRLGtCQUFrQjtJQUNsQixVQUFVLEVBQUE7RUFHbEI7RUFDSSxnQkFBZ0I7RUFDaEIsbUNBQTJCO1VBQTNCLDJCQUEyQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcHVibGljL3JlZ2lzdGVyL3JlZ2lzdGVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImRpdi5lcnJvci1tZXNzYWdlIHtcclxuICAgIHBhZGRpbmctdG9wOiAwLjVlbTtcclxuICAgIGNvbG9yOiByZWQ7XHJcbiAgICBhIHtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbi1zdHlsZTogbm9uZTtcclxuICAgIH1cclxufVxyXG5pb24taW5wdXQsIGlvbi1idXR0b24ge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgaW9uLXNwaW5uZXIge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICByaWdodDogMWVtO1xyXG4gICAgfVxyXG59XHJcbmZvcm0ge1xyXG4gICAgbWFyZ2luLXRvcDogNTB2aDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzUlKTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/public/register/register.page.ts":
/*!**************************************************!*\
  !*** ./src/app/public/register/register.page.ts ***!
  \**************************************************/
/*! exports provided: RegisterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/alert.service */ "./src/app/services/alert.service.ts");





var RegisterPage = /** @class */ (function () {
    function RegisterPage(authService, formBuilder, alertService) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.registering = false;
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            email: [this.authService.passingEmail,
                [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email], this.authService.emailAvailable.bind(this.authService)],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(6)]]
        });
        this.error = {
            name: '',
            email: '',
            password: ''
        };
    };
    RegisterPage.prototype.ngOnDestroy = function () {
        this.authService = null;
        this.formBuilder = null;
        this.error = null;
        this.registerForm = null;
    };
    RegisterPage.prototype.register = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var err_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If user gets past the initial checks
                        if (!this.registerForm.valid)
                            return [2 /*return*/];
                        // If outdated version
                        // if (!this.db.usable) {
                        //   this.alertService.error(this.db.outdatedError);
                        //   return;
                        // }
                        this.registering = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authService.register(this.name.value, this.email.value, this.password.value)];
                    case 2:
                        _a.sent();
                        this.registering = false;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.registering = false;
                        this.alertService.error(err_1);
                        return [2 /*return*/];
                    case 4:
                        // Now safe to go forward - on to the info page
                        this.authService.authState.next(true);
                        this.registerForm.reset();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.resetPassword = function () {
        this.authService.resetPassword(this.email.value);
    };
    Object.defineProperty(RegisterPage.prototype, "name", {
        // Getters
        get: function () {
            return this.registerForm.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterPage.prototype, "email", {
        get: function () {
            return this.registerForm.get('email');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterPage.prototype, "password", {
        get: function () {
            return this.registerForm.get('password');
        },
        enumerable: true,
        configurable: true
    });
    RegisterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.page.html */ "./src/app/public/register/register.page.html"),
            styles: [__webpack_require__(/*! ./register.page.scss */ "./src/app/public/register/register.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], RegisterPage);
    return RegisterPage;
}());



/***/ })

}]);
//# sourceMappingURL=public-register-register-module.js.map