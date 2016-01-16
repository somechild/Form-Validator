


i = function(j) { //initialization
	$('body>span').hide();
	$('body>div').show();
	j();
};





// j() ^ can be either a() or b() --> see below


















a = function() { //if only validate onsubmit


	$('form[name="testForm"]').submit(function(e) {

		var allAreValid = true; //this will be returned at the end. So if no errors, the form will submit because it's valid

//-----------------------------------inputs validations code-----------------------------------


		var flName = $('input[name="fullName"]');
		if ( !fullNameValidator(flName.val()).isSuccess ) { //running fullNameValidator from .../Uncompressed JS/fullName.js


			allAreValid = false; //if invalid, set to false

			errHandler(flName, $('fieldset>p:nth-of-type(1)'), 'hasError', 'Please enter your full name', '');

			//I made a custom error handling function (called 'errHandler' --> it's called errHandler.js & in this demo folder)
				// basically passing -->
					// fn(
						//input element,
						//input title text element,
						//class to give to elements passed through,
						//custom error text to set in input title text element
					// );

		}
		else{
			successHandler(flName, $('fieldset>p:nth-of-type(1)'), '', 'Name looks good!', 'hasError');
		};



		var url = $('input[name="url"]');
		if (! urlValidator(url.val()).isSuccess ) {

			allAreValid = false;

			errHandler(url, $('fieldset>p:nth-of-type(2)'), 'hasError', 'Invalid url', '');

		}
		else{
			successHandler(url, $('fieldset>p:nth-of-type(2)'), '', 'Nice.', 'hasError');
		};



		var email = $('input[name="email"]');
		if (! emailValidator(email.val()).isSuccess ) {

			allAreValid = false;

			errHandler(email, $('fieldset>p:nth-of-type(3)'), 'hasError', 'Please enter a valid email', '');

		}
		else{
			successHandler(email, $('fieldset>p:nth-of-type(3)'), '', 'You\'ll get a confirmation here.', 'hasError');
		};



		var pw = $('input[name="password"]');
		if (! passwordValidator(pw.val(), 8, 24, false, []).isSuccess ) {
				// see documentation for details

			allAreValid = false;

			errHandler(pw, $('fieldset>p:nth-of-type(4)'), 'hasError', 'Please ensure your password is between 8-24 characters', '');

		}
		else{
			successHandler(pw, $('fieldset>p:nth-of-type(4)'), '', 'You can reset this if you forget', 'hasError');
		};

		var pwConf = $('input[name="confPassword"]');
		if (! stringMatcher([pw.val(), pwConf.val()]) ) {
	//stringMatcher() -> just a simple function that checks if srings match, included in the pw validator script

			allAreValid = false;

			errHandler(pwConf, $('fieldset>p:nth-of-type(5)'), 'hasError', 'Passwords don\'t match!', '');

		}
		else{
			successHandler(pwConf, $('fieldset>p:nth-of-type(5)'), '', 'Passwords match!', 'hasError');
		};


		var description = $('textarea[name="description"]');
		if (! charCounter(description.val(), 200, 600, true, true, false).isSuccess ) {
			// fn(txt, min, max, ignore spaces, ignore linebreaks, trim before tests)

			allAreValid = false;
			errHandler(description, $('fieldset>p:nth-of-type(6)'), 'hasError', 'Please ensure description is between 200 and 600 characters', '');
		}
		else{
			successHandler(description, $('fieldset>p:nth-of-type(6)'), '', 'Looks good.', 'hasError');
		};


		if (! fileValidator($('input[name="img"]')[0].files[0], 1, 2097152, 'image').isSuccess ) {
// fn(file, minsize in bytes, maxsize in bytes, type--> false=any || 'image' || 'text' || 'pdf' || custom array of file extensions );
			
			allAreValid = false;

			errHandler($('.fileUpload'), $('fieldset>p:nth-of-type(7)'), 'hasError', 'Please ensure the file is an <b>image</b> below 2mb', '');
		}
		else{
			successHandler($('.fileUpload'), $('fieldset>p:nth-of-type(7)'), '', 'Awesome.', 'hasError');
		};



//-----------------------------------end inputs validations code-----------------------------------







		if (allAreValid) {

			$('input[type="submit"].disabled').attr('class', '');

			if ('jsBasedFormSubmission') {
				
				e.preventDefault();

				$('#glowForm').html('<p class="successTitle">Form submitting...</p>');

				setTimeout(function() { //fake success msg
					alert('Submitted!');
					window.location.reload();
				}, 1200);

				return false;
			}
		}
		else if(!$('.errorTitle')[0]){

			e.preventDefault();

			$('#glowForm').prepend('<p class="errorTitle">Please correct issues with form</p>');
		}
		else{
			e.preventDefault();
		};



		$(window).scrollTop(0);

		return allAreValid;

	});



};

























// comments coming soon for for dynamic validation (below)!

updateSubmitButton = function(x) {
	if (x.reduce(function(curr, prev) {
		return prev + parseInt(curr);
	}, 0) == 7)
		$('input[type="submit"]').removeClass('disabled');
	else
		$('input[type="submit"]').addClass('disabled');
};


b = function() {


	a();


	$('input[type="submit"]').addClass('disabled');

	var allAreValid = [0, 0, 0, 0, 0, 0, 0];

//-----------------------------------inputs validations code-----------------------------------


		var flName = $('input[name="fullName"]');
		var flNameTime;
		flName.keyup(function() {
			clearTimeout(flNameTime);
			flNameTime = setTimeout(function() {
				if(! flName.val().trim().length) return;
				if ( !fullNameValidator(flName.val()).isSuccess ) {

					allAreValid[0] = 0;

					errHandler(flName, $('fieldset>p:nth-of-type(1)'), 'hasError', 'Please enter your full name', '');

				}
				else{
					allAreValid[0] = 1;
					successHandler(flName, $('fieldset>p:nth-of-type(1)'), '', 'Name looks good!', 'hasError');
				};
				updateSubmitButton(allAreValid);
			}, 480);
		}).change(function() {
			clearTimeout(flNameTime);
			if(! flName.val().trim().length) return;
			if ( !fullNameValidator(flName.val()).isSuccess ) {

					allAreValid[0] = 0;

					errHandler(flName, $('fieldset>p:nth-of-type(1)'), 'hasError', 'Please enter your full name', '');
				}
				else{
					allAreValid[0] = 1;
					successHandler(flName, $('fieldset>p:nth-of-type(1)'), '', 'Name looks good!', 'hasError');
				};
				updateSubmitButton(allAreValid);
		});;



		var url = $('input[name="url"]');
		var urlTime;
		url.keyup(function() {
			clearTimeout(urlTime);
			urlTime = setTimeout(function() {
				if(! url.val().trim().length) return;
				if (! urlValidator(url.val()).isSuccess ) {

					allAreValid[1] = 0;

					errHandler(url, $('fieldset>p:nth-of-type(2)'), 'hasError', 'Invalid url', '');

				}
				else{
					allAreValid[1] = 1;
					successHandler(url, $('fieldset>p:nth-of-type(2)'), '', 'Nice.', 'hasError');
				};
				updateSubmitButton(allAreValid);
			}, 480);
		}).change(function() {
			clearTimeout(urlTime);
			if(! url.val().trim().length) return;
			if (! urlValidator(url.val()).isSuccess ) {

				allAreValid[1] = 0;

				errHandler(url, $('fieldset>p:nth-of-type(2)'), 'hasError', 'Invalid url', '');

			}
			else{
				allAreValid[1] = 1;
				successHandler(url, $('fieldset>p:nth-of-type(2)'), '', 'Nice.', 'hasError');
			};
			updateSubmitButton(allAreValid);
		});




		var email = $('input[name="email"]');
		var emailTime;
		email.keyup(function() {
			clearTimeout(emailTime);
			emailTime = setTimeout(function() {
				if(! email.val().trim().length) return;
				if (! emailValidator(email.val()).isSuccess ) {

					allAreValid[2] = 0;

					errHandler(email, $('fieldset>p:nth-of-type(3)'), 'hasError', 'Please enter a valid email', '');

				}
				else{
					allAreValid[2] = 1;
					successHandler(email, $('fieldset>p:nth-of-type(3)'), '', 'You\'ll get a confirmation here.', 'hasError');
				};
				updateSubmitButton(allAreValid);
			}, 480);
		}).change(function() {
			clearTimeout(emailTime);
			if(! email.val().trim().length) return;
			if (! emailValidator(email.val()).isSuccess ) {

				allAreValid[2] = 0;

				errHandler(email, $('fieldset>p:nth-of-type(3)'), 'hasError', 'Please enter a valid email', '');

			}
			else{
				allAreValid[2] = 1;
				successHandler(email, $('fieldset>p:nth-of-type(3)'), '', 'You\'ll get a confirmation here.', 'hasError');
			};
			updateSubmitButton(allAreValid);
		});



		var pw = $('input[name="password"]');
		var pwTime;
		pw.keyup(function() {
			clearTimeout(pwTime);
			pwTime = setTimeout(function() {
				if(! pw.val().trim().length) return;
				if (! passwordValidator(pw.val(), 8, 24, false, []).isSuccess ) {
						// see documentation for details

					allAreValid[3] = 0;

					errHandler(pw, $('fieldset>p:nth-of-type(4)'), 'hasError', 'Please ensure your password is between 8-24 characters', '');

				}
				else{
					allAreValid[3] = 1;
					successHandler(pw, $('fieldset>p:nth-of-type(4)'), '', 'You can reset this if you forget', 'hasError');
				};
				updateSubmitButton(allAreValid);
			}, 480);
		}).change(function() {
			clearTimeout(pwTime);
			if(! pw.val().trim().length) return;
			if (! passwordValidator(pw.val(), 8, 24, false, []).isSuccess ) {
					// see documentation for details

				allAreValid[3] = 0;

				errHandler(pw, $('fieldset>p:nth-of-type(4)'), 'hasError', 'Please ensure your password is between 8-24 characters', '');

			}
			else{
				allAreValid[3] = 1;
				successHandler(pw, $('fieldset>p:nth-of-type(4)'), '', 'You can reset this if you forget', 'hasError');
			};
			updateSubmitButton(allAreValid);
		});



		var pwConf = $('input[name="confPassword"]');
		var pwConfTime;
		pwConf.keyup(function() {
			clearTimeout(pwConfTime);
			pwConfTime = setTimeout(function() {
				if(! pwConf.val().trim().length) return;
				if (! stringMatcher([pw.val(), pwConf.val()]) ) {
			//stringMatcher() -> just a simple function that checks if srings match, included in the pw validator script

					allAreValid[4] = 0;

					errHandler(pwConf, $('fieldset>p:nth-of-type(5)'), 'hasError', 'Passwords don\'t match!', '');

				}
				else{
					allAreValid[4] = 1;
					successHandler(pwConf, $('fieldset>p:nth-of-type(5)'), '', 'Passwords match!', 'hasError');
				};
				updateSubmitButton(allAreValid);
			}, 480);
		}).change(function() {
			clearTimeout(pwConfTime);
			if(! pwConf.val().trim().length) return;
			if (! stringMatcher([pw.val(), pwConf.val()]) ) {
		//stringMatcher() -> just a simple function that checks if srings match, included in the pw validator script

				allAreValid[4] = 0;

				errHandler(pwConf, $('fieldset>p:nth-of-type(5)'), 'hasError', 'Passwords don\'t match!', '');

			}
			else{
				allAreValid[4] = 1;
				successHandler(pwConf, $('fieldset>p:nth-of-type(5)'), '', 'Passwords match!', 'hasError');
			};
			updateSubmitButton(allAreValid);
		});



		var description = $('textarea[name="description"]');
		var descriptionTime;
		description.keyup(function() {
			clearTimeout(descriptionTime);
			descriptionTime = setTimeout(function() {
				if(! description.val().trim().length) return;
				if (! charCounter(description.val(), 200, 600, true, true, false).isSuccess ) {
					// fn(txt, min, max, ignore spaces, ignore linebreaks, trim before tests)

					allAreValid[5] = 0;
					errHandler(description, $('fieldset>p:nth-of-type(6)'), 'hasError', 'Please ensure description is between 200 and 600 characters', '');
				}
				else{
					allAreValid[5] = 1;
					successHandler(description, $('fieldset>p:nth-of-type(6)'), '', 'Looks good.', 'hasError');
				};
				updateSubmitButton(allAreValid);
			}, 480);
		}).change(function() {
			clearTimeout(descriptionTime);
			if(! description.val().trim().length) return;
			if (! charCounter(description.val(), 200, 600, true, true, false).isSuccess ) {
				// fn(txt, min, max, ignore spaces, ignore linebreaks, trim before tests)

				allAreValid[5] = 0;
				errHandler(description, $('fieldset>p:nth-of-type(6)'), 'hasError', 'Please ensure description is between 200 and 600 characters', '');
			}
			else{
				allAreValid[5] = 1;
				successHandler(description, $('fieldset>p:nth-of-type(6)'), '', 'Looks good.', 'hasError');
			};
			updateSubmitButton(allAreValid);
		});

		$('input[name="img"]').change(function() {
			if(! $('input[name="img"]').val().trim().length) return;
			if (! fileValidator($('input[name="img"]')[0].files[0], 1, 2097152, 'image').isSuccess ) {
	// fn(file, minsize in bytes, maxsize in bytes, type--> false=any || 'image' || 'text' || 'pdf' || custom array of file extensions );
				
				allAreValid[6] = 0;

				errHandler($('.fileUpload'), $('fieldset>p:nth-of-type(7)'), 'hasError', 'Please ensure the file is an <b>image</b> below 2mb', '');
			}
			else{
				allAreValid[6] = 1;
				successHandler($('.fileUpload'), $('fieldset>p:nth-of-type(7)'), '', 'Awesome.', 'hasError');
			};
			updateSubmitButton(allAreValid);
		});

};




