function dateAndStartTime(time) {
	var d = new Date(parseInt(time));
	var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
	var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
	var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
	var formattedTime = hours + ":" + minutes;

	formattedDate = "Dato: " + formattedDate + " Tidspunkt: " + formattedTime;
	return formattedDate;
}

function EventDetails(events) {

	events.forEach(function(event) {
		
		event.date = dateAndStartTime(event.date.substring(6,19));

		$("#pageDetailEvent #eventAttributes").empty();

		$("#pageDetailEvent #eventAttributes").append("<h2 id='eventTitle'>" + event.title + "</h2>");
		$("#pageDetailEvent #eventAttributes").append("<img id='eventImage' src=" + event.image + ">");
		$("#pageDetailEvent #eventAttributes").append("<h3 id='eventSubTitle'>" + event.subtitle + "</h3>");
		$("#pageDetailEvent #eventAttributes").append("<h3 id='eventDate'>" + event.date + "</h3>");
		// $("#pageDetailEvent #eventAttributes").append(event.starttime);
		// $("#pageDetailEvent #eventAttributes").append(event.endtime);
		$("#pageDetailEvent #eventAttributes").append("<p id='eventLocation'>" + event.location + "</p>");
		$("#pageDetailEvent #eventAttributes").append("<p id='eventDescription'>" + event.description + "</p>");

		if (localStorage.getItem("user") != null) {
			var user = localStorage.getItem("user");
			var userEventArray = JSON.parse(user).events;
			var login = JSON.parse(user).loginguid;
			var participating = "false";
			for (var i in userEventArray) {
				if (userEventArray[i] == event.eventid) {
					$("#pageDetailEvent #eventAttributes").append("<a href='#pageParticipantsList' id='participants_btn' name='participants' class='ui-btn'>Deltagere</a>");
					participating = "true";
				}
			}
			if (participating == "false") {
				$("#pageDetailEvent #eventAttributes").append("<a href='" + event.url2 + "&guid=" + login + "' class='ui-btn'>Deltag i arrangementet</a>");
			}

		} else {
			//TODO Hvad skal der sker hvis man ikke er logget ind overhovedet?
		}

	});
}

function ProfileDetails() {
	var user = localStorage.getItem("user");
	var us = JSON.parse(user);
	
	function openURL(urlString){
    myURL = encodeURI(urlString);
    window.open(myURL, '_blank');
	}

	$("#pageUser #userAttributes").empty();

	$("#pageUser #userAttributes").append("<a href='http://www.itforum.dk/' class='ui-btn ui-btn-inline ui-icon-gear ui-btn-icon-right'>Rediger bruger</a>");

	if (us.imageurl == "") {
		$("#pageUser #userAttributes").append("<table><tr><td><img src='img/person_icon.svg'></td></tr></table>");
	} else {
		$("#pageUser #userAttributes").append("<table><tr><td><img src='" + us.imageurl + "'></td></tr></table>");
	}

	$("#pageUser #userAttributes").append("<table><tr><td><h2>Navn:</h2></td><td><h2  id='userFirstName'> " + us.firstname + " " + us.lastname + "</h2></td></tr></table>");
	$("#pageUser #userAttributes").append("<table><tr><td><h3>Titel:</h3></td><td><p id='userProfileTitle'> " + us.title + "</p></h3></td></tr></table>");

	$("#pageUser #userAttributes").append("<table><tr><td><h3>Firma:</h3></td><td><p id='userCompany'> " + us.company + "</p></h3></td></tr></table>");
	
	//$("#pageUser #userAttributes").append("<a href="+us.companyurl+">"+us.companyurl+"</a>");
	//<a href='#' onclick='openURL("http://www.urlyouwant")/>
	//$("#pageUser #userAttributes").append("<table><tr><td><a href='#' onclick='openURL("+us.companyurl+")'>Firma logo</a></td></tr></table>");
	
	$("#pageUser #userAttributes").append("<a href='"+us.linkedinurl+"' onclick='openURL(" + us.linkedinurl + ")'>Linkedin profil</a>");
	
	// if (us.companyimageurl == "") {
		// $("#pageUser #userAttributes").append("<table><tr><td><img src='img/person_icon.svg'></td></tr></table>");
	// } else {
		// $("#pageUser #userAttributes").append("<table><tr><td><img src='" + us.companyimageurl + "'></td></tr></table>");
	// }
	
	$("#pageUser #userAttributes").append("<table><tr><td><h3>Profiltekst:</h3></td><td><p id='userProfileText'> " + us.profile + "</p></h3></td></tr></table>");
	$("#pageUser #userAttributes").append("<table><tr><td><h3>Mobiltelefon:</h3></td><td><p id='userMobileNo'> " + us.mobile + "</p></td></tr></table>");
	$("#pageUser #userAttributes").append("<table><tr><td><h3>Email:</h3></td><td><p id='userEmail'> " + us.email + "</p></td></tr></table>");
}

var participant;

function ParticipantDetails(participantsArray) {

	var par = participantsArray[parseInt(sessionStorage.selectedParIndex)];
	participant = par;

	$("#pageParticipantsDetail #userAttributes").empty();

	if (participant.imageurl == "") {
		$("#pageParticipantsDetail #userAttributes").append("<img src='img/person_icon.svg'>");
	} else {
		$("#pageParticipantsDetail #userAttributes").append("<img src='" + participant.imageurl + "'>");
	}

	$("#pageParticipantsDetail #userAttributes").append("<table><tr><td><h2>Navn:</h2></td><td><h2  id='userFirstName'> " + participant.firstname + " " + participant.lastname + "</h2></td></tr></table>");
	$("#pageParticipantsDetail #userAttributes").append("<table><tr><td><h3>Titel:</h3></td><td><h3 id='userTitle'>" + participant.title + "</h3></td></tr></table>");

	$("#pageParticipantsDetail #userAttributes").append("<table><tr><td><h3>Firma:</h3></td><td><h3 id='userTitle'>" + participant.company + "</h3></td></tr></table>");

	if (participant.linkedinurl != "") {
		$("#pageParticipantsDetail #userAttributes").append("<a href=" + participant.linkedinurl + ">LinkedinUrl</a>");
	}
	$("#pageParticipantsDetail #userAttributes").append("<table><tr><td><h3>Profiltekst:</h3></td><td><p id='userProfileText'> " + participant.profile + "</p></h3></td></tr></table>");

	$("#pageParticipantsDetail #userAttributes").append("<table><tr><td><h3>Mobiltelefon:</h3></td><td><p id='userMobileNo'> " + participant.mobile + "</p></td></tr></table>");

	// $("#pageParticipantsDetail #userAttributes").append("<button class='ui-btn ui-corner-all' onclick='addFavPar()'>Add</button>");
	
	alert("array lenght" + participantsArray.length);

	alert(isParticipantFav(participant.id));
	// // var someCondition = true;
	if (isParticipantFav(participant.id) == "off") {
		$('#favoriteToggle').val('off');
	} else {
		$('#favoriteToggle').val('on');
	}
	try {
		$('#favoriteToggle').slider("refresh");
	} catch (err) {
		console.log("Error occurred refreshing slider (probabily first time!)");
	}

	// alert("isPartisipantFav "+ isPartisipantFav(participant.id));

	$("#favoriteToggle").change(function() {
		var state = $("#favoriteToggle").val();
		alert(state);
		if (state == "on") {
			setFavoriteParticipant(participant);
			alert("save participant");
			//alert("set: " + participant.firstname);
		} else {
			alert("Delete participant");

		}

	});

	// MÅ IKKE VISES
	// $("#pageParticipantsDetail #userAttributes").append("<table><tr><td><h3>Email:</h3></td><td><p id='userEmail'> " + participant.email + "</p></td></tr></table>");
}

// function addFavPar(participant) {
	// setFavoriteParticipant(participant);
	// alert("efterset");
// }
