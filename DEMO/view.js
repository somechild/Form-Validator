


i = function(j) { //initialization
	$('body>span').hide();
	$('body>div').show();
	j();
};





// j() ^ can be either a() or b() --> see below


















a = function() { //if only validate onsubmit


	$('form[name="testForm"]').submit(function(e) {

		e.preventDefault();

		var allAreValid = true; //this will be returned at the end. So if no errors, the form will submit because it's valid


//-----------------------------------inputs validations code-----------------------------------


		var flName = $('input[name="fullName"]');
		if ( !fullNameValidator(flName.val()) ) { //running fullNameValidator from .../Uncompressed JS/fullName.js


			allAreValid = false; //if invalid, set to false

			errHandler(flName, $('fieldset>p:nth-of-type(1)'), 'hasError', 'Please enter your full name');

			//I made a custom error handling function (called 'errHandler' --> it's called errHandler.js & in this demo folder)
				// basically passing -->
					// fn(
						//input element,
						//input title text element,
						//class to give to elements passed through,
						//custom error text to set in input title text element
					// );

		};



		var url = $('input[name="url"]');
		if (! urlValidator(url.val()) ) {

			allAreValid = false;

			errHandler(url, $('fieldset>p:nth-of-type(1)'), 'hasError', 'Invalid url');

		};



		var email = $('input[name="email"]');
		if (! emailValidator(email.val()) ) {

			allAreValid = false;

			errHandler(email, $('fieldset>p:nth-of-type(2)'), 'hasError', 'Please enter a valid email');

		};



		var pw = $('input[name="password"]');
		if (! passwordValidator(pw.val(), 8, 24, false, [], false) ) {
				// see documentation for details

			allAreValid = false;

			errHandler(pw, $('fieldset>p:nth-of-type(3)'), 'hasError', 'Please ensure your password is between 8-24 characters');

		};

		var pwConf = $('input[name="confPassword"]');
		if (! stringMatcher(pw.val(), pwConf.val()) ) {
	//stringMatcher() -> just a simple function that checks if two srings match, included in the pw validator script

			allAreValid = false;

			errHandler(pwConf, $('fieldset>p:nth-of-type(4)'), 'hasError', 'Passwords don\'t match!');

		};


		var description = $('textarea[name="description"]');
		if (! charCounter(description.val(), 200, 600, true, true, false) ) {
			// fn(txt, min, max, ignore spaces, ignore linebreaks)

			allAreValid = false;

			errHandler(description, $('fieldset>p:nth-of-type(5)'), 'hasError', 'Please ensure description is between 200 and 600 characters');
		};


		if (! fileValidator($('input[name="img"]')[0].files[0], 1, 2097152, 'image') ) {
// fn(file, minsize in bytes, maxsize in bytes, type--> false=any || 'image' || 'document'=word/rtf/txt/pages/pdf || 'pdf'=justpdf );

			allAreValid = false;

			errHandler($('.fileUpload'), $('fieldset>p:nth-of-type(6)'), 'hasError', 'Please ensure the file is an image below 2mb');
		};



//-----------------------------------end inputs validations code-----------------------------------







		if (allAreValid) {
			$('#glowForm').html('<p class="successTitle">Form submitting...</p>')
		}
		else{
			$('#glowForm').prepend('<p class="errorTitle">Please correct issues with form</p>');
		};

		return allAreValid;

	});



};





























b = function() { // for dynamic validation

};




