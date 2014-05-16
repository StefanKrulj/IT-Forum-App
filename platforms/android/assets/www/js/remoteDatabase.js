/*
 * TODO Det er her "service klassen skal kalde"
 */

/*
 * Webservice get all events
 */
function getRemoteEvents() {
	$.ajax({
		url : "http://www.itforum.dk/ws/appapi.asp?method=getevents",
		dataType : "jsonp",
		success : function(parsed_json) {
			var eventsArray = parsed_json;
			setLocalEvents(eventsArray);
		},
		error : function() {
			alert('failure to access "getevents" api');
		}
	});
}

var participantsArray;

/*
 * Webservice get participants by eventid
 */
function getRemoteParticipants(eventid) {
	var user = localStorage.getItem("user");
	var userLoginguid = JSON.parse(user).loginguid;
	
	participantsArray = [];
	
	$.ajax({
		url : "http://www.itforum.dk/ws/appapi.asp?method=getparticipants&guid=" + userLoginguid + "&eventid=" + eventid + "",
		dataType : "jsonp",
		success : function(parsed_json) {
			participantsArray = parsed_json;
			getParticipants(participantsArray, eventid);
		},
		error : function() {
			alert('failure to access "getparticipants" api');
		}
	});
}
