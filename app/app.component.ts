import {Component, OnInit} from "angular2/core";
import {LoadScreenComponent} from "./load-screen/load-screen.component";
import {AladinMapComponent} from "./aladin-map/aladin-map.component";
import {AboutButtonComponent} from "./about-button/about-button.component";

@Component({
    // moduleId: "app/app.component", // This allows you to call templateUrl and styleUrls
    selector: "gamma-sky-app",
    directives: [AladinMapComponent, AboutButtonComponent, LoadScreenComponent],
    templateUrl: "app/app.component.html",
    styleUrls: ["app/app.component.css"]
})
export class AppComponent implements OnInit {
  title = "gamma-sky";

  ngOnInit() {}
}
