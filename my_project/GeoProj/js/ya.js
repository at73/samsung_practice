var boolMap = false;
var boolMap2 = false;
var Moscow = [ 55.753994, 37.622093 ];
var mystate = Moscow;
var locTo = Moscow;

function geoFindMe() {
	if (!navigator.geolocation) {
		console.log("Geolocation is not supported by your browser");
	}

	function success(position) {
		mystate[0] = position.coords.latitude;
		mystate[1] = position.coords.longitude;
		console.log('Geolocation: latitude: ' + mystate[0] + ' longitude: '
				+ mystate[1]);
	}

	function error() {
		console.log("Unable to retrieve your location");
	}

	console.log("Locating…");
	navigator.geolocation.getCurrentPosition(success, error);
}

//geoFindMe();

/*
 * function createMap (state) { map = new ymaps.Map('map-canvas', { center:
 * state, zoom: 12, controls: ['smallMapDefaultSet'] }); }
 */

var map;

function init_myLocation() {
	if (boolMap === false) {
		boolMap = true;

		var placemark = new ymaps.Placemark(mystate, {
			hintContent : 'Моя позиция'
		});

		function createMap(state) {
			map = new ymaps.Map('map-canvas', state);
		}

		ymaps.geolocation
				.get()
				.then(
						function(res) {
							var mapContainer = $('#map-canvas'), mystate = res.geoObjects
									.get(0).properties.get('boundedBy'),
							// Рассчитываем видимую область для положения
							// пользователя.
							mapState = ymaps.util.bounds.getCenterAndZoom(
									mystate, [ mapContainer.width(),
											mapContainer.height() ]);
							createMap(mapState);
						}, function(e) {
							createMap({
								center : Moscow,
								zoom : 10,
								controls: ['smallMapDefaultSet']
							});
						});

		// createMap(mystate);

		map.geoObjects.add(placemark);
	}
}

var mymap;
console.log('locTo: latitude: ' + locTo[0] + ' longitude: ' + locTo[1]);

function init_createMap() {
	if (boolMap2 === false) {
		boolMap2 = true;
		mymap = new ymaps.Map('direct-map', {
			center : mystate,
			zoom : 12,
			controls: ['smallMapDefaultSet']
		});

		mymap.events.group().add(
				'click',
				function(e) {
					alert("Координаты получены!");
					var coords = e.get('coords');
					locTo = coords;
					console.log('coords: latitude: ' + coords[0]
							+ ' longitude: ' + coords[1]);
					/*
					 * map.balloon.open(coords, { contentHeader:'Событие!',
					 * contentBody:'<p>Координаты щелчка: ' + [
					 * coords[0].toPrecision(6), coords[1].toPrecision(6)
					 * ].join(', ') + '</p>' });
					 * else {
					 * map.balloon.close();
					 * }
					*/
				});
	}
}

function createRoute() {
	var pointA = mystate, pointB = locTo;
	
	console.log("Make route from A to B");
	console.log('A: latitude: ' + pointA[0] + ' longitude: ' + pointA[1]);
	console.log('B: latitude: ' + pointB[0] + ' longitude: ' + pointB[1]);

	var multiRoute = new ymaps.multiRouter.MultiRoute({
		referencePoints : [ pointA, pointB ],
		params : {
			routingMode : 'pedestrian'
		}
	}, {
		boundsAutoApply : true
	});

	mymap.geoObjects.add(multiRoute);
}

document.addEventListener('rotarydetent', onRotarydetent);

function onRotarydetent(ev) {
	var direction = ev.detail.direction;

	console.debug("onRotarydetent: " + direction);

	if (direction === "CW") {
		if (boolMap === true) {
			map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
		}
		if (boolMap2 === true) {
			mymap.setZoom(mymap.getZoom() + 1, {checkZoomRange: true});
		}		
		console.log('clockwise');
	} else {
		if (boolMap === true) {
			map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
		}
		if (boolMap2 === true) {
			mymap.setZoom(mymap.getZoom() - 1, {checkZoomRange: true});		
		}
        console.log('counter-clockwise');
	}
}

function myLocation() {
	ymaps.ready(init_myLocation);
}

function createMap() {
	ymaps.ready(init_createMap);
}