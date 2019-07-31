(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./src/app/members/dashboard/dashboard.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/members/dashboard/dashboard.module.ts ***!
  \*******************************************************/
/*! exports provided: DashboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.page */ "./src/app/members/dashboard/dashboard.page.ts");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");








var routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"]
    }
];
var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"]]
        })
    ], DashboardPageModule);
    return DashboardPageModule;
}());



/***/ }),

/***/ "./src/app/members/dashboard/dashboard.page.html":
/*!*******************************************************!*\
  !*** ./src/app/members/dashboard/dashboard.page.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\r\n  <ion-toolbar color=\"translucent\">\r\n    <ion-buttons>\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-menu type=\"overlay\">\r\n  <ion-content>\r\n    <ion-list>\r\n      <!-- App Pages -->\r\n      <ion-menu-toggle auto-hide=\"false\" *ngFor=\"let p of appPages\">\r\n        <ion-item [routerDirection]=\"'root'\" (click)=\"gotoPage(p.url)\">\r\n          <ion-icon slot=\"start\" [name]=\"p.icon\"></ion-icon>\r\n          <ion-label>\r\n            {{p.title}}\r\n          </ion-label>\r\n        </ion-item>\r\n      </ion-menu-toggle>\r\n      <!-- Logout -->\r\n      <ion-menu-toggle (click)=\"logout()\">\r\n        <ion-item>\r\n          <ion-icon slot=\"start\" [name]=\"'log-out'\"></ion-icon>\r\n          <ion-label>\r\n            Logout\r\n          </ion-label>\r\n        </ion-item>\r\n      </ion-menu-toggle>\r\n    </ion-list>\r\n  </ion-content>\r\n</ion-menu>\r\n<ion-content fullscreen=\"true\">\r\n  <ion-router-outlet main>\r\n    <google-map (userChipClicked)=\"viewProfile($event)\" (pickupButtonClicked)=\"pickupClicked($event)\" #map></google-map>\r\n    <!--\r\n    <agm-map (mapClick)=\"closeWindow()\" [zoomControl]=\"false\" [streetViewControl]=\"false\"\r\n    [clickableIcons]=\"false\" [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"14\"\r\n    [styles]=\"db.userData.isDriver ? map.darkMap : map.lightMap\">\r\n      <agm-marker [latitude]=\"liveLat\" [longitude]=\"liveLng\"></agm-marker>\r\n      <agm-marker (markerClick)=selectMarker(infoWindow) *ngFor=\"let pickup of db.pickups; index as i\" [latitude]=\"pickup.lat\" [longitude]=\"pickup.lng\" [iconUrl]=\"pickupUrl(pickup, i)\">\r\n        <agm-info-window #infoWindow>\r\n          <h3>{{ pickup.name }}</h3>\r\n          <!-- Show if user is rider -->\r\n     <!--     <div *ngIf=\"!db.userData.isDriver; else notRider\">\r\n          <p *ngIf=\"pickup.drivers.length === 0; else driversAvailable\">There are currently no drivers who pass by this point.</p>\r\n          <ng-template #driversAvailable>\r\n            <b>Tap to see driver's profile: </b>\r\n            <span *ngFor=\"let driver of pickup.drivers\">\r\n              <ion-chip (click)=\"db.getUserView(driver)\" [routerLink]=\"'../../view/'\">{{ driver.name }}</ion-chip>\r\n            </span>\r\n          </ng-template>\r\n          <ion-button  size=\"small\"\r\n          *ngIf=\"!addedToLocation('riders', pickup); else addedRider\" expand=\"block\" (click)=\"addRider(pickup, i)\">I can be picked up<br>from this location</ion-button>\r\n          <ng-template #addedRider><ion-button size=\"small\" expand=\"block\" (click)=\"removeRider(pickup, i)\">Added Successfully<br>As Rider</ion-button></ng-template>\r\n          </div>\r\n          <!-- Show if user is driver -->\r\n      <!--    <ng-template #notRider>\r\n          <p *ngIf=\"pickup.riders.length === 0; else ridersAvailable\">There are currently no riders who can make it to this point.</p>\r\n          <ng-template #ridersAvailable>\r\n            <b>Tap to see rider's profile: </b>\r\n            <span *ngFor=\"let rider of pickup.riders\">\r\n              <ion-chip (click)=\"db.getUserView(rider)\" [routerLink]=\"'../../view/'\">{{ rider.name }}</ion-chip>\r\n            </span>\r\n          </ng-template>\r\n          <ion-button size=\"small\" \r\n          *ngIf=\"!addedToLocation('drivers', pickup); else addedDriver\" expand=\"block\" (click)=\"addDriver(pickup, i)\">I can pickup riders<br>from this location</ion-button>\r\n          <ng-template #addedDriver><ion-button size=\"small\" expand=\"block\" (click)=\"removeDriver(pickup, i)\">Added Successfully<br>As Driver</ion-button></ng-template>\r\n          </ng-template>\r\n        </agm-info-window>\r\n      </agm-marker>\r\n    </agm-map>-->\r\n  </ion-router-outlet>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/members/dashboard/dashboard.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/members/dashboard/dashboard.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header::after {\n  background-image: none; }\n\n.splash {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #ff7400; }\n\n.spinner {\n  width: 22vh;\n  height: 22vh;\n  background-color: #ffffff;\n  margin: 100px auto;\n  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;\n  animation: sk-rotateplane 1.2s infinite ease-in-out; }\n\n@-webkit-keyframes sk-rotateplane {\n  0% {\n    -webkit-transform: perspective(120px); }\n  50% {\n    -webkit-transform: perspective(120px) rotateY(180deg); }\n  100% {\n    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg); } }\n\n@keyframes sk-rotateplane {\n  0% {\n    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg); }\n  50% {\n    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); }\n  100% {\n    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9kYXNoYm9hcmQvQzpcXFVzZXJzXFxNb3NodVxcRGVza3RvcFxcQ2FycG9vbFxcQ2FycG9vbC9zcmNcXGFwcFxcbWVtYmVyc1xcZGFzaGJvYXJkXFxkYXNoYm9hcmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0JBQXNCLEVBQUE7O0FBRzFCO0VBQ0ksa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQixFQUFBOztBQUl2QjtFQUNJLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBRXpCLGtCQUFrQjtFQUNsQiwyREFBMkQ7RUFDM0QsbURBQW1ELEVBQUE7O0FBR3JEO0VBQ0U7SUFBSyxxQ0FBcUMsRUFBQTtFQUMxQztJQUFNLHFEQUFxRCxFQUFBO0VBQzNEO0lBQU8scUVBQXNFLEVBQUEsRUFBQTs7QUFHL0U7RUFDRTtJQUNFLHlEQUF5RDtJQUN6RCxpRUFBaUUsRUFBQTtFQUNqRTtJQUNBLDhEQUE4RDtJQUM5RCxzRUFBc0UsRUFBQTtFQUN0RTtJQUNBLGlFQUFpRTtJQUNqRSx5RUFBeUUsRUFBQSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWVtYmVycy9kYXNoYm9hcmQvZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXI6OmFmdGVyIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XHJcbn1cclxuXHJcbi5zcGxhc2gge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB6LWluZGV4OiA5OTk7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmNzQwMDtcclxuXHJcbn1cclxuXHJcbi5zcGlubmVyIHtcclxuICAgIHdpZHRoOiAyMnZoO1xyXG4gICAgaGVpZ2h0OiAyMnZoO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICBcclxuICAgIG1hcmdpbjogMTAwcHggYXV0bztcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1yb3RhdGVwbGFuZSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgYW5pbWF0aW9uOiBzay1yb3RhdGVwbGFuZSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gIH1cclxuICBcclxuICBALXdlYmtpdC1rZXlmcmFtZXMgc2stcm90YXRlcGxhbmUge1xyXG4gICAgMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIH1cclxuICAgIDUwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWSgxODBkZWcpIH1cclxuICAgIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVkoMTgwZGVnKSAgcm90YXRlWCgxODBkZWcpIH1cclxuICB9XHJcbiAgXHJcbiAgQGtleWZyYW1lcyBzay1yb3RhdGVwbGFuZSB7XHJcbiAgICAwJSB7IFxyXG4gICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKDBkZWcpIHJvdGF0ZVkoMGRlZyk7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgwZGVnKSByb3RhdGVZKDBkZWcpIFxyXG4gICAgfSA1MCUgeyBcclxuICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwLjFkZWcpIHJvdGF0ZVkoMGRlZyk7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwLjFkZWcpIHJvdGF0ZVkoMGRlZykgXHJcbiAgICB9IDEwMCUgeyBcclxuICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwZGVnKSByb3RhdGVZKC0xNzkuOWRlZyk7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwZGVnKSByb3RhdGVZKC0xNzkuOWRlZyk7XHJcbiAgICB9XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/members/dashboard/dashboard.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/members/dashboard/dashboard.page.ts ***!
  \*****************************************************/
/*! exports provided: DashboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_database_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/database.service */ "./src/app/services/database.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/helper-classes */ "./src/app/services/helper-classes.ts");
/* harmony import */ var src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/alert.service */ "./src/app/services/alert.service.ts");








var DashboardPage = /** @class */ (function () {
    function DashboardPage(authService, db, router, cs, alertService) {
        var _this = this;
        this.authService = authService;
        this.db = db;
        this.router = router;
        this.cs = cs;
        this.alertService = alertService;
        // Menu
        this.appPages = [
            {
                title: 'My Profile',
                url: '/profile',
                icon: 'person'
            },
            {
                title: 'Messages',
                url: '/messages',
                icon: 'mail'
            }
        ];
        // Map location
        this.lat = 0;
        this.lng = 0;
        this.updated = false;
        // Marker Location
        this.liveLat = 0;
        this.liveLng = 0;
        // Load all chats live
        db.getLiveDoc("users/" + db.userLink.email).subscribe(function (doc) { return db.userData.chats = doc.payload.data()['chats']; }, function (err) { return _this.alertService.error.bind(_this.alertService, err); });
        // Update all messages within chats
        cs.loadMessages();
        // PICKUPS
        // this.makePickup(24.934478, 67.177173, 'Malir Cantt Gate 6 Phase II');
        // this.makePickup(24.940228, 67.18198, 'Askari 5');
        // this.makePickup(24.961253, 67.187153, 'Phase 1');
        // this.makePickup(24.954533, 67.180362, 'Falcon');
        // this.makePickup(24.948738, 67.214524, 'CMH');
        // this.makePickup(24.931672, 67.204522, 'X20');
        // this.makePickup(24.928067, 67.204628, 'Cantt Bazar');
        // this.makePickup(24.925115, 67.202414, 'Malir Cantt Gate #2');
        // this.makePickup(24.950412, 67.1068, 'Fariya Chowke');
        // this.makePickup(24.954445, 67.117268, 'Kaneez Fatima');
        // this.makePickup(24.957601, 67.121253, 'Madras Choke');
        // this.makePickup(24.951597, 67.131382, 'Suchal Goath');
        // this.makePickup(24.955852, 67.134924, 'Kiran Hospital');
        // this.makePickup(24.951857, 67.140102, 'Chapal Garden');
        // this.makePickup(24.895306, 67.212212, 'Malir');
        // this.makePickup(24.9125912, 67.1398402, 'Sindh Baloch');
        // this.makePickup(24.923641, 67.137724, 'Kamran Chowrangi');
        // this.makePickup(24.920396, 67.134292, 'Munawar Chowrangi');
        // this.makePickup(24.916553, 67.130302, 'Rado Center');
        // this.makePickup(24.914032, 67.127501, 'Darul Sehat');
        // this.makePickup(25.0188857, 66.9766756, 'Maymar Mobile Mall');
        // this.makePickup(24.948403, 67.090934, 'Al Asif');
        // this.makePickup(24.9422, 67.096592, 'Paradise Bakery');
        // this.makePickup(24.934926, 67.105316, 'Maskan');
        // this.makePickup(24.929155, 67.097531, 'Disco Bakery');
        // this.makePickup(24.910761, 67.105306, 'Aladin');
        // this.makePickup(24.906696, 67.111199, 'Lasania');
        // this.makePickup(24.900868, 67.11631, 'Askari 4');
        // this.makePickup(25.006514, 67.0641, '4K Stop');
        // this.makePickup(25.000641, 67.064861, '2 Minute');
        // this.makePickup(24.98527, 67.06543, 'Power House');
        // this.makePickup(24.978579, 67.066708, 'Saleem Center');
        // this.makePickup(24.972588, 67.066634, 'UP-More');
        // this.makePickup(24.966045, 67.067371, 'Nagan (DahliHall)');
        // this.makePickup(24.962792, 67.053765, 'Shadman2-1');
        // this.makePickup(24.959528, 67.050178, 'Sakhi Hassan');
        // this.makePickup(24.947471, 67.065896, 'DC Office');
        // this.makePickup(24.9328, 67.082907, 'UBL Sports(KIHD)');
        // this.makePickup(24.985161, 67.055121, 'Ajmair Nagri');
        // this.makePickup(24.978726, 67.0555, 'Bara Dari');
        // this.makePickup(24.955192, 67.058664, 'Babul Islam');
        // this.makePickup(24.971885, 67.056017, 'Disco More');
        // this.makePickup(24.964608, 67.067094, 'Al Habib');
        // this.makePickup(24.951333, 67.005478, 'Kalandria');
        // this.makePickup(24.936616, 67.055147, 'Landi Kotal');
        // this.makePickup(24.93243, 67.059299, 'Tahir Villas');
        // this.makePickup(24.927419, 67.064404, 'Ayesha Manzil');
        // this.makePickup(24.930534, 67.071653, 'Naseerabad');
        // this.makePickup(24.948283, 67.040367, 'Shipowner');
        // this.makePickup(24.942595, 67.047492, '5 Star');
        // this.makePickup(24.947656, 67.051718, 'Farooq-e-Azam');
        // this.makePickup(24.947155, 67.052585, 'Mateen Food');
        // this.makePickup(24.941094, 67.060381, 'Niaz Manzil');
        // this.makePickup(24.94261, 67.06193, 'Dental College');
        // this.makePickup(24.936819, 67.075986, 'Gulberg');
        // this.makePickup(24.96492, 67.053357, 'Anda More');
        // this.makePickup(24.971885, 67.056017, 'Disco More');
        // this.makePickup(24.960589, 67.072985, 'Café 2 days');
        // this.makePickup(24.938021, 67.085555, 'Fazal Mill');
        // this.makePickup(24.893814, 67.030667, 'Bara Board');
        // this.makePickup(24.901624, 67.03011, 'Golimar Chowrangi');
        // this.makePickup(24.910939, 67.030739, 'Petrol Pump');
        // this.makePickup(24.910104, 67.039885, '4# Liaquatabad');
        // this.makePickup(24.909338, 67.048472, '10# LaluKhait');
        // this.makePickup(24.90817, 67.061921, 'Baloch Hotel');
        // this.makePickup(24.901103, 67.072968, 'Hassan Square');
        // this.makePickup(24.904838, 67.079146, 'Mumtaz Manzil');
        // this.makePickup(24.908587, 67.084079, 'Baitul Mukaram');
        // this.makePickup(24.91133, 67.094277, 'Urdu Science');
        // this.makePickup(24.908394, 67.109281, 'Lal Flate');
        // this.makePickup(24.873023, 67.022105, 'Garden PSO Pump');
        // this.makePickup(24.876843, 67.03091, 'Soldier Bazar 1,2,3');
        // this.makePickup(24.880543, 67.039768, 'Guromander');
        // this.makePickup(24.885032, 67.056977, 'Jail Chorangi');
        // this.makePickup(24.889253, 67.061191, 'New Town');
        // this.makePickup(24.888773, 67.065549, 'Liaquat Library');
        // this.makePickup(24.888326, 67.086611, 'Peer Pagara Road');
        // this.makePickup(24.865049, 67.023619, 'Gull Plaza');
        // this.makePickup(24.866468, 67.027371, '7 Day');
        // this.makePickup(24.873049, 67.036527, 'Numaish');
        // this.makePickup(24.868056, 67.052539, 'Noorani');
        // this.makePickup(24.881477, 67.063469, 'Khalid Bin Walid (Medicare)');
        // this.makePickup(24.884008, 67.064465, 'Sharfabad');
        // this.makePickup(24.882394, 67.06728, 'Bahadurabad');
        // this.makePickup(24.890298, 67.072096, 'Agha Khan H.');
        // this.makePickup(24.893613, 67.088223, 'Dalmian (Bahria Uni)');
        // this.makePickup(24.871117, 67.094426, 'Karachi Auditorium');
        // this.makePickup(24.883069, 67.02652, 'Ali bhai');
        // this.makePickup(24.87016, 66.988609, 'Jamat Khana');
        // this.makePickup(24.881784, 67.033714, 'Fatimeet');
        // this.makePickup(24.86793, 67.05241, 'Noori Kabab');
        // this.makePickup(24.860532, 67.032146, 'Zahid Nehari');
        // this.makePickup(24.872126, 67.059917, 'Laberty');
        // this.makePickup(24.872097, 67.070256, 'Hill Park');
        // this.makePickup(24.883495, 67.082188, 'Zubaida Hospital');
        // this.makePickup(24.834133, 67.033652, '3 Talwar');
        // this.makePickup(24.843838, 67.04022, 'Cantt Station');
        // this.makePickup(24.849174, 67.050121, 'Kala Pull');
        // this.makePickup(24.848186, 66.995363, 'Tower');
        // this.makePickup(24.815534, 67.020258, 'Bilawal House');
        // this.makePickup(24.817407, 67.040236, 'Zamzama');
        // this.makePickup(24.819380, 67.045720, 'Gizri');
        // this.makePickup(24.823085, 67.058668, 'Phase 4');
        // this.makePickup(24.807343, 67.076992, 'Khayaban-e-Itehad');
        // this.makePickup(24.820412, 67.125101, 'Nasir Jump');
        // this.makePickup(24.831671, 67.173072, 'Landhi #6');
        // this.makePickup(24.838010, 67.181873, 'Landhi #4');
        // this.makePickup(24.844792, 67.197861, 'Landhi #1');
        // this.makePickup(24.784955, 67.065771, '26th Street');
        // this.makePickup(24.793059, 67.064710, 'Kh.Bukhari');
        // this.makePickup(24.808497, 67.061739, 'Shahbaz');
        // this.makePickup(24.829687, 67.074113, 'Xect Stop');
        // this.makePickup(24.831417, 67.076968, 'HinoBridge');
        // this.makePickup(24.867147, 67.082997, 'Singer Ch.');
        // this.makePickup(24.893421, 67.043834, 'Teen Hatti');
        // this.makePickup(24.927602, 67.064483, 'Ayesha Manzil');
        // this.makePickup(24.935812, 67.075522, 'Water Pump');
        // this.makePickup(24.918617, 67.030721, '7# Nazimabad');
        // this.makePickup(24.920216, 67.029677, 'Abbasi Hospital');
        // this.makePickup(24.922226, 67.024212, 'KhalafatChowke');
        // this.makePickup(24.928458, 67.024032, 'Abdullah College');
        // this.makePickup(24.951748, 67.002513, 'Orangi Town');
        // this.makePickup(24.921502, 67.050358, 'Mosa Colony');
        // this.makePickup(24.914349, 67.056928, 'Usman Memorial');
        // this.makePickup(24.897796, 67.077079, 'DC Office');
        // this.makePickup(24.882578, 67.355984, 'Gulshan-e-Hadeed');
        // this.makePickup(24.862922, 67.336711, 'Steel Town');
        // this.makePickup(24.872938, 67.291769, 'Razaqabad');
        // this.makePickup(24.932593, 67.155116, 'Comander CNG Pump');
        // this.makePickup(24.942917, 67.150503, 'Safoora');
        // this.makePickup(24.933983, 67.177425, 'Cantt Gate 2');
        // this.makePickup(24.927707, 67.203264, 'Cantt Gate');
        // this.makePickup(24.903156, 67.182185, 'Model More');
        // this.makePickup(24.901899, 67.190030, 'Model Colony');
        // this.makePickup(24.893387, 67.194334, 'Saudabad');
        // this.makePickup(24.879018, 67.188486, 'Malir 15');
        // this.makePickup(24.859214, 67.017572, 'Urdu Bazar');
        // this.makePickup(24.86076, 67.024159, 'Regal');
        // this.makePickup(24.856796, 67.030682, 'Sarawan');
        // this.makePickup(24.857308, 67.033193, 'Lucky Star');
        // this.makePickup(24.855429, 67.040002, 'Regent Plaza');
        // this.makePickup(24.858763, 67.050324, 'FTC');
        // this.makePickup(24.860607, 67.062839, 'Nursery');
        // this.makePickup(24.862432, 67.06972, 'Lal Kothi');
        // this.makePickup(24.883961, 67.115791, 'PAF Base Faisal');
        // this.makePickup(24.887068, 67.125535, 'Dig Road');
        // this.makePickup(24.887344, 67.155995, 'Star Gate');
        // this.makePickup(24.885526, 67.167993, 'Wireless Gate');
        // this.makePickup(24.884407, 67.175378, 'Malir Halt');
        // this.makePickup(24.936800, 67.031360, 'Asghar Ali Std');
        // this.makePickup(24.944173, 67.031341, 'Katti Pahari');
        // this.makePickup(24.923312, 67.068043, 'Muka Chowke');
        // this.makePickup(24.920423, 67.070867, 'Bhijan Choke');
        // this.makePickup(24.916562, 67.081454, '13D1Signal');
        // this.makePickup(24.920454, 67.086561, 'Mochi More');
        // this.makePickup(24.931289, 67.037070, 'KDA');
        // this.makePickup(24.937063, 67.042261, 'Haydri');
        // this.makePickup(24.961776, 67.070571, 'Al Habib');
        // this.makePickup(24.959513, 67.074589, 'Namak Bank');
        // this.makePickup(24.918588, 67.129594, 'Johar Mor');
        // this.makePickup(24.907946, 67.119138, 'Hill Top');
        // this.makePickup(24.905789, 67.116395, 'Perfume Chowke');
        // this.makePickup(24.912153, 67.125686, 'Johar Chowrangi');
        // this.makePickup(24.937416, 67.144295, 'Mosmiyat');
        // this.makePickup(24.891683, 67.177928, 'Security Printing');
        // this.makePickup(24.938205, 67.150186, 'Johar Complex');
        // this.makePickup(24.917428, 67.097471, 'NIPA');
        // this.makePickup(24.925555, 67.107851, 'Safari Park');
        // this.makePickup(24.928503, 67.111856, 'Samama');
        // this.makePickup(24.923200, 67.117286, 'Continental');
        // this.makePickup(24.939230, 67.159053, 'Kesc Society');
        // this.makePickup(24.849272, 67.050196, 'Kala Pull');
        // this.makePickup(24.836742, 67.067651, 'Defence More');
        // this.makePickup(24.834717, 67.071679, 'Akhter Colony');
        // this.makePickup(24.833491, 67.080648, 'Defence View');
        // this.makePickup(24.862392, 67.087594, 'PAF Chapter');
    }
    DashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.map.getLiveLocation().subscribe(function (resp) {
            // Map coords will update once when map location is enabled
            if (resp.coords.latitude !== 0 && resp.coords.longitude !== 0)
                if (!_this.updated) {
                    _this.lat = resp.coords.latitude;
                    _this.lng = resp.coords.longitude;
                    _this.updated = true;
                    var mapOptions = {
                        center: new google.maps.LatLng(_this.lat, _this.lng),
                        zoom: 14,
                        disableDefaultUI: true,
                        clickableIcons: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: _this.db.userData.isDriver ? _this.map.darkMap : _this.map.lightMap
                    };
                    _this.map.initMap(mapOptions);
                }
                else {
                    // Position marker will keep changing
                    _this.liveLat = resp.coords.latitude;
                    _this.liveLng = resp.coords.longitude;
                    // Add marker for live location
                    _this.map.addMarker(new google.maps.LatLng(_this.liveLat, _this.liveLng));
                }
        }, console.error);
        this.showPickups();
    };
    DashboardPage.prototype.gotoPage = function (path) {
        this.map.closeWindow();
        this.router.navigateByUrl('members' + path);
    };
    DashboardPage.prototype.logout = function () {
        this.db.theme.setTheme(false);
        this.db.ngOnDestroy();
        this.cs.ngOnDestroy();
        this.authService.logout();
    };
    // Pikcups
    DashboardPage.prototype.makePickup = function (lat, lng, name) {
        if (name === void 0) { name = 'Unnamed Place'; }
        this.db.unionArray('app/pickups', 'locations', Object.assign({}, new src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_5__["Location"](lat, lng, name))).catch(this.alertService.error);
    };
    DashboardPage.prototype.showPickups = function () {
        var _this = this;
        this.db.getLivePickups().subscribe(function (pickups) {
            // Show each pickup point
            pickups.forEach(function (pickup, index) {
                // Lat Lng
                var latLng = new google.maps.LatLng(pickup.lat, pickup.lng);
                // Icon URL
                var color;
                // Look if added as driver or rider
                if (_this.db.userData.isDriver)
                    color = pickup.drivers.find(function (driver) { return driver['email'] === _this.db.userLink.email; }) ? 'green' : 'blue';
                else
                    color = pickup.riders.find(function (rider) { return rider['email'] === _this.db.userLink.email; }) ? 'green' : 'blue';
                // Use green if added otherwise blue
                var icon = "../../../assets/img/" + color + "_location.png";
                // Content
                var content = "<h3>" + pickup.name + "</h3>";
                // Show if user is rider
                if (!_this.db.userData.isDriver) {
                    if (pickup.drivers.length === 0) {
                        content += '<p>There are currently no drivers who pass by this point.</p>';
                    }
                    else {
                        content += "<b>Tap to see driver's profile: </b>";
                        pickup.drivers.forEach(function (driver) {
                            content += "\n              <span>\n              <ion-chip data-email=\"" + driver.email + "\">" + driver.name + "</ion-chip>\n              </span>\n              ";
                        });
                    }
                    // Button
                    if (!_this.addedToLocation('riders', pickup)) {
                        content += "\n            <ion-button class=\"pickup-button\" id=\"addRider\" size=\"small\" expand=\"block\"\n            data-location='" + JSON.stringify(pickup) + "' data-index=\"" + index + "\">\n            I can be picked up<br>from this location\n            </ion-button>\n            ";
                    }
                    else {
                        content += "\n            <ion-button class=\"pickup-button\" id=\"removeRider\" size=\"small\" expand=\"block\"\n            data-location='" + JSON.stringify(pickup) + "' data-index=\"" + index + "\">\n              Added Successfully<br>As Rider\n            </ion-button>\n            ";
                    }
                }
                else {
                    if (pickup.riders.length === 0) {
                        content += '<p>There are currently no riders who can make it to this point.</p>';
                    }
                    else {
                        content += "<b>Tap to see rider's profile: </b><br>";
                        pickup.riders.forEach(function (rider) {
                            content += "\n              <span>\n              <ion-chip data-email=\"" + rider.email + "\">" + rider.name + "</ion-chip>\n              </span>\n              ";
                        });
                    }
                    // Button
                    if (!_this.addedToLocation('drivers', pickup)) {
                        content += "\n            <ion-button class=\"pickup-button\" id=\"addDriver\" size=\"small\" expand=\"block\"\n            data-location='" + JSON.stringify(pickup) + "' data-index=\"" + index + "\">\n              I can pickup riders<br>from this location\n            </ion-button>\n            ";
                    }
                    else {
                        content += "\n            <ion-button class=\"pickup-button\" id=\"removeDriver\" size=\"small\" expand=\"block\"\n            data-location='" + JSON.stringify(pickup) + "' data-index=\"" + index + "\">\n              Added Successfully<br>As Driver\n            </ion-button>\n            ";
                    }
                }
                // Add to map
                _this.map.addMarker(latLng, icon, content);
            });
        });
    };
    DashboardPage.prototype.viewProfile = function (userInfo) {
        this.router.navigateByUrl('members/view');
        this.db.getUserView(new src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_5__["UserLink"](userInfo[0], userInfo[1]));
    };
    DashboardPage.prototype.addedToLocation = function (addedAs, pickup) {
        var _this = this;
        // Check if added to drivers or riders
        if (pickup[addedAs])
            return pickup[addedAs].find(function (userLink) { return userLink['email'] === _this.db.userLink.email; });
        return false;
    };
    DashboardPage.prototype.pickupClicked = function (pickupInfo) {
        // Execute -> id(location, index)
        this[pickupInfo[0]](JSON.parse(pickupInfo[1]), parseInt(pickupInfo[2], 10));
    };
    DashboardPage.prototype.addRider = function (pickup, index) {
        var _this = this;
        // Confirmation
        this.alertService.confirmation("Confirm this message if you can make it to " + pickup.name + ".\n\n    Note: This will allow drivers passing by to contact you through this pickup point.", function () {
            // Adding
            _this.alertService.load('Adding as rider...', _this.db.addRider(pickup, index).catch(_this.alertService.error));
        });
    };
    DashboardPage.prototype.removeRider = function (pickup, index) {
        var _this = this;
        // Confirm
        this.alertService.confirmation("Do you want to remove yourself from the list of riders for " + pickup.name + "?", function () {
            _this.alertService.load('Removing from riders list', _this.db.removeRider(pickup, index));
        });
    };
    DashboardPage.prototype.addDriver = function (pickup, index) {
        var _this = this;
        // Confirm
        this.alertService.confirmation("Confirm this message if you pass by " + pickup.name + " and can pickup riders from here.\n\n    Note: This will allow riders to contact you through this pickup point.", function () {
            // Load
            _this.alertService.load('Adding you as a driver...', _this.db.addDriver(pickup, index));
        });
    };
    DashboardPage.prototype.removeDriver = function (pickup, index) {
        var _this = this;
        // Confirm
        this.alertService.confirmation("Do you want to remove yourself from the list of drivers for " + pickup.name + "?", function () {
            // Load
            _this.alertService.load('Removing from drivers list', _this.db.removeDriver(pickup, index));
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])('map'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DashboardPage.prototype, "map", void 0);
    DashboardPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.page.html */ "./src/app/members/dashboard/dashboard.page.html"),
            styles: [__webpack_require__(/*! ./dashboard.page.scss */ "./src/app/members/dashboard/dashboard.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            _services_database_service__WEBPACK_IMPORTED_MODULE_3__["DatabaseService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_6__["ChatService"],
            src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"]])
    ], DashboardPage);
    return DashboardPage;
}());



/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map