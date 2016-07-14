import {Component} from "angular2/core";
declare var $: JQueryStatic;

@Component({
  selector: "load-screen",
  templateUrl: "app/load-screen/load-screen.component.html",
  styleUrls: ["app/load-screen/load-screen.component.css"]
})

export class LoadScreenComponent {


  constructor() {
    document.addEventListener("DOMContentLoaded", function() {

      $("#load_screen").remove();
      $("#aboutButton").css("position", "absolute");

    }
  }

}
