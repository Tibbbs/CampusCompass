var map;
var markers = [];

	// var endTime = "January 16, 2016 13:20:00"; // hardcoded: endTime for event

	// initialize map and places interactability for markers
function initMap() {
// initializes map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 29.7171925, lng: -95.4037463},
		zoom: 16
	});

	// calls function for marker interactability
	map.addListener('click', function(e) {
		placeMarkerAndPanTo(e.latLng, map);
	});
}

	// converts time in string format to unix epoch format
function convertTime(time){
	var myDate = new Date(time);
	var myEpoch = myDate.getTime();
	return myEpoch
}

// function readData(file, callback){
//   $.getJSON(file, function({
//   ));
//   //obj = JSON.parse(file);
// }

function makeNormalTime(time) {
	ind = time.lastIndexOf(",");
	normalTime = time.substring(ind+2);
	if (parseInt(normalTime.substring(0,2)) > 12){
		normalTime = parseInt(normalTime.substring(0,2))%12 + " " + normalTime.substring(2) + " P.M.";
	}
	else{
		normalTime = normalTime.concat(" A.M.")
	}

	return normalTime;
}

var demo = [
{
	"Name": "Boba Sale",
    "Category": "Foods",
    "Starttime": "January 17, 2016, 08:30:00",
    "Endtime": "January 17, 2016, 09:48:00",
    "Location": "RMC"
},
{
	"Name": "Coffee Sale",
	"Category": "Foods",
	"Starttime": "January 17, 2016, 08:30:00",
	"Endtime": "January 17, 2016, 09:48:00",
	"Location": "Academic Quad"
},
{
	"Name": "Soccer Pick-Up",
	"Category": "Sports",
	"Starttime": "January 17, 2016, 08:30:00",
	"Endtime": "January 17, 2016, 09:48:00",
	"Location": "Rec Center"
},
{
	"Name": "Acapella Concert",
	"Category": "Social",
	"Starttime": "January 17, 2016, 08:30:00",
	"Endtime": "January 17, 2016, 09:48:00",
	"Location": "Chapel"
},
{
	"Name": "Basketball Game",
	"Category": "Sports",
	"Starttime": "January 17, 2016, 08:30:00",
	"Endtime": "January 17, 2016, 09:48:00",
	"Location": "Rec Basketball Courts"
},
{
	"Name": "Doughnuts Fundraiser",
	"Category": "Foods",
	"Starttime": "January 17, 2016, 08:30:00",
	"Endtime": "January 17, 2016, 09:48:00",
	"Location": "Baker College Commons"
}];


  // creates marker, generates marker --> time dictionary and calls
  // checkDelete function
 function placeMarkerAndPanTo(latLng, map) {

 	eventThing = demo[Math.ceil(Math.random()*demo.length)-1];

  	var foodMarker = 'http://i.imgur.com/vVLTtMq.png';
  	var socialMarker = 'http://i.imgur.com/LeeGUrE.png';
  	var sportsMarker = 'http://i.imgur.com/e63xnJE.png';
  	var image;

  	if (eventThing["Category"] == "Foods"){
  		image = foodMarker;
  	}
  	else if (eventThing["Category"] == "Social"){
  		image = socialMarker;
  	}
  	else {
  		image = sportsMarker;
  	}


    // creates marker
    var marker = new google.maps.Marker({
    	position: latLng,
    	map: map,
    	icon: image
    });

    var endOrigTime = eventThing['Endtime'];
    eventThing['Endtime'] = convertTime(eventThing['Endtime']);
    eventThing['graphic'] = marker;

    // adding event to markers
    markers.push(eventThing);

    map.panTo(latLng);
    normStartTime = makeNormalTime(eventThing["Starttime"]);
    normEndTime = makeNormalTime(endOrigTime);

    var eventInfo = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h2 id="firstHeading" class="firstHeading">' + eventThing["Name"] +'</h2>'+
    '<div id="bodyContent">'+
    '<p><b>Location: </b>' + eventThing["Location"] + '</p>' +
    '<p><b>Time: </b>' + normStartTime + ' - ' + normEndTime +'</p>'+
    '</div></div>';

    var infowindow = new google.maps.InfoWindow({
    	content: eventInfo
    });

    // implements infowindow
    eventThing["graphic"].addListener('click', function() {
    	infowindow.open(map, eventThing["graphic"]);
    });
}



  // determines if an expiration date has passed for a marker and need to delete
function checkDelete() {
  	var currentDate = new Date()
  	var currentTime = currentDate.getTime();
  	var counter = 0;

    // iterates through events and calls deleteMarker if event is expired
    for (events in markers) {
      if (markers[events]['Endtime'] < currentTime) { // if event is expired
      	deleteMarker(markers[events]['graphic']);
        counter = counter + 1;  // tracks number of deleted events
    	}
	}
    if (counter > 0){ //only remove events if an event has been deleted
    	removeExpired(counter);
    }
}

  // removes expired events from markers array
function removeExpired(numbDelete) {
    deleteCounter = 0 // tracks number of events deleted
    iter = 0 // tracks iterations through markers array
    while (deleteCounter < numbDelete) {  // while not all expired events have been found
      if (markers[iter]["graphic"].getMap() == null) { // checks if event is on map
        markers.splice(iter, 1); // pulls event from array
        deleteCounter = deleteCounter + 1;
        iter = iter - 1;
    	}
    iter = iter + 1;
	}
}

  // removes given expired event marker from the map
function deleteMarker(badMark) {
	badMark.setMap(null);
}

setInterval(checkDelete, 60000); // runs checkDelete for expired events


function buttonpress() {
	$.ajax({
		method:"POST",
		success:placeMarkerAndPanTo
	})
}

(function($) {

  	var settings = {

		// Parallax background effect?
		parallax: true,

		// Parallax factor (lower = more intense, higher = less intense).
		parallaxFactor: 20

	};

	skel.breakpoints({
		xlarge: '(max-width: 1800px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
		$body = $('body'),
		$header = $('#header');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			$body.removeClass('is-loading');
		});

		// Touch?
		if (skel.vars.mobile) {

			// Turn on touch mode.
			$body.addClass('is-touch');

			// Height fix (mostly for iOS).
			window.setTimeout(function() {
				$window.scrollTop($window.scrollTop() + 1);
			}, 0);

		}

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function() {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Header.

			// Parallax background.

		// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
		if (skel.vars.browser == 'ie' || skel.vars.mobile)
			settings.parallax = false;

		if (settings.parallax) {

			skel.on('change', function() {

				if (skel.breakpoint('medium').active) {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', 'top left, center center');

				}
				else {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				}

			});

		}

		// Main Sections: Two.

		// Lightbox gallery.
		$window.on('load', function() {

			$('#two').poptrox({
				caption: function($a) { return $a.next('h3').text(); },
				overlayColor: '#2c2c2c',
				overlayOpacity: 0.85,
				popupCloserText: '',
				popupLoaderText: '',
				selector: '.work-item a.image',
				usePopupCaption: true,
				usePopupDefaultStyling: false,
				usePopupEasyClose: false,
				usePopupNav: true,
				windowMargin: (skel.breakpoint('small').active ? 0 : 50)
			});

		});

	});

})(jQuery);