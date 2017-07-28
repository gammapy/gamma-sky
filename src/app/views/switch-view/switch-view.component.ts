import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'switch-view',
  templateUrl: './switch-view.component.html',
  styleUrls: ['./switch-view.component.css']
})
export class SwitchViewComponent implements OnInit {

  @Input() selectedView;

  private buttonDisplay: string;
  private route: string;

  changeButtonDisplay() {
    if (this.selectedView == "map") {
      this.buttonDisplay = "catalog";
      this.route = "cat";
    }
    else if (this.selectedView == "cat") {
      this.buttonDisplay = "map";
      this.route = "map";
    }
    else {
      console.error("changeButtonDisplay() error in SwitchViewComponent");
    }
  }

  onClick() {
    this.changeButtonDisplay();
    this.router.navigate([this.route]);
  }

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.changeButtonDisplay();
  }

}
