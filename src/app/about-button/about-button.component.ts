import {Component, DoCheck, OnInit} from '@angular/core';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: "about-button",
  templateUrl: "about-button.component.html",
  styleUrls: ["about-button.component.css"],
})

export class AboutButtonComponent implements DoCheck, OnInit {

  timesClicked: any;

  aboutButtonClick() {
    $("#aboutInfo").toggle();
    this.timesClicked++;
    if (this.timesClicked % 2 === 0) {
        $("#aboutButton").html("About");
    } else {
        $("#aboutButton").html("Close");
    }
  }

  pageWidth: any;

  resizeAboutMargin(pageWidth) {

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
  }

  ngOnInit() {
    this.timesClicked = 0;
  }

  ngDoCheck() {
    this.resizeAboutMargin($(document).width());
    }
}
