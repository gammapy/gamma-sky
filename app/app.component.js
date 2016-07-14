System.register(["angular2/core", "./load-screen/load-screen.component", "./aladin-map/aladin-map.component", "./about-button/about-button.component"], function(exports_1, context_1) {
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
    var core_1, load_screen_component_1, aladin_map_component_1, about_button_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (load_screen_component_1_1) {
                load_screen_component_1 = load_screen_component_1_1;
            },
            function (aladin_map_component_1_1) {
                aladin_map_component_1 = aladin_map_component_1_1;
            },
            function (about_button_component_1_1) {
                about_button_component_1 = about_button_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = "gamma-sky";
                }
                AppComponent.prototype.ngOnInit = function () { };
                AppComponent = __decorate([
                    core_1.Component({
                        // moduleId: "app/app.component", // This allows you to call templateUrl and styleUrls
                        selector: "gamma-sky-app",
                        directives: [aladin_map_component_1.AladinMapComponent, about_button_component_1.AboutButtonComponent, load_screen_component_1.LoadScreenComponent],
                        templateUrl: "app/app.component.html",
                        styleUrls: ["app/app.component.css"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map