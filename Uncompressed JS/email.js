	//email--> email string


	//note this sort of validation is just for aesthetics
		//if you would like to actually validate it, you can do it through services like http://www.mailgun.com/email-validation


emailValidator = function(email) {

	var regexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	return {
		"isSuccess": regexp.test(email)
	};

};