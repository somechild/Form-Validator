
// password --> password entered

// min/max --> for limiting no of chars | pass false in either if no limit on that end

// limSpChars (bool) --> only allow use of ! @ # $ % ^ & * ( ) _  as alpha numeric chars

// requirements (array of bools) -->
		//[0] --> if true, pw must contain at least one lowercase and one uppercase letter
		//[1] --> if true, pw must contain at least one number
		//[2] --> if true, pw must contain at least on non-alphanumeric character
		//[3] --> if true, pw must not contain spaces

passwordValidator = function(password, min, max, limSpChars, requirements) {
	//if err
		//err: 0 --> fails min char requirement
		//err: 1 --> fails max char requirement
		//err: 2 --> contains special characters outside of ! @ # $ % ^ & * ( ) _ 
		//err: 3 --> does not contain at least one lowercase and one uppercase letter
		//err: 4 --> does not contain at least one number
		//err: 5 --> does not contain at least one non-alphanumeric
		//err: 6 --> contains spaces

	if (min && password.length < min)
		return {
			"isSuccess": false,
			"err": 0
		};

	if (max && password.length > max)
		return {
			"isSuccess": false,
			"err": 1
		};

	if (limSpChars && !(/^[A-Za-z0-9!@#$%^&*()_]{1,}$/.test(password)))
		return {
			"isSuccess": false,
			"err": 2
		};

	if (typeof requirements == 'object' && Array.isArray(requirements) && requirements.length > 0) {
		
		if (requirements[0] && !(/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)))
			return {
				"isSuccess": false,
				"err": 3
			};
		
		if (requirements[1] && !(/\d/.test(password)))
			return {
				"isSuccess": false,
				"err": 4
			};
		
		if (requirements[2] && !(/[\W]/.test(password)))
			return {
				"isSuccess": false,
				"err": 5
			};

		if (requirements[3] && password.indexOf(' ') != -1)
			return {
				"isSuccess": false,
				"err": 6
			};

	};

	return {
		"isSuccess": true
	};

};


// THIS DOES NOT RETURN .isSuccess
stringMatcher = function(strArr) {
	if (typeof strArr == 'object' && Array.isArray(strArr) && strArr.length>1) {
		var firstStr = strArr[0];
		return !!strArr.reduce(function(curr, nex) {
			return curr * (nex == firstStr? 1: 0);
		}, 1);
	};
	return false;
};





//isArray polyfill

if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}