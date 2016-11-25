function d(a) {
    return function(b) {
        this[a] = b
    }
}
function f(a) {
    return function() {
        return this[a]
    }
}
var h;
function i(a, b, c) {
    this.extend(i, google.maps.OverlayView);
    this.b = a;
    this.a = [];
    this.l = [];
    this.V = [53, 56, 66, 78, 90];
    this.j = [];
    this.v = false;
    c = c || {};
    this.f = c.gridSize || 60;
    this.R = c.maxZoom || null ;
    this.j = c.styles || [];
    this.Q = c.imagePath || this.J;
    this.P = c.imageExtension || this.I;
    this.W = c.zoomOnClick || true;
    l(this);
    this.setMap(a);
    this.D = this.b.getZoom();
    var e = this;
    google.maps.event.addListener(this.b, "zoom_changed", function() {
        var g = e.b.mapTypes[e.b.getMapTypeId()].maxZoom
          , k = e.b.getZoom();
        if (!(k < 0 || k > g))
            if (e.D != k) {
                e.D = e.b.getZoom();
                e.m()
            }
    });
    google.maps.event.addListener(this.b, "bounds_changed", function() {
        e.i()
    });
    b && b.length && this.z(b, false)
}
h = i.prototype;
h.J = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m";
h.I = "png";
h.extend = function(a, b) {
    return function(c) {
        for (property in c.prototype)
            this.prototype[property] = c.prototype[property];
        return this
    }
    .apply(a, [b])
}
;
h.onAdd = function() {
    if (!this.v) {
        this.v = true;
        m(this)
    }
}
;
h.O = function() {}
;
h.draw = function() {}
;
function l(a) {
    for (var b = 0, c; c = a.V[b]; b++)
        a.j.push({
            url: a.Q + (b + 1) + "." + a.P,
            height: c,
            width: c
        })
}
h = i.prototype;
h.u = f("j");
h.L = f("a");
h.N = f("a");
h.C = function() {
    return this.R || this.b.mapTypes[this.b.getMapTypeId()].maxZoom
}
;
h.A = function(a, b) {
    for (var c = 0, e = a.length, g = e; g !== 0; ) {
        g = parseInt(g / 10, 10);
        c++
    }
    c = Math.min(c, b);
    return {
        text: e,
        index: c
    }
}
;
h.T = d("A");
h.B = f("A");
h.z = function(a, b) {
    for (var c = 0, e; e = a[c]; c++)
        n(this, e);
    b || this.i()
}
;
function n(a, b) {
    b.setVisible(false);
    b.setMap(null );
    b.q = false;
    b.draggable && google.maps.event.addListener(b, "dragend", function() {
        b.q = false;
        a.m();
        a.i()
    });
    a.a.push(b)
}
h = i.prototype;
h.o = function(a, b) {
    n(this, a);
    b || this.i()
}
;
h.S = function(a) {
    var b = -1;
    if (this.a.indexOf)
        b = this.a.indexOf(a);
    else
        for (var c = 0, e; e = this.a[c]; c++)
            if (e == a)
                b = c;
    if (b == -1)
        return false;
    this.a.splice(b, 1);
    a.setVisible(false);
    a.setMap(null );
    this.m();
    this.i();
    return true
}
;
h.M = function() {
    return this.l.length
}
;
h.getMap = f("b");
h.setMap = d("b");
h.t = f("f");
h.U = d("f");
function o(a, b) {
    var c = a.getProjection()
      , e = new google.maps.LatLng(b.getNorthEast().lat(),b.getNorthEast().lng())
      , g = new google.maps.LatLng(b.getSouthWest().lat(),b.getSouthWest().lng());
    e = c.fromLatLngToDivPixel(e);
    e.x += a.f;
    e.y -= a.f;
    g = c.fromLatLngToDivPixel(g);
    g.x -= a.f;
    g.y += a.f;
    e = c.fromDivPixelToLatLng(e);
    c = c.fromDivPixelToLatLng(g);
    b.extend(e);
    b.extend(c);
    return b
}
i.prototype.K = function() {
    this.m();
    this.a = []
}
;
i.prototype.m = function() {
    for (var a = 0, b; b = this.l[a]; a++)
        b.remove();
    for (a = 0; b = this.a[a]; a++) {
        b.q = false;
        b.setMap(null );
        b.setVisible(false)
    }
    this.l = []
}
;
i.prototype.i = function() {
    m(this)
}
;
function m(a) {
    if (a.v)
        for (var b = o(a, new google.maps.LatLngBounds(a.b.getBounds().getSouthWest(),a.b.getBounds().getNorthEast())), c = 0, e; e = a.a[c]; c++) {
            var g = false;
            if (!e.q && b.contains(e.getPosition())) {
                for (var k = 0, j; j = a.l[k]; k++)
                    if (!g && j.getCenter() && j.s.contains(e.getPosition())) {
                        g = true;
                        j.o(e);
                        break
                    }
                if (!g) {
                    j = new p(a);
                    j.o(e);
                    a.l.push(j)
                }
            }
        }
}
function p(a) {
    this.h = a;
    this.b = a.getMap();
    this.f = a.t();
    this.d = null ;
    this.a = [];
    this.s = null ;
    this.k = new q(this,a.u(),a.t())
}
p.prototype.o = function(a) {
    var b;
    a: if (this.a.indexOf)
        b = this.a.indexOf(a) != -1;
    else {
        b = 0;
        for (var c; c = this.a[b]; b++)
            if (c == a) {
                b = true;
                break a
            }
        b = false
    }
    if (b)
        return false;
    if (!this.d) {
        this.d = a.getPosition();
        r(this)
    }
    if (this.a.length == 0) {
        a.setMap(this.b);
        a.setVisible(true)
    } else if (this.a.length == 1) {
        this.a[0].setMap(null );
        this.a[0].setVisible(false)
    }
    a.q = true;
    this.a.push(a);
    if (this.b.getZoom() > this.h.C())
        for (a = 0; b = this.a[a]; a++) {
            b.setMap(this.b);
            b.setVisible(true)
        }
    else if (this.a.length < 2)
        s(this.k);
    else {
        a = this.h.u().length;
        b = this.h.B()(this.a, a);
        this.k.setCenter(this.d);
        a = this.k;
        a.w = b;
        a.ba = b.text;
        a.X = b.index;
        if (a.c)
            a.c.innerHTML = b.text;
        b = Math.max(0, a.w.index - 1);
        b = Math.min(a.j.length - 1, b);
        b = a.j[b];
        a.H = b.url;
        a.g = b.height;
        a.n = b.width;
        a.F = b.Z;
        a.anchor = b.Y;
        a.G = b.$;
        this.k.show()
    }
    return true
}
;
p.prototype.getBounds = function() {
    r(this);
    return this.s
}
;
p.prototype.remove = function() {
    this.k.remove();
    delete this.a
}
;
p.prototype.getCenter = f("d");
function r(a) {
    a.s = o(a.h, new google.maps.LatLngBounds(a.d,a.d))
}
p.prototype.getMap = f("b");
function q(a, b, c) {
    a.h.extend(q, google.maps.OverlayView);
    this.j = b;
    this.aa = c || 0;
    this.p = a;
    this.d = null ;
    this.b = a.getMap();
    this.w = this.c = null ;
    this.r = false;
    this.setMap(this.b)
}
q.prototype.onAdd = function() {
    this.c = document.createElement("DIV");
    if (this.r) {
        this.c.style.cssText = t(this, u(this, this.d));
        this.c.innerHTML = this.w.text
    }
    this.getPanes().overlayImage.appendChild(this.c);
    var a = this;
    google.maps.event.addDomListener(this.c, "click", function() {
        var b = a.p.h;
        google.maps.event.trigger(b, "clusterclick", [a.p]);
        if (b.W) {
            a.b.panTo(a.p.getCenter());
            a.b.fitBounds(a.p.getBounds())
        }
    })
}
;
function u(a, b) {
    var c = a.getProjection().fromLatLngToDivPixel(b);
    c.x -= parseInt(a.n / 2, 10);
    c.y -= parseInt(a.g / 2, 10);
    return c
}
q.prototype.draw = function() {
    if (this.r) {
        var a = u(this, this.d);
        this.c.style.top = a.y + "px";
        this.c.style.left = a.x + "px"
    }
}
;
function s(a) {
    if (a.c)
        a.c.style.display = "none";
    a.r = false
}
q.prototype.show = function() {
    if (this.c) {
        this.c.style.cssText = t(this, u(this, this.d));
        this.c.style.display = ""
    }
    this.r = true
}
;
q.prototype.remove = function() {
    this.setMap(null )
}
;
q.prototype.onRemove = function() {
    if (this.c && this.c.parentNode) {
        s(this);
        this.c.parentNode.removeChild(this.c);
        this.c = null
    }
}
;
q.prototype.setCenter = d("d");
function t(a, b) {
    var c = [];
    document.all ? c.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="' + a.H + '");') : c.push("background:url(" + a.H + ");");
    if (typeof a.e === "object") {
        typeof a.e[0] === "number" && a.e[0] > 0 && a.e[0] < a.g ? c.push("height:" + (a.g - a.e[0]) + "px; padding-top:" + a.e[0] + "px;") : c.push("height:" + a.g + "px; line-height:" + a.g + "px;");
        typeof a.e[1] === "number" && a.e[1] > 0 && a.e[1] < a.n ? c.push("width:" + (a.n - a.e[1]) + "px; padding-left:" + a.e[1] + "px;") : c.push("width:" + a.n + "px; text-align:center;")
    } else
        c.push("height:" + a.g + "px; line-height:" + a.g + "px; width:" + a.n + "px; text-align:center;");
    c.push("cursor:pointer; top:" + b.y + "px; left:" + b.x + "px; color:" + (a.F ? a.F : "black") + "; position:absolute; font-size:" + (a.G ? a.G : 11) + "px; font-family:Arial,sans-serif; font-weight:bold");
    return c.join("")
}
window.MarkerClusterer = i;
i.prototype.addMarker = i.prototype.o;
i.prototype.addMarkers = i.prototype.z;
i.prototype.clearMarkers = i.prototype.K;
i.prototype.getCalculator = i.prototype.B;
i.prototype.getGridSize = i.prototype.t;
i.prototype.getMap = i.prototype.getMap;
i.prototype.getMarkers = i.prototype.L;
i.prototype.getMaxZoom = i.prototype.C;
i.prototype.getStyles = i.prototype.u;
i.prototype.getTotalClusters = i.prototype.M;
i.prototype.getTotalMarkers = i.prototype.N;
i.prototype.redraw = i.prototype.i;
i.prototype.removeMarker = i.prototype.S;
i.prototype.resetViewport = i.prototype.m;
i.prototype.setCalculator = i.prototype.T;
i.prototype.setGridSize = i.prototype.U;
i.prototype.onAdd = i.prototype.onAdd;
i.prototype.draw = i.prototype.draw;
i.prototype.idle = i.prototype.O;
q.prototype.onAdd = q.prototype.onAdd;
q.prototype.draw = q.prototype.draw;
q.prototype.onRemove = q.prototype.onRemove;
(function(A) {
    if (!Array.prototype.forEach)
        A.forEach = A.forEach || function(action, that) {
            for (var i = 0, l = this.length; i < l; i++)
                if (i in this)
                    action.call(that, this[i], i, this);
        }
        ;
})(Array.prototype);
var global_scrollwheel = true;
var markerClusterer = null ;
var markerCLuster;
var Clusterer;
var global_cet_curent_location = "";
var MyCity_map_init_obj = {
    "upload": "http:\/\/city2.wpmix.net\/wp-admin\/admin-post.php?action=nightcity_handle_dropped_media",
    "delete": "http:\/\/city2.wpmix.net\/wp-admin\/admin-post.php?action=nightcity_handle_delete_media",
    "theme_url": "http:\/\/city2.wpmix.net\/wp-content\/themes\/nightcity",
    "global_map_styles": "[]",
    "lat": "51.5073509",
    "longu": "-0.12775829999998223",
    "zum": "13",
    "ajaxurl": "http:\/\/city2.wpmix.net\/wp-admin\/admin-ajax.php",
    "direct": "http:\/\/city2.wpmix.net\/wp-content\/themes\/nightcity",
    "weather_latitude": "0",
    "weather_longitude": "0",
    "weather_APPID": "",
    "hide_paralax": "false",
    "uber_dp": "15",
    "uber_sd": "",
    "geolocation": "",
    "weather": "s2"
};
var mapObject, markers = [], markersData = {
    'bar': [{
        name: 'Lincoln square',
        location_latitude: '51.50906037965617',
        location_longitude: '-0.11402538984384591',
        map_image_url: 'img/src/photo-6.jpg',
        name_point: 'Lincoln square',
        fa_icon: 'img/map/m-191.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/lincoln-square-steak-old-restaurant/',
        moreinfo: 'More info'
    }, {
        name: 'Night club',
        location_latitude: '51.517606815864085',
        location_longitude: '-0.13874462812509591',
        map_image_url: 'img/src/latest-photo-3.jpg',
        name_point: 'Night club',
        fa_icon: 'img/map/m-191.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/night-club/',
        moreinfo: 'More info'
    }, {
        name: 'Snack bar',
        location_latitude: '51.51076979517296',
        location_longitude: '-0.13874462812509591',
        map_image_url: 'img/src/s-bar.jpg',
        name_point: 'Snack bar',
        fa_icon: 'img/map/m-191.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/snack-bar/',
        moreinfo: 'More info'
    }, {
        name: 'bar',
        location_latitude: '51.49880253959759',
        location_longitude: '-0.16071728437509591',
        map_image_url: 'img/src/bar.jpg',
        name_point: 'bar',
        fa_icon: 'img/map/m-191.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/bar/',
        moreinfo: 'More info'
    }],
    'cinema': [{
        name: 'Cinema',
        location_latitude: '51.50735089999999',
        location_longitude: '-0.11402538984384591',
        map_image_url: 'img/src/cinema.jpg',
        name_point: 'Cinema',
        fa_icon: 'img/map/m-195.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/cinema/',
        moreinfo: 'More info'
    }],
    'entertainments': [{
        name: 'Entertainments',
        location_latitude: '51.51589765689595',
        location_longitude: '-0.10303906171884591',
        map_image_url: 'img/src/latest-photo-2.jpg',
        name_point: 'Entertainments',
        fa_icon: 'img/map/marker-1.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/entertainments/',
        moreinfo: 'More info'
    }],
    'hotels': [{
        name: 'Hotels',
        location_latitude: '51.49452775804691',
        location_longitude: '-0.12501171796884591',
        map_image_url: 'img/src/hotels-1.jpg',
        name_point: 'Hotels',
        fa_icon: 'img/map/marker-1.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/hotels/',
        moreinfo: 'More info'
    }],
    'restaurant': [{
        name: 'Spice symphony',
        location_latitude: '51.54152830765201',
        location_longitude: '-0.12775830000009591',
        map_image_url: 'img/src/place-category-7.jpg',
        name_point: 'Spice symphony',
        fa_icon: 'img/map/marker-1.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/spice-symphony/',
        moreinfo: 'More info'
    }, {
        name: 'Club a steakhouse',
        location_latitude: '51.50393174826599',
        location_longitude: '-0.16895703046884591',
        map_image_url: 'img/src/club-1.jpg',
        name_point: 'Club a steakhouse',
        fa_icon: 'img/map/marker-1.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/club-a-steakhouse/',
        moreinfo: 'More info'
    }, {
        name: 'Lincoln square',
        location_latitude: '51.51589765689595',
        location_longitude: '-0.13050488203134591',
        map_image_url: 'img/src/place-category-8.jpg',
        name_point: 'Lincoln square',
        fa_icon: 'img/map/marker-1.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/lincoln-square-steak/',
        moreinfo: 'More info'
    }, {
        name: 'Restaurant',
        location_latitude: '51.52786042287008',
        location_longitude: '-0.16895703046884591',
        map_image_url: 'img/src/rest.jpg',
        name_point: 'Restaurant',
        fa_icon: 'img/map/marker-1.png',
        km: '',
        time: '',
        fetaturesicon: '',
        description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
        url_point: '/places/test/',
        moreinfo: 'More info'
    },

    {
            name: 'Theatre',
            location_latitude: '51.52786042287008',
            location_longitude: '-0.17895703046884591',
            map_image_url: 'img/src/theatre-1.jpg',
            name_point: 'Theatre',
            fa_icon: 'img/map/marker-1.png',
            km: '',
            time: '',
            fetaturesicon: '',
            description_point: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque corporis fuga id incidunt. Dicta hic officiis',
            url_point: '/places/test/',
            moreinfo: 'More info'
        },

    ]
};
function getCurrentLocation(callback) {
    if (!MyCity_map_init_obj.geolocation == false) {
        if (!navigator.geolocation)
            return;
        navigator.geolocation.getCurrentPosition(function(position) {
            var currLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            callback(currLocation);
        });
    }
}
var lot = getCurrentLocation(function(currLocMap) {
    return currLocMap;
});


function initialize_new() {

    var bounds = new google.maps.LatLngBounds();
    var mapOptions2 = {
        zoom: parseInt(MyCity_map_init_obj.zum),
        minZoom: 3,
        center: new google.maps.LatLng(parseFloat(MyCity_map_init_obj.lat -  -0.01),parseFloat(MyCity_map_init_obj.longu - 0.06)),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: true,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        styles: [],
        scrollwheel: global_scrollwheel
    };
    var marker;
    mapObject = new google.maps.Map(document.getElementById('gmap_canvas'),mapOptions2);
    google.maps.event.addListener(mapObject, 'click', function() {
        closeInfoBox();
    });
    var markerCluster;

    for (var key in markersData) {
        markers[key] = [];
        markersData[key].forEach(function(item) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.location_latitude,item.location_longitude),
                map: mapObject,
                icon: item.fa_icon,
                title: item.name_point
            });
            loc = new google.maps.LatLng(item.location_latitude,item.location_longitude);
            if ('undefined' === typeof markers[key])
                markers[key] = [];
            markers[key].push(marker);
            google.maps.event.addListener(marker, 'click', (function() {
                closeInfoBox();
                getInfoBoxBigImage(item).open(mapObject, this);
                var lng1 = new google.maps.LatLng(item.location_latitude,item.location_longitude);
                if ($('.b-slide-menu').hasClass('opened')) {
                    lng1 = new google.maps.LatLng(item.location_latitude,item.location_longitude-0.04);
                }
                if(mapObject.zoom > 13) {
                    lng1 = new google.maps.LatLng(item.location_latitude,item.location_longitude);
                }
                mapObject.setCenter(lng1);
            }));
        });
    }

    if (MyCity_map_init_obj.geolocation == false) {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //         var latitude = position.coords.latitude;
        //         var longitude = position.coords.longitude;
        //         marker = new google.maps.Marker({
        //             position: new google.maps.LatLng(latitude,longitude),
        //             map: mapObject,
        //             icon: templateUrl + "/img/blue_dot_circle.png"
        //         });
        //     });
        // }
    }
    var mcOptions = {
        gridSize: 20,
        maxZoom: 20,
        styles: [{
            height: 53,
            url: MyCity_map_init_obj.theme_url + "/img/m1.png",
            width: 53
        }, {
            height: 56,
            url: MyCity_map_init_obj.theme_url + "/img/m2.png",
            width: 56
        }, {
            height: 66,
            url: MyCity_map_init_obj.theme_url + "/img/m3.png",
            width: 66
        }, {
            height: 78,
            url: MyCity_map_init_obj.theme_url + "/img/m4.png",
            width: 78
        }, {
            height: 90,
            url: MyCity_map_init_obj.theme_url + "/img/m5.png",
            width: 90
        }]
    };
    Clusterer = new MarkerClusterer(mapObject,[],mcOptions);
    for (var key in markers)
        markersData[key].forEach(function(item) {
            Clusterer.addMarkers(markers[key], true);
        });
    if (MyCity_map_init_obj.lat.length < 3) {
        mapObject.fitBounds(bounds);
        mapObject.panToBounds(bounds);
        setTimeout(function() {
            mapObject.setZoom(parseInt(MyCity_map_init_obj.zum));
        }, 1000);
    }
}
;
function hideAllMarkers() {
    for (var key in markers)
        markers[key].forEach(function(marker) {
            marker.setMap(null );
        });
}
;function toggleMarkers(category) {
    hideAllMarkers();
    closeInfoBox();
    if ('undefined' === typeof markers[category])
        return false;
    markers[category].forEach(function(marker) {
        marker.setMap(mapObject);
        marker.setAnimation(google.maps.Animation.DROP);
    });
    Clusterer.clearMarkers();
    Clusterer.addMarkers(markers[category], true);
    Clusterer.redraw()
}
;if (typeof toggleMarkers2 == undefined) {
    function toggleMarkers2(category) {
        hideAllMarkers();
        closeInfoBox();
        Clusterer.clearMarkers();
        category.forEach(function(item) {
            if ('undefined' === typeof markers[item])
                return false;
            console.log(item);
            console.log(markers[item]);
            markers[item].forEach(function(marker) {
                marker.setMap(mapObject);
                marker.setAnimation(google.maps.Animation.DROP);
            });
            Clusterer.addMarkers(markers[item], true);
        });
        Clusterer.redraw();
    }
}
function closeInfoBox() {
    jQuery('div.infoBox').remove();
}
;function getInfoBox(item) {
    return new InfoBox({
        content: '<div class="marker_info none" id="marker_info">' + '<div class="info" id="info">' + '<img src="' + item.map_image_url + '" class="logotype" alt=""/>' + '<h2 style="height:' + height + 'px">' + item.name_point + '<span></span></h2>' + '<span>' + item.description_point + '</span>' + '<a href="' + item.url_point + '" class="green_btn">' + item.moreinfo + '</a>' + '<span class="arrow"></span>' + '</div>' + '</div>',
        disableAutoPan: true,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(40,-210),
        closeBoxMargin: '50px 200px',
        closeBoxURL: '',
        isHidden: false,
        pane: 'floatPane',
        enableEventPropagation: true
    });
}
;function getInfoBoxBigImage(item) {
    var marker_h2_height = 50;
    if (item.name_point.lenght > 5)
        marker_h2_height = 100;
    return new InfoBox({
    	content: '<div class="marker_info2 none" id="marker_info2">' + '<div class="info" id="info">' + '<span id="icon-new">' + item.fetaturesicon + '</span>' + '<div class="km_time animated fadeIn">' + '<span class="km">' + item.km + '</span>' + '<span class="time">' + item.time + ' </span>' + '</div>' + '<div class="info_img"><img src="' + item.map_image_url + '" class="logotype" alt=""/>' + '<h2 style="height:' + marker_h2_height + 'px' + '">' + item.name_point + '<span>' + '<i class="fa fa-star"></i><i class="fa fa-star"></i>' + '<i class="fa fa-star"></i><i class="fa fa-star">' + '</i><i class="fa fa-star"></i>' + '</span></h2></div>' + '<p>' + item.description_point + '</p>' + '<a href="' + item.url_point + '" class="green_btn">' + item.moreinfo + '</a>' + '<span class="arrow"></span>' + '<div class="marker_info_popup"></div>' + '</div>' + '</div>',
        disableAutoPan: true,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(40,-210),
        closeBoxMargin: '50px 200px',
        closeBoxURL: '',
        isHidden: false,
        pane: 'floatPane',
        enableEventPropagation: true
    });
}
;function find_me() {
    if (MyCity_map_init_obj.geolocation == false) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                mapObject.setCenter(pos);
                console.log(pos);
            });
        }
    }
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
jQuery(document).ready(function($) {
    var oldWinTop = 0;
    var scrol_down = true;
    var oldmarekr = "";
    var this_item;
    $(".general_menu a, .general_menu li").click(function() {
        oldmarekr = "";
    });
    $('#cont').scroll(function() {
        var winTop = $(this).scrollTop();
        if (winTop > oldWinTop) {
            scrol_down = true;
        } else {
            scrol_down = false;
        }
        oldWinTop = winTop;
        var $imgs = $('.places_list_my');
        var arr = "";
        $.each($imgs, function(item) {
            if ($(this).parent().css('display') != 'none') {
                if ($(this).position().top - 300 <= winTop && scrol_down) {
                    arr = ($(this).data('marker'));
                    this_item = $(this);
                }
                if ($(this).position().top - 300 <= winTop && !scrol_down) {
                    arr = ($(this).data('marker'));
                    this_item = $(this);
                }
            }
        });
        if (oldmarekr != arr) {
            oldmarekr = arr;
            closeInfoBox();
            closeInfoBox();
            if (has(Object_byString(markersData, arr), 'name_point')) {
                $imgs.removeClass('active');
                this_item.addClass('active');
                getInfoBoxBigImage(Object_byString(markersData, arr)).open(mapObject, Object_byString(markers, arr));
                var lng1 = new google.maps.LatLng(Object_byString(markersData, arr).location_latitude,Object_byString(markersData, arr).location_longitude);
                mapObject.panTo(lng1);
            }
        }
    });
});
function has(object, key) {
    return object ? hasOwnProperty.call(object, key) : false;
}
Object_byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}
