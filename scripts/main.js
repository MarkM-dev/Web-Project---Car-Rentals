		// Func runs on document init:
		// 1. injects the current year into the footer copyright.
		// 2. if user is logged in, removes 'register' page link and shows welcome message.
	$(function () {
		
		
		
		var year = new Date().getFullYear();
		$(".copyright").append('<span>&copy; All rights reserved to Worthy LLC. ' + year + '</span>');	
		user = localStorage.getItem("name");
		if (user) {												// if user exists in local storage.
			$('#welcomeMsg').append('<strong>Welcome back ' + user + '!</strong>'); // appends welcome message with user's full name.
		}	
	});
	

//////////////////////////////////// Form Functions //////////////////////////////////////////////////////

		// When user enters registration page, the function loads all form fields' values (if available).
	$(document).on('pageinit', '#registration', function () {
		loadAll()
	});
	
		// Func saves every field value in the registration form to local storage on-change.
	function savefield(fieldName) {
		var value = document.getElementById(fieldName).value;
		localStorage.setItem(fieldName, value);
	};
	
		// Func loads form fields' values from local storage.
	function loadAll() {
		document.getElementById("name").value = localStorage.getItem("name");
		document.getElementById("id").value = localStorage.getItem("id");
		document.getElementById("email").value = localStorage.getItem("email");
		document.getElementById("Lphone").value = localStorage.getItem("Lphone");
		document.getElementById("Cphone").value = localStorage.getItem("Cphone");
		document.getElementById("bday").value = localStorage.getItem("bday");
		document.getElementById("licenseNum").value = localStorage.getItem("licenseNum");
	}

		// Validation func to run 'oninput' event from #id.
	function valId (input) {
		if (input.value.length != 9){
			input.setCustomValidity("Enter a nine digit id #");
		} else {
			input.setCustomValidity("");
		}
	}
	
		// Validation func to run 'oninput' event from #licenseNum.
	function license (input) {
		if (input.value.length != 7){
			input.setCustomValidity("Enter a seven digit license #");
		} else {
			input.setCustomValidity("");
		}
	}
	
		// Validation func to run 'onsubmit', if all good - send post request.
	function validateForm() {
	
		var tel = document.getElementById("Lphone").value;
		var tel2 = document.getElementById("Cphone").value;
	
			// check if at least one phone number was entered.
		if ((tel == null || tel == "") && (tel2 == null || tel2 == "")) {
			$('#errormsg').html('<strong>* At least one phone number must be entered.</strong>').css('color','red');
			return false;
		}
		else {                // ajax post request.
			$.ajax({
				type: "POST",
				url: "submit.php",
				data: "userNo",
				success: function () {
					alert("Registration Complete.");
				},
			});
			alert("Registration Complete.");
		}
	}
	
		// Func clears local storage and loads values to form.
	function clearForm() {
		localStorage.clear();
		loadAll();
	}
//////////////////////////////////// End of Form Functions //////////////////////////////////////////////////////

/////////////////////////////////////// #catalogue functions///////////////////////////////////////////////////////

	JCars = localStorage.getItem("carlist"); // set json list variables globally.
	CList = JSON.parse(JCars);				// parse to javascript variable.
	
		// before #catalogue page-show, the func checks if the user is registered.
		//if true - load canvas. if not - redirect to registration page.
	$(document).on('pagebeforeshow', '#catalogue', function () {
		if (!localStorage.getItem("name")) {                       	   // if no name in local storage. (form's full name data)
			$.mobile.changePage("#registration", {transition: "slide", reverse: true});						//redirects to registration page.
			$("#registration").attr('data-add-back-btn',false);			// remove back button from registration page.
			
			if (!$('#notRegistered').find('strong').length) {			// if #notRegistered div doesn't contain any 'strong' tags.
				$("#notRegistered").append('<strong>You must login/register before you can select a car.</strong>'); // append html code to div.
			}
		} else {												// if user is logged in - load page content (canvas, car list and message).
			PreloadImages ();
			showCars ();
			
			$("li").on("click", function(e) {								// event listener for when user selects a car.
					j = $(this).index();									// set global index number for selection.
					if ($(this).find("p")[2].style.color == "red") {		// if selected element has style.color "red" - prevent the page change.
						e.preventDefault();
						
					} else {
						$.mobile.changePage("#calc", {transition: "slide"});
						$('#selectCarMsg').empty();							// empty the headline to prevent duplicate appends (error message and normal message).
						localStorage.setItem('j', j);						// save user's selection index number.
					}
				})
				
			var user = localStorage.getItem("name");
			if (!$('#selectCarMsg').text().length) { 		// if #selectCarMsg div doesn't contain any text.
				$('#selectCarMsg').append('<strong>Hey ' + user + '! Please select the car you would like to rent.</strong>').css('color', '');
			}
		}
	});
		// loads all cars attributes into the corresponding location using selectors.
	function showCars () {
		
		$('#carlist h3, #carlist p').empty();											// empties the <h3> and <p> inserted text.
		var i = 0;
		for (i = 0; i < CList.length ; i++) {
		$("#carlist h3").eq(i).append(CList[i].manufacturer + "<br/>" + ' <span style="font-size:80%">' + CList[i].model + '</span>');	// append car name to h3.
			$("#carlist p:nth-of-type(1)").eq(i).append('Gear: ' + CList[i].gear);				// append transmission type to every first <p> in #carlist.
			$("#carlist p:nth-of-type(2)").eq(i).append('License #: ' + CList[i].license);			// append license # to every second <p> in #carlist.
			
			if (CList[i].available == "Not Available") {											// if car not available.
				$("#carlist p:nth-of-type(3)").eq(i).append(CList[i].available).css("color","red");			// color the text red.
				$("#carlist li:eq("+i+")").attr("class","ui-li ui-li-static ui-btn-down-a ui-first-child");	// add class to li (makes the li not look like a button).
				$("#carlist li:eq("+i+") span:last").remove();		/* when class is added to the li, JS automatically adds a "span" tag and disrupts the look
																	   of the button, this removes the last span while keeping the look. */
			} else {
				
				$("#carlist p:nth-of-type(3)").eq(i).append(' ' + CList[i].available);			// append availability to every third <p> in the corresponding location.
			}
			
		}
	}
	
//////////////////////////////////// End of #catalogue functions ///////////////////////////////////////////////////////

/////////////////////////////////// #calc functions //////////////////////////////////////////////////////////////////
	
	// func runs after the page transition animation has completed.
	$(document).on('pageshow', '#calc', function () {
				
		$("#selectedCar").empty();									// empties div in case the user goes back and forth between pages. (multiple appends)
		$('#distance').empty();										// same. 
		$('#cost').empty();											// same.
		
		var j = parseInt(localStorage.getItem("j"));				// load user's selection index number.
		if (typeof(j) == "undefined") {								// if the system doesn't recognise user's car selection.
			$.mobile.changePage('#catalogue', {transition: "slide", reverse: true});									// change page to #catalogue.
			$("#selectCarMsg").html('Oops, something went wrong!<br/>Please select a car.').css('color','red'); 	// display error message in #catalogue.
		} else {
			$("#selectedCar").append('Selected car : ' + CList[j].manufacturer + ' ' + CList[j].model + ', ' + CList[j].gear + '.'); // append selected car to div.
		}
			// when search button is clicked:
			// show loading animation.
			// use worker for calculation.
			// append results to divs.
		$('#submit').click(function () {
		
			$.mobile.loading('show', { textVisible : true } );								// show loading animation with text.
			$("body").children(".ui-loader").find("h1").html("<div class='clearfix'>Calculating<br/> Please wait...</div>"); // add custom text and box to animation.
			
			setTimeout(function(){								// delay worker (3 seconds) for animation.
				var worker = new Worker('scripts/worker.js')			// create new worker.
				worker.postMessage(routeDistance/1000);			// send distance in km to worker.
			
				worker.onmessage = function(e) {				
					$.mobile.loading('hide');					// hide loading animation.
					$('#audio1')[0].play();						// play "ping" as requested, when worker sends results back.
					$('#distance').empty();						// empties div in case the user makes another search. (multiple appends)
					$('#cost').empty();							// same.
																// append results to div ".toFixed(1)" method shows one digit after the decimal point.
					$('#distance').append("<strong style='text-shadow:none;'>&nbsp;&nbsp;&nbsp;&nbsp;Distance : " + (routeDistance/1000).toFixed(1) + " km.</strong>");
					
					var m = e.data;
					if (CList[j].gear == 'Manual') {			// if transmission is manual, cost goes down by 10%.
						m *= 0.9;
					}
					$('#cost').append('Total cost : ' + m.toFixed(2) + ' NIS.'); // append cost to div with 2 digits after the decimal point.
				}
			}, 3000)}); // number represents worker delay (3 seconds).
	
	})
	
		// function runs when user click the confirm button.
	function confirmed () {
	var j = parseInt(localStorage.getItem("j"));
		if (typeof(routeDistance) == "undefined") { 							// if routeDistance is undefined - alert with a popup.
		
			$("#popupErrorMsg").html('<h3>Must get a destination!</h3>');
			$("#popupError").popup({overlayTheme: "a"}).popup('open');
			
		} else {
				CList[j].available = "Not Available";									// change availability.
				localStorage.setItem('carlist', JSON.stringify(CList)); 				// set to local storage.
				$("#popupMsg").html(													// popup message with customized text.
					'<strong><h3 style="text-align:center">Thank you for choosing WORTHY <i>Rent-A-Car</i>!</h3><span style="font-size:80%">Your car : ' + CList[j].manufacturer + ' ' + CList[j].model + ', ' + CList[j].gear + '.<br/> License #: ' + CList[j].license + '.<span></strong>'
				);
				$("#popup").popup({overlayTheme: "a"}).popup('open');					// display the popup.
				$('.ui-popup-screen').off();											// disable clicking around the popup.
			}	
	}	
//////////////////////////////////// End of #Calc functions ///////////////////////////////////////////////////////

/////////////////////////////////// #carReturn functions //////////////////////////////////////////////////////////

		// func runs on #carReturn submit button click.
	$(document).on('click', '#carReturn p:first button', function () {
		userLicenseInput = document.getElementById("cLicense").value;						// get user's license input.
		if (userLicenseInput == "") {														// if input field is empty.
				$("#carReturn #popupErrorMsg").html('<h3>No text has been entered.</h3>');
				$("#carReturn #popupError").popup({overlayTheme: "a"}).popup('open');
			} else {
				for (var z=0;z<CList.length;z++) {											
				
					if (userLicenseInput == CList[z].license) {								// if user's input matches a license in the list.
						if (CList[z].available == "Not Available") {						// if that list item's availability is "Not Available".
							CList[z].available = "Available";
							localStorage.setItem('carlist', JSON.stringify(CList));	
							$("#carReturn #popupMsg").html('<strong><h3>Thank you for choosing WORTHY <i>Rent-A-Car</i>!</h3> Vehicle succesfully returned.</strong>');
							$("#carReturn #popup").popup({overlayTheme: "a"}).popup('open');					// display the popup.
							$('.ui-popup-screen').off();														// disable clicking around the popup.
							$("#cLicense").val('');																// empty input field.
						} else {																				// if that list item's availability is "Available".
							$("#carReturn #popupErrorMsg").html('<h3>Vehicle already available.</h3>');
							$("#carReturn #popupError").popup({overlayTheme: "a"}).popup('open');				// display the popup.
						}
						return; // first the loop goes through the list, if it finds something it stops iterating by returning nothing, else continues to the 2 lines below.
					}
				}
				$("#carReturn #popupErrorMsg").html('<h3>Vehicle doesn\'t exist in database.</h3>');
				$("#carReturn #popupError").popup({overlayTheme: "a"}).popup('open');
			} 
	})

/////////////////////////////////// End of #carReturn functions ///////////////////////////////////////////////////

// Mark Magilnitzky - 054-7798490. 15.02.2014.