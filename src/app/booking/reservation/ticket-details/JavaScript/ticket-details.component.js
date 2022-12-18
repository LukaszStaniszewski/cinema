"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TicketDetailsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var TicketDetailsComponent = /** @class */ (function () {
    function TicketDetailsComponent(ticketService) {
        this.ticketService = ticketService;
        this.option = null;
        this.totalPrice = 0;
        this.selectedTickets = null;
        this.maxTicketChecker = new rxjs_1.Observable();
        this.tickets1 = [];
        this.toggleEmitter = new core_1.EventEmitter(true);
    }
    TicketDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ticketService.getTicketInfo();
        this.ticketService.tickets$.subscribe(function (tickets) {
            _this.adjustOptions(tickets);
            _this.calculateTotalPrice(tickets);
        });
    };
    TicketDetailsComponent.prototype.adjustOptions = function (tickets) {
        var _this = this;
        tickets.forEach(function (ticket) {
            var _a;
            _this.options = __assign(__assign({}, _this.options), (_a = {}, _a[ticket.type] = new Array(ticket.ticketsLeft + 1).fill(0), _a));
        });
    };
    TicketDetailsComponent.prototype.calculateTotalPrice = function (tickets) {
        var holder = 0;
        for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
            var ticket = tickets_1[_i];
            holder += ticket.price * ticket.pickedTickets;
        }
        this.totalPrice = holder;
    };
    Object.defineProperty(TicketDetailsComponent.prototype, "tickets$", {
        get: function () {
            return this.ticketService.tickets$;
        },
        enumerable: false,
        configurable: true
    });
    TicketDetailsComponent.prototype.mapDefaultValues = function (ticket) {
        var _a = ticket[0], price = _a.price, type = _a.type;
        this.price = price;
        this.ticketType = type;
    };
    TicketDetailsComponent.prototype.getSelectedTicketValues = function (biletInfo) {
        if (biletInfo.type === this.ticketType)
            return;
        this.price = biletInfo.price;
        this.ticketType = biletInfo.type;
    };
    TicketDetailsComponent.prototype.getSelectedOption = function (_a) {
        var type = _a.type, selectedTicketsAmount = _a.selectedTicketsAmount;
        this.ticketService.adjustTotalTicketsAvaible(type, selectedTicketsAmount);
    };
    TicketDetailsComponent.prototype.checkTotalOrderedTickets = function (obj) {
        var total = Object.values(obj).reduce(function (acc, curr) { return acc + curr; }, 0);
        return total;
    };
    TicketDetailsComponent.prototype.submit = function () {
        var total = this.ticketService.calculateTotalTicketsAmount();
        if (!total)
            return this.toggleEmitter.emit(true);
        if (total > 9)
            return;
        this.toggleEmitter.emit(true);
    };
    __decorate([
        core_1.Input()
    ], TicketDetailsComponent.prototype, "seats");
    __decorate([
        core_1.Output()
    ], TicketDetailsComponent.prototype, "toggleEmitter");
    TicketDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-ticket-details',
            templateUrl: './ticket-details.component.html',
            styleUrls: ['./ticket-details.component.css']
        })
    ], TicketDetailsComponent);
    return TicketDetailsComponent;
}());
exports.TicketDetailsComponent = TicketDetailsComponent;
