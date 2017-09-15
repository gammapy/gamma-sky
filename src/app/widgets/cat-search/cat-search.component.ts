import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MdOptionSelectionChange } from '@angular/material';

import { CatalogService } from '../../services/catalog.service';


@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.css']
})
export class CatSearchComponent implements OnInit {

  private selectedCat;
  private selectedId;
  private selectedName;

  myControl;
  options = [];
  filteredOptions: Observable<any[]>;

  constructor(private catalogService: CatalogService,
              private router: Router) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.getCatSearchItems();

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(option => option && typeof option === 'object' ? option.name : option)
      .map(name => name ? this.filter(name) : []); // this.options.slice());
  }

  // Get search entries from CatalogService
  getCatSearchItems() {
    let items = [];

    this.catalogService.getCatalogTeV()
      .subscribe(catalog => {
        makeSearchItems(catalog, items, 'common_name');
        makeSearchItemsForList(catalog, items, 'fermi_names');
        makeSearchItemsForList(catalog, items, 'gamma_names');
        makeSearchItemsForList(catalog, items, 'other_names');
      });
    this.options = items;

    this.catalogService.getCatalog3FHL()
      .subscribe(catalog => makeSearchItems(catalog, items));
    this.options.concat(items);

    this.catalogService.getCatalog3FGL()
      .subscribe(catalog => makeSearchItems(catalog, items));
    this.options.concat(items);
  }

  // Filter items in autocomplete; showing first 5 results for now.
  public filter(val: string): any[] {
    if (val) {
      let results = this.options.filter(function (s) {
        return s.name.toLowerCase().includes(val.toLowerCase())
      });
      return results.slice(0, 5);
    } else {
      return [];
    }
  }

  // Maps controlled value to desired display value in dropdown
  public displayFn(option: any): string {
    return option ? option.name : option;
  }


  // When an item is selected/decselected
  onSelected(evt: MdOptionSelectionChange, option) {
    if (evt.source.selected) { // If an option is selected vs. un-selected
      this.selectedCat = option.cat;
      this.selectedId = option.id;
      this.selectedName = option.name;

      this.router.navigate(['/cat', this.selectedCat, this.selectedId]);
    } else {
      // this.router.navigate(['/cat']);
      // TODO Go to CatHelpComponent (once we add "remove selection" button)
    }
  }
}

// Creates individual source objects for each search entry
function makeSearchItems(catalog, items, nameCol = 'Source_Name') {
  for (let i = 0; i < catalog.data.length; i++) {
    items.push({
      cat: catalog.catName,
      id: catalog.data[i]['source_id'].toString(),
      name: catalog.data[i][nameCol],
    });
  }
}

// Creates separate search entries for "other names" lists
function makeSearchItemsForList(catalog, items, nameCol) {
  for(let i = 0; i < catalog.data.length; i++) {
    let entry = catalog.data[i][nameCol];
    if(entry.length != 0) {
      let entries = entry.split(',');
      for(let x in entries) {
        items.push({
          cat: catalog.catName,
          id: catalog.data[i]['source_id'].toString(),
          name: entries[x]
        });
      }
    }
  }
}
