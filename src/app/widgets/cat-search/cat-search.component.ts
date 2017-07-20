import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MdOptionSelectionChange } from '@angular/material';

import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.css']
})
export class CatSearchComponent implements OnInit, DoCheck {

  private selectedId;
  // private catalog;
  private error: any;

  private items3FGL;
  private items3FHL;
  private itemsTeV;

  myControl;
  options = [
    new User('Crab'),
    new User('Vela X'),
    new User('Galactic Center')
  ];
  selectedName;
  filteredOptions: Observable<User[]>;

  //
  // getCatSearchItems3FGL() {
  //   this.catalogService.getCatalog3FGL()
  //     .then(catalog => {
  //       let items = [];
  //
  //       for(var i = 0; i < this.data.length; i++) {
  //         items.push({
  //           text: this.getVal(i, this.sourceNameCol),
  //           id: i.toString()
  //         });
  //       }
  //       items3FGL =items;
  //     })
  // }

  getCatalogs() {

    // this.getCatSearchItems3FGL();

    // TODO: Do the above

    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.items3FGL = catalog.getCatSearchItems();
      })
      .catch(error => this.error = error);

    this.catalogService.getCatalog3FHL()
      .then(catalog => {
        this.items3FHL = catalog.getCatSearchItems();
      })
      .catch(error => this.error = error);

    this.catalogService.getCatalogTeV()
      .then(catalog => {
        this.itemsTeV = catalog.getCatSearchItems();
      })
      .catch(error => this.error = error);

  }

  setItems(items) {
    this.items = items;
  }


  // To understand the code below, see ng2-select and ngx-bootstrap docs at:
  // http://valor-software.com/ng2-select/
  // http://valor-software.com/ngx-bootstrap/

  public items: Array<any> = [];
  private value: any = {};
  public selectedCatalog;
  private tooltip;
  private disabled: boolean = false;


  public selected(value: any): void {
    console.log('Selected value is: ', value);

    this.router.navigate(['/cat', this.selectedCatalog, value.id]);


  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);

    this.router.navigate(['/cat']);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  // Filter the angular2 material dropdown
  // filter(name: string): User[] {
  //    return this.options.filter(option => new RegExp(`^${name}`, 'gi').test(option.name));
  // }
  public filter(val: string): User[] {
  return val ? this.options.filter(s =>
    s.name.toLowerCase().includes(val.toLowerCase()))
             : this.options;
  }

  // Maps controled value to desired display value in dropdown
  public displayFn(user: User): string {
    return user ? user.name : user;
  }

  // When an item is selected
  onSelected(evt: MdOptionSelectionChange, option) {
    if(evt.source.selected) { //If a source is selected vs. un-selected
      console.log("selected ", option.name);
      this.selectedName = option.name;
    }
    else {
      console.log('un-selected ', option.name);
    }
  }


  constructor(
    private catalogService: CatalogService,
    private router: Router
  ) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.getCatalogs();

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.name : user)
      .map(name => name ? this.filter(name) : this.options.slice());

    this.selectedName = 'None selected';

  }

  ngDoCheck() {
    if (this.selectedCatalog == null) {
      this.disabled = true;
      this.tooltip = false;
      // this.items = [];
    }
    else {
      this.disabled = false;
      this.tooltip = true;
    }
  }

}

class User {
  public name;
  constructor(name) {
    this.name = name;
  }
}
