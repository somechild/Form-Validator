//often good to not check name much at all, but this tests for basic names -- not internationally supported with unicode

fullNameValidator = function(fullName) {
	var regex = /^[a-z ,.'-]+$/i;

	return {
		"isSuccess": regex.test(fullName) && fullName.split(' ').length > 1
	};
};

firstOrLastNameValidator = function(input)  {
	// if err
		// err: 0 --> more than one word entered (not just first name or not just last name)
		// err: 1 --> failed regex test (numbers in name, etc)

	var errNo = -1;
	var regex = /^[a-z ,.'-]+$/i;
	return {
		"isSuccess": (regex.test(input) && (errNo = 1)) && (input.split(' ').length > 1 && (errNo = '0')),
		"err": parseInt(errNo)
	};
};