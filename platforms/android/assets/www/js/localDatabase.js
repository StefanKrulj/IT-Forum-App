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

// if( isMobile.Android() ) alert('Android');
// if( isMobile.iOS() ) alert('iOS');
// if( isMobile.Windows() ) alert('Windows');

/*
 *
 */
var itForumDatabase = {};

function createLocalDatabase() {
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
		// tags : {
		// type : Array,
		// elementType : String
		//required : true,
		//maxLength : 1000
		// },
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
		}
		// lessons : {
		// type : Array,
		// elementType : String
		//required : true,
		//maxLength : 1000
		// },
		// IKKE ET ARRAY
		// prices : {
		// type : Array,
		// elementType : String
		//required : true,
		//maxLength : 1000
		// }
	});

	$data.Entity.extend("Message", {
		id : {
			type : "int",
			// required : true,
			key : true,
			computed : true
		},
		toAlias : {
			type : String,
			maxLength : 50
		},
		fromAlias : {
			type : String,
			maxLength : 50
		},
		date : {
			type : String,
			maxLength : 50
		},
		messageText : {
			type : String,
			maxLength : 200
		}

	});

	$data.Entity.extend("Participant", {
		id : {
			type : String,
			maxLength : 20
		},
		firstname : {
			type : String,
			maxLength : 40
		},
		lastname : {
			type : String,
			maxLength : 40
		},
		title : {
			type : String,
			maxLength : 40
		},
		imageurl : {
			type : String,
			maxLength : 200
		},
		email : {
			type : String,
			maxLength : 50
		},
		mobile : {
			type : String,
			maxLength : 20
		},
		linkedinurl : {
			type : String,
			maxLength : 200
		},
		company : {
			type : String,
			maxLength : 40
		},
		companyurl : {
			type : String,
			maxLength : 200
		},
		companyimageurl : {
			type : String,
			maxLength : 200
		}

	});

	$data.EntityContext.extend("ITForumDatabase", {
		Events : {
			type : $data.EntitySet,
			elementType : Event
		},
		Messages : {
			type : $data.EntitySet,
			elementType : Message
		},
		Participants : {
			type : $data.EntitySet,
			elementType : Participant
		}
	});

	if (isMobile.WP8()) {;
		itForumDatabase = new ITForumDatabase({
			// provider : 'webSql',
			provider : 'indexedDb',
			databaseName : 'ITFDatabase'
			// dbCreation : $data.storageProviders.DbCreationType.DropAllExistingTables

		});
	} else {
		itForumDatabase = new ITForumDatabase({
			provider : 'webSql',
			// provider : 'indexedDb',
			databaseName : 'ITFDatabase'
			// dbCreation : $data.storageProviders.DbCreationType.DropAllExistingTables

		});
	}
}

/*
 * Date formatting for event starttime
 */
function onlyDate(time) {
	var d = new Date(parseInt(time));
	var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
	var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
	var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
	var formattedTime = hours + ":" + minutes;

	formattedDate = "Dato: " + formattedDate;
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
		// event.starttime = eventsArray[i].starttime;
		event.endtime = eventsArray[i].endtime;							
		event.image = eventsArray[i].image;

		// for(var j = 0; j < eventsArray[i].prices.length; j++){
		// alert("Name " + eventsArray[i].prices[j].name +
		// " Amount " + eventsArray[i].prices[j].amount);
		// }

		itForumDatabase.Events.add(event);
	}
	itForumDatabase.saveChanges();

	getLocalEvents();
}

function getLocalEvents() {

	$('#eventList').empty();
	
	

	itForumDatabase.Events.forEach(function(Event) {
		
		
				
		Event.date = onlyDate(Event.date.substring(6,19));
		
		
		if (!Event.image == "") {
			$('#eventList').append("<li data-id='" + Event.eventid + "' ><a href='#pageDetailEvent'><img src='" + Event.image + "'><p><strong>" + Event.title + "</strong></p><p>" + Event.subtitle + "</p><p>" + Event.date + "</p><p class='ui-li-aside'><strong id='" + Event.eventid + "'></strong></p></a><a href='#sjernemarkering' data-theme='a' data-rel='popup' data-position-to='window' data-transition='pop'>Sjernemarkering</a></li>");
				
			} else {
			$('#eventList').append("<li data-id='" + Event.eventid + "' ><a href='#pageDetailEvent'><img src='img/imgArr.jpg'><p><strong>" + Event.title + "</strong></p><p>" + Event.subtitle + "</p><p class='ui-li-aside'><strong id='" + Event.eventid + "'></strong></p></a><a href='#sjernemarkering' data-theme='a' data-rel='popup' data-position-to='window' data-transition='pop'>Sjernemarkering</a></li>");
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

		// $('#eventList').listview("refresh");
	});
	$('#eventList').listview("refresh");
}

function setMessage(toAlias, fromAlias, messageText) {
	var message = new Message();
	message.toAlias = toAlias;
	message.fromAlias = fromAlias;
	message.date = new Date();
	message.messageText = messageText;
	itForumDatabase.Messages.add(message);
	alert(" ,touser: " + message.toAlias + " ,fromuser: " + message.fromAlias + " ,messege: " + message.messageText + " ,date: " + message.date);

	itForumDatabase.saveChanges();
	
	showMessages (); 
	
}

function showMessages () {
	$('#messagesAttributes').empty();
	// var favPartisipantID = localStorage.getItem("favPartisipant");
	// alert(favPartisipantID);
	// itForumDatabase.Messages
        // .filter("message.toAlias == "+ favPartisipantID +" || message.fromAlias =="+ favPartisipantID +"" )
        // .forEach( function(message) {
        	// alert(message.id);
           // $('#messagesAttributes').append("<li data-id='" + message.id + "' ><p><strong>" + message.messageText + "</strong></p><p>" + message.date + "</p><p>" + message.fromAlias + "</p></li>");
        // });
// 	
	// $('#messagesAttributes').listview("refresh");
// 	
	
	itForumDatabase.Messages.forEach(function(Message) {
		
			
					$('#messagesAttributes').append("<li data-id='" + Message.id + "' ><p><strong>" + Message.messageText + "</strong></p><p>" + Message.date + "</p><p>" + Message.fromAlias + "</p></li>");
	
	
	});
	$('#messagesAttributes').listview("refresh");
  
}
function Messages(participants) {

	participants.forEach(function(participant) {

		// alert(participant.id);

		localStorage.setItem("favPartisipant", participant.id);

	});

}

function setFavoriteParticipant(participant) {
	var participantFav = new Participant();
	// alert("I method: " + participant.firstname);
	participantFav.id = participant.id;
	participantFav.firstname = participant.firstname;
	participantFav.lastname = participant.lastname;
	participantFav.title = participant.title;
	participantFav.imageurl = participant.imageurl;
	participantFav.email = participant.email;
	participantFav.mobile = participant.mobile;
	participantFav.linkedinurl = participant.linkedinurl;
	participantFav.company = participant.company;
	participantFav.companyurl = participant.companyurl;
	participantFav.companyimageurl = participant.companyimageurl;

	itForumDatabase.Participants.add(participantFav);

	itForumDatabase.saveChanges();
}

function getFavoriteParticipant() {
	$('#favoriteParticipantList').empty();

	itForumDatabase.Participants.forEach(function(participant) {
		if (!participant.image == "") {
			$('#favoriteParticipantList').append("<li data-id='" + participant.id + "' ><a href='#pageMessages'><img src='img/person_icon.svg'><p><strong>" + participant.firstname + " " + participant.lastname + "</strong></p><p>" + participant.title + "</p></li>");

		} else {
			$('#favoriteParticipantList').append("<li data-id='" + participant.id + "' ><a href='#pageMessages'><img src='" + participant.imageurl + "'><p><strong>" + participant.firstname + " " + participant.lastname + "</strong></p><p>" + participant.title + "</p></li>");
		}

		$('#favoriteParticipantList').children('li').bind('touchstart mousedown', function(e) {

			sessionStorage.selectedFavParIndex = $('#favoriteParticipantList').children('li').index(this);

		});

		// if (localStorage.getItem("user") != null) {
		// var user = localStorage.getItem("user");
		// var userEventArray = JSON.parse(user).events;
		// for (var i in userEventArray) {
		// if (userEventArray[i] == Event.eventid) {
		// $('#' + Event.eventid + '').html("Tilmeldt");
		// }
		// }
		// }

		$('#favoriteParticipantList').children('li').bind('touchstart mousedown', function(e) {
			sessionStorage.selectedId = $(this).attr('data-id');
		});

		$('#favoriteParticipantList').listview("refresh");
	});
	//$('#favoriteParticipantList').listview("refresh");
}



function getParticipants(participantsArray, eventid) {
	$("#ParticipantsList").empty();
	for (var i in participantsArray) {
		// alert(participantsArray[i].linkedinurl);

		if (participantsArray[i].imageurl == "") {

			$('#ParticipantsList').append("<li data-id='" + participantsArray[i].id + "' ><a href='#pageParticipantsDetail'><img src='img/person_icon.svg'><p><strong>" + participantsArray[i].firstname + " " + participantsArray[i].lastname + "</strong></p><p> " + participantsArray[i].title + "</p><p>" + participantsArray[i].company + '</p></li>');

		} else {
			$('#ParticipantsList').append("<li data-id='" + participantsArray[i].id + "' ><a href='#pageParticipantsDetail'><img src='" + participantsArray[i].imageurl + "'><p><strong>" + participantsArray[i].firstname + " " + participantsArray[i].lastname + "</strong></p><p> " + participantsArray[i].title + "</p><p>" + participantsArray[i].company + '</p></li>');
		}

		$('#ParticipantsList').children('li').bind('touchstart mousedown', function(e) {
			// sessionStorage.setItem("participant", JSON.stringify(participantsArray[i]));
			sessionStorage.selectedParIndex = $('#ParticipantsList').children('li').index(this);
			// sessionStorage.selectedId2 = $(this).attr('data-id');
		});
		$("#ParticipantsList").trigger("create");
		//$('#ParticipantsList').listview('refresh');
	}
	$('#ParticipantsList').listview('refresh');
}

function isParticipantFav(participantId) {

	/*
	 * Søger alle igennem og finder hvis id matcher = yes
	 */
	var found = "no";

	// alert(participantId);

	itForumDatabase.Participants.forEach(function(participant) {
		if (participant.id == participantId) {
			found = "yes";

			// alert("yes");
		} else {
			found = "no";
// 
			// alert("no");
		}

	});

	return found;

	// if(found == "yes"){
	// alert("yes");
	// // $('#favoriteToggle').val('on');
	// }
	// else{
	// alert("no");
	// // $('#favoriteToggle').val('off');
	// }
}

/*
 * TODO
 */
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
	// itForumDatabase.onReady(function() {
	// alert("" + sessionStorage.selectedId);
	getRemoteParticipants(sessionStorage.selectedId);
	// });
});

$(document).on('pagebeforeshow', '#pageParticipantsDetail', function() {
	ParticipantDetails(participantsArray);
});

$(document).on('pagebeforeshow', '#pageUser', function() {
	ProfileDetails();
});

$('#networkingBtn').click(function() {
	getFavoriteParticipant();
});

$(document).on('pagebeforeshow', '#pageMessages', function() {
	itForumDatabase.Participants.filter(function(participant) {
		return participant.id == sessionStorage.selectedId;
	}).toArray(function(participant) {

		Messages(participant);
		showMessages(participant);
	});

});

