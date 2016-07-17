import { Component, OnInit } from '@angular/core';
import { AladinMapComponent } from './aladin-map/aladin-map.component';
import {AboutButtonComponent} from "./about-button/about-button.component";

@Component({
  moduleId: module.id,
  selector: 'gamma-sky-app',
  directives: [AladinMapComponent, AboutButtonComponent],
  templateUrl: 'gamma-sky.component.html',
  styleUrls: ['gamma-sky.component.css']
})
export class GammaSkyAppComponent implements OnInit {
  title = "gamma-sky";

  ngOnInit() {
  }
}
