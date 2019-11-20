!(function(e) {
  function t(a) {
    if (n[a]) return n[a].exports;
    var r = (n[a] = {
      i: a,
      l: !1,
      exports: {}
    });
    return e[a].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
  }
  var n = {};
  (t.m = e),
    (t.c = n),
    (t.d = function(e, n, a) {
      t.o(e, n) ||
        Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: a
        });
    }),
    (t.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(n, "a", n), n;
    }),
    (t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (t.p = ""),
    t((t.s = 1));
})([
  function(e, t) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function(e, t, n) {
    e.exports = n(2);
  },
  function(e, t, n) {
    "use strict";
    function a() {
      var e = $(window).height() - 54;
      $("div#map").height(e - 8), C.map.invalidateSize(), $("div.content").height(e);
      var t = $(".dataTables_scrollBody");
      if (t.length) {
        var n = $(window).width() < 768 ? 273 : 265;
        t.hasHorizontalScrollBar() && (n += 10),
          (e = $("body").height() - n),
          t.css("height", e),
          C.table.columns.adjust().draw();
      }
    }
    function r(e) {
      return new P(function(t, n) {
        $.get(e, function(e) {
          t(e);
        });
      });
    }
    function o(e) {
      arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      var t = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
        n = [],
        a = [];
      e.forEach(function(e) {
        var t = e.status;
        t && (n.indexOf(t) < 0 && n.push(t), a.push(e));
      }),
        (function(e, t) {
          C.clusters.RemoveMarkers(),
            e.forEach(function(e) {
              var t = e.status,
                n = C.status_types[t].id,
                a = "status" + (n + 1),
                r = new PruneCluster.Marker(parseFloat(e.lat), parseFloat(e.lng), {
                  title: e.unit,
                  icon: L.divIcon({
                    className: "circle-div " + a,
                    iconSize: [15, 15]
                  })
                });
              (r.data.attributes = e),
                (r.data.coordinates = [e.lat, e.lng]),
                (r.category = parseInt(n)),
                C.clusters.RegisterMarker(r),
                C.status_markers[t].markers.push(r);
            }),
            C.clusters.ProcessView();
          var n = C.clusters.Cluster.ComputeGlobalBounds();
          if (n) var a = [[n.minLat, n.minLng], [n.maxLat, n.maxLng]];
          else a = C.homebounds;
          t &&
            setTimeout(function() {
              if ((C.map.fitBounds(a), !C.homebounds)) {
                var e = C.map.getCenter(),
                  t = C.map.getBoundsZoom(a, !0);
                C.map.setView([e.lat, e.lng], t),
                  C.map.once("moveend zoomend", function() {
                    C.homebounds = C.map.getBounds();
                  });
              }
            }, 200);
        })(a, t),
        (function(e) {
          $("#status-layer-wrapper").show();
          var t = $("#status-layers").html("");
          e.forEach(function(e) {
            var n = $("<label>");
            $("<input>", {
              type: "checkbox",
              value: e
            })
              .attr("checked", "checked")
              .appendTo(n);
            var a = $("<span>", {
              class: "legend-container"
            }).appendTo(n);
            $("<div>", {
              style: "background:" + C.status_types[e].color,
              class: "circle"
            }).appendTo(a),
              $("<span>", {
                text: " " + C.status_types[e].text
              }).appendTo(a),
              n.appendTo(t);
          });
        })(n);
    }
    function i(e, t) {
      var n = [];
      e.forEach(function(e) {
        var t = [];
        $.each(C.table_names, function(n, a) {
          "unit" != a && t.push(e[a]);
        }),
          t.splice(
            1,
            0,
            '<a href="' +
              e.url +
              '" target="_blank" title="click to open the Wiki page for this project">' +
              e.unit +
              "</a>"
          ),
          n.push(t);
      }),
        C.table.clear(),
        C.table.rows.add(n),
        C.table.search("").draw();
      var a = t || C.default_title;
      $("div#table h3 span").text(a);
    }
    function s(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : C.default_title;
      $("div#country-results div#results-title h3").text(t);
      var n = $("div#country-results div#total-count").empty(),
        a =
          e.length > 0
            ? e.length > 1
              ? "Tracking " + e.length.toLocaleString() + " coal-fired units"
              : "Tracking " + e.length + " coal project"
            : "Nothing found";
      $("<div>", {
        text: a
      }).appendTo(n);
    }
    function c() {
      $("form.search-form input").val(""),
        C.homebounds
          ? (m({
              force_redraw: !0,
              fitbounds: !1
            }),
            C.map.fitBounds(C.homebounds))
          : m({
              force_redraw: !0
            }),
        C.selected_country.layer.clearLayers(),
        (C.selected_country.name = ""),
        (I.filtered = null),
        $("input#map-tab").click(),
        a();
    }
    function l(e, t) {
      (t.name = e.properties.NAME),
        (("ontouchstart" in window || window.navigator.msMaxTouchPoints > 0) &&
          (y() || (navigator.userAgent.match(/iPad/i) && null != navigator.userAgent.match(/iPad/i)))) ||
          t
            .on("mouseover", function(e) {
              if (!(C.map.getZoom() > 7)) {
                var t = this.feature.properties.NAME;
                C.selected_country.name != t &&
                  (t != C.hovered && C.countries.setStyle(C.country_no_style),
                  (C.hovered = t),
                  this.setStyle(C.country_hover_style));
              }
            })
            .on("mouseout", function(e) {
              var t = this.feature.properties.NAME;
              C.selected_country.name != t && this.setStyle(C.country_no_style);
            }),
        t.on("click", u),
        t.addTo(C.countries);
    }
    function u(e) {
      if (!(C.map.getZoom() > 7)) {
        $("form#search input").val("");
        var t = e.target.feature.properties.NAME;
        (C.selected_country.name = t), p(e.target.feature), h(t, e.target._bounds);
      }
    }
    function p(e) {
      C.selected_country.layer.clearLayers(), C.selected_country.layer.addData(e);
    }
    function d() {
      Object.keys(C.basemaps).forEach(function(e) {
        C.map.removeLayer(C.basemaps[e]), C.map.removeLayer(C.basemaps.labels);
      });
    }
    function f() {
      var e = $("form#search input#mapsearch").val(),
        t = $("select#search-category").val();
      I.filtered = (function(e, t, n) {
        return e.filter(function(e) {
          return n.some(function(n) {
            return e[n].toLowerCase().includes(t.toLowerCase());
          });
        });
      })(I.tracker_data, e, C.search_categories[t]);
      var n = $("div#suggestions").empty();
      return (
        "parent" == t &&
          (n.show(),
          (function(e, t) {
            return e.filter(function(e) {
              return e.toLowerCase().includes(t.toLowerCase());
            });
          })(I.companies, e)
            .sort()
            .forEach(function(t) {
              $("<div>", {
                class: "suggestion",
                text: t
              })
                .appendTo(n)
                .mark(e);
            })),
        o(I.filtered),
        s(I.filtered, e),
        i(I.filtered, e),
        $("form#nav-table-search input").val(e),
        C.selected_country.layer.clearLayers(),
        (C.selected_country.name = ""),
        $("div#country-results").show(),
        $("a.clear-search").show(),
        !1
      );
    }
    function m(e) {
      void 0 === e && (e = {}),
        (e.name = void 0 !== e.name ? e.name : C.default_title),
        (e.map = void 0 === e.map || e.map),
        (e.results = void 0 === e.results || e.results),
        (e.table = void 0 === e.table || e.table),
        (e.force_redraw = void 0 !== e.force_redraw && e.force_redraw),
        (e.fitbounds = void 0 === e.fitbounds || e.fitbounds),
        $("div.searchwrapper a.clear-search").hide(),
        e.map && o(I.tracker_data, e.force_redraw, e.fitbounds),
        e.results && s(I.tracker_data),
        e.table && i(I.tracker_data, e.name);
    }
    function h(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
        a = [];
      switch (
        ((e = I.country_lookup[e]),
        I.tracker_data.forEach(function(t) {
          e == t.country && a.push(t);
        }),
        m({
          name: e,
          map: !0,
          results: !1,
          table: !1,
          fitbounds: !1
        }),
        s(a, e),
        i(I.tracker_data),
        e)
      ) {
        case "Russia":
          t = L.latLngBounds([38.354, 24], [78.11962, 178]);
          break;
        case "United States":
          t = L.latLngBounds([18.3, -172.6], [71.7, -67.4]);
          break;
        case "Canada":
          t = L.latLngBounds([41.6, -141], [81.7, -52.6]);
      }
      setTimeout(function() {
        C.map.fitBounds(t);
      }, n);
    }
    function y() {
      return $(window).width() < 768;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var v,
      g,
      b,
      k,
      w = n(7),
      T = n.n(w),
      x =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      P = n(3).Promise,
      C = {},
      I = {};
    (C.basemaps = {
      hybrid: L.tileLayer("https://{s}.tiles.mapbox.com/v3/greeninfo.map-zudfckcw/{z}/{x}/{y}.jpg", {
        pane: "hybrid"
      }),
      satellite: L.gridLayer.googleMutant({
        type: "satellite",
        pane: "satellite"
      }),
      basemap: L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png", {
        attribution: "©OpenStreetMap, ©CARTO",
        pane: "basemap"
      }),
      labels: L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png", {
        pane: "labels"
      })
    }),
      (C.default_basemap = "basemap"),
      (C.default_title = "Worldwide"),
      (C.outerring = [[-90, -360], [-90, 360], [90, 360], [90, -360], [-90, -360]]),
      (C.minzoom = 2),
      (C.maxzoom = 17),
      (C.maskstyle = {
        stroke: !1,
        fillColor: "#999",
        fillOpacity: 0.2,
        className: "mask"
      }),
      (C.country_hover_style = {
        stroke: !1,
        fillColor: "#fffef4",
        fillOpacity: 0.9
      }),
      (C.country_selected_style = {
        stroke: !1,
        fillColor: "#fff",
        fillOpacity: 1
      }),
      (C.country_no_style = {
        opacity: 0,
        fillOpacity: 0
      }),
      (C.attributes = {
        id: {
          name: "Tracker ID"
        },
        unit: {
          name: "Unit"
        },
        chinese_name: {
          name: "Chinese name"
        },
        plant: {
          name: "Plant"
        },
        url: {
          name: "Wiki page"
        },
        sponsor: {
          name: "Sponsor"
        },
        parent: {
          name: "Parent"
        },
        capacity: {
          name: "Capacity (MW)"
        },
        status: {
          name: "Status"
        },
        region: {
          name: "Region"
        },
        country: {
          name: "Country"
        },
        subnational: {
          name: "Subnational unit (province/state)"
        },
        year: {
          name: "Start year"
        }
      }),
      (C.status_types = {
        announced: {
          id: 0,
          text: "Announced",
          color: T.a.status1
        },
        "pre-permit": {
          id: 1,
          text: "Pre-permit",
          color: T.a.status2
        },
        permitted: {
          id: 2,
          text: "Permitted",
          color: T.a.status3
        },
        construction: {
          id: 3,
          text: "Construction",
          color: T.a.status4
        },
        shelved: {
          id: 4,
          text: "Shelved",
          color: T.a.status5
        },
        retired: {
          id: 5,
          text: "Retired",
          color: T.a.status6
        },
        cancelled: {
          id: 6,
          text: "Cancelled",
          color: T.a.status7
        },
        operating: {
          id: 7,
          text: "Operating",
          color: T.a.status8
        },
        mothballed: {
          id: 8,
          text: "Mothballed",
          color: T.a.status9
        }
      }),
      (C.status_markers = {
        announced: {
          markers: []
        },
        "pre-permit": {
          markers: []
        },
        permitted: {
          markers: []
        },
        construction: {
          markers: []
        },
        shelved: {
          markers: []
        },
        retired: {
          markers: []
        },
        cancelled: {
          markers: []
        },
        operating: {
          markers: []
        },
        mothballed: {
          markers: []
        }
      }),
      (C.markercluster_colors = Object.keys(C.status_types).map(function(e) {
        return C.status_types[e].color;
      })),
      (C.search_categories = {
        all: ["unit", "plant", "parent", "region", "country", "subnational", "year"],
        unit: ["unit", "plant"],
        parent: ["parent"],
        location: ["region", "country", "subnational"],
        year: ["year"]
      }),
      (C.search_placeholder = {
        all: "project name, company, country",
        unit: "unit name, plant name",
        parent: "company name",
        location: "place name",
        year: "year (e.g. 2010)"
      }),
      $(document).ready(function() {
        P.all([
          r("assets/harita/data/trackers.json"),
          r("assets/harita/data/countries.json"),
          r("assets/harita/data/country_lookup.csv"),
          r("assets/harita/data/companies.txt")
        ]).then(function(e) {
          var t, n, r;
          !(function(e) {
            I.country_data = e[1];
            var t = Papa.parse(e[2], {
              header: !0
            });
            (I.country_lookup = {}),
              t.data.forEach(function(e, t) {
                I.country_lookup[e.Name_map] = e.Name_csv;
              }),
              (I.tracker_data = e[0]),
              (I.companies = e[3].split("\n"));
          })(e),
            $("div a#reset-button").on("click", function() {
              c();
            }),
            $("form.search-form span.glyphicon-search").on("click", function() {
              y() ||
                $(this)
                  .closest("form")
                  .submit();
            }),
            $("div.close").on("click", function() {
              $(this)
                .parent()
                .hide();
            }),
            $("div#results-icon").on("click", function() {
              $("div#country-results").show();
            }),
            $("div.searchwrapper a.clear-search").on("click", function() {
              $(this)
                .siblings("input")
                .val("")
                .trigger("keyup"),
                $("div#suggestions").hide(),
                $(this).hide(),
                (I.filtered = null);
            }),
            $(document).click(function(e) {
              !$(e.target).closest("div#suggestions").length &&
                $("div#suggestions").is(":visible") &&
                $("div#suggestions").hide();
            }),
            $("#btn-zoom").click(function() {
              var e = this.dataset.zoom.split(","),
                t = L.latLng([e[0], e[1]]);
              d(),
                C.map.addLayer(C.basemaps.satellite),
                $('#layers-base input[data-baselayer="satellite"]').prop("checked", !0),
                C.countries.setStyle(C.country_no_style),
                (C.selected_country.name = ""),
                C.selected_country.layer.clearLayers(),
                (C.oldbounds = C.map.getBounds()),
                0 == $(".btn-back").length && C.back.addTo(C.map),
                C.map.setView(t, 16);
            }),
            (L.backButton = L.Control.extend({
              options: {
                position: "bottomleft"
              },
              onAdd: function(e) {
                var t = L.DomUtil.create("div", "btn btn-primary btn-back", t);
                (t.title = "Click to go back to the previous view"), (this._map = e);
                var n = L.DomUtil.create("a", "active", t);
                return (
                  (n.control = this),
                  (n.href = "javascript:void(0);"),
                  (n.innerHTML = '<span class="glyphicon glyphicon-chevron-left"></span> Go back to country view'),
                  L.DomEvent.addListener(n, "click", L.DomEvent.stopPropagation)
                    .addListener(n, "click", L.DomEvent.preventDefault)
                    .addListener(n, "click", function() {
                      this.control.goBack();
                    }),
                  t
                );
              },
              goBack: function() {
                C.map.fitBounds(C.oldbounds),
                  d(),
                  C.map.addLayer(C.basemaps.basemap),
                  C.map.addLayer(C.basemaps.labels),
                  $('#layers-base input[data-baselayer="basemap"]').prop("checked", !0),
                  C.back.remove(C.map);
              }
            })),
            $("div#layer-control-clear span#select-all").on("click", function(e) {
              return (
                $("div#status-layers input:not(:checked)").each(function(e) {
                  $(this).click();
                }),
                !1
              );
            }),
            $("div#layer-control-clear span#clear-all").on("click", function(e) {
              return (
                $("div#status-layers input:checked").each(function(e) {
                  $(this).click();
                }),
                !1
              );
            }),
            $("input.tab").on("click", function(e) {
              switch (e.currentTarget.id.split("-")[0]) {
                case "map":
                  C.map.invalidateSize(!1), $("form.search-form").show();
                  break;
                case "table":
                  $("form.search-form").show(), a();
                  break;
                default:
                  $("form.search-form").hide();
              }
            }),
            $("div#suggestions").on("click", "div.suggestion", function() {
              var e = this.innerText;
              $("form#search input").val(e), f(), $("div#suggestions").hide();
            }),
            $("select#search-category").on("change", function() {
              var e = $(this).val(),
                t = C.search_placeholder[e];
              $("input#mapsearch").attr("placeholder", t),
                $("div#suggestions")
                  .empty()
                  .hide();
            }),
            $("form#search input").keyup(
              _.debounce(function() {
                if (!this.value) return c();
                $(this).submit();
              }, 300)
            ),
            $("form#search").submit(function(e) {
              e.preventDefault(), $("form#search input#mapsearch").val() && f();
            }),
            (C.map = L.map(
              "map",
              ((t = {
                attributionControl: !1,
                zoomControl: !1,
                minZoom: C.minzoom,
                maxZoom: C.maxzoom
              }),
              (r = !1),
              (n = "attributionControl") in t
                ? Object.defineProperty(t, n, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                  })
                : (t[n] = r),
              t)
            )),
            L.control
              .zoom({
                position: "topright"
              })
              .addTo(C.map),
            C.map.createPane("basemap"),
            (C.map.getPane("basemap").style.zIndex = 300),
            (C.map.getPane("basemap").style.pointerEvents = "none"),
            C.map.createPane("hybrid"),
            (C.map.getPane("hybrid").style.zIndex = 301),
            (C.map.getPane("hybrid").style.pointerEvents = "none"),
            C.map.createPane("satellite"),
            (C.map.getPane("satellite").style.zIndex = 302),
            (C.map.getPane("satellite").style.pointerEvents = "none"),
            C.map.createPane("labels"),
            (C.map.getPane("labels").style.zIndex = 475),
            (C.map.getPane("labels").style.pointerEvents = "none"),
            C.map.createPane("country-mask"),
            (C.map.getPane("country-mask").style.zIndex = 320),
            C.map.createPane("country-hover"),
            (C.map.getPane("country-hover").style.zIndex = 350),
            C.map.createPane("country-select"),
            (C.map.getPane("country-select").style.zIndex = 450),
            C.map.createPane("feature-pane"),
            (C.map.getPane("feature-pane").style.zIndex = 550),
            L.control
              .attribution()
              .addTo(C.map)
              .addAttribution(
                'Interactive mapping by <a href="http://greeninfo.org" target="_blank">GreenInfo Network</a>. Data: <a href="https://globalenergymonitor.org/" target="_blank">Global Energy Monitor</a>'
              ),
            (C.mask = L.featureGroup([L.polygon(C.outerring)], {
              pane: "country-mask"
            }).addTo(C.map)),
            C.mask.setStyle(C.maskstyle),
            (C.countries = L.featureGroup([], {
              pane: "country-hover"
            }).addTo(C.map)),
            L.geoJson(I.country_data, {
              style: C.country_no_style,
              onEachFeature: l
            }),
            (C.selected_country = {}),
            (C.selected_country.layer = L.geoJson([], {
              style: C.country_selected_style,
              pane: "country-select"
            }).addTo(C.map)),
            (C.cluster_layer = L.featureGroup([], {
              pane: "feature-pane"
            }).addTo(C.map)),
            C.map.on("load", function() {
              a(), C.map.invalidateSize();
            }),
            (C.back = new L.backButton()),
            C.map.on("zoomend", function() {
              C.map.getZoom();
            }),
            (function() {
              var e = $.map(C.attributes, function(e) {
                  return e;
                }),
                t = Object.keys(C.attributes),
                n = $.inArray("url", t);
              e.splice(n, 1), t.splice(n, 1), (C.table_names = t);
              var a = [];
              $.each(e, function(e, t) {
                var n = {};
                (n.title = t.name), a.push(n);
              }),
                (C.table = $("#table-content table").DataTable({
                  data: [],
                  columnDefs: [
                    {
                      targets: [0],
                      visible: !1,
                      searchable: !1
                    }
                  ],
                  columns: a,
                  autoWidth: !0,
                  scrollY: "1px",
                  scrollX: !0,
                  lengthMenu: [50, 100, 500],
                  iDisplayLength: 100,
                  dom: "litp",
                  deferRender: !0
                }));
            })(),
            C.map.addLayer(C.basemaps.basemap),
            C.map.addLayer(C.basemaps.labels),
            $("#layers-base input").change(function() {
              var e = $(this).data().baselayer;
              d(),
                C.map.addLayer(C.basemaps[e]),
                "basemap" == e && C.map.addLayer(C.basemaps.labels),
                "satellite" == e
                  ? $('div.layer-control[data-panel="layers"]').css("bottom", "42px")
                  : $('div.layer-control[data-panel="layers"]').css("bottom", "22px");
            }),
            $("div.layer-control").on("change", "#status-layers input", function() {
              var e = $(this).val(),
                t = C.status_markers[e].markers;
              C.clusters.FilterMarkers(t, !$(this).prop("checked")), C.clusters.ProcessView();
              var n = [];
              $("div.layer-control div#status-layers input:checked").each(function(e) {
                n.push(this.value);
              });
              var a = I.filtered || I.tracker_data,
                r = a.filter(function(e) {
                  return n.indexOf(e.status) > -1;
                });
              i(r, "Status filtered"), s(r, "Status filtered");
            }),
            (function() {
              (C.clusters = new PruneClusterForLeaflet(30)),
                C.map.addLayer(C.clusters),
                (C.clusters.BuildLeafletClusterIcon = function(e) {
                  var t = new L.Icon.MarkerCluster();
                  return (t.stats = e.stats), (t.population = e.population), t;
                });
              var e = 2 * Math.PI;
              (L.Icon.MarkerCluster = L.Icon.extend({
                options: {
                  iconSize: new L.Point(22, 22),
                  className: "prunecluster leaflet-markercluster-icon"
                },
                createIcon: function() {
                  var e = document.createElement("canvas");
                  this._setIconStyles(e, "icon");
                  var t = this.options.iconSize;
                  return (e.width = t.x), (e.height = t.y), this.draw(e.getContext("2d"), t.x, t.y), e;
                },
                createShadow: function() {
                  return null;
                },
                draw: function(t, n, a) {
                  for (var r = 0, o = 0, i = C.markercluster_colors.length; o < i; ++o) {
                    var s = this.stats[o] / this.population;
                    if (s > 0) {
                      t.beginPath(), t.moveTo(11, 11), (t.fillStyle = C.markercluster_colors[o]);
                      var c = 1 == s ? 0 : 0.15,
                        l = r + c,
                        u = r + s * e;
                      u < l && (l = r),
                        t.arc(11, 11, 11, l, u),
                        (r += s * e),
                        t.lineTo(11, 11),
                        t.fill(),
                        t.closePath();
                    }
                  }
                  t.beginPath(),
                    (t.fillStyle = "white"),
                    t.arc(11, 11, 7, 0, 2 * Math.PI),
                    t.fill(),
                    t.closePath(),
                    (t.fillStyle = "#555"),
                    (t.textAlign = "center"),
                    (t.textBaseline = "middle"),
                    (t.font = "bold 9px sans-serif"),
                    t.fillText(this.population, 11, 11, 15);
                }
              })),
                (C.clusters.BuildLeafletCluster = function(e, t) {
                  var n = this,
                    a = new L.Marker(t, {
                      icon: this.BuildLeafletClusterIcon(e)
                    });
                  return (
                    a.on("click", function() {
                      var t = n.Cluster.FindMarkersInArea(e.bounds);
                      n.Cluster.ComputeBounds(t) &&
                        n._map.fire("overlappingmarkers", {
                          cluster: n,
                          markers: t,
                          center: a.getLatLng(),
                          marker: a
                        });
                    }),
                    a
                  );
                }),
                (C.clusters.PrepareLeafletMarker = function(e, t) {
                  var n =
                    "<div style='text-align:center;'><strong>" +
                    t.title +
                    "</strong><br><div class='popup-click-msg'>Click the circle for details</div></div>";
                  e.bindPopup(n),
                    e.setIcon(t.icon),
                    (e.attributes = t.attributes),
                    (e.coordinates = t.coordinates),
                    e.on("click", function() {
                      !(function(e) {
                        var t = e.attributes,
                          n = $("#tracker-modal");
                        $.each(t, function(e, t) {
                          "status" == e && (t = C.status_types[t].text),
                            $("#tracker-modal .modal-content span")
                              .filter('[data-name="' + e + '"]')
                              .text(t);
                        });
                        var a = t.url,
                          r = $("#tracker-modal .modal-content span")
                            .filter('[data-name="wiki_page"]')
                            .text("");
                        $("<a>", {
                          text: a,
                          href: a,
                          target: "_blank"
                        }).appendTo(r),
                          $("#btn-zoom").attr("data-zoom", e.attributes.lat + "," + e.attributes.lng),
                          n.modal();
                      })(this);
                    }),
                    e.on("mouseover", function() {
                      this.openPopup();
                    }),
                    e.on("mouseout", function() {
                      C.map.closePopup();
                    });
                }),
                (C.clusters.FilterMarkers = function(e, t) {
                  for (var n = 0, a = e.length; n < a; ++n) e[n].filtered = t;
                });
            })(),
            (function() {
              var e = $("select#search-category").val(),
                t = C.search_placeholder[e],
                n = $("input#mapsearch");
              if ($(window).width() < 768) {
                if (n.hasClass("collapsed")) return;
                n.addClass("collapsed"),
                  setTimeout(function() {
                    n.attr("placeholder", "");
                  }, 300),
                  n
                    .siblings()
                    .find("span.glyphicon-search")
                    .on("click", function() {
                      n.toggleClass("collapsed"),
                        n.hasClass("collapsed")
                          ? setTimeout(function() {
                              n.attr("placeholder", ""), n.val("");
                            }, 300)
                          : n.attr("placeholder", t);
                    });
              } else n.removeClass("collapsed"), n.attr("placeholder", t);
            })(),
            (function() {
              if ((e = window.location.href).indexOf("?") > -1) {
                var e = new URLSearchParams(window.location.search),
                  t = e.get("country");
                if (t) {
                  var n = I.country_lookup[t.toTitleCase()];
                  C.countries.eachLayer(function(e) {
                    if (e.name == n) {
                      var a = e.getBounds();
                      h(t, a, 2e3), i(I.tracker_data), p(e.feature);
                    }
                  });
                } else c();
              } else c();
            })(),
            setTimeout(function() {
              $(window).trigger("resize"), $("div#pleasewait").hide();
            }, 300);
        });
      }),
      $(window).resize(function() {
        a();
      }),
      String.prototype.trim ||
        (String.prototype.trim = function() {
          return this.replace(/^\s+|\s+$/g, "");
        }),
      (String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }),
      ($.fn.hasHorizontalScrollBar = function() {
        return this.get(0).scrollWidth > this.get(0).clientWidth;
      }),
      Object.keys ||
        (Object.keys = ((v = Object.prototype.hasOwnProperty),
        (g = !{
          toString: null
        }.propertyIsEnumerable("toString")),
        (k = (b = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ]).length),
        function(e) {
          if ("object" != (void 0 === e ? "undefined" : x(e)) && ("function" != typeof e || null === e))
            throw new TypeError("Object.keys called on non-object");
          var t,
            n,
            a = [];
          for (t in e) v.call(e, t) && a.push(t);
          if (g) for (n = 0; k > n; n++) v.call(e, b[n]) && a.push(b[n]);
          return a;
        })),
      (String.prototype.toTitleCase = function() {
        var e, t, n, a, r;
        for (
          n = this.replace(/([^\W_]+[^\s-]*) */g, function(e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
          }),
            e = 0,
            t = (a = [
              "A",
              "An",
              "The",
              "And",
              "But",
              "Or",
              "For",
              "Nor",
              "As",
              "At",
              "By",
              "For",
              "From",
              "In",
              "Into",
              "Near",
              "Of",
              "On",
              "Onto",
              "To",
              "With"
            ]).length;
          t > e;
          e++
        )
          n = n.replace(new RegExp("\\s" + a[e] + "\\s", "g"), function(e) {
            return e.toLowerCase();
          });
        for (e = 0, t = (r = ["Id", "Tv"]).length; t > e; e++)
          n = n.replace(new RegExp("\\b" + r[e] + "\\b", "g"), r[e].toUpperCase());
        return n;
      }),
      String.prototype.includes ||
        (String.prototype.includes = function(e, t) {
          return "number" != typeof t && (t = 0), !(t + e.length > this.length) && -1 !== this.indexOf(e, t);
        });
  },
  function(e, t, n) {
    (function(a, r) {
      var o;
      !(function(a) {
        function i(e) {
          return "[object Array]" === Object.prototype.toString.call(e);
        }
        function s() {
          for (var e = 0; e < P.length; e++) P[e][0](P[e][1]);
          (P = []), (k = !1);
        }
        function c(e, t) {
          P.push([e, t]), k || ((k = !0), x(s, 0));
        }
        function l(e) {
          var t = e.owner,
            n = t.state_,
            a = t.data_,
            r = e[n],
            o = e.then;
          if ("function" == typeof r) {
            n = $;
            try {
              a = r(a);
            } catch (e) {
              f(o, e);
            }
          }
          u(o, a) || (n === $ && p(o, a), n === L && f(o, a));
        }
        function u(e, t) {
          var n;
          try {
            if (e === t) throw new TypeError("A promises callback cannot return that same promise.");
            if (t && ("function" == typeof t || "object" == typeof t)) {
              var a = t.then;
              if ("function" == typeof a)
                return (
                  a.call(
                    t,
                    function(a) {
                      n || ((n = !0), t !== a ? p(e, a) : d(e, a));
                    },
                    function(t) {
                      n || ((n = !0), f(e, t));
                    }
                  ),
                  !0
                );
            }
          } catch (t) {
            return n || f(e, t), !0;
          }
          return !1;
        }
        function p(e, t) {
          (e !== t && u(e, t)) || d(e, t);
        }
        function d(e, t) {
          e.state_ === _ && ((e.state_ = w), (e.data_ = t), c(h, e));
        }
        function f(e, t) {
          e.state_ === _ && ((e.state_ = w), (e.data_ = t), c(y, e));
        }
        function m(e) {
          var t = e.then_;
          e.then_ = void 0;
          for (var n = 0; n < t.length; n++) l(t[n]);
        }
        function h(e) {
          (e.state_ = $), m(e);
        }
        function y(e) {
          (e.state_ = L), m(e);
        }
        function v(e) {
          if ("function" != typeof e) throw new TypeError("Promise constructor takes a function argument");
          if (this instanceof v == 0)
            throw new TypeError(
              "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
            );
          (this.then_ = []),
            (function(e, t) {
              function n(e) {
                f(t, e);
              }
              try {
                e(function(e) {
                  p(t, e);
                }, n);
              } catch (e) {
                n(e);
              }
            })(e, this);
        }
        var g = a.Promise,
          b =
            g &&
            "resolve" in g &&
            "reject" in g &&
            "all" in g &&
            "race" in g &&
            (function() {
              var e;
              return (
                new g(function(t) {
                  e = t;
                }),
                "function" == typeof e
              );
            })();
        void 0 !== t && t
          ? ((t.Promise = b ? g : v), (t.Polyfill = v))
          : void 0 ===
              (o = function() {
                return b ? g : v;
              }.call(t, n, t, e)) || (e.exports = o);
        var k,
          _ = "pending",
          w = "sealed",
          $ = "fulfilled",
          L = "rejected",
          T = function() {},
          x = void 0 !== r ? r : setTimeout,
          P = [];
        (v.prototype = {
          constructor: v,
          state_: _,
          then_: null,
          data_: void 0,
          then: function(e, t) {
            var n = {
              owner: this,
              then: new this.constructor(T),
              fulfilled: e,
              rejected: t
            };
            return this.state_ === $ || this.state_ === L ? c(l, n) : this.then_.push(n), n.then;
          },
          catch: function(e) {
            return this.then(null, e);
          }
        }),
          (v.all = function(e) {
            if (!i(e)) throw new TypeError("You must pass an array to Promise.all().");
            return new this(function(t, n) {
              for (var a, r = [], o = 0, i = 0; i < e.length; i++)
                (a = e[i]) && "function" == typeof a.then
                  ? a.then(
                      (function(e) {
                        return (
                          o++,
                          function(n) {
                            (r[e] = n), --o || t(r);
                          }
                        );
                      })(i),
                      n
                    )
                  : (r[i] = a);
              o || t(r);
            });
          }),
          (v.race = function(e) {
            if (!i(e)) throw new TypeError("You must pass an array to Promise.race().");
            return new this(function(t, n) {
              for (var a, r = 0; r < e.length; r++) (a = e[r]) && "function" == typeof a.then ? a.then(t, n) : t(a);
            });
          }),
          (v.resolve = function(e) {
            return e && "object" == typeof e && e.constructor === this
              ? e
              : new this(function(t) {
                  t(e);
                });
          }),
          (v.reject = function(e) {
            return new this(function(t, n) {
              n(e);
            });
          });
      })("undefined" != typeof window ? window : void 0 !== a ? a : "undefined" != typeof self ? self : this);
    }.call(t, n(0), n(4).setImmediate));
  },
  function(e, t, n) {
    (function(e) {
      function a(e, t) {
        (this._id = e), (this._clearFn = t);
      }
      var r = (void 0 !== e && e) || ("undefined" != typeof self && self) || window,
        o = Function.prototype.apply;
      (t.setTimeout = function() {
        return new a(o.call(setTimeout, r, arguments), clearTimeout);
      }),
        (t.setInterval = function() {
          return new a(o.call(setInterval, r, arguments), clearInterval);
        }),
        (t.clearTimeout = t.clearInterval = function(e) {
          e && e.close();
        }),
        (a.prototype.unref = a.prototype.ref = function() {}),
        (a.prototype.close = function() {
          this._clearFn.call(r, this._id);
        }),
        (t.enroll = function(e, t) {
          clearTimeout(e._idleTimeoutId), (e._idleTimeout = t);
        }),
        (t.unenroll = function(e) {
          clearTimeout(e._idleTimeoutId), (e._idleTimeout = -1);
        }),
        (t._unrefActive = t.active = function(e) {
          clearTimeout(e._idleTimeoutId);
          var t = e._idleTimeout;
          t >= 0 &&
            (e._idleTimeoutId = setTimeout(function() {
              e._onTimeout && e._onTimeout();
            }, t));
        }),
        n(5),
        (t.setImmediate =
          ("undefined" != typeof self && self.setImmediate) ||
          (void 0 !== e && e.setImmediate) ||
          (this && this.setImmediate)),
        (t.clearImmediate =
          ("undefined" != typeof self && self.clearImmediate) ||
          (void 0 !== e && e.clearImmediate) ||
          (this && this.clearImmediate));
    }.call(t, n(0)));
  },
  function(e, t, n) {
    (function(e, t) {
      !(function(e, n) {
        "use strict";
        function a(e) {
          delete p[e];
        }
        function r(e) {
          if (d) setTimeout(r, 0, e);
          else {
            var t = p[e];
            if (t) {
              d = !0;
              try {
                !(function(e) {
                  var t = e.callback,
                    a = e.args;
                  switch (a.length) {
                    case 0:
                      t();
                      break;
                    case 1:
                      t(a[0]);
                      break;
                    case 2:
                      t(a[0], a[1]);
                      break;
                    case 3:
                      t(a[0], a[1], a[2]);
                      break;
                    default:
                      t.apply(n, a);
                  }
                })(t);
              } finally {
                a(e), (d = !1);
              }
            }
          }
        }
        if (!e.setImmediate) {
          var o,
            i,
            s,
            c,
            l,
            u = 1,
            p = {},
            d = !1,
            f = e.document,
            m = Object.getPrototypeOf && Object.getPrototypeOf(e);
          (m = m && m.setTimeout ? m : e),
            "[object process]" === {}.toString.call(e.process)
              ? (o = function(e) {
                  t.nextTick(function() {
                    r(e);
                  });
                })
              : (function() {
                  if (e.postMessage && !e.importScripts) {
                    var t = !0,
                      n = e.onmessage;
                    return (
                      (e.onmessage = function() {
                        t = !1;
                      }),
                      e.postMessage("", "*"),
                      (e.onmessage = n),
                      t
                    );
                  }
                })()
              ? ((c = "setImmediate$" + Math.random() + "$"),
                (l = function(t) {
                  t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(c) && r(+t.data.slice(c.length));
                }),
                e.addEventListener ? e.addEventListener("message", l, !1) : e.attachEvent("onmessage", l),
                (o = function(t) {
                  e.postMessage(c + t, "*");
                }))
              : e.MessageChannel
              ? (((s = new MessageChannel()).port1.onmessage = function(e) {
                  r(e.data);
                }),
                (o = function(e) {
                  s.port2.postMessage(e);
                }))
              : f && "onreadystatechange" in f.createElement("script")
              ? ((i = f.documentElement),
                (o = function(e) {
                  var t = f.createElement("script");
                  (t.onreadystatechange = function() {
                    r(e), (t.onreadystatechange = null), i.removeChild(t), (t = null);
                  }),
                    i.appendChild(t);
                }))
              : (o = function(e) {
                  setTimeout(r, 0, e);
                }),
            (m.setImmediate = function(e) {
              "function" != typeof e && (e = new Function("" + e));
              for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
              var a = {
                callback: e,
                args: t
              };
              return (p[u] = a), o(u), u++;
            }),
            (m.clearImmediate = a);
        }
      })("undefined" == typeof self ? (void 0 === e ? this : e) : self);
    }.call(t, n(0), n(6)));
  },
  function(e, t) {
    function n() {
      throw new Error("setTimeout has not been defined");
    }
    function a() {
      throw new Error("clearTimeout has not been defined");
    }
    function r(e) {
      if (l === setTimeout) return setTimeout(e, 0);
      if ((l === n || !l) && setTimeout) return (l = setTimeout), setTimeout(e, 0);
      try {
        return l(e, 0);
      } catch (t) {
        try {
          return l.call(null, e, 0);
        } catch (t) {
          return l.call(this, e, 0);
        }
      }
    }
    function o() {
      m && d && ((m = !1), d.length ? (f = d.concat(f)) : (h = -1), f.length && i());
    }
    function i() {
      if (!m) {
        var e = r(o);
        m = !0;
        for (var t = f.length; t; ) {
          for (d = f, f = []; ++h < t; ) d && d[h].run();
          (h = -1), (t = f.length);
        }
        (d = null),
          (m = !1),
          (function(e) {
            if (u === clearTimeout) return clearTimeout(e);
            if ((u === a || !u) && clearTimeout) return (u = clearTimeout), clearTimeout(e);
            try {
              u(e);
            } catch (t) {
              try {
                return u.call(null, e);
              } catch (t) {
                return u.call(this, e);
              }
            }
          })(e);
      }
    }
    function s(e, t) {
      (this.fun = e), (this.array = t);
    }
    function c() {}
    var l,
      u,
      p = (e.exports = {});
    !(function() {
      try {
        l = "function" == typeof setTimeout ? setTimeout : n;
      } catch (e) {
        l = n;
      }
      try {
        u = "function" == typeof clearTimeout ? clearTimeout : a;
      } catch (e) {
        u = a;
      }
    })();
    var d,
      f = [],
      m = !1,
      h = -1;
    (p.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      f.push(new s(e, t)), 1 !== f.length || m || r(i);
    }),
      (s.prototype.run = function() {
        this.fun.apply(null, this.array);
      }),
      (p.title = "browser"),
      (p.browser = !0),
      (p.env = {}),
      (p.argv = []),
      (p.version = ""),
      (p.versions = {}),
      (p.on = c),
      (p.addListener = c),
      (p.once = c),
      (p.off = c),
      (p.removeListener = c),
      (p.removeAllListeners = c),
      (p.emit = c),
      (p.prependListener = c),
      (p.prependOnceListener = c),
      (p.listeners = function(e) {
        return [];
      }),
      (p.binding = function(e) {
        throw new Error("process.binding is not supported");
      }),
      (p.cwd = function() {
        return "/";
      }),
      (p.chdir = function(e) {
        throw new Error("process.chdir is not supported");
      }),
      (p.umask = function() {
        return 0;
      });
  },
  function(e, t) {
    e.exports = {
      status1: "#f3ff00",
      status2: "orange",
      status3: "#F26C4F",
      status4: "red",
      status5: "#5974a2",
      status6: "#58a1a1",
      status7: "#4CDB4C",
      status8: "#845440",
      status9: "#d6a490",
      circlesize: "12",
      circlesize_mobile: "14",
      circleopacity: ".85"
    };
  }
]);
//# sourceMappingURL=app.bfdba401df533b03079d.js.map
