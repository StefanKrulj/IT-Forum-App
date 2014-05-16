/*
 * Mobile Page Transition
 */
$.mobile.defaultPageTransition = "slide";

/*
*
*/
// var app = {
// // Application Constructor
// initialize : function() {
// this.bindEvents();
// },
// // Bind Event Listeners
// //
// // Bind any events that are required on startup. Common events are:
// // 'load', 'deviceready', 'offline', and 'online'.
// bindEvents : function() {
// /*
// * Wait for device API libraries to load
// */
// document.addEventListener("deviceready", onDeviceReady, false);
// },
// // deviceready Event Handler
// //
// // The scope of 'this' is the event. In order to call the 'receivedEvent'
// // function, we must explicity call 'app.receivedEvent(...);'
// onDeviceReady : function() {
// /*
// * Device APIs are available
// */
// app.receivedEvent('deviceready');
//
// document.addEventListener("pause", onPause, false);
// document.addEventListener("resume", onResume, false);
//
// FastClick.attach(document.body);
//
// initiateDatabase();
// alert("ffs");
// getNewEvents();
//
// },
// // Update DOM on a Received Event
// receivedEvent : function(id) {
// var parentElement = document.getElementById(id);
// var listeningElement = parentElement.querySelector('.listening');
// var receivedElement = parentElement.querySelector('.received');
//
// listeningElement.setAttribute('style', 'display:none;');
// receivedElement.setAttribute('style', 'display:block;');
//
// console.log('Received Event: ' + id);
// },
//
// onPause : function () {
//
// },
//
// onResume : function () {
//
// },
// };

//TODO Alt under her skal være udkommenteret

/*
* Mobile Page Transition
*/
// $.mobile.defaultPageTransition = "slide";

/*
 * Is run as the last javascript = Starting the app method
 */
function onLoad() {
	/*
	 * Wait for device API libraries to load
	 */
	document.addEventListener("deviceready", onDeviceReady, false);
}

// /*
// * Wait for device API libraries to load
// */
// document.addEventListener("deviceready", onDeviceReady, false);

/*
 * Device APIs are available
 */
function onDeviceReady() {
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);

	// FastClick
	FastClick.attach(document.body);
	
	pushRegister();

	initiateDatabase();
	getNewEvents();
}

/*
 * When leaving app
 */
function onPause() {
	// Handle the pause event
}

/*
 * When resuming app
 */
function onResume() {
	// Handle the resume event
}

/*
 * returns true if any internet connection is available, false if not
 */
function online() {
	var networkState = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.CELL] = 'Cell generic connection';
	states[Connection.NONE] = 'No network connection';

	if (states[networkState] == 'No network connection') {
		return false;
	} else {
		return true;
	}
}

/*
 * getNewEvents is called from service when new eventlist is needed
 */
function getNewEvents() {
	if (online()) {
		console.log("online");
		getRemoteEvents();
	} else {
		console.log("offline");
		getLocalEvents();
	}
}

/*
* TODO Dette er til test på browser, metoden ovenover er til mobile platformen
*/
// function getNewEvents() {
	// getRemoteEvents();
// }

/*
 * create Jaydata database.
 */
function initiateDatabase() {
	createLocalDatabase(function() {
		console.log("Database created");
		getNewEvents();
	});
}

// $('#pageEvent').on('pageshow', function() {
// try {
// $('#eventList').listview('refresh');
// } catch (e) {
// $('#eventList').listview();
// }
// });