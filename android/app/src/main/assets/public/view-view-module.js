(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["view-view-module"],{

/***/ "./src/app/members/view/view.module.ts":
/*!*********************************************!*\
  !*** ./src/app/members/view/view.module.ts ***!
  \*********************************************/
/*! exports provided: ViewPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewPageModule", function() { return ViewPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _view_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view.page */ "./src/app/members/view/view.page.ts");







var routes = [
    {
        path: '',
        component: _view_page__WEBPACK_IMPORTED_MODULE_6__["ViewPage"]
    }
];
var ViewPageModule = /** @class */ (function () {
    function ViewPageModule() {
    }
    ViewPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_view_page__WEBPACK_IMPORTED_MODULE_6__["ViewPage"]]
        })
    ], ViewPageModule);
    return ViewPageModule;
}());



/***/ }),

/***/ "./src/app/members/view/view.page.html":
/*!*********************************************!*\
  !*** ./src/app/members/view/view.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>{{ this.db.viewUser.name }}</ion-title>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content padding>\r\n  <ion-avatar>\r\n    <img [src]=\"'https://ui-avatars.com/api/?name='+this.db.viewUser.name\">\r\n  </ion-avatar>\r\n  <h3>Status: </h3>\r\n  <ion-item>\r\n    <ion-label>{{this.db.viewUser.status}}</ion-label>\r\n  </ion-item>\r\n  <h3>Schedule:</h3>\r\n  <ion-item class=\"ion-text-center\">\r\n    <ion-row size=\"4\">\r\n    <ion-col size=\"12\"><h3>Day</h3></ion-col>\r\n      <ion-col size=\"12\" *ngFor=\"let day of this.db.viewUser.schedule\">{{day.name}}</ion-col>\r\n    </ion-row>\r\n    <ion-row size=\"4\">\r\n    <ion-col size=\"12\"><h3>Arrival</h3></ion-col>\r\n      <ion-col size=\"12\" *ngFor=\"let day of this.db.viewUser.schedule\">{{day.arrival}}</ion-col>\r\n    </ion-row>\r\n    <ion-row size=\"4\">\r\n    <ion-col size=\"12\"><h3>Departure</h3></ion-col>\r\n      <ion-col size=\"12\" *ngFor=\"let day of this.db.viewUser.schedule\">{{day.departure}}</ion-col>\r\n    </ion-row>\r\n  </ion-item>\r\n  <div *ngIf=\"this.db.viewUser.isDriver\">\r\n  <h3>Car Details:</h3>\r\n  <ion-item>\r\n    <ion-label>\r\n    Capacity: {{db.viewUser.car.capacity}}<br>\r\n    Filled: {{db.viewUser.car.filled}}<br>\r\n    Description: {{db.viewUser.car.description}}<br>\r\n    Oneway Trip Charges: {{db.viewUser.rate.oneway}}<br>\r\n    </ion-label>\r\n  </ion-item>\r\n  </div>\r\n  <ion-button class=\"ion-margin-top\" expand=\"block\"\r\n  [routerLink]=\"getRouterLink()\">{{ contactText() }}</ion-button>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/members/view/view.page.scss":
/*!*********************************************!*\
  !*** ./src/app/members/view/view.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-avatar {\n  margin: 0 auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy92aWV3L0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXG1lbWJlcnNcXHZpZXdcXHZpZXcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBYyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWVtYmVycy92aWV3L3ZpZXcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWF2YXRhciB7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/members/view/view.page.ts":
/*!*******************************************!*\
  !*** ./src/app/members/view/view.page.ts ***!
  \*******************************************/
/*! exports provided: ViewPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewPage", function() { return ViewPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_database_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/database.service */ "./src/app/services/database.service.ts");
/* harmony import */ var src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/chat.service */ "./src/app/services/chat.service.ts");




var ViewPage = /** @class */ (function () {
    function ViewPage(cs, db) {
        this.cs = cs;
        this.db = db;
    }
    ViewPage.prototype.ngOnInit = function () { };
    ViewPage.prototype.contactText = function () {
        var _this = this;
        // If user is not in messages, -1
        var viewIndex = this.cs.chats.findIndex(function (chat) { return chat.title === _this.db.viewUser.name; });
        var text = 'Message For CarPool';
        if (viewIndex >= 0) {
            text = 'Go To Chat';
        }
        return text;
    };
    ViewPage.prototype.getRouterLink = function () {
        var _this = this;
        var viewIndex = this.cs.chats.findIndex(function (chat) { return chat.title === _this.db.viewUser.name; });
        var text = '../../messages/new';
        if (viewIndex >= 0) {
            text = '../../messages/chat/' + this.cs.chatList[viewIndex];
        }
        return text;
    };
    ViewPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'view',
            template: __webpack_require__(/*! ./view.page.html */ "./src/app/members/view/view.page.html"),
            styles: [__webpack_require__(/*! ./view.page.scss */ "./src/app/members/view/view.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"],
            src_app_services_database_service__WEBPACK_IMPORTED_MODULE_2__["DatabaseService"]])
    ], ViewPage);
    return ViewPage;
}());



/***/ })

}]);
//# sourceMappingURL=view-view-module.js.map