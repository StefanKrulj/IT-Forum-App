/*
 * 
 */
var isMobile = {
		Android : function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry : function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS : function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera : function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		WP8 : function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any : function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

/*
 * 
 */
var itForumDatabase;

function setLocalDatabase(callback){
	alert("setLocalDatabase");
	if (isMobile.WP8()) {;
		// itForumDatabase =  $ITForumDatabase.c
	} else {
		alert("setLocalDatabase else");
		itForumDatabase = new ITForumDatabase({
			provider : 'webSql',
			// provider : 'indexedDb',
			databaseName : 'ITFDatabase'
		});
	}
	alert("setLocalDatabase done");
	// callback();
}

function createLocalDatabase(callback) {
	console.log("Creating Database");

	/*
	 * Events
	 */
	$data.Entity.extend("Event", {
		title : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		subtitle : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		date : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		location : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		type : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		description : {
			type : String,
			//required : true,
			maxLength : 20000
		},
		url1 : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		url2 : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		tags : {
			type : Array,
			elementType : String
			//required : true,
			//maxLength : 1000
		},
		eventid : {
			type : String,
			key : true
			//computed : false
		},
		organiser : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		deadline : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		starttime : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		endtime : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		image : {
			type : String,
			//required : true,
			maxLength : 1000
		},
		lessons : {
			type : Array,
			elementType : String
			//required : true,
			//maxLength : 1000
		},
		// IKKE ET ARRAY
		prices : {
			type : Array,
			elementType : String
			//required : true,
			//maxLength : 1000
		}
	});

	$data.EntityContext.extend("ITForumDatabase", {
		Events : {
			type : $data.EntitySet,
			elementType : Event
		}
	});

	// if( isMobile.Android() ) alert('Android');
	// if( isMobile.iOS() ) alert('iOS');
	// if( isMobile.Windows() ) alert('Windows');

	if (isMobile.WP8()) {;
		itForumDatabase = new ITForumDatabase({
			// provider : 'webSql',
			provider : 'indexedDb',
			databaseName : 'ITFDatabase',
			dbCreation : $data.storageProviders.DbCreationType.DropAllExistingTables

		});
	} else {
		itForumDatabase = new ITForumDatabase({
			provider : 'webSql',
			// provider : 'indexedDb',
			databaseName : 'ITFDatabase',
			dbCreation : $data.storageProviders.DbCreationType.DropAllExistingTables

		});
	}
	localStorage.setItem("database", new Date());
	
	callback();
}

/*
 * Date formatting for event starttime
 */
function startTimeDate(time) {
	var d = new Date(parseInt(time));
	var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
	var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
	var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
	var formattedTime = hours + ":" + minutes;

	formattedDate = "<strong>Arrangement tidspunkt </strong>" + formattedDate + ", fra kl. " + formattedTime;
	return formattedDate;
}

/*
 * Date formatting for event endtime
 */
function endTimeDate(starttime, endtime) {
	var result = "";
	var endtimeDate = new Date(parseInt(endtime));
	var starttimeDate = new Date(parseInt(starttime));

	var formattedDate = endtimeDate.getDate() + "-" + (endtimeDate.getMonth() + 1) + "-" + endtimeDate.getFullYear();

	var hours = (endtimeDate.getHours() < 10) ? "0" + endtimeDate.getHours() : endtimeDate.getHours();
	var minutes = (endtimeDate.getMinutes() < 10) ? "0" + endtimeDate.getMinutes() : endtimeDate.getMinutes();
	var formattedTime = hours + ":" + minutes;

	if (endtimeDate.getDate() == starttimeDate.getDate()) {
		result = " til " + formattedTime;
	} else if (endtimeDate.getDate() > starttimeDate.getDate()) {
		formattedDate = "<br> Slut " + formattedDate + ", kl. " + formattedTime;
		result = formattedDate;
	} else {
		result = "Wrong date object";
	}
	return result;
}

/*
 * Insert events in local database
 */
function setLocalEvents(eventsArray) {
	for (var i in eventsArray) {
		var event = new Event();
		event.title = eventsArray[i].title;
		event.subtitle = eventsArray[i].subtitle;
		event.date = eventsArray[i].date;
		event.location = eventsArray[i].location;
		event.type = eventsArray[i].type;
		event.description = eventsArray[i].description;
		event.url1 = eventsArray[i].url1;
		event.url2 = eventsArray[i].url2;
		// tags = eventsArray[i].tags;
		event.eventid = eventsArray[i].eventid;
		event.organiser = eventsArray[i].organiser;
		event.deadline = eventsArray[i].deadline;
		//XX REGEX EXPRESSION XX
		var numberPattern = /\d+/g;
		event.starttime = startTimeDate(eventsArray[i].starttime.match(numberPattern));

		event.endtime = endTimeDate(eventsArray[i].starttime.match(numberPattern), eventsArray[i].endtime.match(numberPattern));
		event.image = eventsArray[i].image;
		// event.lessons = eventsArray[i].lessons;
		// event.prices = eventsArray[i].prices;

		itForumDatabase.Events.add(event);
	}
	itForumDatabase.saveChanges();
	
	getLocalEvents(null);
}

function getLocalEvents(callback) {

	$('#eventList').empty();

	itForumDatabase.Events.forEach(function(Event) {
		if (!Event.image == "") {
			$('#eventList').append("<li data-id='" + Event.eventid + "' ><a href='#pageDetailEvent'><img src='" + Event.image + "'><p><strong>" + Event.title + "</strong></p><p>" + Event.subtitle + "</p><p>" + Event.starttime + "</p><p class='ui-li-aside'><strong id='" + Event.eventid + "'></strong></p></a></li>");
		} else {
			$('#eventList').append("<li data-id='" + Event.eventid + "' ><a href='#pageDetailEvent'><img src='img/imgArr.jpg'><p><strong>" + Event.title + "</strong></p><p>" + Event.subtitle + "</p><p>" + Event.starttime + "</p><p class='ui-li-aside'><strong id='" + Event.eventid + "'></strong></p></a></li>");
		}

		if (localStorage.getItem("user") != null) {
			var user = localStorage.getItem("user");
			var userEventArray = JSON.parse(user).events;
			for (var i in userEventArray) {
				if (userEventArray[i] == Event.eventid) {
					$('#' + Event.eventid + '').html("Tilmeldt");
				}
			}
		}

		$('#eventList').children('li').bind('touchstart mousedown', function(e) {
			sessionStorage.selectedId = $(this).attr('data-id');
		});

		// $('#eventList').listview('refresh');
	});
	$('#eventList').listview('refresh');
	// callback();
}

/*
 * Participants TODO : Lav participant listen og detail siden, til at bruge databasen og ikke hente alle men kun dem på eventid
 */

function setLocalParticipants(participantsArray, eventid) {
	for (var i in participantsArray) {
		var participant = new Participant();
		participant.firstname = participantsArray[i].firstname;
		participant.lastname = participantsArray[i].firstname;
		participant.company = participantsArray[i].company;
		participant.email = participantsArray[i].email;
		participant.profile = participantsArray[i].profile;
		participant.linkedinurl = participantsArray[i].linkedinurl;
		participant.mobile = participantsArray[i].mobile;
		participant.eventid = eventid;

		itForumDatabase.Participants.add(participant);
		itForumDatabase.saveChanges();
	}
	itForumDatabase.saveChanges();
}

/*
 *
 */
function getLocalParticipants(eventid, callback) {
	itForumDatabase.Participants.forEach(function(Participant) {
		if (Participant.eventid == eventid) {
			$("#ParticipantsList").empty();

			$('#ParticipantsList').append("<li data-id='" + Participant.id + "' ><a href='#pageParticipantsDetail'>" + Participant.firstname + ' ' + Participant.lastname + '</li>');

			$('#ParticipantsList').children('li').bind('touchstart mousedown', function(e) {
				// sessionStorage.setItem("participant", JSON.stringify(participantsArray[i]));
				sessionStorage.selectedId = $(this).attr('data-id');
			});

			$('#ParticipantsList').listview("refresh");
		}
	});
	callback();
}

function getParticipants(participantsArray, eventid) {
	for (var i in participantsArray) {
			$("#ParticipantsList").empty();

			$('#ParticipantsList').append("<li data-id='" + participantsArray[i].id + "' ><a href='#pageParticipantsDetail'>" + participantsArray[i].firstname + ' ' + participantsArray[i].lastname + '</li>');

			$('#ParticipantsList').children('li').bind('touchstart mousedown', function(e) {
				// sessionStorage.setItem("participant", JSON.stringify(participantsArray[i]));
				sessionStorage.selectedId = $(this).attr('data-id');
			});
			$("#ParticipantsList").trigger("create");
			$('#ParticipantsList').listview('refresh');
	}
}


/*
 * TODO
 */

// $(document).on('pagebeforeshow', '#pageEvent', function() {
	// // itForumDatabase.onReady(function() {
		// getLocalEvents(function() {
			// getRemoteEvents();
		// });
	// // });
// });

$(document).on('pagebeforeshow', '#pageDetailEvent', function() {

	// itForumDatabase.onReady(function() {
		itForumDatabase.Events.filter(function(event) {
			return event.eventid == sessionStorage.selectedId;
		}).toArray(function(events) {
			EventDetails(events);
		});
	// });

});

$(document).on('pageshow', '#pageDetailEvent', function() {
	itForumDatabase.onReady(function() {
			getRemoteParticipants(sessionStorage.selectedId);
	});
});

// $(document).on('pagebeforeshow', '#pageParticipantsDetail', function() {
// ParticipantDetails(participantsArray);
//
// });

$(document).on('pagebeforeshow', '#pageUser', function() {
	ProfileDetails();

});

// });
