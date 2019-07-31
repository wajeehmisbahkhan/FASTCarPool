(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["messages-messages-module"],{

/***/ "./src/app/members/messages/chat/chat.component.html":
/*!***********************************************************!*\
  !*** ./src/app/members/messages/chat/chat.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <!-- TODO: Chat name -->\r\n    <ion-title>{{ chat.title }}</ion-title>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button [routerLink]=\"'../../'\"></ion-back-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"chat\">\r\n    <div class=\"chat-history\">\r\n      <ul>\r\n        <li class=\"clearfix\" *ngFor=\"let message of this.chat.messages\">\r\n          <!--\r\n            Align right class message-data on right\r\n            Float right and other message class for message on right\r\n            My message for message on left\r\n          -->\r\n          <div class=\"message-data\" [class.align-right]=\"!userIsSender(message)\">\r\n              <span class=\"message-data-time\" >{{ getTime(message) }}</span> &nbsp; &nbsp;\r\n              <span class=\"message-data-name\" >{{ getParticipant(message.sender).name }}</span>\r\n          </div>\r\n          <div class=\"message\" [ngClass]=\"{\r\n              'float-right': !userIsSender(message),\r\n              'other-message': !userIsSender(message),\r\n              'my-message': userIsSender(message)\r\n            }\">\r\n            {{ message.content }}\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </div> <!-- end chat-history -->\r\n    \r\n    <div class=\"chat-message clearfix\">\r\n      <ion-input [(ngModel)]=\"messageText\" placeholder=\"Enter a message...\" class=\"chat-message-input\" type=\"text\"></ion-input>\r\n      <button (click)=\"submit()\">\r\n        <ion-icon name=\"send\"></ion-icon>\r\n      </button>\r\n    </div> <!-- end chat-message -->\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/members/messages/chat/chat.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/members/messages/chat/chat.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(https://fonts.googleapis.com/css?family=Lato:400,700);\n*, *:before, *:after {\n  box-sizing: border-box; }\nbody {\n  font: 14px/20px \"Lato\", Arial, sans-serif; }\n.chat {\n  height: 100%; }\n.chat .chat-history {\n    height: 90%;\n    overflow-y: scroll; }\n.chat .chat-history ul li {\n      list-style-type: none; }\n.chat .chat-history .message-data {\n      margin-bottom: 15px; }\n.chat .chat-history .message-data-time {\n      color: #a8aab1;\n      padding-left: 6px; }\n.chat .chat-history .message {\n      color: white;\n      padding: 18px 20px;\n      line-height: 26px;\n      font-size: 16px;\n      border-radius: 7px;\n      margin-bottom: 30px;\n      width: 90%;\n      position: relative; }\n.chat .chat-history .message:after {\n        bottom: 100%;\n        left: 7%;\n        border: solid transparent;\n        content: \" \";\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n        border-bottom-color: #86BB71;\n        border-width: 10px;\n        margin-left: -10px; }\n.chat .chat-history .my-message {\n      background: #86BB71; }\n.chat .chat-history .other-message {\n      background: #94C2ED; }\n.chat .chat-history .other-message:after {\n        border-bottom-color: #94C2ED;\n        left: 93%; }\n.chat .chat-message {\n    height: 10%;\n    display: flex;\n    align-items: center;\n    background-color: var(--ion-item-background-color); }\n.chat .chat-message .chat-message-input {\n      border-radius: 1rem;\n      width: 86%;\n      margin-left: 1%;\n      background-color: var(--ion-background-color);\n      color: var(--ion-text-color);\n      display: inline-block; }\n.chat .chat-message button {\n      background: none;\n      float: right;\n      color: #94C2ED;\n      border: none;\n      cursor: pointer;\n      font-weight: bold;\n      width: 13%;\n      text-align: center; }\n.chat .chat-message button:hover {\n        color: #75b1e8; }\n.chat .chat-message button ion-icon {\n        font-size: 2rem; }\n.clearfix:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9tZXNzYWdlcy9jaGF0L0M6XFxVc2Vyc1xcTW9zaHVcXERlc2t0b3BcXENhcnBvb2xcXENhcnBvb2wvc3JjXFxhcHBcXG1lbWJlcnNcXG1lc3NhZ2VzXFxjaGF0XFxjaGF0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlFQUFZO0FBT1o7RUFDRSxzQkFBc0IsRUFBQTtBQUd4QjtFQUNFLHlDQUF5QyxFQUFBO0FBRzNDO0VBQ0UsWUFBWSxFQUFBO0FBRGQ7SUFJSSxXQUFXO0lBQ1gsa0JBQWtCLEVBQUE7QUFMdEI7TUFRTSxxQkFBcUIsRUFBQTtBQVIzQjtNQVdNLG1CQUFtQixFQUFBO0FBWHpCO01BZU0sY0FBeUI7TUFDekIsaUJBQWlCLEVBQUE7QUFoQnZCO01Bb0JNLFlBQVk7TUFDWixrQkFBa0I7TUFDbEIsaUJBQWlCO01BQ2pCLGVBQWU7TUFDZixrQkFBa0I7TUFDbEIsbUJBQW1CO01BQ25CLFVBQVU7TUFDVixrQkFBa0IsRUFBQTtBQTNCeEI7UUE4QlEsWUFBWTtRQUNaLFFBQVE7UUFDUix5QkFBeUI7UUFDekIsWUFBWTtRQUNaLFNBQVM7UUFDVCxRQUFRO1FBQ1Isa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQiw0QkFuRE87UUFvRFAsa0JBQWtCO1FBQ2xCLGtCQUFrQixFQUFBO0FBeEMxQjtNQTZDTSxtQkExRFMsRUFBQTtBQWFmO01BaURNLG1CQTdEUSxFQUFBO0FBWWQ7UUFvRFEsNEJBaEVNO1FBaUVOLFNBQVMsRUFBQTtBQXJEakI7SUE0REksV0FBVztJQUNYLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsa0RBQWtELEVBQUE7QUEvRHREO01BaUVNLG1CQUFtQjtNQUNuQixVQUFVO01BQ1YsZUFBZTtNQUNmLDZDQUE2QztNQUM3Qyw0QkFBNEI7TUFDNUIscUJBQXFCLEVBQUE7QUF0RTNCO01BMEVNLGdCQUFnQjtNQUNoQixZQUFZO01BQ1osY0F4RlE7TUF5RlIsWUFBWTtNQUNaLGVBQWU7TUFDZixpQkFBaUI7TUFDakIsVUFBVTtNQUNWLGtCQUFrQixFQUFBO0FBakZ4QjtRQW1GUSxjQUF3QixFQUFBO0FBbkZoQztRQXNGUSxlQUFlLEVBQUE7QUFXdkI7RUFDQyxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLFlBQVk7RUFDWixZQUFZO0VBQ1osV0FBVztFQUNYLFNBQVMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL21lbWJlcnMvbWVzc2FnZXMvY2hhdC9jaGF0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUxhdG86NDAwLDcwMCk7XHJcblxyXG4kZ3JlZW46ICM4NkJCNzE7XHJcbiRibHVlOiAjOTRDMkVEO1xyXG4kb3JhbmdlOiAjRTM4OTY4O1xyXG4kZ3JheTogIzkyOTU5RTtcclxuXHJcbiosICo6YmVmb3JlLCAqOmFmdGVyIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBmb250OiAxNHB4LzIwcHggXCJMYXRvXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uY2hhdCB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIFxyXG4gIC5jaGF0LWhpc3Rvcnkge1xyXG4gICAgaGVpZ2h0OiA5MCU7XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcblxyXG4gICAgdWwgbGkge1xyXG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS1kYXRhIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLm1lc3NhZ2UtZGF0YS10aW1lIHtcclxuICAgICAgY29sb3I6IGxpZ2h0ZW4oJGdyYXksIDglKTtcclxuICAgICAgcGFkZGluZy1sZWZ0OiA2cHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5tZXNzYWdlIHsgICAgICBcclxuICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICBwYWRkaW5nOiAxOHB4IDIwcHg7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAyNnB4O1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgICAgd2lkdGg6IDkwJTtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBcclxuICAgICAgJjphZnRlciB7XHJcbiAgICAgICAgYm90dG9tOiAxMDAlO1xyXG4gICAgICAgIGxlZnQ6IDclO1xyXG4gICAgICAgIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgY29udGVudDogXCIgXCI7XHJcbiAgICAgICAgaGVpZ2h0OiAwO1xyXG4gICAgICAgIHdpZHRoOiAwO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAkZ3JlZW47XHJcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxMHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubXktbWVzc2FnZSB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICRncmVlbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLm90aGVyLW1lc3NhZ2Uge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAkYmx1ZTtcclxuICAgICAgXHJcbiAgICAgICY6YWZ0ZXIge1xyXG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICRibHVlO1xyXG4gICAgICAgIGxlZnQ6IDkzJTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gIC5jaGF0LW1lc3NhZ2Uge1xyXG4gICAgaGVpZ2h0OiAxMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1pdGVtLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgLmNoYXQtbWVzc2FnZS1pbnB1dCB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XHJcbiAgICAgIHdpZHRoOiA4NiU7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAxJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGJ1dHRvbiB7XHJcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgY29sb3I6ICRibHVlO1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIHdpZHRoOiAxMyU7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgY29sb3I6IGRhcmtlbigkYmx1ZSwgNyUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlvbi1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLmNsZWFyZml4OmFmdGVyIHtcclxuXHR2aXNpYmlsaXR5OiBoaWRkZW47XHJcblx0ZGlzcGxheTogYmxvY2s7XHJcblx0Zm9udC1zaXplOiAwO1xyXG5cdGNvbnRlbnQ6IFwiIFwiO1xyXG5cdGNsZWFyOiBib3RoO1xyXG5cdGhlaWdodDogMDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/members/messages/chat/chat.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/members/messages/chat/chat.component.ts ***!
  \*********************************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var ChatComponent = /** @class */ (function () {
    function ChatComponent(cs, route) {
        this.cs = cs;
        this.route = route;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.chat = _this.cs.getChat(params.get('id'));
            // TODO: Remove DOM manipulation
            var element = document.getElementsByClassName('chat-history')[0];
            setTimeout(function () { element.scrollTop = element.scrollHeight; }, 100);
        });
    };
    ChatComponent.prototype.getParticipant = function (sender) {
        return this.chat.participants[sender];
    };
    ChatComponent.prototype.scrollMessages = function (e) {
    };
    ChatComponent.prototype.getTime = function (message) {
        var date = new Date(message.time);
        var time;
        if (date.getMinutes() < 10)
            time = date.getHours() + ":0" + date.getMinutes() + ", ";
        else
            time = date.getHours() + ":" + date.getMinutes() + ", ";
        var now = new Date();
        // If today
        if (date.getDate() === now.getDate()
            && date.getMonth() === now.getMonth()
            && date.getFullYear() === now.getFullYear())
            time += 'Today';
        // If this year
        else if (date.getFullYear() === now.getFullYear())
            time += date.getDate() + "/" + date.getMonth();
        else
            time += date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        return time;
    };
    ChatComponent.prototype.submit = function () {
        if (!this.messageText) {
            // TODO: Empty msg
            return;
        }
        this.cs.sendMessage(this.chat.id, this.messageText);
        // Reset
        this.messageText = '';
    };
    ChatComponent.prototype.userIsSender = function (message) {
        return this.getParticipant(message.sender).email === this.cs.user.email;
    };
    ChatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'chat',
            template: __webpack_require__(/*! ./chat.component.html */ "./src/app/members/messages/chat/chat.component.html"),
            styles: [__webpack_require__(/*! ./chat.component.scss */ "./src/app/members/messages/chat/chat.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_2__["ChatService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/members/messages/messages.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/members/messages/messages.module.ts ***!
  \*****************************************************/
/*! exports provided: MessagesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesPageModule", function() { return MessagesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _messages_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./messages.page */ "./src/app/members/messages/messages.page.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/members/messages/chat/chat.component.ts");
/* harmony import */ var _new_new_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./new/new.component */ "./src/app/members/messages/new/new.component.ts");









var routes = [
    {
        path: '',
        component: _messages_page__WEBPACK_IMPORTED_MODULE_6__["MessagesPage"]
    },
    {
        path: 'chat/:id',
        component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_7__["ChatComponent"]
    },
    {
        path: 'new',
        component: _new_new_component__WEBPACK_IMPORTED_MODULE_8__["NewComponent"]
    }
];
var MessagesPageModule = /** @class */ (function () {
    function MessagesPageModule() {
    }
    MessagesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_messages_page__WEBPACK_IMPORTED_MODULE_6__["MessagesPage"], _chat_chat_component__WEBPACK_IMPORTED_MODULE_7__["ChatComponent"], _new_new_component__WEBPACK_IMPORTED_MODULE_8__["NewComponent"]]
        })
    ], MessagesPageModule);
    return MessagesPageModule;
}());



/***/ }),

/***/ "./src/app/members/messages/messages.page.html":
/*!*****************************************************!*\
  !*** ./src/app/members/messages/messages.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Inbox</ion-title>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"members/dashboard\" [routerLink]=\"'../../dashboard'\"></ion-back-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content padding>\r\n  <ion-item *ngIf=\"!this.cs.isUsable(); else foreverAlone\">\r\n    <ion-text [color]=\"'danger'\" class=\"ion-text-center ion-margin\">Notice: Please update your app to view your inbox.</ion-text>\r\n  </ion-item>\r\n  <ng-template #foreverAlone>\r\n    <ion-item *ngIf=\"emptyInbox(); else inboxMessages\">\r\n      <ion-img [src]=\"'../../../assets/img/forever_alone.png'\"></ion-img>\r\n    </ion-item>\r\n  </ng-template>\r\n  <ng-template #inboxMessages>\r\n  <ion-list>\r\n    <ion-item *ngFor=\"let chat of getSortedChats()\" (click)=\"goToChat($event)\" [attr.data-chat-id]=\"chat.id\">\r\n      <ion-col size=\"8\">\r\n      <ion-label>\r\n        <b>{{ chat.title }}</b><br>\r\n        {{ getLastSender(chat.messages[chat.messages.length-1].sender, chat.participants) }}: {{ chat.messages[chat.messages.length-1].content }}\r\n      </ion-label>\r\n      </ion-col>\r\n      <ion-col size=\"4\">\r\n      <ion-label style=\"float: right\">\r\n          <ion-col size=\"6\">\r\n            {{ unreadMessages() }}\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            {{ getTime(chat.messages[chat.messages.length-1]) }}\r\n          </ion-col>\r\n      </ion-label>\r\n      </ion-col>\r\n    </ion-item>\r\n  </ion-list>\r\n  </ng-template>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/members/messages/messages.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/members/messages/messages.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbWJlcnMvbWVzc2FnZXMvbWVzc2FnZXMucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/members/messages/messages.page.ts":
/*!***************************************************!*\
  !*** ./src/app/members/messages/messages.page.ts ***!
  \***************************************************/
/*! exports provided: MessagesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesPage", function() { return MessagesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var MessagesPage = /** @class */ (function () {
    function MessagesPage(router, cs) {
        this.router = router;
        this.cs = cs;
    }
    MessagesPage.prototype.ngOnInit = function () { };
    MessagesPage.prototype.emptyInbox = function () {
        return this.cs.chatList.length === 0;
    };
    MessagesPage.prototype.getLastSender = function (sender, participants) {
        var lastSender;
        // If sender is user
        if (participants[sender].email === this.cs.user.email)
            lastSender = 'You';
        else
            // Convert email into name - loop through all participants for match
            participants.forEach(function (participant) {
                if (participants[sender].email === participant.email) {
                    lastSender = participant.name;
                }
            });
        return lastSender;
    };
    MessagesPage.prototype.getTime = function (message) {
        var date = new Date(message.time);
        var time = '';
        var now = new Date();
        // If today
        if (date.getDate() === now.getDate()
            && date.getMonth() === now.getMonth()
            && date.getFullYear() === now.getFullYear())
            if (date.getMinutes() < 10)
                time += date.getHours() + ":0" + date.getMinutes();
            else
                time += date.getHours() + ":" + date.getMinutes();
        // If this year
        else if (date.getFullYear() === now.getFullYear())
            time += date.getDate() + "/" + date.getMonth();
        else
            time += "" + date.getFullYear();
        return time;
    };
    // TODO: Get number of unread messages
    MessagesPage.prototype.unreadMessages = function () {
        return null;
    };
    MessagesPage.prototype.getSortedChats = function () {
        return this.cs.chats.sort(function (a, b) {
            // Sort by last time for last sent message
            return a.messages[a.messages.length - 1].time
                - b.messages[b.messages.length - 1].time;
        }) // Reverse
            .reverse();
    };
    MessagesPage.prototype.goToChat = function (e) {
        var id = e.currentTarget.attributes['data-chat-id'].value;
        this.router.navigate(['members', 'messages', 'chat', id]);
    };
    MessagesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-messages',
            template: __webpack_require__(/*! ./messages.page.html */ "./src/app/members/messages/messages.page.html"),
            styles: [__webpack_require__(/*! ./messages.page.scss */ "./src/app/members/messages/messages.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_2__["ChatService"]])
    ], MessagesPage);
    return MessagesPage;
}());



/***/ }),

/***/ "./src/app/members/messages/new/new.component.html":
/*!*********************************************************!*\
  !*** ./src/app/members/messages/new/new.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>New Message</ion-title>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"chat-message clearfix\">\r\n    <ion-input [(ngModel)]=\"messageText\" placeholder=\"Enter a message...\" class=\"chat-message-input\" type=\"text\"></ion-input>\r\n    <button (click)=\"sendMessage()\">\r\n      <ion-icon name=\"send\"></ion-icon>\r\n    </button>\r\n  </div> <!-- end chat-message -->\r\n</ion-content>"

/***/ }),

/***/ "./src/app/members/messages/new/new.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/members/messages/new/new.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: var(--ion-color-light); }\n\n.chat-message {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 10%;\n  display: flex;\n  align-items: center;\n  background-color: var(--ion-item-background-color); }\n\n.chat-message .chat-message-input {\n    border-radius: 1rem;\n    width: 86%;\n    margin-left: 1%;\n    background-color: var(--ion-background-color);\n    color: var(--ion-text-color);\n    display: inline-block; }\n\n.chat-message button {\n    background: none;\n    float: right;\n    color: #94C2ED;\n    border: none;\n    cursor: pointer;\n    font-weight: bold;\n    width: 13%;\n    text-align: center; }\n\n.chat-message button:hover {\n      color: #75b1e8; }\n\n.chat-message button ion-icon {\n      font-size: 2rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9tZXNzYWdlcy9uZXcvQzpcXFVzZXJzXFxNb3NodVxcRGVza3RvcFxcQ2FycG9vbFxcQ2FycG9vbC9zcmNcXGFwcFxcbWVtYmVyc1xcbWVzc2FnZXNcXG5ld1xcbmV3LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksb0NBQWEsRUFBQTs7QUFHakI7RUFDSSxlQUFlO0VBQ2YsU0FBUztFQUNULFdBQVc7RUFDWCxXQUFXO0VBQ1gsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrREFBa0QsRUFBQTs7QUFQdEQ7SUFTTSxtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLGVBQWU7SUFDZiw2Q0FBNkM7SUFDN0MsNEJBQTRCO0lBQzVCLHFCQUFxQixFQUFBOztBQWQzQjtJQWtCTSxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGNBekJRO0lBMEJSLFlBQVk7SUFDWixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixrQkFBa0IsRUFBQTs7QUF6QnhCO01BMkJRLGNBQXdCLEVBQUE7O0FBM0JoQztNQThCUSxlQUFlLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tZW1iZXJzL21lc3NhZ2VzL25ldy9uZXcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYmx1ZTogIzk0QzJFRDtcclxuaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG59XHJcblxyXG4uY2hhdC1tZXNzYWdlIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1pdGVtLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgLmNoYXQtbWVzc2FnZS1pbnB1dCB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XHJcbiAgICAgIHdpZHRoOiA4NiU7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAxJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGJ1dHRvbiB7XHJcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgY29sb3I6ICRibHVlO1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIHdpZHRoOiAxMyU7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgY29sb3I6IGRhcmtlbigkYmx1ZSwgNyUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlvbi1pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gLmNoYXQtbWVzc2FnZSB7XHJcbi8vICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbi8vICAgICB3aWR0aDogMTAwJTtcclxuLy8gICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkY1Rjg7XHJcbi8vICAgICBib3R0b206IDA7XHJcbi8vICAgICB0ZXh0YXJlYSB7XHJcbi8vICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbi8vICAgICAgICAgYm9yZGVyOiBub25lO1xyXG4vLyAgICAgICAgIHBhZGRpbmc6IDBweCAyMHB4O1xyXG4vLyAgICAgICAgIGZvbnQ6IDE0cHgvMjJweCBcIkxhdG9cIiwgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbi8vICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuLy8gICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbi8vICAgICAgICAgcmVzaXplOiBub25lO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgYnV0dG9uIHtcclxuLy8gICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbi8vICAgICAgICAgY29sb3I6ICRibHVlO1xyXG4vLyAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4vLyAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuLy8gICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4vLyAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuLy8gICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbi8vICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbi8vICAgICAgICAgYmFja2dyb3VuZDogI0YyRjVGODtcclxuLy8gICAgICAgICAmOmhvdmVyIHtcclxuLy8gICAgICAgICBjb2xvcjogZGFya2VuKCRibHVlLCA3JSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9Il19 */"

/***/ }),

/***/ "./src/app/members/messages/new/new.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/members/messages/new/new.component.ts ***!
  \*******************************************************/
/*! exports provided: NewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewComponent", function() { return NewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/helper-classes */ "./src/app/services/helper-classes.ts");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var src_app_services_database_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/database.service */ "./src/app/services/database.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var NewComponent = /** @class */ (function () {
    function NewComponent(authService, db, cs, router) {
        this.authService = authService;
        this.db = db;
        this.cs = cs;
        this.router = router;
    }
    NewComponent.prototype.ngOnInit = function () { };
    NewComponent.prototype.sendMessage = function () {
        var _this = this;
        var sender = new src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_3__["Participant"](this.authService.user.email, this.authService.user.displayName);
        var receiver = new src_app_services_helper_classes__WEBPACK_IMPORTED_MODULE_3__["Participant"](this.db.viewUser.email, this.db.viewUser.name);
        // Create chat and redirect to it
        this.cs.createChat(sender, receiver, this.messageText).then(function (id) { return _this.router.navigate(['members', 'messages', 'chat', id]); });
    };
    NewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'new',
            template: __webpack_require__(/*! ./new.component.html */ "./src/app/members/messages/new/new.component.html"),
            styles: [__webpack_require__(/*! ./new.component.scss */ "./src/app/members/messages/new/new.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            src_app_services_database_service__WEBPACK_IMPORTED_MODULE_5__["DatabaseService"],
            src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_2__["ChatService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], NewComponent);
    return NewComponent;
}());



/***/ })

}]);
//# sourceMappingURL=messages-messages-module.js.map