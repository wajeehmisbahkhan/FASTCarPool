(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["public-login-login-module"],{

/***/ "./src/app/public/login/login.module.ts":
/*!**********************************************!*\
  !*** ./src/app/public/login/login.module.ts ***!
  \**********************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/public/login/login.page.ts");







var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/public/login/login.page.html":
/*!**********************************************!*\
  !*** ./src/app/public/login/login.page.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>FAST CarPool</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content >\r\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\r\n    <!-- Ionic 4 bug: Custom validators must be styled like this -->\r\n    <ion-item [class.ion-invalid]=\"email.hasError('emailExists')\">\r\n      <ion-label position=\"floating\">Email</ion-label>\r\n      <ion-input type=\"email\" formControlName=\"email\">\r\n        <!-- Show spinner when checking mail -->\r\n        <ion-spinner *ngIf=\"email.status==='PENDING'\" color=\"primary\"></ion-spinner>\r\n      </ion-input>\r\n    </ion-item>\r\n    <!-- Email Errors -->\r\n    <div class=\"error-message\" *ngIf=\"!this.authService.validate(this.loginForm, 'email', this.error)\">\r\n      <span class=\"ion-margin-start\">\r\n        {{error.email}}\r\n        <!-- If no such email exists - Pass email if clicked-->\r\n        <a (click)=\"authService.passingEmail = email.value\"\r\n        routerLink=\"../register/\" routerDirection=\"forward\" *ngIf=\"error.email.indexOf('No') >= 0\">Sign Up!</a>\r\n      </span>\r\n    </div>\r\n    <ion-item>\r\n      <ion-label position=\"floating\">Password</ion-label>\r\n      <ion-input type=\"password\" formControlName=\"password\"></ion-input>\r\n    </ion-item>\r\n    <div class=\"error-message\" *ngIf=\"!this.authService.validate(this.loginForm, 'password', this.error) || loginFailed\">\r\n      <span class=\"ion-margin-start\">\r\n        <!-- If invalid password -->\r\n        <span *ngIf=\"this.loginFailed; else passwordError\">\r\n          Password is invalid. <a (click)=\"resetPassword()\">Forgot Password?</a>\r\n        </span>\r\n        <ng-template #passwordError>\r\n          {{error.password}}\r\n        </ng-template>\r\n      </span>\r\n    </div>\r\n    <ion-button margin-top type=\"submit\" [disabled]=\"!loginForm.valid\" expand=\"block\">\r\n      Login\r\n      <ion-spinner *ngIf=\"logging\" color=\"white\"></ion-spinner>\r\n    </ion-button>\r\n    <ion-item>\r\n      <p>Not registered? <a routerLink=\"../register/\" routerDirection=\"forward\">Create an account!</a></p>\r\n    </ion-item>\r\n  </form>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/public/login/login.page.scss":
/*!**********************************************!*\
  !*** ./src/app/public/login/login.page.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.error-message {\n  padding-top: 0.5em;\n  color: red; }\n  div.error-message a {\n    color: var(--ion-color-primary);\n    -webkit-text-decoration-style: none;\n            text-decoration-style: none; }\n  ion-input, ion-button {\n  position: relative; }\n  ion-input ion-spinner, ion-button ion-spinner {\n    position: absolute;\n    right: 1em; }\n  form {\n  margin-top: 50vh;\n  -webkit-transform: translateY(-75%);\n          transform: translateY(-75%); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHVibGljL2xvZ2luL0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXHB1YmxpY1xcbG9naW5cXGxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFrQjtFQUNsQixVQUFVLEVBQUE7RUFGZDtJQUlRLCtCQUErQjtJQUMvQixtQ0FBMkI7WUFBM0IsMkJBQTJCLEVBQUE7RUFHbkM7RUFDSSxrQkFBa0IsRUFBQTtFQUR0QjtJQUdRLGtCQUFrQjtJQUNsQixVQUFVLEVBQUE7RUFHbEI7RUFDSSxnQkFBZ0I7RUFDaEIsbUNBQTJCO1VBQTNCLDJCQUEyQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcHVibGljL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImRpdi5lcnJvci1tZXNzYWdlIHtcclxuICAgIHBhZGRpbmctdG9wOiAwLjVlbTtcclxuICAgIGNvbG9yOiByZWQ7XHJcbiAgICBhIHtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbi1zdHlsZTogbm9uZTtcclxuICAgIH1cclxufVxyXG5pb24taW5wdXQsIGlvbi1idXR0b24ge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgaW9uLXNwaW5uZXIge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICByaWdodDogMWVtO1xyXG4gICAgfVxyXG59XHJcbmZvcm0ge1xyXG4gICAgbWFyZ2luLXRvcDogNTB2aDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzUlKTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/public/login/login.page.ts":
/*!********************************************!*\
  !*** ./src/app/public/login/login.page.ts ***!
  \********************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_database_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/database.service */ "./src/app/services/database.service.ts");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/alert.service */ "./src/app/services/alert.service.ts");






var LoginPage = /** @class */ (function () {
    function LoginPage(authService, formBuilder, db, alertService) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.db = db;
        this.alertService = alertService;
        this.logging = false;
        this.loginFailed = false;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email], this.authService.emailExists.bind(this.authService)],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]]
        });
        this.error = {
            email: '',
            password: ''
        };
    };
    LoginPage.prototype.ngOnDestroy = function () {
        this.authService = null;
        this.db = null;
        this.formBuilder = null;
        this.loginForm = null;
        this.error = null;
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        // If user gets past the initial checks
        if (!this.loginForm.valid)
            return;
        // If outdated version
        if (!this.db.usable) {
            this.alertService.error(this.db.outdatedError);
            return;
        }
        this.logging = true;
        this.authService.login(this.email.value, this.password.value)
            .then(function () {
            // Login complete
            _this.loginFailed = false;
            _this.logging = false;
            // Set user link
            _this.db.userLink.name = _this.authService.user.displayName;
            _this.db.userLink.email = _this.authService.user.email;
            // Load user data
            _this.alertService.load('Loading your data...', _this.db.getUserData(_this.email.value)).then(function () {
                // Haye ho forward
                _this.authService.authState.next(true);
                _this.loginForm.reset();
            }).catch(function (err) {
                // If registration not completed
                if (err.code === 601) {
                    // Acknowledge registration is not complete
                    _this.db.userData = null;
                    // Haye ho forward
                    _this.authService.authState.next(true);
                }
            });
        }).catch(function (err) {
            // Password failed
            _this.loginFailed = true;
            _this.logging = false;
        });
    };
    LoginPage.prototype.resetPassword = function () {
        this.authService.resetPassword(this.email.value);
        this.loginFailed = false;
    };
    Object.defineProperty(LoginPage.prototype, "email", {
        // Getters
        get: function () {
            return this.loginForm.get('email');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPage.prototype, "password", {
        get: function () {
            return this.loginForm.get('password');
        },
        enumerable: true,
        configurable: true
    });
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.page.html */ "./src/app/public/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/public/login/login.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_services_database_service__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"],
            src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=public-login-login-module.js.map