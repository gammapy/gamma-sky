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
    var AladinMapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AladinMapComponent = (function () {
                function AladinMapComponent() {
                }
                AladinMapComponent.prototype.ngOnInit = function () {
                    var map;
                    function show_map() {
                        map = A.aladin("#aladin-lite-div", {
                            fullScreen: true,
                            showFullscreenControl: false,
                            survey: "P/Fermi/color",
                            cooFrame: "galactic",
                            target: "0 +0",
                            fov: 180,
                            allowFullZoomout: true,
                            showShareControl: true,
                        });
                    }
                    function add_catalog(catalogName, catalogColor, data) {
                        console.log("This is add_catalog");
                        var catalog = data;
                        var assocType;
                        var classType;
                        if (catalogName == "3FGL") {
                            assocType = "ASSOC1";
                            classType = "CLASS1";
                        }
                        else if (catalogName == "2FHL") {
                            assocType = "ASSOC";
                            classType = "CLASS";
                        }
                        else if (catalogName == "SNRcat") {
                            assocType = "id_alt";
                        }
                        var cat = A.catalog({
                            name: catalogName,
                            color: catalogColor,
                            sourceSize: 13,
                        });
                        map.addCatalog(cat);
                        var n_sources = Object.keys(catalog.Source_Name).length;
                        console.log(n_sources);
                        for (var i = 0; i < n_sources; i++) {
                            var row = i.toString();
                            var round_ra = (Math.round(catalog['RAJ2000'][row] * 100) / 100).toFixed(2);
                            var round_dec = (Math.round(catalog['DEJ2000'][row] * 100) / 100).toFixed(2);
                            var round_glon = (Math.round(catalog['GLON'][row] * 100) / 100).toFixed(2);
                            var round_glat = (Math.round(catalog['GLAT'][row] * 100) / 100).toFixed(2);
                            var source = {
                                name: catalog['Source_Name'][row],
                                ra: round_ra,
                                dec: round_dec,
                                glon: round_glon,
                                glat: round_glat
                            };
                            source.assoc = catalog[assocType][row];
                            source.assocLabel = "Assoc:";
                            // source.lineFour will:
                            //      - Set the SOURCE TYPE for 3FGL and 2FHL catalogs.
                            //      - Set the RADIUS for SNRcat catalog.
                            // TODO Split these up.
                            if (catalogName === "3FGL" || catalogName === "2FHL") {
                                source.lineFour = catalog[classType][row];
                                source.lineFourLabel = "Source Type:";
                            }
                            else if (catalogName === "SNRcat") {
                                source.lineFour = ((Math.round(catalog['size_radio_mean'][row] * 100) / 100) / 60).toFixed(2) + "&#176";
                                source.lineFourLabel = "Radius:";
                            }
                            if (catalogName === "SNRcat") {
                                source.prefix = "SNRcat ";
                            }
                            else {
                                source.prefix = "";
                            }
                            var marker = A.marker(catalog['RAJ2000'][row], catalog['DEJ2000'][row], {
                                popupDesc: "\
                            <div> \
                              \
                              <h3 style='text-align:center'>" + source.prefix + source.name + "</h3>  \
                              \
                              <table> \
                                <tbody> \
                                  <tr> \
                                    <td>RA:</td> \
                                    <th>" + source.ra + "</th> \
                                    <td>DEC:</td> \
                                    <th>" + source.dec + "</th> \
                                  </tr> \
                                  <tr> \
                                    <td>GLON:</td> \
                                    <th>" + source.glon + "</th> \
                                    <td>GLAT:</td> \
                                    <th>" + source.glat + "</th> \
                                  </tr> \
                                </tbody> \
                              </table> \
                              \
                              <table> \
                                <tbody> \
                                  <tr> \
                                    <td>Assoc:</td> \
                                    <th style='width:155px'>" + source.assoc + "</th> \
                                  </tr> \
                                </tbody> \
                              </table> \
                              \
                              <table> \
                                <tbody> \
                                  <tr> \
                                    <td>" + source.lineFourLabel + "</td> \
                                    <th style='width:155px'>" + source.lineFour + "</th> \
                                  </tr> \
                                </tbody> \
                              </table> \
                              \
                            </div> \
                            \
                            " + SNRcatUrl(catalogName, source.glon, source.glat) + " \
                            "
                            });
                            cat.addSources([marker]);
                        }
                    }
                    function SNRcatUrl(catalog, glonInput, glatInput) {
                        if (catalog == "SNRcat") {
                            var glon = glonInput.toString();
                            var glat = glatInput.toString();
                            var glonD = glon.substring(0, (glon.length - 3));
                            var glonM = glon.substring((glon.length - 2), (glon.length - 1));
                            var operation;
                            var glatD;
                            var glatM = glat.substring((glat.length - 2), (glat.length - 1));
                            if (glat.substring(0, 1) == "-") {
                                glatD = glat.substring(1, (glat.length - 3));
                                operation = "m";
                            }
                            else {
                                glatD = glat.substring(0, (glat.length - 3));
                                operation = "p";
                            }
                            if (glonD.length == 1) {
                                glonD = "00" + glonD;
                            }
                            if (glonD.length == 2) {
                                glonD = "0" + glonD;
                            }
                            if (glatD.length == 1) {
                                glatD = "0" + glatD;
                            }
                            var UrlId = "G" + glonD + "." + glonM + operation + glatD + "." + glatM;
                            /*jshint multistr: true */
                            return "<div style='text-align:right; margin-right:4px; font-size:12px'> \
                  <a href='http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=" + UrlId + "' target='_blank'>View source on SNRcat</a> \
                </div> \
                ";
                        }
                        else {
                            return "";
                        }
                    }
                    function main() {
                        console.log("This is main");
                        show_map();
                        $.getJSON("data/cat/cat_3fgl.json", function (data) {
                            add_catalog("3FGL", "red", data);
                        });
                        $.getJSON("data/cat/cat_2fhl.json", function (data) {
                            add_catalog("2FHL", "blue", data);
                        });
                        $.getJSON("data/cat/cat_snrcat.json", function (data) {
                            add_catalog("SNRcat", "green", data);
                            // add_overlay(
                            //     "green",
                            //     data
                            // );
                        });
                    }
                    main();
                };
                AladinMapComponent = __decorate([
                    core_1.Component({
                        // moduleId: module.id,
                        selector: "aladin-map",
                        templateUrl: "app/aladin-map/aladin-map.component.html",
                        styleUrls: ["app/aladin-map/aladin-map.component.css"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AladinMapComponent);
                return AladinMapComponent;
            }());
            exports_1("AladinMapComponent", AladinMapComponent);
        }
    }
});
//# sourceMappingURL=aladin-map.component.js.map