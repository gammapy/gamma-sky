System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AboutButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AboutButtonComponent = (function () {
                function AboutButtonComponent() {
                }
                AboutButtonComponent.prototype.aboutButtonClick = function () {
                    $("#aboutInfo").toggle();
                    this.timesClicked++;
                    if (this.timesClicked % 2 === 0) {
                        $("#aboutButton").html("About");
                    }
                    else {
                        $("#aboutButton").html("Close");
                    }
                };
                AboutButtonComponent.prototype.resizeAboutMargin = function (pageWidth) {
                    if (pageWidth > 800) {
                        document.getElementById("aboutButton").style.right = "100px";
                        document.getElementById("aboutInfo").style.right = "100px";
                    }
                    if (pageWidth <= 800) {
                        document.getElementById("aboutButton").style.right = "50px";
                        document.getElementById("aboutInfo").style.right = "50px";
                    }
                    if (pageWidth > 500) {
                        document.getElementById("aboutInfo").style.width = "410px";
                    }
                    if (pageWidth <= 500) {
                        document.getElementById("aboutInfo").style.width = "205px";
                    }
                };
                AboutButtonComponent.prototype.ngOnInit = function () {
                    this.timesClicked = 0;
                };
                AboutButtonComponent.prototype.ngDoCheck = function () {
                    this.resizeAboutMargin($(document).width());
                };
                AboutButtonComponent = __decorate([
                    core_1.Component({
                        selector: "about-button",
                        templateUrl: "app/about-button/about-button.component.html",
                        styleUrls: ["app/about-button/about-button.component.css"],
                    }), 
                    __metadata('design:paramtypes', [])
                ], AboutButtonComponent);
                return AboutButtonComponent;
            }());
            exports_1("AboutButtonComponent", AboutButtonComponent);
        }
    }
});
//# sourceMappingURL=about-button.component.js.map