(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~info-info-module~profile-profile-module"],{

/***/ "./src/app/components/google-map/google-map.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/google-map/google-map.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #map id=\"map\"></div>"

/***/ }),

/***/ "./src/app/components/google-map/google-map.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/components/google-map/google-map.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#map {\n  height: 100% !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9nb29nbGUtbWFwL0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXGNvbXBvbmVudHNcXGdvb2dsZS1tYXBcXGdvb2dsZS1tYXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx1QkFBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZ29vZ2xlLW1hcC9nb29nbGUtbWFwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI21hcCB7XHJcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/google-map/google-map.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/google-map/google-map.component.ts ***!
  \***************************************************************/
/*! exports provided: GoogleMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleMapComponent", function() { return GoogleMapComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");



var GoogleMapComponent = /** @class */ (function () {
    function GoogleMapComponent(geolocation) {
        this.geolocation = geolocation;
        // Themes
        this.darkMap = [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ];
        this.lightMap = [];
        // Close previous window
        this.infoWindowOpened = null;
        this.previousInfoWindow = null;
        // Output signals to info page
        this.screenDragged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        // Output signals to dashboard for click events
        this.userChipClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.pickupButtonClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.markers = [];
    }
    GoogleMapComponent.prototype.onClick = function (element) {
        // View profile
        if (element.tagName === 'ION-CHIP') {
            this.closeWindow();
            this.userChipClicked.emit([element.textContent, element.getAttribute('data-email')]);
        }
        // Add or remove from pickup point
        if (element.classList[0] === 'pickup-button') {
            this.closeWindow();
            this.pickupButtonClicked.emit([element.id, element.getAttribute('data-location'), element.getAttribute('data-index')]);
        }
    };
    GoogleMapComponent.prototype.initMap = function (mapOptions) {
        var _this = this;
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        // Close any info window on click
        this.map.addListener('click', function () { return _this.selectMarker(null); });
        // For map info marker dragging
        this.map.addListener('drag', function () {
            return _this.screenDragged.emit([_this.map.getCenter().lat(), _this.map.getCenter().lng()]);
        });
    };
    // For quick event adding
    GoogleMapComponent.prototype.addEventListener = function (event, callBack) {
        this.map.addListener(event, callBack);
    };
    GoogleMapComponent.prototype.addMarker = function (position, icon, content) {
        var _this = this;
        // Marker
        var marker = new google.maps.Marker({
            position: position
        });
        if (icon)
            marker.setIcon(icon);
        marker.setMap(this.map);
        if (content) {
            // Info Window
            var infoWindow_1 = new google.maps.InfoWindow({
                content: content
            });
            marker.addListener('click', function () {
                infoWindow_1.open(_this.map, marker);
                _this.selectMarker(infoWindow_1);
            });
        }
        this.markers.push(marker);
    };
    // TODO?: Implement in dashboard
    GoogleMapComponent.prototype.getMarker = function (index) {
        return this.markers[index];
    };
    GoogleMapComponent.prototype.getCurrentLocation = function () {
        return this.geolocation.getCurrentPosition();
    };
    GoogleMapComponent.prototype.getLiveLocation = function () {
        return this.geolocation.watchPosition();
    };
    GoogleMapComponent.prototype.getAddress = function (lat, lng) {
        return new Promise(function (resolve, reject) {
            // For lat lng to address
            var geocoder = new google.maps.Geocoder;
            // Reverse geocoding
            geocoder.geocode({
                location: new google.maps.LatLng(lat, lng)
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    // Result is the first elemnt
                    var result = results[0];
                    if (result !== null) {
                        resolve(result.formatted_address);
                        return;
                    }
                    reject({
                        code: 702,
                        message: 'Geocoding result is null.'
                    });
                    return;
                }
                reject({
                    code: 701,
                    message: 'Geocoding status is not OK'
                });
            });
        });
    };
    GoogleMapComponent.prototype.setLatLng = function (lat, lng) {
        this.map.setCenter(new google.maps.LatLng(lat, lng));
    };
    // Maps
    GoogleMapComponent.prototype.closeWindow = function () {
        if (this.previousInfoWindow)
            this.previousInfoWindow.close();
        this.previousInfoWindow = null;
    };
    GoogleMapComponent.prototype.selectMarker = function (infoWindow) {
        if (this.previousInfoWindow == null)
            this.previousInfoWindow = infoWindow;
        else {
            this.infoWindowOpened = infoWindow;
            this.previousInfoWindow.close();
        }
        this.previousInfoWindow = infoWindow;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapComponent.prototype, "mapElement", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapComponent.prototype, "screenDragged", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapComponent.prototype, "userChipClicked", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GoogleMapComponent.prototype, "pickupButtonClicked", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('click', ['$event.target']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [HTMLElement]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], GoogleMapComponent.prototype, "onClick", null);
    GoogleMapComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'google-map',
            template: __webpack_require__(/*! ./google-map.component.html */ "./src/app/components/google-map/google-map.component.html"),
            styles: [__webpack_require__(/*! ./google-map.component.scss */ "./src/app/components/google-map/google-map.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__["Geolocation"]])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());



/***/ }),

/***/ "./src/app/components/shared.module.ts":
/*!*********************************************!*\
  !*** ./src/app/components/shared.module.ts ***!
  \*********************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./google-map/google-map.component */ "./src/app/components/google-map/google-map.component.ts");
/* harmony import */ var _toggle_switch_toggle_switch_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toggle-switch/toggle-switch.component */ "./src/app/components/toggle-switch/toggle-switch.component.ts");






var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]
            ],
            declarations: [
                _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_4__["GoogleMapComponent"],
                _toggle_switch_toggle_switch_component__WEBPACK_IMPORTED_MODULE_5__["ToggleSwitchComponent"]
            ],
            exports: [
                _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_4__["GoogleMapComponent"],
                _toggle_switch_toggle_switch_component__WEBPACK_IMPORTED_MODULE_5__["ToggleSwitchComponent"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/components/toggle-switch/toggle-switch.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/toggle-switch/toggle-switch.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"onoffswitch\">\r\n  <input [(ngModel)]=\"value\" [checked]=\"value\" (click)=\"switch()\" type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\">\r\n  <label class=\"onoffswitch-label\" for=\"myonoffswitch\">\r\n      <span [attr.data-on]=\"onText\" [attr.data-off]=\"offText\" class=\"onoffswitch-inner\"></span>\r\n      <span class=\"onoffswitch-switch\"></span>\r\n  </label>\r\n</div>"

/***/ }),

/***/ "./src/app/components/toggle-switch/toggle-switch.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/toggle-switch/toggle-switch.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".onoffswitch {\n  position: relative;\n  width: 100px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none; }\n\n.onoffswitch-checkbox {\n  display: none; }\n\n.onoffswitch-label {\n  display: block;\n  overflow: hidden;\n  cursor: pointer;\n  border: 2px solid #999999;\n  border-radius: 20px; }\n\n.onoffswitch-inner {\n  display: block;\n  width: 200%;\n  margin-left: -100%;\n  transition: margin 0.3s ease-in 0s; }\n\n.onoffswitch-inner:before, .onoffswitch-inner:after {\n  display: block;\n  float: left;\n  width: 50%;\n  height: 38px;\n  padding: 0;\n  line-height: 38px;\n  font-size: 16px;\n  color: white;\n  font-family: Trebuchet, Arial, sans-serif;\n  font-weight: bold;\n  box-sizing: border-box; }\n\n.onoffswitch-inner:before {\n  content: attr(data-on);\n  padding-left: 10px;\n  background-color: #8CBA80;\n  color: white; }\n\n.onoffswitch-inner:after {\n  content: attr(data-off);\n  padding-right: 10px;\n  background-color: #3880ff;\n  color: white;\n  text-align: right; }\n\n.onoffswitch-switch {\n  display: block;\n  width: 20px;\n  margin: 9px;\n  background: #FFFFFF;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 58px;\n  border: 2px solid #999999;\n  border-radius: 20px;\n  transition: all 0.3s ease-in 0s; }\n\n.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {\n  margin-left: 0; }\n\n.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {\n  right: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy90b2dnbGUtc3dpdGNoL0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXGNvbXBvbmVudHNcXHRvZ2dsZS1zd2l0Y2hcXHRvZ2dsZS1zd2l0Y2guY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBa0I7RUFBRSxZQUFZO0VBQ2hDLHlCQUF3QjtFQUFFLHNCQUFxQjtFQUFFLHFCQUFxQixFQUFBOztBQUUxRTtFQUNJLGFBQWEsRUFBQTs7QUFFakI7RUFDSSxjQUFjO0VBQUUsZ0JBQWdCO0VBQUUsZUFBZTtFQUNqRCx5QkFBeUI7RUFBRSxtQkFBbUIsRUFBQTs7QUFFbEQ7RUFDSSxjQUFjO0VBQUUsV0FBVztFQUFFLGtCQUFrQjtFQUMvQyxrQ0FBa0MsRUFBQTs7QUFFdEM7RUFDSSxjQUFjO0VBQUUsV0FBVztFQUFFLFVBQVU7RUFBRSxZQUFZO0VBQUUsVUFBVTtFQUFFLGlCQUFpQjtFQUNwRixlQUFlO0VBQUUsWUFBWTtFQUFFLHlDQUF5QztFQUFFLGlCQUFpQjtFQUMzRixzQkFBc0IsRUFBQTs7QUFFMUI7RUFDSSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixZQUFZLEVBQUE7O0FBRWhCO0VBQ0ksdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGlCQUFpQixFQUFBOztBQUVyQjtFQUNJLGNBQWM7RUFBRSxXQUFXO0VBQUUsV0FBVztFQUN4QyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQUUsTUFBTTtFQUFFLFNBQVM7RUFDckMsV0FBVztFQUNYLHlCQUF5QjtFQUFFLG1CQUFtQjtFQUM5QywrQkFBK0IsRUFBQTs7QUFFbkM7RUFDSSxjQUFjLEVBQUE7O0FBRWxCO0VBQ0ksVUFBVSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy90b2dnbGUtc3dpdGNoL3RvZ2dsZS1zd2l0Y2guY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIub25vZmZzd2l0Y2gge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB3aWR0aDogMTAwcHg7XHJcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7IC1tb3otdXNlci1zZWxlY3Q6bm9uZTsgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG59XHJcbi5vbm9mZnN3aXRjaC1jaGVja2JveCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcbi5vbm9mZnN3aXRjaC1sYWJlbCB7XHJcbiAgICBkaXNwbGF5OiBibG9jazsgb3ZlcmZsb3c6IGhpZGRlbjsgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgIzk5OTk5OTsgYm9yZGVyLXJhZGl1czogMjBweDtcclxufVxyXG4ub25vZmZzd2l0Y2gtaW5uZXIge1xyXG4gICAgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAyMDAlOyBtYXJnaW4tbGVmdDogLTEwMCU7XHJcbiAgICB0cmFuc2l0aW9uOiBtYXJnaW4gMC4zcyBlYXNlLWluIDBzO1xyXG59XHJcbi5vbm9mZnN3aXRjaC1pbm5lcjpiZWZvcmUsIC5vbm9mZnN3aXRjaC1pbm5lcjphZnRlciB7XHJcbiAgICBkaXNwbGF5OiBibG9jazsgZmxvYXQ6IGxlZnQ7IHdpZHRoOiA1MCU7IGhlaWdodDogMzhweDsgcGFkZGluZzogMDsgbGluZS1oZWlnaHQ6IDM4cHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7IGNvbG9yOiB3aGl0ZTsgZm9udC1mYW1pbHk6IFRyZWJ1Y2hldCwgQXJpYWwsIHNhbnMtc2VyaWY7IGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG4ub25vZmZzd2l0Y2gtaW5uZXI6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1vbik7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOENCQTgwO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5vbm9mZnN3aXRjaC1pbm5lcjphZnRlciB7XHJcbiAgICBjb250ZW50OiBhdHRyKGRhdGEtb2ZmKTtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzg4MGZmO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuLm9ub2Zmc3dpdGNoLXN3aXRjaCB7XHJcbiAgICBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDIwcHg7IG1hcmdpbjogOXB4O1xyXG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBib3R0b206IDA7XHJcbiAgICByaWdodDogNThweDtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICM5OTk5OTk7IGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluIDBzOyBcclxufVxyXG4ub25vZmZzd2l0Y2gtY2hlY2tib3g6Y2hlY2tlZCArIC5vbm9mZnN3aXRjaC1sYWJlbCAub25vZmZzd2l0Y2gtaW5uZXIge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbn1cclxuLm9ub2Zmc3dpdGNoLWNoZWNrYm94OmNoZWNrZWQgKyAub25vZmZzd2l0Y2gtbGFiZWwgLm9ub2Zmc3dpdGNoLXN3aXRjaCB7XHJcbiAgICByaWdodDogMHB4OyBcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/toggle-switch/toggle-switch.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/toggle-switch/toggle-switch.component.ts ***!
  \*********************************************************************/
/*! exports provided: ToggleSwitchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleSwitchComponent", function() { return ToggleSwitchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var ToggleSwitchComponent = /** @class */ (function () {
    function ToggleSwitchComponent() {
        this._value = false;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    ToggleSwitchComponent_1 = ToggleSwitchComponent;
    Object.defineProperty(ToggleSwitchComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    ToggleSwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChange = function (obj) { return fn(obj); };
    };
    ToggleSwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ToggleSwitchComponent.prototype.writeValue = function (value) {
        if (value) {
            this.value = value;
        }
    };
    ToggleSwitchComponent.prototype.switch = function () {
        this.value = !this.value;
        this.onChange(this.value);
        // console.log(this.value);
    };
    var ToggleSwitchComponent_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ToggleSwitchComponent.prototype, "onText", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ToggleSwitchComponent.prototype, "offText", void 0);
    ToggleSwitchComponent = ToggleSwitchComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'toggle-switch',
            template: __webpack_require__(/*! ./toggle-switch.component.html */ "./src/app/components/toggle-switch/toggle-switch.component.html"),
            providers: [
                { provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return ToggleSwitchComponent_1; }),
                    multi: true
                }
            ],
            styles: [__webpack_require__(/*! ./toggle-switch.component.scss */ "./src/app/components/toggle-switch/toggle-switch.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ToggleSwitchComponent);
    return ToggleSwitchComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~info-info-module~profile-profile-module.js.map