import { Component, OnInit, OnDestroy } from '@angular/core';
import {PopupTeV} from '../popup/popup-tev';
import {Popup3FGL} from '../popup/popup-3fgl';
import {Popup2FHL} from '../popup/popup-2fhl';
import {PopupSNRcat} from '../popup/popup-snrcat';
import {Popup3FHL} from '../popup/popup-3fhl';
import {SURVEYS} from '../../data/maps/surveys';

import {SourceTeV, Source3FHL} from '../../services/source';

// import {CatalogTeV, Catalog3FGL, Catalog2FHL, CatalogSNRcat, Catalog3FHL} from '../../services/catalog';
import {CatalogService} from '../../services/catalog.service';

declare var A: any;
declare var HpxImageSurvey: any;
declare var $: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private map;
  private cat;
  private error: any;

  showMap() {
    this.map = A.aladin("#aladin-lite-div", {
      fullScreen: true,
      showFullscreenControl: false,
      survey: "P/Fermi/color",
      cooFrame: "galactic",
      target: "0 +0",
      fov: 180,
      allowFullZoomout: true, //Hidden attribute
      showShareControl: true, //Hidden attribute, not yet working
      // showCatalog: false //Hidden attribute
    });
  }

  updateSurveys() {
    setTimeout(() => {
      HpxImageSurvey.SURVEYS = SURVEYS;
    }, 1000);
  }

// TODO: Go through this function and replace data accesses with functions, which can be defined in catalog.ts.
  addCatalogNew(catalogName, catalogColor, data) {
    console.log("Adding ", catalogName, " catalog...");

    var catalog = data;

    this.cat = A.catalog({
      name: catalogName,
      color: catalogColor,
      sourceSize: 13,
      // onClick: showPopup
    });
    this.map.addCatalog(this.cat);

    // Adding each individual source:
    var n_sources = catalog.data.length;
    console.log(catalogName, " # number of sources: ", n_sources);

    for(var i = 0; i < n_sources; i++) {
      //Configuring the popup
      var popup;

      //TODO assign ra and dec to getra() and getdec() methods in source.ts.
      //     maybe the popup constructor can be done in source.ts too?
      var ra = catalog.data[i]['RAJ2000'];
      var dec = catalog.data[i]['DEJ2000'];
      if(catalogName == "TeV") {
        ra = catalog.data[i].ra
        dec = catalog.data[i].dec
        // TODO if I pass SourceTeV to PopupTeV, I can access methods for the source.
        popup = new PopupTeV(catalog.data[i]);
      }
      else {
        popup = new Popup3FHL(catalog.data[i]);
      }

      //Adding the markers
      var marker = A.marker(
        ra,
        dec,
        {
          popupDesc: `` + popup.getDesc()
        });
      this.cat.addSources([marker]);

        //this.cat.hide() will hide all catalogs on webpage startup.

    }

  }


  addCatalog(catalogName, catalogColor, data) {
    console.log("Adding ", catalogName, " catalog...");

    var catalog = data;

    this.cat = A.catalog({
      name: catalogName,
      color: catalogColor,
      sourceSize: 13,
      // onClick: showPopup
    });
    this.map.addCatalog(this.cat);


    // Adding each individual source:

    var n_sources = catalog.getLength();
    console.log(catalogName, " # number of sources: ", n_sources);

    for(var i = 0; i < n_sources; i++) {

      //Configuring the popup
      var popup;
      var ra = catalog.getVal(i, 'RAJ2000');
      var dec = catalog.getVal(i, 'DEJ2000');

      if(catalogName == "TeV") {
        ra = catalog.getVal(i, 'ra');
        dec = catalog.getVal(i, 'dec');
        popup = new PopupTeV(catalog.getSourceByID(i));
      }
      else if(catalogName == "3FGL") {
        popup = new Popup3FGL(catalog.getSourceByID(i));
      }
      else if(catalogName == "2FHL") {
        popup = new Popup2FHL(catalog.getSourceByID(i));
      }
      else {
        popup = new PopupSNRcat(catalog.getSourceByID(i));
      }

      //Adding the markers
      var marker = A.marker(
        ra,
        dec,
        {
          popupDesc: `` + popup.getDesc()
        });

        this.cat.addSources([marker]);

        //this.cat.hide() will hide all catalogs on webpage startup.

    }

  }

  getCatalog3FHL() {
    this.catalogService.getCatalog3FHL()
      .then(catalog => {
        this.addCatalogNew(
          '3FHL',
          '#888888', //gray TODO: change color?
          catalog
        );
        //This hides 3FHL catalog on webpage startup.
        // this.cat.hide();
      })
      .catch(error => this.error = error);
  }

  getCatalog3FGL() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.addCatalog(
          '3FGL',
          '#8e189d', //purple
          catalog
        );
        //This hides 3FGL catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }
  getCatalog2FHL() {
    this.catalogService.getCatalog2FHL()
      .then(catalog => {
        this.addCatalog(
          '2FHL',
          '#1b3bad', //blue
          catalog
        );
        //This hides 2FHL catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }
  getCatalogSNRcat() {
    this.catalogService.getCatalogSNRcat()
      .then(catalog => {
        this.addCatalog(
          'SNRcat',
          'green',
          catalog
        );
        //This hides SNRcat catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }
  getCatalogTeV() {
    this.catalogService.getCatalogTeV()
      .then(catalog => {
        this.addCatalogNew(
          'TeV',
          'red',
          catalog
        );
        //This hides TeV catalog on webpage startup.
        // this.cat.hide();
      })
      .catch(error => this.error = error);
  }

  round(val) {
    return (Math.round(val * 100) / 100).toFixed(2);
  }

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {

    console.log("aladin map onInit()");

    this.showMap();

    this.updateSurveys();

    this.getCatalog3FGL();
    this.getCatalog2FHL();
    this.getCatalogSNRcat();
    this.getCatalogTeV();
    this.getCatalog3FHL();
  }

  ngOnDestroy() {
    console.log('aladin map OnDestroy');

  }

}
